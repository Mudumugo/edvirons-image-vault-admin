
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function Images() {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Image Management</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-muted-foreground">
              Manage, upload, and view OS images for client devices here.
              {/* Add real image listing/upload functionality here later */}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
