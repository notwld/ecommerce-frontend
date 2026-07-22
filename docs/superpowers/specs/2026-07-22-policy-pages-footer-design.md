# Policy Pages & Footer Links — Design

Date: 2026-07-22
Status: Implemented

## Goal

Ship the four AT Wardrobe information pages the business provided (Terms,
Privacy, Return & Exchange, Complaint Form) and wire them through the existing
footer so those links stop 404ing.

## Confirmed decisions

| Area | Decision |
|------|----------|
| Approach | Shared prose shell for the three policy docs; Complaint Form mirrors Contact |
| Complaint submit | Client-only: validate with zod + react-hook-form, show acknowledgement (same pattern as Contact Us). No backend/email. |
| Shipping Policy | Remove from footer until content exists |
| Routes | Keep existing footer hrefs (Shopify-style paths already in `SiteFooter`) |
| Product accordion “7 days” copy | Out of scope (policy says 2 days; fix separately if requested) |

## Routes & labels

| Page | Route | Footer section | Footer label |
|------|-------|----------------|--------------|
| Terms & Conditions | `/policies/terms-of-service` | Information | Terms & Conditions |
| Privacy Policy | `/policies/privacy-policy` | Information | Privacy Policy |
| Return & Exchange Policy | `/policies/refund-policy` | Information | Return & Exchange Policy |
| Complaint Form | `/pages/complaint-form` | Customer Care | Complaint Form |

Footer changes:

- Remove `{ label: "Shipping Policy", href: "/policies/shipping-policy" }`
- Rename “Return Policy” → “Return & Exchange Policy” (href unchanged)

Other footer links (Distributor, Blogs, Loyalty, Careers, FAQs, etc.) stay as-is even if their pages are not built yet.

## Content source

Use the copy supplied by the business (Last Updated: July 20, 2026) verbatim for
Terms, Privacy, and Return & Exchange. Structure as numbered sections with
bullet lists where the source uses bullets. Cross-links:

- Terms §7 → link to `/policies/refund-policy`
- Terms §11 → link to `/policies/privacy-policy`

## UI

### Policy prose pages

- Visual language matches Contact: `#f3f3f3` page background, max-width ~760px
  content column, simple h1 + “Last Updated” line, section headings, readable
  body text (~13–14px).
- Optional thin shared shell (e.g. `PolicyPage`) for title, date, and children —
  not a CMS or markdown pipeline.
- Reuse Contact’s TopBar + page header chrome for consistency on these standalone
  pages (root layout has footer only, no global header).

### Complaint Form

Mirror `components/contact/ContactPage.tsx`:

**Fields**

| Field | Control | Required |
|-------|---------|----------|
| Full Name | text | yes |
| Email Address | email | yes |
| Phone Number | tel | no |
| Order Number | text | no |
| Subject | text | yes |
| Category | select (Product Quality, Order Issue, Delivery, Payment, Customer Service, Website Issue, Other) | yes |
| Description | textarea | yes |
| Attach Images or Documents | file input | no (UI only; file not uploaded) |
| Preferred Resolution | select (Replacement, Exchange, Refund, Information / Clarification, Other) | yes |
| Declaration checkbox (“I agree to the review of my complaint.”) | checkbox | yes |

Skip paper-form Signature/Date fields — acknowledgement message covers confirmation.

On success, show the business acknowledgement copy (thank you + we may contact
you for more info). Disable submit while submitting.

## File layout (minimal)

```
app/policies/terms-of-service/page.tsx
app/policies/privacy-policy/page.tsx
app/policies/refund-policy/page.tsx
app/pages/complaint-form/page.tsx
components/policies/PolicyPage.tsx          # shared prose chrome
components/policies/TermsContent.tsx        # or inline in page if short enough
components/policies/PrivacyContent.tsx
components/policies/ReturnExchangeContent.tsx
components/complaint/ComplaintFormPage.tsx
components/layout/SiteFooter.tsx            # link list update only
```

Ponytail lean: if content components are only used once, content may live
directly in each `page.tsx` / one client component file for the form. Prefer
fewest files that stay readable.

## Out of scope

- Shipping Policy page
- Real complaint/contact delivery (email, Shopify, API)
- Updating product PDP returns accordion text
- Building other dead footer routes

## Success criteria

- All four routes render the provided content and are reachable from the footer
- Shipping Policy is gone from the footer
- Complaint form validates required fields and shows success acknowledgement
- No new dependencies
- Mobile and desktop readable; keyboard-accessible form labels/errors
