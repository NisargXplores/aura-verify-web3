
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Fingerprint, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import VerificationForm from "@/components/identity/VerificationForm";
import BiometricScan from "@/components/identity/BiometricScan";
import TransactionStatus from "@/components/transactions/TransactionStatus";
import WalletConnectionUI from "@/components/wallet/WalletConnectionUI";
import { useWallet } from "@/context/WalletContext";

enum VerificationStep {
  CONNECT_WALLET,
  PERSONAL_INFO,
  BIOMETRIC_VERIFICATION,
  TRANSACTION_CONFIRMATION,
  COMPLETED,
}

const VerifyIdentity = () => {
  const { connected } = useWallet();
  const [currentStep, setCurrentStep] = useState<VerificationStep>(
    connected ? VerificationStep.PERSONAL_INFO : VerificationStep.CONNECT_WALLET
  );

  // Update step when wallet connection changes
  React.useEffect(() => {
    if (connected && currentStep === VerificationStep.CONNECT_WALLET) {
      setCurrentStep(VerificationStep.PERSONAL_INFO);
    }
  }, [connected, currentStep]);

  const handlePersonalInfoSubmit = () => {
    setCurrentStep(VerificationStep.BIOMETRIC_VERIFICATION);
  };

  const handleBiometricComplete = () => {
    setCurrentStep(VerificationStep.TRANSACTION_CONFIRMATION);
  };

  const handleTransactionComplete = () => {
    setCurrentStep(VerificationStep.COMPLETED);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case VerificationStep.CONNECT_WALLET:
        return <WalletConnectionUI />;
      
      case VerificationStep.PERSONAL_INFO:
        return <VerificationForm onSubmitSuccess={handlePersonalInfoSubmit} />;
      
      case VerificationStep.BIOMETRIC_VERIFICATION:
        return <BiometricScan onScanComplete={handleBiometricComplete} />;
      
      case VerificationStep.TRANSACTION_CONFIRMATION:
        return (
          <div className="space-y-6">
            <TransactionStatus 
              status="pending" 
              autoChange 
              message="Publishing your identity attestation to the blockchain" 
              txHash="AuR8HMaNKXxUz8qFDWPyZMk8DhQcFYKAT6SLjohzNrUZ" 
            />
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Please wait while we confirm your transaction
              </p>
            </div>
          </div>
        );
      
      case VerificationStep.COMPLETED:
        return (
          <GlassMorphismCard neonBorder className="w-full max-w-md mx-auto p-6 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-xl font-medium mt-6 mb-2">Verification Completed</h3>
            <p className="text-gray-400 mb-6">
              Your identity has been successfully verified and secured on the blockchain
            </p>
            <Link to="/dashboard">
              <AnimatedButton variant="neon" className="w-full">
                <span>Go to Dashboard</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
          </GlassMorphismCard>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-web3-darker relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 -left-24 w-96 h-96 rounded-full bg-web3-purple/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 -right-24 w-96 h-96 rounded-full bg-web3-blue/5 blur-3xl pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 relative z-10">
        <div className="w-full max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text-primary">Identity Verification</h1>
            <p className="text-gray-400 mt-2">
              Complete the verification process to secure your identity on the blockchain
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[
                { icon: <Wallet />, label: "Connect" },
                { icon: <UserRound />, label: "Details" },
                { icon: <Fingerprint />, label: "Biometrics" },
                { icon: <CheckCircle />, label: "Confirm" },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      index <= currentStep 
                        ? "bg-web3-purple/20 text-web3-purple" 
                        : "bg-gray-800/50 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span 
                    className={`text-xs mt-2 ${
                      index <= currentStep ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/5">
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

// To properly import the icons used in the steps
import { Wallet, UserRound, CheckCircle, Shield } from "lucide-react";

export default VerifyIdentity;
