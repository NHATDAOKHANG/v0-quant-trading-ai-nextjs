import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import { LayoutDashboard, Bot, Users, Activity, Shield } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/admin" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </Link>
              <Link 
                href="/admin/bots" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Bot className="h-4 w-4" />
                Manage Bots
              </Link>
              <Link 
                href="/admin/users" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link 
                href="/admin/trades" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Activity className="h-4 w-4" />
                All Trades
              </Link>
            </nav>
          </div>
          <UserNav 
            user={{
              email: user.email!,
              displayName: profile?.display_name,
            }}
          />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
