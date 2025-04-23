
import { useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Staff" | "Viewer";
  status: "Active" | "Inactive" | "Suspended";
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Janet Wanjiku",
    email: "janet.wanjiku@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "George Mwangi",
    email: "george.mwangi@example.com",
    role: "Staff",
    status: "Active",
  },
  {
    id: "3",
    name: "Miriam Otieno",
    email: "miriam.otieno@example.com",
    role: "Viewer",
    status: "Inactive",
  },
];

export function useUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  return { users, setUsers };
}
