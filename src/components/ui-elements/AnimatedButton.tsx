
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "neon";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const AnimatedButton = ({
  children,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  ...props
}: AnimatedButtonProps) => {
  const getVariantClasses = () => {
    if (variant === "neon") {
      return "bg-black/20 border border-web3-purple/30 text-white relative overflow-hidden transition-all duration-300 hover:bg-black/30 hover:border-web3-purple/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-web3-purple/0 before:via-web3-purple/30 before:to-web3-purple/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500 before:ease-in-out";
    }
    return "";
  };

  return (
    <Button
      variant={variant === "neon" ? "outline" : variant}
      size={size}
      className={cn(
        "relative font-medium transition-all duration-300",
        getVariantClasses(),
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default AnimatedButton;
