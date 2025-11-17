import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, User } from 'lucide-react';

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Fetch all users with their subscription count
  const { data: users } = await supabase
    .from("profiles")
    .select(`
      *,
      subscriptions:user_subscriptions(count)
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-slate-400">View and manage all platform users</p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">All Users</CardTitle>
          <CardDescription className="text-slate-400">
            Total users: {users?.length || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users?.map((user: any) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center">
                    {user.role === 'admin' ? (
                      <Shield className="h-6 w-6 text-purple-500" />
                    ) : (
                      <User className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white">
                        {user.display_name || 'User'}
                      </p>
                      <Badge 
                        className={user.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'}
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-slate-300">
                    {user.subscriptions?.[0]?.count || 0} subscriptions
                  </p>
                  <p className="text-xs text-slate-400">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
