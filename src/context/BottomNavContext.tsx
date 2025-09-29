"use client";

import { createContext, useContext, useState } from "react";

interface BottomNavContextType {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

const BottomNavContext = createContext<BottomNavContextType | undefined>(
  undefined
);

export function BottomNavProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  return (
    <BottomNavContext.Provider value={{ hidden, setHidden }}>
      {children}
    </BottomNavContext.Provider>
  );
}

export function useBottomNav() {
  const ctx = useContext(BottomNavContext);
  if (!ctx)
    throw new Error("useBottomNav must be used inside BottomNavProvider");
  return ctx;
}
