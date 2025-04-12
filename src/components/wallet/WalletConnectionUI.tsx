
import React from "react";
import { Wallet } from "lucide-react";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import { useWallet } from "@/context/WalletContext";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";

interface WalletConnectionUIProps {
  minimal?: boolean;
}

const WalletConnectionUI = ({ minimal = false }: WalletConnectionUIProps) => {
  const { connected, connecting, connectWallet, disconnectWallet, publicKey } = useWallet();

  if (minimal) {
    return (
      <div className="flex items-center gap-2">
        {connected ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400">
                {publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : "Connected"}
              </span>
            </div>
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
              className="text-xs h-7 px-2 py-0"
            >
              Disconnect
            </AnimatedButton>
          </div>
        ) : (
          <AnimatedButton
            variant="neon"
            size="sm"
            onClick={connectWallet}
            isLoading={connecting}
            className="text-xs"
          >
            <Wallet className="mr-1 h-3 w-3" />
            Connect
          </AnimatedButton>
        )}
      </div>
    );
  }

  return (
    <GlassMorphismCard className="w-full max-w-sm mx-auto text-center p-6">
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full bg-web3-purple/10 mx-auto flex items-center justify-center">
          <Wallet className="h-8 w-8 text-web3-purple" />
        </div>
        <h3 className="mt-4 text-xl font-medium gradient-text-primary">
          {connected ? "Wallet Connected" : "Connect Your Wallet"}
        </h3>
        <p className="mt-2 text-sm text-gray-400">
          {connected
            ? "Your wallet is connected to AuraVerify"
            : "Connect your Solana wallet to continue with identity verification"}
        </p>
      </div>

      {connected ? (
        <div className="space-y-4">
          <div className="p-3 bg-black/30 rounded-lg border border-web3-blue/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Wallet Address</span>
              <span className="font-mono text-sm break-all">{publicKey && `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-400">Network</span>
              <span className="font-medium">Solana Mainnet</span>
            </div>
          </div>
          
          <AnimatedButton
            variant="outline"
            className="w-full border-web3-purple/20 hover:border-web3-purple/40"
            onClick={disconnectWallet}
          >
            Disconnect Wallet
          </AnimatedButton>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 mb-4">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
          
          <AnimatedButton
            variant="neon"
            className="w-full"
            onClick={connectWallet}
            isLoading={connecting}
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </AnimatedButton>
          
          <div className="flex items-center justify-center gap-2">
            <img
              src="/phantom-icon.png"
              alt="Phantom"
              className="h-6 w-6 opacity-70"
              onError={(e) => {
                e.currentTarget.src = "https://phantom.app/img/phantom-logo.svg";
              }}
            />
            <span className="text-xs text-gray-500">
              Phantom wallet recommended
            </span>
          </div>
        </div>
      )}
    </GlassMorphismCard>
  );
};

export default WalletConnectionUI;
