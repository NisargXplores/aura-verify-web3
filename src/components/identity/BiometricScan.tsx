
import React, { useState } from "react";
import { Fingerprint } from "lucide-react";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import { toast } from "sonner";

interface BiometricScanProps {
  onScanComplete: (success: boolean) => void;
  type?: "fingerprint" | "face";
}

const BiometricScan = ({ 
  onScanComplete, 
  type = "fingerprint" 
}: BiometricScanProps) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanning(false);
            onScanComplete(true);
            toast.success("Biometric scan completed");
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);
  };

  return (
    <GlassMorphismCard 
      neonBorder 
      className="w-full max-w-xs mx-auto py-6 text-center relative overflow-hidden"
    >
      <h3 className="text-lg font-medium mb-4 gradient-text-primary">
        {type === "fingerprint" ? "Fingerprint Scan" : "Face Recognition"}
      </h3>
      
      <div 
        className={`
          w-36 h-36 mx-auto relative rounded-full 
          flex items-center justify-center
          border-2 border-web3-purple/30
          ${scanning ? "bg-web3-purple/10" : "bg-black/20"}
          transition-all duration-300
        `}
        onClick={handleScan}
      >
        {type === "fingerprint" ? (
          <Fingerprint 
            size={64} 
            className={`
              text-web3-blue/70 transition-opacity duration-300
              ${scanning ? "animate-pulse" : "cursor-pointer hover:text-web3-blue"}
            `}
          />
        ) : (
          <div 
            className={`
              w-20 h-20 rounded-full border-2 border-dashed border-web3-blue/50
              flex items-center justify-center transition-opacity duration-300
              ${scanning ? "animate-pulse" : "cursor-pointer hover:border-web3-blue"}
            `}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 className="text-web3-blue/70">
              <path d="M12 9a4 4 0 100 8 4 4 0 000-8z" />
              <path d="M12 15c5 0 8-3 8-7a4 4 0 00-8 0c0 4 3 7 8 7" />
            </svg>
          </div>
        )}
        
        {scanning && (
          <>
            <div className="scan-line animate-scanning"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-web3-purple/20 transition-all duration-200"
                style={{ height: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
      
      <p className="mt-4 text-sm text-gray-400">
        {scanning 
          ? "Processing... Please don't move"
          : `Tap on the ${type === "fingerprint" ? "fingerprint" : "camera"} to scan`
        }
      </p>
      
      {scanning && (
        <div className="w-full mt-4">
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">{progress}% Complete</p>
        </div>
      )}
    </GlassMorphismCard>
  );
};

export default BiometricScan;
