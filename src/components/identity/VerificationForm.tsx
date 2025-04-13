
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedButton from "@/components/ui-elements/AnimatedButton";
import GlassMorphismCard from "@/components/ui-elements/GlassMorphismCard";
import { toast } from "sonner";
import { Calendar as CalendarIcon, CircleCheck, User } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  idNumber: z.string().min(4, "ID number is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface VerificationFormProps {
  onSubmitSuccess: () => void;
}

const VerificationForm = ({ onSubmitSuccess }: VerificationFormProps) => {
  const { connected, publicKey } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      idNumber: "",
    },
  });

  const selectedDate = watch("dateOfBirth");

  const onSubmit = async (data: FormValues) => {
    if (!connected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to continue with verification",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Skip the authentication step for now - we'll use a direct insert with a generated ID
      // This avoids issues with Supabase email validation for demo purposes
      
      // Generate a UUID for the user - in a real app this would come from auth
      const userId = crypto.randomUUID();
      
      console.log("Using generated user ID:", userId);
      
      // Save verification data to Supabase
      const { error } = await supabase
        .from('identity_verifications')
        .insert({
          user_id: userId,
          full_name: data.fullName,
          email: data.email,
          date_of_birth: data.dateOfBirth.toISOString().split('T')[0],
          id_number: data.idNumber,
          wallet_address: publicKey,
          verification_status: 'pending',
          biometric_verified: false
        });

      if (error) {
        console.error("Error saving verification data:", error);
        throw new Error(error.message);
      }
      
      toast.success("Verification submitted successfully", {
        description: "Your identity verification request has been submitted",
      });
      
      console.log("Verification data saved:", {
        userId,
        ...data,
        walletAddress: publicKey,
      });
      
      // Store the userId in localStorage for later retrieval
      localStorage.setItem("verification_user_id", userId);
      
      onSubmitSuccess();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit verification", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassMorphismCard className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold gradient-text-primary">Identity Verification</h2>
          <p className="text-sm text-gray-400 mt-1">
            Complete the form below to verify your identity
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="pl-10 bg-black/20 border-muted/50 focus-visible:ring-web3-purple/50"
                {...register("fullName")}
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="bg-black/20 border-muted/50 focus-visible:ring-web3-purple/50"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  id="dateOfBirth"
                  className={cn(
                    "w-full flex items-center justify-start rounded-md border border-muted/50 bg-black/20 p-2 text-left font-normal",
                    "focus:outline-none focus:ring-2 focus:ring-web3-purple/50 focus:ring-offset-2",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Select your date of birth</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card neo-blur pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setValue("dateOfBirth", date as Date)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                  className="p-3 pointer-events-auto"
                  showOutsideDays
                  fixedWeeks
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-500 mt-1">
                {errors.dateOfBirth.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number / Passport</Label>
            <Input
              id="idNumber"
              placeholder="Enter your ID or passport number"
              className="bg-black/20 border-muted/50 focus-visible:ring-web3-purple/50"
              {...register("idNumber")}
            />
            {errors.idNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.idNumber.message}</p>
            )}
          </div>

          <div className="pt-2">
            <AnimatedButton
              type="submit"
              variant="neon"
              className="w-full"
              isLoading={isSubmitting}
              disabled={!connected}
            >
              <div className="flex items-center justify-center gap-2">
                <CircleCheck className="h-5 w-5" />
                <span>Submit Verification</span>
              </div>
            </AnimatedButton>
            
            {!connected && (
              <p className="text-xs text-amber-400 mt-2 text-center">
                Please connect your wallet first
              </p>
            )}
          </div>
        </form>
      </div>
    </GlassMorphismCard>
  );
};

export default VerificationForm;
