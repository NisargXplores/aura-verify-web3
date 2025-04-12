import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Connection, PublicKey } from "@solana/web3.js";

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  wallet: any | null;
  publicKey: string | null;
  balance: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  wallet: null,
  publicKey: null,
  balance: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  refreshBalance: async () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [wallet, setWallet] = useState<any | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

  const getPhantomWallet = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const phantom = window.phantom?.solana;
      if (phantom?.isPhantom) {
        return phantom;
      }
    }
    return null;
  };

  const refreshBalance = async () => {
    if (connected && publicKey) {
      try {
        const balanceInLamports = await connection.getBalance(new PublicKey(publicKey));
        setBalance(balanceInLamports / 1000000000); // Convert lamports to SOL
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  const connectWallet = async () => {
    try {
      setConnecting(true);
      const phantom = getPhantomWallet();
      
      if (!phantom) {
        toast.error("Phantom wallet not found", {
          description: "Please install the Phantom wallet extension first.",
        });
        setConnecting(false);
        return;
      }

      try {
        const response = await phantom.connect();
        const publicKey = response.publicKey.toString();
        
        setWallet(phantom);
        setPublicKey(publicKey);
        setConnected(true);
        
        toast.success("Wallet connected successfully!", {
          description: `Connected to ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
        });
        
        const balanceInLamports = await connection.getBalance(response.publicKey);
        setBalance(balanceInLamports / 1000000000); // Convert lamports to SOL
        
        localStorage.setItem("walletConnected", "true");
      } catch (error) {
        console.error("Connection error:", error);
        toast.error("Failed to connect wallet", {
          description: "There was an error connecting to your wallet.",
        });
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    if (wallet) {
      wallet.disconnect();
    }
    setWallet(null);
    setPublicKey(null);
    setBalance(null);
    setConnected(false);
    localStorage.removeItem("walletConnected");
    toast.info("Wallet disconnected");
  };

  useEffect(() => {
    const checkConnectionStatus = async () => {
      const wasConnected = localStorage.getItem("walletConnected") === "true";
      if (wasConnected) {
        connectWallet();
      }
    };

    checkConnectionStatus();
  }, []);

  useEffect(() => {
    const handleAccountChange = () => {
      if (connected) {
        refreshBalance();
      }
    };

    if (connected && wallet) {
      wallet.on('accountChanged', handleAccountChange);
    }

    return () => {
      if (wallet) {
        wallet.off('accountChanged', handleAccountChange);
      }
    };
  }, [connected, wallet]);

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        wallet,
        publicKey,
        balance,
        connectWallet,
        disconnectWallet,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
