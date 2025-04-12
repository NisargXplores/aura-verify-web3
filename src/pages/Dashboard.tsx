
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, CheckCircle, Clock, ExternalLink, RefreshCw, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import StatusIndicator from "@/components/ui-elements/StatusIndicator";
import IdentityCard from "@/components/identity/IdentityCard";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

const Dashboard = () => {
  const { connected, publicKey } = useWallet();
  const [identityStatus, setIdentityStatus] = useState<"verified" | "not-verified" | "pending">("not-verified");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock user identity data
  const [identity, setIdentity] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    dateOfBirth: new Date(1990, 5, 15),
    idNumber: "AJ12345678",
    verificationStatus: "not-verified" as "verified" | "not-verified" | "pending",
    verifiedDate: undefined as Date | undefined,
  });
  
  // Check if user has identity verification
  useEffect(() => {
    if (connected) {
      // This would normally be an API call to check the user's verification status
      const mockVerificationCheck = () => {
        // For demo purposes, use a random status
        const statuses = ["not-verified", "pending", "verified"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        setIdentityStatus(status as "verified" | "not-verified" | "pending");
        setIdentity(prev => ({
          ...prev,
          verificationStatus: status as "verified" | "not-verified" | "pending",
          verifiedDate: status === "verified" ? new Date() : undefined,
        }));
      };
      
      mockVerificationCheck();
    } else {
      setIdentityStatus("not-verified");
    }
  }, [connected]);
  
  const handleRefreshStatus = () => {
    if (!connected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to check verification status",
      });
      return;
    }
    
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newStatus = Math.random() > 0.5 ? "verified" : "pending";
      setIdentityStatus(newStatus as "verified" | "not-verified" | "pending");
      setIdentity(prev => ({
        ...prev,
        verificationStatus: newStatus as "verified" | "not-verified" | "pending",
        verifiedDate: newStatus === "verified" ? new Date() : undefined,
      }));
      
      toast.success("Status updated", {
        description: `Your verification status is now: ${newStatus}`,
      });
      
      setIsRefreshing(false);
    }, 2000);
  };
  
  const RecentActivityItem = ({ date, action, status }: { date: Date; action: string; status: "pending" | "success" | "error" }) => (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <StatusIndicator status={status} showText={false} />
      <div className="flex-grow">
        <p className="text-sm">{action}</p>
        <p className="text-xs text-gray-500">{date.toLocaleString()}</p>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-web3-darker relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-web3-purple/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 rounded-full bg-web3-blue/5 blur-3xl pointer-events-none"></div>
      
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
                    <h2 className="text-xl font-medium mb-1">Identity Verification Status</h2>
                    <div className="flex items-center">
                      <StatusIndicator status={identityStatus} />
                      {identityStatus === "verified" && (
                        <span className="ml-2 text-xs text-gray-400">
                          Verified on blockchain
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AnimatedButton 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRefreshStatus}
                      isLoading={isRefreshing}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Refresh Status</span>
                    </AnimatedButton>
                    
                    {identityStatus !== "verified" && (
                      <Link to="/verify">
                        <AnimatedButton variant="neon" size="sm">
                          <span>Verify Now</span>
                        </AnimatedButton>
                      </Link>
                    )}
                  </div>
                </div>
                
                {connected ? (
                  <IdentityCard identity={identity} />
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Wallet Not Connected</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Connect your wallet to view your identity verification status and details
                    </p>
                    <Link to="/">
                      <AnimatedButton variant="neon">
                        <span>Connect Wallet</span>
                      </AnimatedButton>
                    </Link>
                  </div>
                )}
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-6">
                <h2 className="text-xl font-medium mb-4">Blockchain Verification</h2>
                
                <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Verification Hash</span>
                    {connected && identityStatus === "verified" ? (
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-web3-blue hover:text-web3-blue/80 transition-colors flex items-center gap-1 text-xs"
                      >
                        <span>View on Explorer</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500">Not available</span>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    {connected && identityStatus === "verified" ? (
                      <p className="font-mono text-xs truncate">
                        0x7c3b4fc6b48e9d8c5e5c3df96e47daec8b8a231a8c7ff6c3a1d2e04a8b84d9c8
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        No verification record found on blockchain
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-web3-teal" />
                      <span>Personal Information</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      {identityStatus === "verified" 
                        ? "Personal information verified and securely stored" 
                        : "Pending verification"}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-black/20 rounded-lg border border-white/10">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-web3-teal" />
                      <span>Biometric Verification</span>
                    </h3>
                    <p className="text-xs text-gray-400">
                      {identityStatus === "verified" 
                        ? "Biometric data verified and securely hashed" 
                        : "Pending verification"}
                    </p>
                  </div>
                </div>
              </GlassMorphismCard>
            </div>
            
            <div className="space-y-6">
              <GlassMorphismCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Recent Activity</h2>
                  <Bell className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="space-y-1">
                  <RecentActivityItem 
                    date={new Date(Date.now() - 1000 * 60 * 5)} 
                    action="Identity verification submitted" 
                    status="success" 
                  />
                  <RecentActivityItem 
                    date={new Date(Date.now() - 1000 * 60 * 10)} 
                    action="Biometric scan completed" 
                    status="success" 
                  />
                  <RecentActivityItem 
                    date={new Date(Date.now() - 1000 * 60 * 15)} 
                    action="Wallet connection established" 
                    status="success" 
                  />
                  <RecentActivityItem 
                    date={new Date(Date.now() - 1000 * 60 * 60)} 
                    action="Blockchain attestation pending" 
                    status="pending" 
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-web3-blue hover:text-web3-blue/80 transition-colors">
                    View All Activity
                  </a>
                </div>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-6">
                <h2 className="text-xl font-medium mb-4">Connected Apps</h2>
                {connected ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                        D
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">DefiProtocol</h3>
                        <p className="text-xs text-gray-500">Connected on {new Date().toLocaleDateString()}</p>
                      </div>
                      <StatusIndicator status="verified" showText={false} />
                    </div>
                    
                    <div className="p-3 bg-black/20 rounded-lg border border-white/10 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        N
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">NFT Marketplace</h3>
                        <p className="text-xs text-gray-500">Connected on {new Date().toLocaleDateString()}</p>
                      </div>
                      <StatusIndicator status="verified" showText={false} />
                    </div>
                    
                    <div className="text-center mt-4">
                      <a href="#" className="text-sm text-web3-blue hover:text-web3-blue/80 transition-colors">
                        Manage Connected Apps
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">
                      Connect your wallet to view connected applications
                    </p>
                  </div>
                )}
              </GlassMorphismCard>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-gray-400">AuraVerify</span>
            </div>
            
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AuraVerify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
