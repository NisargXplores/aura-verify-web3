import React, { useState, useEffect } from "react";

// Extend the Window interface to include the solana property
declare global {
  interface Window {
    solana?: {
      isPhantom: boolean;
      connect: (options?: { onlyIfTrusted: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      publicKey?: { toString: () => string };
    };
  }
}
import { Link } from "react-router-dom";
import { Connection, PublicKey } from "@solana/web3.js";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import { toast } from "sonner";

const Dashboard = () => {
  const [walletData, setWalletData] = useState({
    address: "",
    balance: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connection = new Connection("https://api.mainnet-beta.solana.com");

  // Fetch wallet data
  const fetchWalletData = async (publicKey: PublicKey) => {
    try {
      console.log("Fetching wallet data for publicKey:", publicKey.toBase58());
      setIsLoading(true);
      const balance = await connection.getBalance(publicKey);
      const formattedBalance = (balance / 1e9).toFixed(4); // Convert lamports to SOL

      setWalletData({
        address: publicKey.toBase58(),
        balance: formattedBalance,
      });
      setIsConnected(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      toast.error("Failed to fetch wallet data. Please try again.");
      setIsLoading(false);
    }
  };

  // Automatically fetch wallet data if already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          // Check if the wallet is already connected
          if (window.solana.publicKey) {
            console.log("Wallet already connected:", window.solana.publicKey.toString());
            fetchWalletData(new PublicKey(window.solana.publicKey.toString()));
          } else {
            // Attempt to connect silently
            const response = await window.solana.connect({ onlyIfTrusted: true });
            console.log("Wallet connected silently:", response.publicKey.toString());
            fetchWalletData(new PublicKey(response.publicKey.toString()));
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      } else {
        console.warn("Phantom Wallet not found.");
      }
    };

    checkWalletConnection();
  }, []);

  // Prompt wallet connection if not connected
  const connectWallet = async () => {
    if (!window.solana || !window.solana.isPhantom) {
      toast.error("No Solana wallet found. Please install Phantom Wallet.");
      return;
    }

    try {
      const response = await window.solana.connect();
      console.log("Wallet connected manually:", response.publicKey.toString());
      toast.success("Wallet connected successfully!");
      fetchWalletData(new PublicKey(response.publicKey.toString()));
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-web3-darker relative overflow-hidden">
      <Header />

      <main className="flex-grow flex flex-col p-4 md:p-6 relative z-10">
        <div className="max-w-7xl w-full mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text-primary">Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Manage your decentralized identity and verification status
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GlassMorphismCard className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-medium mb-1">Wallet Information</h2>
                    {isConnected ? (
                      isLoading ? (
                        <p className="text-sm text-gray-400">Loading wallet data...</p>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-400">
                            <strong>Address:</strong> {walletData.address}
                          </p>
                          <p className="text-sm text-gray-400">
                            <strong>Balance:</strong> {walletData.balance} SOL
                          </p>
                        </div>
                      )
                    ) : (
                      <div>
                        <p className="text-sm text-gray-400">Wallet not connected</p>
                        <AnimatedButton
                          variant="outline"
                          size="sm"
                          onClick={connectWallet}
                        >
                          Connect Wallet
                        </AnimatedButton>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                      onClick={() => fetchWalletData(new PublicKey(walletData.address))}
                      isLoading={isLoading}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Refresh Data</span>
                    </AnimatedButton>
                  </div>
                </div>
              </GlassMorphismCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;