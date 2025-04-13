
import React, { useEffect, useState } from "react";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import StatusIndicator from "@/components/ui-elements/StatusIndicator";
import { format } from "date-fns";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/integrations/supabase/client";

interface IdentityCardProps {
  txSignature?: string;
}

const IdentityCard = ({ txSignature }: IdentityCardProps) => {
  const { publicKey } = useWallet();
  const [identityData, setIdentityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchIdentityData = async () => {
      setLoading(true);
      try {
        const userId = await supabase.auth.getUser().then(res => res.data.user?.id);
        if (!userId) {
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('identity_verifications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching identity data:", error);
          setLoading(false);
          return;
        }
        
        if (data) {
          setIdentityData(data);
        }
      } catch (error) {
        console.error("Error in fetchIdentityData:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIdentityData();
  }, [txSignature]);
  
  if (loading) {
    return (
      <GlassMorphismCard className="w-full max-w-md mx-auto p-6">
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-web3-purple/20 border-t-web3-purple rounded-full"></div>
        </div>
      </GlassMorphismCard>
    );
  }
  
  if (!identityData) {
    return (
      <GlassMorphismCard className="w-full max-w-md mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-gray-400">No identity data found</p>
        </div>
      </GlassMorphismCard>
    );
  }
  
  return (
    <GlassMorphismCard
      neonBorder
      className="w-full max-w-md mx-auto relative overflow-hidden hologram-effect py-6"
    >
      <div className="absolute top-3 right-3">
        <StatusIndicator status={identityData.verification_status} />
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold gradient-text-primary">Identity Credentials</h3>
      </div>
      
      <div className="space-y-4 px-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Full Name</span>
          <span className="font-medium">{identityData.full_name}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Email</span>
          <span className="font-medium">{identityData.email}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Date of Birth</span>
          <span className="font-medium">{new Date(identityData.date_of_birth).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">ID Number</span>
          <span className="font-medium">{identityData.id_number}</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm text-gray-400">Wallet Address</span>
          <span className="font-medium text-xs md:text-sm">
            {publicKey ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}` : 'Not connected'}
          </span>
        </div>
        
        {identityData.verification_status === "verified" && identityData.transaction_signature && (
          <div className="flex items-center justify-between pb-2">
            <span className="text-sm text-gray-400">Verified On</span>
            <span className="font-medium">{new Date(identityData.updated_at).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-radial from-web3-purple/10 to-transparent"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-radial from-web3-blue/10 to-transparent"></div>
      
      <div className="mt-6 text-center">
        <div className="inline-block px-3 py-1 bg-black/30 rounded-full text-xs text-gray-400 border border-white/5">
          Secured with AuraChain Identity Protocol
        </div>
      </div>
    </GlassMorphismCard>
  );
};

export default IdentityCard;
