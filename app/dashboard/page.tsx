import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, TrendingUp, DollarSign, Activity } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user's subscriptions
  const { data: subscriptions } = await supabase
    .from("user_subscriptions")
    .select(`
      *,
      bot:trading_bots(*)
    `)
    .eq("user_id", user!.id)
    .eq("status", "active");

  // Fetch recent trades
  const { data: recentTrades } = await supabase
    .from("trades")
    .select(`
      *,
      bot:trading_bots(name)
    `)
    .eq("user_id", user!.id)
    .order("executed_at", { ascending: false })
    .limit(5);

  // Calculate stats
  const totalPNL = recentTrades?.reduce((sum, trade) => sum + (Number(trade.pnl) || 0), 0) || 0;
  const activeBots = subscriptions?.length || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here&apos;s your trading overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeBots}</div>
            <p className="text-xs text-slate-400 mt-1">
              Trading strategies running
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPNL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${totalPNL.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              All-time profit/loss
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{recentTrades?.length || 0}</div>
            <p className="text-xs text-slate-400 mt-1">
              Executed recently
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {recentTrades && recentTrades.length > 0
                ? `${((recentTrades.filter(t => Number(t.pnl) > 0).length / recentTrades.length) * 100).toFixed(1)}%`
                : "0%"}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Profitable trades
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Bots */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Active Trading Bots</CardTitle>
          <CardDescription className="text-slate-400">
            Your currently subscribed bots
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscriptions && subscriptions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subscriptions.map((sub: any) => (
                <Card key={sub.id} className="border-slate-700 bg-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{sub.bot.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {sub.bot.strategy}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">30d Performance</span>
                      <span className="text-sm font-bold text-green-500">
                        +{sub.bot.performance_30d}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Status</span>
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        {sub.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Expires</span>
                      <span className="text-sm text-slate-400">
                        {new Date(sub.expiry_date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-300 mb-2">No Active Bots</h3>
              <p className="text-sm text-slate-400 mb-4">
                Subscribe to a trading bot to start automated trading
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/dashboard/bots">Browse Bots</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Recent Trades</CardTitle>
          <CardDescription className="text-slate-400">
            Your latest trading activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentTrades && recentTrades.length > 0 ? (
            <div className="space-y-3">
              {recentTrades.map((trade: any) => (
                <div 
                  key={trade.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{trade.symbol}</span>
                      <Badge 
                        variant={trade.side === 'buy' ? 'default' : 'secondary'}
                        className={trade.side === 'buy' ? 'bg-green-600' : 'bg-red-600'}
                      >
                        {trade.side.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                      {trade.bot.name} • {trade.exchange}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${Number(trade.pnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {Number(trade.pnl) >= 0 ? '+' : ''}${Number(trade.pnl).toFixed(2)}
                    </div>
                    <p className="text-xs text-slate-400">
                      {new Date(trade.executed_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No trades executed yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
