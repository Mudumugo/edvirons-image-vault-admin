
import { Institution } from "./institution";

export interface License {
  id: string;
  tier: "Standard" | "Premium";
  issuedOn: string;
  expiresOn: string;
  status: "Valid" | "Expired" | "Expiring Soon";
}

export interface Device {
  hash: string;
  osVersion: string;
  lastSync: string;
}

export interface Client extends Institution {
  licenses: License[];
  devices: Device[];
  contacts: {
    admin?: string;
    technical?: string;
    billing?: string;
  };
}
