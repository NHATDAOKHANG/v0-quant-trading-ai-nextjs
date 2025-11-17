import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function AdminBotsPage() {
  const supabase = await createClient();

  // Fetch all bots
  const { data: bots } = await supabase
    .from("trading_bots")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Trading Bots</h1>
          <p className="text-slate-400">Create, edit, and manage all trading bots</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create New Bot
        </Button>
      </div>

      <div className="grid gap-4">
        {bots?.map((bot: any) => (
          <Card key={bot.id} className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl text-white">{bot.name}</CardTitle>
                    <Badge 
                      className={bot.status === 'active' ? 'bg-green-600' : 'bg-slate-600'}
                    >
                      {bot.status}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {bot.strategy}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-400">
                    {bot.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-700 text-red-400 hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Price</p>
                  <p className="text-lg font-bold text-white">${bot.price}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">30d Performance</p>
                  <p className="text-lg font-bold text-green-500">+{bot.performance_30d}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Total Return</p>
                  <p className="text-lg font-bold text-cyan-500">+{bot.total_return}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Win Rate</p>
                  <p className="text-lg font-bold text-purple-500">{bot.win_rate}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">Created</p>
                  <p className="text-sm text-slate-300">
                    {new Date(bot.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
