
import React from "react";
import { useWallet } from "@/context/WalletContext";
import WalletConnectionUI from "@/components/wallet/WalletConnectionUI";
import { CheckCircle, Info } from "lucide-react";

const Header = () => {
  const { connected } = useWallet();
  
  return (
    <header className="w-full py-4 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal opacity-30 blur-sm animate-pulse-glow"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold gradient-text-primary tracking-tight">AuraVerify</h1>
              <p className="text-xs text-gray-400">Web3 Identity Verification</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="hidden md:flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </a>
          
          <WalletConnectionUI minimal />
        </div>
      </div>
    </header>
  );
};

export default Header;
