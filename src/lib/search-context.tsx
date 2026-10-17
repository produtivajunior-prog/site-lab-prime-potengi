import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

type Ctx = { query: string; setQuery: (v: string) => void };
const SearchContext = createContext<Ctx>({ query: "", setQuery: () => {} });

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    setQuery("");
  }, [pathname]);
  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
}

export function useSiteSearch() {
  return useContext(SearchContext);
}

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function matches(query: string, ...fields: (string | undefined | null)[]) {
  const q = normalize(query);
  if (!q) return true;
  return fields.some((f) => f && normalize(f).includes(q));
}
