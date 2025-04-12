
import React, { useState, useEffect } from "react";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import StatusIndicator from "@/components/ui-elements/StatusIndicator";
import { ArrowUpRight, Check, Clock, ExternalLink, XCircle } from "lucide-react";

type TransactionStatusType = "pending" | "success" | "error";

interface TransactionStatusProps {
  status?: TransactionStatusType;
  autoChange?: boolean;
  txHash?: string;
  message?: string;
}

const TransactionStatus = ({
  status = "pending",
  autoChange = false,
  txHash = "Gxd4SFNVh3KzVV1P9GgKLYqJMQH3NGU9QZ5KmU4yzqVTnLmRJRKJ",
  message,
}: TransactionStatusProps) => {
  const [currentStatus, setCurrentStatus] = useState<TransactionStatusType>(status);

  useEffect(() => {
    if (autoChange && currentStatus === "pending") {
      const timer = setTimeout(() => {
        // Randomly choose success or error for demo purposes
        setCurrentStatus(Math.random() > 0.2 ? "success" : "error");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [autoChange, currentStatus]);

  const statusConfig = {
    pending: {
      icon: <Clock className="h-12 w-12 text-yellow-500 animate-pulse" />,
      title: "Transaction in Progress",
      description: message || "Your transaction is being processed on the blockchain",
      color: "border-yellow-500/30 bg-yellow-500/5",
    },
    success: {
      icon: <Check className="h-12 w-12 text-green-500" />,
      title: "Transaction Successful",
      description: message || "Your transaction has been confirmed on the blockchain",
      color: "border-green-500/30 bg-green-500/5",
    },
    error: {
      icon: <XCircle className="h-12 w-12 text-red-500" />,
      title: "Transaction Failed",
      description: message || "There was an error processing your transaction",
      color: "border-red-500/30 bg-red-500/5",
    },
  };

  const config = statusConfig[currentStatus];

  return (
    <GlassMorphismCard className="w-full max-w-md mx-auto overflow-hidden">
      <div
        className={`border rounded-lg p-6 transition-all duration-300 ${config.color}`}
      >
        <div className="flex flex-col items-center text-center mb-4">
          {config.icon}
          <h3 className="text-xl font-medium mt-4">{config.title}</h3>
          <StatusIndicator status={currentStatus} className="mt-2" />
          <p className="text-sm text-gray-400 mt-2">{config.description}</p>
        </div>

        {txHash && (
          <div className="mt-4 bg-black/20 rounded-lg p-3 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Transaction Hash</span>
              <a
                href={`https://explorer.solana.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-web3-blue hover:text-web3-blue/80 transition-colors flex items-center gap-1 text-xs"
              >
                <span>View on Explorer</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="mt-1">
              <p className="font-mono text-xs truncate">
                {txHash.slice(0, 20)}...{txHash.slice(-8)}
              </p>
            </div>
          </div>
        )}

        {currentStatus === "success" && (
          <div className="flex justify-center mt-6">
            <a
              href="#"
              className="text-web3-blue hover:text-web3-blue/80 transition-colors flex items-center gap-1 text-sm"
            >
              <span>Proceed to Dashboard</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {currentStatus === "error" && (
          <div className="flex justify-center mt-6">
            <a
              href="#"
              className="text-web3-blue hover:text-web3-blue/80 transition-colors flex items-center gap-1 text-sm"
            >
              <span>Try Again</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </GlassMorphismCard>
  );
};

export default TransactionStatus;
