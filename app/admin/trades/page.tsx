import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Activity } from 'lucide-react';

export default async function AdminTradesPage() {
  const supabase = await createClient();

  // Fetch all trades with user and bot information
  const { data: trades } = await supabase
    .from("trades")
    .select(`
      *,
      bot:trading_bots(name, strategy),
      user:profiles(display_name, email)
    `)
    .order("executed_at", { ascending: false });

  // Calculate summary stats
  const totalPNL = trades?.reduce((sum, trade) => sum + (Number(trade.pnl) || 0), 0) || 0;
  const winningTrades = trades?.filter(t => Number(t.pnl) > 0).length || 0;
  const totalTrades = trades?.length || 0;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">All Platform Trades</h1>
        <p className="text-slate-400">Complete history of all trades across the platform</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Platform P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalPNL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPNL >= 0 ? '+' : ''}${totalPNL.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400 mt-1">All users combined</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-500">
              {winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-400 mt-1">Platform average</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {totalTrades}
            </div>
            <p className="text-xs text-slate-400 mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Trades Table */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">All Trades</CardTitle>
          <CardDescription className="text-slate-400">
            Complete trade history across all users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trades && trades.length > 0 ? (
            <div className="space-y-3">
              {trades.map((trade: any) => (
                <div 
                  key={trade.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-lg">{trade.symbol}</span>
                      <Badge 
                        variant={trade.side === 'buy' ? 'default' : 'secondary'}
                        className={`${trade.side === 'buy' ? 'bg-green-600' : 'bg-red-600'} text-white`}
                      >
                        {trade.side.toUpperCase()}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`border-slate-600 ${
                          trade.status === 'completed' ? 'text-green-400' :
                          trade.status === 'failed' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}
                      >
                        {trade.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{trade.user.display_name || trade.user.email}</span>
                      <span>•</span>
                      <span>{trade.bot.name}</span>
                      <span>•</span>
                      <span>{trade.exchange}</span>
                      <span>•</span>
                      <span>{new Date(trade.executed_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className={`text-xl font-bold ${Number(trade.pnl) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {Number(trade.pnl) >= 0 ? '+' : ''}${Number(trade.pnl).toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {Number(trade.amount).toFixed(4)} @ ${Number(trade.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Activity className="h-16 w-16 text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Trades Yet</h3>
              <p className="text-slate-400 text-center max-w-md">
                Platform trades will appear here once users start trading
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
