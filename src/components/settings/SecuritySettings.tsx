
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function SecuritySettings() {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Security settings updated",
      description: "Your security settings have been updated successfully.",
    });
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    if (!twoFactorEnabled) {
      toast({
        title: "Two-factor authentication enabled",
        description: "Please scan the QR code with your authenticator app.",
      });
    }
  };

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your account security preferences and authentication methods.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                <span>Two-Factor Authentication</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </span>
              </Label>
              <Switch 
                id="two-factor" 
                checked={twoFactorEnabled}
                onCheckedChange={handleEnableTwoFactor}
              />
            </div>
            
            {twoFactorEnabled && (
              <div className="border p-4 rounded-md bg-muted/50">
                <div className="text-sm mb-2">
                  Scan the QR code with your authenticator app
                </div>
                <div className="w-32 h-32 bg-white mx-auto flex items-center justify-center border">
                  <span className="text-xs text-muted-foreground">QR Code Placeholder</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="verification-code">Enter the 6-digit code</Label>
                  <Input id="verification-code" maxLength={6} pattern="[0-9]{6}" placeholder="000000" />
                  <Button size="sm" className="w-full">Verify</Button>
                </div>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="password">Current Password</Label>
              <Input id="password" type="password" placeholder="Enter your current password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="session-timeout" className="flex items-center justify-between">
                <span>Session timeout (minutes)</span>
                <span className="text-sm text-muted-foreground">{sessionTimeout} minutes</span>
              </Label>
              <Input 
                id="session-timeout" 
                type="range" 
                min="5" 
                max="60" 
                step="5"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
