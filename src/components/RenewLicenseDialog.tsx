
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader as DialogHeaderComp, DialogTitle as DialogTitleComp, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Wallet, CreditCard, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RenewLicenseDialogProps {
  institutionName: string;
  onLicenseRenewed?: (tier: string) => void;
}

const RenewLicenseDialog = ({ institutionName, onLicenseRenewed }: RenewLicenseDialogProps) => {
  const { toast } = useToast();
  const [showRenew, setShowRenew] = useState(false);
  const [renewTier, setRenewTier] = useState("Standard");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleRenewDialogOpen = () => {
    setShowRenew(true);
    setRenewTier("Standard");
    setPaymentMethod("mpesa");
    setPaymentStatus("");
  };

  const handleDialogClose = () => {
    setShowRenew(false);
    setPaymentStatus("");
  };

  const handlePayAndGenerate = () => {
    setPaymentStatus("Processing...");
    setTimeout(() => {
      setPaymentStatus("Payment successful. License generated.");
      toast({
        title: "License renewed!",
        description: `A ${renewTier} license has been issued for ${institutionName}.`,
      });
      onLicenseRenewed?.(renewTier);
    }, 2500);
  };

  return (
    <Dialog open={showRenew} onOpenChange={setShowRenew}>
      <DialogTrigger asChild>
        <Button onClick={handleRenewDialogOpen}>
          <RefreshCw className="h-4 w-4 mr-1" />
          Renew License
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogHeaderComp>
          <DialogTitleComp>Renew License for {institutionName}</DialogTitleComp>
          <DialogDescription>
            Select license details and proceed with payment.
          </DialogDescription>
        </DialogHeaderComp>
        <div className="space-y-4">
          <div>
            <label className="font-medium mb-1 block">Select License Tier:</label>
            <Select value={renewTier} onValueChange={setRenewTier}>
              <SelectTrigger>
                <SelectValue placeholder="Select License Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard (1 Year)</SelectItem>
                <SelectItem value="Premium">Premium (3 Years)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="font-medium mb-1">Select Payment Method:</label>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={paymentMethod === "mpesa" ? "default" : "outline"}
                onClick={() => setPaymentMethod("mpesa")}
              >
                <Wallet className="h-4 w-4 mr-1" />
                M-Pesa
              </Button>
              <Button
                type="button"
                variant={paymentMethod === "stripe" ? "default" : "outline"}
                onClick={() => setPaymentMethod("stripe")}
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Card/Stripe
              </Button>
            </div>
          </div>
          <Button
            className="mt-2 w-full"
            onClick={handlePayAndGenerate}
            disabled={!!paymentStatus && paymentStatus.startsWith("Processing")}
          >
            Pay and Generate License
          </Button>

          {paymentStatus && (
            <div className="text-blue-700 mt-2 text-center">{paymentStatus}</div>
          )}
          {paymentStatus.includes("License generated") && (
            <Button variant="secondary" className="mt-2 w-full">
              Download .license File
            </Button>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mt-2 w-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewLicenseDialog;
