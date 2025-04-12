
import React from "react";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import StatusIndicator from "@/components/ui-elements/StatusIndicator";
import { format } from "date-fns";
import { useWallet } from "@/context/WalletContext";

interface UserIdentity {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  idNumber: string;
  verificationStatus: "verified" | "not-verified" | "pending";
  verifiedDate?: Date;
}

interface IdentityCardProps {
  identity: UserIdentity;
}

const IdentityCard = ({ identity }: IdentityCardProps) => {
  const { publicKey } = useWallet();
  
  return (
    <GlassMorphismCard
      neonBorder
      className="w-full max-w-md mx-auto relative overflow-hidden hologram-effect py-6"
    >
      <div className="absolute top-3 right-3">
        <StatusIndicator status={identity.verificationStatus} />
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold gradient-text-primary">Identity Credentials</h3>
      </div>
      
      <div className="space-y-4 px-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Full Name</span>
          <span className="font-medium">{identity.fullName}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Email</span>
          <span className="font-medium">{identity.email}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Date of Birth</span>
          <span className="font-medium">{format(identity.dateOfBirth, "PP")}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">ID Number</span>
          <span className="font-medium">{identity.idNumber}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Wallet Address</span>
          <span className="font-medium text-xs md:text-sm">
            {publicKey ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}` : 'Not connected'}
          </span>
        </div>
        
        {identity.verificationStatus === "verified" && identity.verifiedDate && (
          <div className="flex items-center justify-between pb-2">
            <span className="text-sm text-gray-400">Verified On</span>
            <span className="font-medium">{format(identity.verifiedDate, "PPp")}</span>
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-radial from-web3-purple/10 to-transparent"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-radial from-web3-blue/10 to-transparent"></div>
      
      <div className="mt-6 text-center">
        <div className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs text-gray-400 border border-white/5">
          Secured with Web3 Identity Protocol
        </div>
      </div>
    </GlassMorphismCard>
  );
};

export default IdentityCard;
