import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubscribeButton } from "@/components/subscribe-button";
import { TrendingUp, Target, Award } from 'lucide-react';

export default async function BotsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all available bots
  const { data: bots } = await supabase
    .from("trading_bots")
    .select("*")
    .eq("status", "active")
    .order("performance_30d", { ascending: false });

  // Fetch user's subscriptions
  const { data: subscriptions } = await supabase
    .from("user_subscriptions")
    .select("bot_id")
    .eq("user_id", user!.id)
    .eq("status", "active");

  const subscribedBotIds = subscriptions?.map(sub => sub.bot_id) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Trading Bots</h1>
        <p className="text-slate-400">Browse and subscribe to AI-powered trading strategies</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bots?.map((bot: any) => {
          const isSubscribed = subscribedBotIds.includes(bot.id);
          
          return (
            <Card key={bot.id} className="border-slate-800 bg-slate-900/50 backdrop-blur flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl text-white">{bot.name}</CardTitle>
                  {isSubscribed && (
                    <Badge className="bg-green-600 text-white">Subscribed</Badge>
                  )}
                </div>
                <CardDescription className="text-slate-400">
                  {bot.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {bot.strategy}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <TrendingUp className="h-3 w-3" />
                      <span>30d Performance</span>
                    </div>
                    <div className="text-lg font-bold text-green-500">
                      +{bot.performance_30d}%
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Award className="h-3 w-3" />
                      <span>Total Return</span>
                    </div>
                    <div className="text-lg font-bold text-cyan-500">
                      +{bot.total_return}%
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Target className="h-3 w-3" />
                      <span>Win Rate</span>
                    </div>
                    <div className="text-lg font-bold text-purple-500">
                      {bot.win_rate}%
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-slate-400 text-xs">Price</div>
                    <div className="text-lg font-bold text-white">
                      ${bot.price}/mo
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SubscribeButton
                  botId={bot.id}
                  botName={bot.name}
                  price={Number(bot.price)}
                  isSubscribed={isSubscribed}
                />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
