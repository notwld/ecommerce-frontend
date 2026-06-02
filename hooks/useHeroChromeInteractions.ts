"use client";

import { useState } from "react";

export function useHeroChromeInteractions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return {
    cartOpen,
    menuOpen,
    setCartOpen,
    setMenuOpen,
  };
}
