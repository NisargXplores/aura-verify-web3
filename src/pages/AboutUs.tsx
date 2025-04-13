
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, UserRound, BarChart, Users, Target, Lightbulb, GraduationCap, Compass } from "lucide-react";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AboutUs = () => {
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
              <Link to="/" className="px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5">Home</Link>
              <Link to="/about" className="px-3 py-2 text-sm font-medium rounded-md bg-white/10 text-white">About Us</Link>
              <Link to="/verify" className="px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5">Verify</Link>
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5">Dashboard</Link>
            </nav>
          </div>
        </div>
      </div>

      <main className="flex-grow px-4 py-12 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About BlockVerify
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Our mission is to revolutionize digital identity verification using blockchain technology.
            </p>
          </div>

          <div className="mb-16">
            <GlassMorphismCard className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-heading text-white">Our Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 mb-4">
                    BlockVerify was founded in 2025 with a vision to solve the growing challenges of digital identity verification in an increasingly decentralized world. Our team of blockchain enthusiasts and security experts came together to build a platform that puts users in control of their identity while ensuring the highest level of security and privacy.
                  </p>
                  <p className="text-gray-300">
                    We leverage the power of Solana blockchain to create a seamless, secure, and transparent verification system that eliminates the vulnerabilities of traditional centralized identity systems.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-60 w-60">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                      <Shield className="h-24 w-24 text-white" />
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal opacity-30 blur-sm"></div>
                  </div>
                </div>
              </div>
            </GlassMorphismCard>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-heading text-center text-white">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassMorphismCard className="p-6">
                <div className="h-12 w-12 rounded-lg bg-web3-purple/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-web3-purple" />
                </div>
                <h3 className="text-xl font-medium mb-2 font-heading">Security First</h3>
                <p className="text-gray-400 text-sm">
                  Our platform uses advanced encryption and blockchain technology to ensure your identity data remains secure and tamper-proof.
                </p>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-6">
                <div className="h-12 w-12 rounded-lg bg-web3-blue/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-web3-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2 font-heading">User Control</h3>
                <p className="text-gray-400 text-sm">
                  You maintain full ownership of your identity data and control who can access it and for what purpose.
                </p>
              </GlassMorphismCard>
              
              <GlassMorphismCard className="p-6">
                <div className="h-12 w-12 rounded-lg bg-web3-teal/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-web3-teal" />
                </div>
                <h3 className="text-xl font-medium mb-2 font-heading">Scalability</h3>
                <p className="text-gray-400 text-sm">
                  Built on Solana, our platform delivers high-speed verifications with minimal transaction costs.
                </p>
              </GlassMorphismCard>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 font-heading text-center text-white">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <GlassMorphismCard key={member.name} className="p-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-web3-purple/20 text-white text-lg">{member.fallback}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-medium mb-1 font-heading">{member.name}</h3>
                  <p className="text-web3-purple text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </GlassMorphismCard>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <GlassMorphismCard className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-heading text-white">Our Vision & Mission</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-lg bg-web3-purple/10 flex items-center justify-center mr-4">
                      <Target className="h-5 w-5 text-web3-purple" />
                    </div>
                    <h3 className="text-xl font-medium font-heading">Vision</h3>
                  </div>
                  <p className="text-gray-300 mb-6 ml-14">
                    To create a world where individuals have full control over their digital identities while enabling secure and frictionless interactions across the digital landscape.
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-lg bg-web3-blue/10 flex items-center justify-center mr-4">
                      <Compass className="h-5 w-5 text-web3-blue" />
                    </div>
                    <h3 className="text-xl font-medium font-heading">Mission</h3>
                  </div>
                  <p className="text-gray-300 ml-14">
                    To build and maintain the most trusted, secure, and user-centric blockchain identity verification platform that empowers individuals and organizations in the Web3 ecosystem.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-lg bg-web3-teal/10 flex items-center justify-center mr-4">
                      <Lightbulb className="h-5 w-5 text-web3-teal" />
                    </div>
                    <h3 className="text-xl font-medium font-heading">Innovation</h3>
                  </div>
                  <p className="text-gray-300 mb-6 ml-14">
                    We continuously explore new technologies and methodologies to enhance the security, usability, and effectiveness of our identity verification solutions.
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center mr-4">
                      <GraduationCap className="h-5 w-5 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-medium font-heading">Education</h3>
                  </div>
                  <p className="text-gray-300 ml-14">
                    We are committed to educating users about the importance of secure identity management and the benefits of blockchain-based verification systems.
                  </p>
                </div>
              </div>
            </GlassMorphismCard>
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
              <span className="text-sm text-white/70">BlockVerify © 2025</span>
            </div>
            <div className="text-sm text-white/50">Built with 💜 by Team BlockVerify</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
