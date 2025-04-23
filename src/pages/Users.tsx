
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUsers } from "@/hooks/useUsers";
import { User, UserRound } from "lucide-react";
import React from "react";

export default function Users() {
  const { users } = useUsers();

  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <UserRound className="w-6 h-6 text-primary" />
                Users
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage platform users, roles and status.
              </p>
            </div>
          </div>
        </header>

        <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
          <table className="min-w-full bg-background divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <span
                      className={
                        user.status === "Active"
                          ? "inline-flex px-2 py-1 rounded text-green-700 bg-green-50"
                          : user.status === "Inactive"
                          ? "inline-flex px-2 py-1 rounded text-orange-700 bg-orange-50"
                          : "inline-flex px-2 py-1 rounded text-red-700 bg-red-50"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
