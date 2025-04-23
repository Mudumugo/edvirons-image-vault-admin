
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function RenewLicensePage() {
  const [tier, setTier] = useState("Standard");
  const [paymentMethod, setPayment] = useState("mpesa");
  const [status, setStatus] = useState("");

  const school = {
    name: "Kigwa Ridge High School",
    reg_no: "MOE-123456",
    device_hash: "ABC123DEF456"
  };

  const handlePayment = () => {
    setStatus("Processing...");
    setTimeout(() => {
      setStatus("Payment successful. License generated.");
    }, 4000);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader className="text-xl font-bold">Renew License</CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>School:</strong> {school.name}<br />
            <strong>Reg No:</strong> {school.reg_no}
          </div>

          <div>
            <label className="font-medium mb-1 block">Select License Tier:</label>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger>
                <SelectValue placeholder="Select License Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard (1 Year)</SelectItem>
                <SelectItem value="Premium">Premium (3 Years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mt-2">
            <label className="font-medium">Select Payment Method:</label>
            <div className="flex space-x-4">
              <Button variant={paymentMethod === "mpesa" ? "default" : "outline"}
                onClick={() => setPayment("mpesa")}
              >
                M-Pesa
              </Button>
              <Button variant={paymentMethod === "stripe" ? "default" : "outline"}
                onClick={() => setPayment("stripe")}
              >
                Card/Stripe
              </Button>
            </div>
          </div>

          <Button className="mt-4" onClick={handlePayment} disabled={!!status && !status.startsWith("Processing")}>
            Pay and Generate License
          </Button>

          {status && <div className="text-blue-700 mt-3">{status}</div>}

          {status.includes("License generated") && (
            <Button variant="secondary" className="mt-2">Download .license File</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
