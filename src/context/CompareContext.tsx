"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CompareItem {
  id: string;
  modelName: string;
  brand: string;
  category: string;
  subcategory?: string | null;
  price: number;
  stock: number;
  image?: string;
}

interface CompareContextValue {
  items: CompareItem[];
  toggleItem: (item: CompareItem) => void;
  removeItem: (id: string) => void;
  clearCompare: () => void;
  isCompared: (id: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "izzrael-compare";
const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore corrupt storage
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function toggleItem(item: CompareItem) {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, item];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCompare() {
    setItems([]);
  }

  function isCompared(id: string) {
    return items.some((i) => i.id === id);
  }

  return (
    <CompareContext.Provider
      value={{
        items,
        toggleItem,
        removeItem,
        clearCompare,
        isCompared,
        isFull: items.length >= MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within a CompareProvider");
  return ctx;
}
