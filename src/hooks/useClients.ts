
import { useState } from "react";

export interface License {
  tier: "Standard" | "Premium";
  expiresOn: string;
  status: "Valid" | "Expired" | "Expiring Soon";
}

export interface Client {
  id: string;
  name: string;
  reg_no: string;
  curriculum: string;
  region: string;
  license: License;
}

const initialClients: Client[] = [
  {
    id: "1",
    name: "Kigwa Ridge High School",
    reg_no: "MOE-123456",
    curriculum: "CBC",
    region: "Central",
    license: {
      tier: "Standard",
      expiresOn: "2026-12-31",
      status: "Valid",
    }
  },
  {
    id: "2",
    name: "Makadara Tech College",
    reg_no: "MOE-789012",
    curriculum: "IGCSE",
    region: "Nairobi",
    license: {
      tier: "Premium",
      expiresOn: "2025-06-30",
      status: "Valid",
    }
  }
];

export function useClients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  return { clients, setClients };
}
