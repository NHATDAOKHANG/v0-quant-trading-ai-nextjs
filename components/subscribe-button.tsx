"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from 'next/navigation';

interface SubscribeButtonProps {
  botId: string;
  botName: string;
  price: number;
  isSubscribed: boolean;
}

export function SubscribeButton({ botId, botName, price, isSubscribed }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth/login");
        return;
      }

      // Create subscription (30 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      const { error } = await supabase
        .from("user_subscriptions")
        .insert({
          user_id: user.id,
          bot_id: botId,
          status: "active",
          expiry_date: expiryDate.toISOString(),
        });

      if (error) throw error;

      // In a real app, this would integrate with Stripe
      // For now, we just create the subscription directly
      router.refresh();
    } catch (error) {
      console.error("[v0] Subscription error:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSubscribe}
      className={`w-full ${isSubscribed ? 'bg-slate-700 hover:bg-slate-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
      disabled={isSubscribed || isLoading}
    >
      {isLoading ? 'Processing...' : isSubscribed ? 'Already Subscribed' : `Subscribe for $${price}/mo`}
    </Button>
  );
}
