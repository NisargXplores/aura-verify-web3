
import React from "react";

type ButtonVariant = "default" | "outline" | "neon";
type ButtonSize = "default" | "sm" | "lg";

interface AnimatedButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({
  variant = "default",
  size = "default",
  children,
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}: AnimatedButtonProps) => {
  
  const getBaseStyles = () => {
    let styles = "relative inline-flex items-center justify-center transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded-md ";
    
    // Size styles
    if (size === "sm") styles += "px-3 py-1 text-sm ";
    else if (size === "lg") styles += "px-6 py-3 text-lg ";
    else styles += "px-4 py-2 text-base ";
    
    // Variant styles
    if (variant === "outline") {
      styles += "border border-white/20 bg-transparent hover:bg-white/10 text-white focus:ring-white/30 ";
    } else if (variant === "neon") {
      styles += "border border-web3-purple/20 bg-web3-purple/10 text-white hover:bg-web3-purple/20 focus:ring-web3-purple/30 ";
    } else {
      styles += "bg-white/10 hover:bg-white/20 text-white focus:ring-white/30 ";
    }
    
    // Disabled styles
    if (disabled || isLoading) {
      styles += "opacity-60 cursor-not-allowed ";
    }
    
    return styles + className;
  };
  
  return (
    <button
      type={type}
      className={getBaseStyles()}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      <span className={isLoading ? "invisible" : ""}>{children}</span>
      
      {variant === "neon" && !disabled && !isLoading && (
        <div className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-web3-purple via-web3-blue to-web3-teal opacity-30 blur-sm -z-10 group-hover:opacity-50 transition-opacity"></div>
      )}
    </button>
  );
};

export default AnimatedButton;
