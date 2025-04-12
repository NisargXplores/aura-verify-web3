
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, UserRound, Wallet } from "lucide-react";
import Header from "@/components/layout/Header";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import WalletConnectionUI from "@/components/wallet/WalletConnectionUI";
import { useWallet } from "@/context/WalletContext";

const Index = () => {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-web3-darker relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-web3-purple/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 rounded-full bg-web3-blue/5 blur-3xl pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 relative z-10">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-primary leading-tight">
              Decentralized Identity
              <br />
              Verification Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Secure, private, and blockchain-powered identity verification for the Web3 ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <GlassMorphismCard className="p-6 md:p-8">
              <div className="h-12 w-12 rounded-lg bg-web3-purple/10 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-web3-purple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Connect Wallet</h3>
              <p className="text-gray-400 text-sm mb-4">
                Securely connect your Solana wallet to begin the verification process.
              </p>
              <div className="mt-auto">
                {!connected && <WalletConnectionUI minimal />}
              </div>
            </GlassMorphismCard>
            
            <GlassMorphismCard className="p-6 md:p-8">
              <div className="h-12 w-12 rounded-lg bg-web3-blue/10 flex items-center justify-center mb-4">
                <UserRound className="h-6 w-6 text-web3-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Verify Identity</h3>
              <p className="text-gray-400 text-sm mb-4">
                Submit your information and complete biometric verification.
              </p>
              <div className="mt-auto">
                <Link to="/verify">
                  <AnimatedButton 
                    variant="neon" 
                    className="w-full"
                    disabled={!connected}
                  >
                    <span>Start Verification</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </GlassMorphismCard>
            
            <GlassMorphismCard className="p-6 md:p-8">
              <div className="h-12 w-12 rounded-lg bg-web3-teal/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-web3-teal" />
              </div>
              <h3 className="text-xl font-medium mb-2">Access Dashboard</h3>
              <p className="text-gray-400 text-sm mb-4">
                View your verification status and manage your digital identity.
              </p>
              <div className="mt-auto">
                <Link to="/dashboard">
                  <AnimatedButton 
                    variant="outline" 
                    className="w-full"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </GlassMorphismCard>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto text-center md:text-left">
            <Link to="/verify" className="w-full md:w-auto">
              <AnimatedButton 
                variant="neon" 
                size="lg"
                className="w-full md:w-auto"
                disabled={!connected}
              >
                {connected ? "Start Verification" : "Connect Wallet First"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
            
            <Link to="/dashboard" className="w-full md:w-auto">
              <AnimatedButton 
                variant="outline"
                size="lg"
                className="w-full md:w-auto"
              >
                Explore Dashboard
              </AnimatedButton>
            </Link>
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
              <span className="text-sm text-gray-400">AuraVerify</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
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

export default Index;
