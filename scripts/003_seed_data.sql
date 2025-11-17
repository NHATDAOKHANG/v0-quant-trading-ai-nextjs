-- Seed trading bots
INSERT INTO public.trading_bots (name, description, strategy, price, performance_30d, total_return, win_rate, status) VALUES
  ('Momentum Master', 'Advanced momentum-based trading strategy optimized for trending markets', 'Momentum', 99.00, 12.5, 145.30, 68.5, 'active'),
  ('Mean Reversion Pro', 'Statistical arbitrage bot that capitalizes on price reversals', 'Mean Reversion', 149.00, 8.3, 98.70, 72.3, 'active'),
  ('Grid Trading Elite', 'Automated grid trading with dynamic range adjustment', 'Grid Trading', 79.00, 15.7, 187.60, 65.8, 'active'),
  ('Scalping Bot', 'High-frequency scalping strategy for quick profits', 'Scalping', 199.00, 18.2, 234.50, 71.2, 'active'),
  ('Arbitrage Hunter', 'Cross-exchange arbitrage opportunities detector', 'Arbitrage', 129.00, 10.5, 112.40, 78.9, 'active'),
  ('Trend Follower', 'Long-term trend following strategy with risk management', 'Trend Following', 89.00, 9.8, 156.20, 69.4, 'active')
ON CONFLICT DO NOTHING;
