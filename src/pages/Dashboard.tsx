
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
import { Connection, PublicKey, ParsedTransactionWithMeta, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ArrowLeft, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";

const Dashboard = () => {
  const { connected, publicKey, balance, connectWallet, refreshBalance } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  // Fetch recent transactions
  const fetchRecentTransactions = async () => {
    if (!publicKey) return;
    
    try {
      setTransactionsLoading(true);
      const pubKey = new PublicKey(publicKey);
      
      // Get signatures of recent transactions
      const signatures = await connection.getSignaturesForAddress(pubKey, { limit: 5 });
      
      // Get transaction details
      const transactions = await Promise.all(
        signatures.map(async (sig) => {
          try {
            const tx = await connection.getParsedTransaction(sig.signature, "confirmed");
            return {
              signature: sig.signature,
              timestamp: sig.blockTime ? new Date(sig.blockTime * 1000).toLocaleString() : 'Unknown time',
              successful: tx?.meta?.err === null,
              amount: tx?.meta?.postBalances && tx?.meta?.preBalances 
                ? Math.abs((tx.meta.postBalances[0] - tx.meta.preBalances[0]) / LAMPORTS_PER_SOL).toFixed(4)
                : 'Unknown',
              type: tx?.transaction?.message?.instructions?.[0]?.program === 'system' ? 'Transfer' : 'Other'
            };
          } catch (err) {
            console.error('Error fetching transaction:', err);
            return null;
          }
        })
      );
      
      setRecentTransactions(transactions.filter(Boolean));
      setTransactionsLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transaction history");
      setTransactionsLoading(false);
    }
  };

  // Refresh all wallet data
  const refreshWalletData = async () => {
    setIsLoading(true);
    try {
      await refreshBalance();
      await fetchRecentTransactions();
      toast.success("Wallet data refreshed");
    } catch (error) {
      console.error("Error refreshing wallet data:", error);
      toast.error("Failed to refresh wallet data");
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when wallet is connected
  useEffect(() => {
    if (connected && publicKey) {
      fetchRecentTransactions();
    }
  }, [connected, publicKey]);

  return (
    <div className="min-h-screen flex flex-col bg-web3-darker relative overflow-hidden">
      <Navbar />

      <main className="flex-grow flex flex-col p-4 md:p-6 relative z-10 mt-16">
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
            <div className="lg:col-span-3 space-y-6">
              <GlassMorphismCard className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-medium mb-1">Wallet Information</h2>
                    {connected ? (
                      isLoading ? (
                        <p className="text-sm text-gray-400">Loading wallet data...</p>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-400">
                            <strong>Address:</strong> {publicKey}
                          </p>
                          <p className="text-sm text-gray-400">
                            <strong>Balance:</strong> {balance !== null ? `${balance.toFixed(4)} SOL` : "Loading..."}
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
                      onClick={refreshWalletData}
                      isLoading={isLoading}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Refresh Data</span>
                    </AnimatedButton>
                  </div>
                </div>
              </GlassMorphismCard>

              {connected && (
                <GlassMorphismCard className="p-6">
                  <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
                  
                  {transactionsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-web3-purple/20 border-t-web3-purple rounded-full"></div>
                    </div>
                  ) : recentTransactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 px-2 text-sm font-medium text-gray-400">Transaction</th>
                            <th className="text-left py-2 px-2 text-sm font-medium text-gray-400">Type</th>
                            <th className="text-left py-2 px-2 text-sm font-medium text-gray-400">Amount</th>
                            <th className="text-left py-2 px-2 text-sm font-medium text-gray-400">Status</th>
                            <th className="text-left py-2 px-2 text-sm font-medium text-gray-400">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentTransactions.map((tx, index) => (
                            <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-3 px-2 text-sm">
                                <a 
                                  href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-web3-purple hover:underline"
                                >
                                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                                </a>
                              </td>
                              <td className="py-3 px-2 text-sm">{tx.type}</td>
                              <td className="py-3 px-2 text-sm">{tx.amount} SOL</td>
                              <td className="py-3 px-2 text-sm">
                                {tx.successful ? (
                                  <span className="flex items-center text-green-400">
                                    <CheckCircle className="mr-1 h-3 w-3" /> Success
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-400">
                                    <AlertCircle className="mr-1 h-3 w-3" /> Failed
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-2 text-sm text-gray-400">{tx.timestamp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>No recent transactions found</p>
                    </div>
                  )}
                </GlassMorphismCard>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white/70">BlockVerify © 2025</span>
                <p className="text-xs text-white/50">Securing identities on the blockchain, one verification at a time</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
