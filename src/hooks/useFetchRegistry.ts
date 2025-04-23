
import { useQuery } from "@tanstack/react-query";
import type { Institution } from "@/types/institution";

export function useFetchRegistry() {
  return useQuery({
    queryKey: ["registry"],
    queryFn: async (): Promise<Institution[]> => {
      const response = await fetch("/api/institution");
      if (!response.ok) {
        throw new Error("Failed to fetch institutions");
      }
      const data = await response.json();
      return data;
    }
  });
}
