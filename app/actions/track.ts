"use server";

import { adminFetch } from "@/lib/shopify/admin";
import { ShopifyApiError } from "@/lib/shopify/client";

export type TrackedOrder = {
  name: string;
  financialStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  tracking: { number: string | null; url: string | null; company: string | null }[];
};

export type TrackResult =
  | { ok: true; order: TrackedOrder }
  | { ok: false; error: string };

const ORDER_QUERY = `
  query TrackOrder($query: String!) {
    orders(first: 1, query: $query) {
      edges {
        node {
          name
          email
          createdAt
          displayFinancialStatus
          displayFulfillmentStatus
          fulfillments(first: 10) {
            trackingInfo(first: 5) { number url company }
          }
        }
      }
    }
  }
`;

type OrderNode = {
  name: string;
  email: string | null;
  createdAt: string;
  displayFinancialStatus: string | null;
  displayFulfillmentStatus: string | null;
  fulfillments: Array<{
    trackingInfo: Array<{ number: string | null; url: string | null; company: string | null }>;
  }>;
};

// Security gate: an order is only revealed if the submitted email matches.
function emailMatches(a: string | null | undefined, b: string): boolean {
  return Boolean(a) && a!.trim().toLowerCase() === b.trim().toLowerCase();
}

export async function trackOrder(orderNumber: string, email: string): Promise<TrackResult> {
  const number = orderNumber.trim().replace(/^#/, "");
  const cleanEmail = email.trim();
  if (!number || !cleanEmail) {
    return { ok: false, error: "Enter both your order number and email." };
  }

  try {
    const data = await adminFetch<{ orders: { edges: Array<{ node: OrderNode }> } }>(
      ORDER_QUERY,
      { query: `name:#${number}` },
    );

    const node = data.orders.edges[0]?.node;
    // Same message whether the order is missing or the email doesn't match.
    if (!node || !emailMatches(node.email, cleanEmail)) {
      return { ok: false, error: "No order found for that order number and email." };
    }

    return {
      ok: true,
      order: {
        name: node.name,
        financialStatus: node.displayFinancialStatus ?? "UNKNOWN",
        fulfillmentStatus: node.displayFulfillmentStatus ?? "UNFULFILLED",
        createdAt: node.createdAt,
        tracking: node.fulfillments.flatMap((f) => f.trackingInfo),
      },
    };
  } catch (error) {
    const message =
      error instanceof ShopifyApiError
        ? error.message
        : "We could not look up your order right now. Please try again.";
    return { ok: false, error: message };
  }
}
