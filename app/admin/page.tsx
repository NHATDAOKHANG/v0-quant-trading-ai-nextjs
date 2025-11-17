import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot, DollarSign, TrendingUp } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch all users
  const { data: users, count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: 'exact' });

  // Fetch all bots
  const { data: bots, count: totalBots } = await supabase
    .from("trading_bots")
    .select("*", { count: 'exact' });

  // Fetch all subscriptions
  const { data: subscriptions, count: activeSubscriptions } = await supabase
    .from("user_subscriptions")
    .select("*", { count: 'exact' })
    .eq("status", "active");

  // Fetch all trades
  const { data: trades } = await supabase
    .from("trades")
    .select("*");

  // Calculate total revenue (mock calculation based on subscriptions and bot prices)
  const totalRevenue = subscriptions?.reduce((sum, sub: any) => {
    const bot = bots?.find(b => b.id === sub.bot_id);
    return sum + (bot?.price || 0);
  }, 0) || 0;

  // Calculate total PNL
  const totalPNL = trades?.reduce((sum, trade) => sum + (Number(trade.pnl) || 0), 0) || 0;

  // Get recent users
  const recentUsers = users?.slice(0, 5) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Platform overview and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalUsers || 0}</div>
            <p className="text-xs text-slate-400 mt-1">
              Registered accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalBots || 0}</div>
            <p className="text-xs text-slate-400 mt-1">
              Trading strategies
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              From {activeSubscriptions || 0} subscriptions
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Platform P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPNL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${totalPNL.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Total platform trades
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUsers.map((user: any) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div>
                  <p className="font-medium text-white">{user.display_name || 'User'}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-300 capitalize">{user.role}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Bots */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Bots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bots?.slice(0, 5).map((bot: any) => (
              <div 
                key={bot.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              >
                <div>
                  <p className="font-medium text-white">{bot.name}</p>
                  <p className="text-sm text-slate-400">{bot.strategy}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-500">+{bot.performance_30d}%</p>
                  <p className="text-xs text-slate-400">30d performance</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
