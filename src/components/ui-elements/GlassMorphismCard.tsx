
import React from "react";
import { cn } from "@/lib/utils";

interface GlassMorphismCardProps {
  children: React.ReactNode;
  className?: string;
  neonBorder?: boolean;
  hoverEffect?: boolean;
}

const GlassMorphismCard = ({
  children,
  className,
  neonBorder = false,
  hoverEffect = false,
}: GlassMorphismCardProps) => {
  return (
    <div
      className={cn(
        "glass-morphism rounded-xl p-4",
        neonBorder && "neon-border",
        hoverEffect && "transition-all duration-300 hover:bg-black/30 hover:shadow-[0_4px_24px_-2px_rgba(139,92,246,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphismCard;
