
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SSOProvider = {
  id: string;
  name: string;
  enabled: boolean;
  icon: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export function SSOSettings() {
  const { toast } = useToast();
  const [providers, setProviders] = useState<SSOProvider[]>([
    {
      id: "google",
      name: "Google",
      enabled: false,
      icon: "google.svg",
      clientId: "",
      clientSecret: "",
      redirectUri: "https://app.edvirons.com/api/auth/callback/google",
    },
    {
      id: "microsoft",
      name: "Microsoft",
      enabled: false,
      icon: "microsoft.svg",
      clientId: "",
      clientSecret: "",
      redirectUri: "https://app.edvirons.com/api/auth/callback/microsoft",
    },
    {
      id: "saml",
      name: "Custom SAML",
      enabled: false,
      icon: "saml.svg",
      clientId: "",
      clientSecret: "",
      redirectUri: "https://app.edvirons.com/api/auth/callback/saml",
    },
  ]);
  
  const toggleProvider = (id: string) => {
    setProviders(providers.map(provider => 
      provider.id === id 
        ? { ...provider, enabled: !provider.enabled } 
        : provider
    ));
  };
  
  const updateProvider = (id: string, field: keyof SSOProvider, value: string) => {
    setProviders(providers.map(provider => 
      provider.id === id 
        ? { ...provider, [field]: value } 
        : provider
    ));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "SSO settings saved",
      description: "Your SSO integration settings have been updated.",
    });
  };

  return (
    <form onSubmit={handleSave}>
      <Card>
        <CardHeader>
          <CardTitle>SSO Integrations</CardTitle>
          <CardDescription>
            Configure single sign-on providers for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={providers[0].id} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              {providers.map(provider => (
                <TabsTrigger key={provider.id} value={provider.id}>
                  {provider.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {providers.map(provider => (
              <TabsContent key={provider.id} value={provider.id} className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h3 className="text-lg font-medium">{provider.name} SSO</h3>
                    <p className="text-sm text-muted-foreground">
                      {provider.enabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                  <Switch 
                    id={`${provider.id}-enabled`}
                    checked={provider.enabled}
                    onCheckedChange={() => toggleProvider(provider.id)}
                  />
                </div>
                
                {provider.enabled && (
                  <div className="grid gap-4 pt-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`${provider.id}-client-id`}>Client ID</Label>
                      <Input 
                        id={`${provider.id}-client-id`}
                        value={provider.clientId} 
                        onChange={(e) => updateProvider(provider.id, "clientId", e.target.value)} 
                        placeholder={`${provider.name} Client ID`}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`${provider.id}-client-secret`}>Client Secret</Label>
                      <Input 
                        id={`${provider.id}-client-secret`}
                        type="password"
                        value={provider.clientSecret} 
                        onChange={(e) => updateProvider(provider.id, "clientSecret", e.target.value)} 
                        placeholder={`${provider.name} Client Secret`}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`${provider.id}-redirect-uri`}>Redirect URI</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id={`${provider.id}-redirect-uri`}
                          value={provider.redirectUri} 
                          readOnly
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(provider.redirectUri);
                            toast({
                              title: "Copied",
                              description: "Redirect URI copied to clipboard",
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use this URL in your {provider.name} developer console
                      </p>
                    </div>
                    
                    {provider.id === "saml" && (
                      <div className="grid gap-2">
                        <Label htmlFor="saml-metadata">SAML Metadata URL or XML</Label>
                        <Input 
                          id="saml-metadata"
                          placeholder="https://your-idp.com/metadata.xml"
                        />
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Save SSO Settings</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
