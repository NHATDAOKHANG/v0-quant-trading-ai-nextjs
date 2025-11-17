import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Bot, TrendingUp, Shield, Zap, LineChart, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Quant Trading AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge className="mb-6 bg-blue-600/20 text-blue-400 border-blue-600/50">
          AI-Powered Trading Platform
        </Badge>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
          Automate Your Crypto Trading with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
            AI Precision
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto text-pretty">
          Professional quantitative trading bots powered by advanced AI algorithms. 
          Trade 24/7 with proven strategies and maximize your returns.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 h-14">
              Start Trading Now
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 text-lg px-8 h-14">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20">
          <div>
            <div className="text-4xl font-bold text-white mb-2">98.5%</div>
            <div className="text-sm text-slate-400">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">$2M+</div>
            <div className="text-sm text-slate-400">Volume Traded</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Quant Trading AI?</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Advanced features designed for both beginners and professional traders
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">AI-Powered Strategies</CardTitle>
              <CardDescription className="text-slate-400">
                Advanced machine learning algorithms that adapt to market conditions in real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-white">Proven Performance</CardTitle>
              <CardDescription className="text-slate-400">
                Track record of consistent returns with transparent performance metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="text-white">Bank-Level Security</CardTitle>
              <CardDescription className="text-slate-400">
                Enterprise-grade encryption and security protocols to protect your assets
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-cyan-600/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-cyan-500" />
              </div>
              <CardTitle className="text-white">Lightning Fast Execution</CardTitle>
              <CardDescription className="text-slate-400">
                Ultra-low latency trading infrastructure for optimal entry and exit points
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-orange-600/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-white">Multiple Strategies</CardTitle>
              <CardDescription className="text-slate-400">
                Choose from momentum, arbitrage, grid trading, and more specialized strategies
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-pink-600/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-pink-500" />
              </div>
              <CardTitle className="text-white">24/7 Automated Trading</CardTitle>
              <CardDescription className="text-slate-400">
                Never miss a trading opportunity with round-the-clock automated execution
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create Account</h3>
            <p className="text-slate-400">
              Sign up and complete your profile in less than 2 minutes
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Choose Strategy</h3>
            <p className="text-slate-400">
              Select from our proven AI trading bots that match your goals
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Start Trading</h3>
            <p className="text-slate-400">
              Connect your exchange and let AI handle the rest automatically
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="border-slate-800 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of traders already profiting with AI-powered automation
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 h-14">
                Get Started Free
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-slate-400">© 2025 Quant Trading AI. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
