
import React, { useState } from "react";
import { Check, X, CreditCard, ExternalLink, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import TransactionStatus from "@/components/transactions/TransactionStatus";
import { transferSOL } from "@/utils/transactionUtils";

interface TransactionConfirmationProps {
  onTransactionComplete: (signature: string) => void;
}

const TransactionConfirmation: React.FC<TransactionConfirmationProps> = ({ 
  onTransactionComplete
}) => {
  const { wallet, publicKey } = useWallet();
  const [isSigningDialogOpen, setIsSigningDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<"pending" | "success" | "error" | null>(null);
  const [signature, setSignature] = useState<string>("");
  
  const handleInitiateTransaction = () => {
    setIsSigningDialogOpen(true);
  };

  const handleSignTransaction = async () => {
    setIsLoading(true);
    setIsSigningDialogOpen(false);
    setTransactionStatus("pending");
    
    try {
      if (!wallet || !publicKey) {
        throw new Error("Wallet not connected");
      }
      
      // Sample recipient address - in a real app this would be configurable
      const recipientAddress = "AuR8HMaNKXxUz8qFDWPyZMk8DhQcFYKAT6SLjohzNrUZ";
      // Sample amount - in a real app this would be configurable
      const amount = 0.001;
      
      // Execute transaction
      const txSignature = await transferSOL(wallet, recipientAddress, amount);
      
      setSignature(txSignature);
      setTransactionStatus("success");
      toast.success("Transaction completed successfully!");
      
      // Wait 3 seconds before proceeding to the next step
      setTimeout(() => {
        onTransactionComplete(txSignature);
      }, 3000);
      
    } catch (error) {
      console.error("Transaction error:", error);
      setTransactionStatus("error");
      toast.error("Transaction failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelTransaction = () => {
    setIsSigningDialogOpen(false);
    toast.info("Transaction cancelled");
  };

  return (
    <div className="space-y-6">
      {transactionStatus ? (
        <TransactionStatus 
          status={transactionStatus} 
          txHash={signature || undefined} 
          message={
            transactionStatus === "pending" 
              ? "Creating your identity attestation on the blockchain..." 
              : transactionStatus === "success" 
                ? "Identity attestation successfully created!" 
                : "Failed to create identity attestation"
          } 
        />
      ) : (
        <GlassMorphismCard neonBorder className="w-full max-w-md mx-auto p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-web3-purple/20 to-web3-purple/10 rounded-full flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-web3-purple" />
            </div>
            <h3 className="text-xl font-medium mt-4">Create Identity Attestation</h3>
            <p className="text-sm text-gray-400 mt-2">
              Your identity verification is ready to be published to the blockchain. 
              This will create a secure, verifiable record of your identity.
            </p>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4 border border-web3-purple/20 mb-6">
            <h4 className="text-sm font-medium mb-2">Transaction Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span>Identity Attestation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Network:</span>
                <span>Solana</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fee:</span>
                <span>~0.001 SOL</span>
              </div>
            </div>
          </div>
          
          <AnimatedButton 
            variant="neon" 
            className="w-full" 
            onClick={handleInitiateTransaction}
            isLoading={isLoading}
          >
            <Shield className="mr-2 h-5 w-5" />
            Create Attestation
          </AnimatedButton>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            This transaction will verify your identity on the Solana blockchain
          </p>
        </GlassMorphismCard>
      )}
      
      <Dialog open={isSigningDialogOpen} onOpenChange={setIsSigningDialogOpen}>
        <DialogContent className="sm:max-w-md border-web3-purple/20 bg-gradient-to-b from-black/90 to-gray-900/90 backdrop-blur-xl">
          <DialogTitle className="gradient-text-primary">Sign Transaction</DialogTitle>
          <DialogDescription>
            You're about to sign a transaction to create your identity attestation on the Solana blockchain. 
            This will require a small network fee.
          </DialogDescription>
          
          <div className="bg-black/30 rounded-lg p-4 border border-web3-purple/20 my-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">From:</span>
                <span className="font-mono">{publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To:</span>
                <span className="font-mono">AuR8...NrUZ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span>0.001 SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Purpose:</span>
                <span>Identity Attestation</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex gap-3 sm:gap-0">
            <AnimatedButton
              variant="outline"
              onClick={handleCancelTransaction}
              className="flex-1 sm:flex-none"
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </AnimatedButton>
            <AnimatedButton
              variant="neon"
              onClick={handleSignTransaction}
              className="flex-1 sm:flex-none"
            >
              <Check className="mr-2 h-4 w-4" />
              Sign Transaction
            </AnimatedButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionConfirmation;
