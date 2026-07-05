"use client";

import { useState } from "react";

export function useHeroChromeInteractions() {
  const [menuOpen, setMenuOpen] = useState(false);

  return {
    menuOpen,
    setMenuOpen,
  };
}
