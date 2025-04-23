
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function NotificationSettings() {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [clientUpdates, setClientUpdates] = useState(true);
  const [imageUpdates, setImageUpdates] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully.",
    });
  };

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Configure how you receive notifications and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications via email
                </span>
              </Label>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="client-updates" className="flex flex-col space-y-1">
                <span>Client Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Get notified about client account changes
                </span>
              </Label>
              <Switch 
                id="client-updates" 
                checked={clientUpdates}
                onCheckedChange={setClientUpdates}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="image-updates" className="flex flex-col space-y-1">
                <span>Image Updates</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Get notified when new OS images are uploaded
                </span>
              </Label>
              <Switch 
                id="image-updates" 
                checked={imageUpdates}
                onCheckedChange={setImageUpdates}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="security-alerts" className="flex flex-col space-y-1">
                <span>Security Alerts</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive alerts about security-related events
                </span>
              </Label>
              <Switch 
                id="security-alerts" 
                checked={securityAlerts}
                onCheckedChange={setSecurityAlerts}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Save Preferences</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
