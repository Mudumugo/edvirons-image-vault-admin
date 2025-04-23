
import { AppSidebar } from "@/components/AppSidebar";

export default function DashboardHome() {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-8 flex flex-col items-center justify-center min-h-screen bg-muted">
        <h1 className="text-3xl font-semibold mb-4">Welcome to EdVirons Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Use the sidebar to access Images, Clients, and more features.
        </p>
      </div>
    </>
  );
}
