
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, UserRound, Wallet, Users, Target, Lightbulb, GraduationCap, Compass } from "lucide-react";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import WalletConnectionUI from "@/components/wallet/WalletConnectionUI";
import { useWallet } from "@/context/WalletContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const { connected } = useWallet();

  const teamMembers = [
    {
      name: "Parth Gohil",
      role: "Developer",
      avatar: "/team-member-1.png",
      fallback: "PG",
      bio: "Blockchain enthusiast with expertise in Solana development and identity verification systems."
    },
    {
      name: "Devang Bhavsar",
      role: "Developer",
      avatar: "/team-member-2.png",
      fallback: "DB",
      bio: "Full-stack developer specializing in Web3 technologies and secure authentication systems."
    },
    {
      name: "Nisarg Patel",
      role: "Developer",
      avatar: "/team-member-3.png",
      fallback: "NP",
      bio: "Smart contract specialist with a focus on secure and efficient blockchain implementations."
    },
    {
      name: "Ashutosh Bhagat",
      role: "Developer",
      avatar: "/team-member-4.png",
      fallback: "AB",
      bio: "Front-end developer creating intuitive and secure user interfaces for blockchain applications."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-web3-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-web3-purple/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 rounded-full bg-web3-blue/5 blur-3xl pointer-events-none"></div>

      <div className="w-full py-6 px-4 md:px-6 z-10 border-b border-white/5 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal opacity-30 blur-sm animate-pulse-glow"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold gradient-text-primary tracking-tight font-heading">BlockVerify</h1>
              <p className="text-xs text-gray-400">Blockchain Identity Verification</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-2">
              <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md bg-white/10 text-white">Home</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5">About Us</Link>
              <Link to="/verify" className="px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5">Verify</Link>
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5">Dashboard</Link>
            </nav>
            <WalletConnectionUI minimal />
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 relative z-10">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Decentralized Identity<br />Verification Platform
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
              <h3 className="text-xl font-medium mb-2 font-heading">Connect Wallet</h3>
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
              <h3 className="text-xl font-medium mb-2 font-heading">Verify Identity</h3>
              <p className="text-gray-400 text-sm mb-4">
                Submit your information and complete biometric verification.
              </p>
              <div className="mt-auto">
                <Link to="/verify">
                  <AnimatedButton variant="neon" className="w-full" disabled={!connected}>
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
              <h3 className="text-xl font-medium mb-2 font-heading">Access Dashboard</h3>
              <p className="text-gray-400 text-sm mb-4">
                View your verification status and manage your digital identity.
              </p>
              <div className="mt-auto">
                <Link to="/dashboard">
                  <AnimatedButton variant="outline" className="w-full">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </Link>
              </div>
            </GlassMorphismCard>
          </div>

          {/* About Us, Team, and Mission & Vision sections here */}
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-white/70">BlockVerify © 2025</span>
            </div>
            <div className="text-sm text-white/50">Built with 💜 by Team BlockVerify</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
