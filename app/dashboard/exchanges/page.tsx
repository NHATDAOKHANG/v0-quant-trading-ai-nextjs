import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link2, Plus } from 'lucide-react';

export default async function ExchangesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user's exchange connections
  const { data: exchanges } = await supabase
    .from("exchange_connections")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Exchange Connections</h1>
          <p className="text-slate-400">Manage your connected cryptocurrency exchanges</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Exchange
        </Button>
      </div>

      {exchanges && exchanges.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {exchanges.map((exchange: any) => (
            <Card key={exchange.id} className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-slate-800 flex items-center justify-center">
                      <Link2 className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{exchange.exchange_name}</CardTitle>
                      <CardDescription className="text-slate-400 text-xs">
                        Added {new Date(exchange.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    className={
                      exchange.status === 'connected' 
                        ? 'bg-green-600 text-white' 
                        : exchange.status === 'error'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-600 text-white'
                    }
                  >
                    {exchange.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">API Key</span>
                  <span className="text-slate-300 font-mono">
                    {exchange.api_key.substring(0, 8)}...
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">
                    Test Connection
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-950">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Link2 className="h-16 w-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Exchanges Connected</h3>
            <p className="text-slate-400 text-center mb-6 max-w-md">
              Connect your exchange accounts to enable automated trading with your bots
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Connect Your First Exchange
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
