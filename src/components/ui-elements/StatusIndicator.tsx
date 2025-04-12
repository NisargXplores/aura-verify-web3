
import { cn } from "@/lib/utils";

type StatusType = "pending" | "success" | "error" | "verified" | "not-verified";

interface StatusIndicatorProps {
  status: StatusType;
  showText?: boolean;
  className?: string;
}

const StatusIndicator = ({
  status,
  showText = true,
  className,
}: StatusIndicatorProps) => {
  const statusConfig = {
    pending: {
      color: "bg-yellow-500",
      pulseEffect: true,
      text: "Pending",
    },
    success: {
      color: "bg-green-500",
      pulseEffect: false,
      text: "Success",
    },
    error: {
      color: "bg-red-500",
      pulseEffect: false,
      text: "Failed",
    },
    verified: {
      color: "bg-web3-teal",
      pulseEffect: false,
      text: "Verified",
    },
    "not-verified": {
      color: "bg-gray-500",
      pulseEffect: false,
      text: "Not Verified",
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "h-3 w-3 rounded-full",
          config.color,
          config.pulseEffect && "animate-pulse-glow"
        )}
      ></div>
      {showText && (
        <span className="text-sm font-medium text-foreground/80">
          {config.text}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
