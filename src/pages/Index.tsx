
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, UserRound, Wallet, Users, Target, Lightbulb, GraduationCap, Compass } from "lucide-react";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
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
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-web3-purple/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 rounded-full bg-web3-blue/5 blur-3xl pointer-events-none"></div>
      
      <Navbar />
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 relative z-10">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
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
              <h3 className="text-xl font-medium mb-2 font-heading">Access Dashboard</h3>
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
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto text-center md:text-left mb-24">
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
          
          {/* About Us Section */}
          <section id="about" className="mb-24 scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">About BlockVerify</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal mx-auto rounded-full"></div>
            </div>
            
            <GlassMorphismCard className="p-8 md:p-12" neonBorder={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4 font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Redefining Digital Identity</h3>
                  <p className="text-gray-300 mb-4">
                    Founded in 2023, BlockVerify is pioneering a new approach to digital identity verification 
                    using blockchain technology. We believe that individuals should have complete control over 
                    their personal data while still being able to prove their identity securely.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Our platform leverages the power of the Solana blockchain to create tamper-proof, 
                    verifiable credentials that give you the freedom to share only what you want, 
                    when you want, with whom you want.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                      <div className="h-10 w-10 rounded-lg bg-web3-purple/20 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-web3-purple" />
                      </div>
                      <span className="text-sm font-medium">Privacy First</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                      <div className="h-10 w-10 rounded-lg bg-web3-blue/20 flex items-center justify-center">
                        <Compass className="h-5 w-5 text-web3-blue" />
                      </div>
                      <span className="text-sm font-medium">Web3 Native</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                      <div className="h-10 w-10 rounded-lg bg-web3-teal/20 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-web3-teal" />
                      </div>
                      <span className="text-sm font-medium">Future Ready</span>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2 relative">
                  <div className="rounded-2xl overflow-hidden h-64 md:h-80 neo-blur hologram-effect">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal mx-auto flex items-center justify-center">
                          <Shield className="h-12 w-12 text-white" />
                        </div>
                        <h4 className="text-xl font-bold mt-4 gradient-text-primary font-heading">BlockVerify</h4>
                        <p className="text-sm text-gray-400">Est. 2023</p>
                      </div>
                    </div>
                    <div className="scan-line animation-scanning"></div>
                  </div>
                </div>
              </div>
            </GlassMorphismCard>
          </section>
          
          {/* Team Members Section */}
          <section id="team" className="mb-24 scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Our Team</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                Meet the innovators behind BlockVerify who are passionate about creating a more secure and private digital identity ecosystem.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {teamMembers.map((member, index) => (
                <GlassMorphismCard 
                  key={index} 
                  className="p-6 text-center"
                  hoverEffect={true}
                >
                  <div className="mb-4 relative mx-auto">
                    <Avatar className="h-24 w-24 mx-auto border-2 border-web3-purple/30">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-web3-darker text-lg font-medium">{member.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-web3-purple to-web3-blue flex items-center justify-center text-white text-xs">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 font-heading">{member.name}</h3>
                  <p className="text-sm text-web3-purple mb-3">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.bio}</p>
                </GlassMorphismCard>
              ))}
            </div>
          </section>
          
          {/* Mission and Vision Section */}
          <section id="mission" className="mb-24 scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Mission & Vision</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassMorphismCard className="p-8" neonBorder={true}>
                <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-web3-purple to-web3-blue flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center md:text-left font-heading bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Our Mission</h3>
                <p className="text-gray-300 mb-4">
                  To empower individuals with self-sovereign digital identities that are secure, 
                  portable, and under their complete control.
                </p>
                <p className="text-gray-300">
                  We're building a world where identity verification is seamless, trustless, and 
                  respects the fundamental right to privacy. Our blockchain-based solution eliminates 
                  the need for centralized identity providers and gives power back to the individual.
                </p>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-8" neonBorder={true}>
                <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-web3-blue to-web3-teal flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center md:text-left font-heading bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">Our Vision</h3>
                <p className="text-gray-300 mb-4">
                  A future where digital identity is as trusted and portable as your physical ID, 
                  but with enhanced privacy protections and user control.
                </p>
                <p className="text-gray-300">
                  We envision a Web3 ecosystem where identity verification is frictionless across 
                  applications, organizations can instantly verify credentials without storing 
                  personal data, and individuals have complete transparency over how their 
                  information is used.
                </p>
              </GlassMorphismCard>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-gray-400">BlockVerify</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#team" className="text-sm text-gray-400 hover:text-white transition-colors">Team</a>
              <a href="#mission" className="text-sm text-gray-400 hover:text-white transition-colors">Mission</a>
            </div>
            
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BlockVerify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
