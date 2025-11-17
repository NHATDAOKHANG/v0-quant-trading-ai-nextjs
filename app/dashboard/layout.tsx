import { createClient } from "@/lib/supabase/server";
import { redirect } from 'next/navigation';
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import { Bot, Home, History, Settings, Link2 } from 'lucide-react';

export default async function DashboardLayout({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Quant Trading AI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                href="/dashboard/bots" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Bot className="h-4 w-4" />
                My Bots
              </Link>
              <Link 
                href="/dashboard/exchanges" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Link2 className="h-4 w-4" />
                Exchanges
              </Link>
              <Link 
                href="/dashboard/trades" 
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <History className="h-4 w-4" />
                Trade History
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
