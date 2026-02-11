import React, { useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Dashboard() {
  const { orders, menuItems, settings } = useStore();
  const { user } = useAuth();
  const sym = settings.currencySymbol;

  const todayOrders = useMemo(() => orders.filter(o => o.date === new Date().toISOString().split("T")[0]), [orders]);
  const todayRevenue = useMemo(() => todayOrders.reduce((s, o) => s + o.total, 0), [todayOrders]);
  const totalRevenue = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders]);
  const lowStockItems = useMemo(() => menuItems.filter(i => i.stock <= 10), [menuItems]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split("T")[0];
      const dayOrders = orders.filter(o => o.date === dateStr);
      return {
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        sales: dayOrders.reduce((s, o) => s + o.total, 0),
        orders: dayOrders.length,
      };
    });
    return days;
  }, [orders]);

  const stats = [
    { label: "Today's Revenue", value: `${sym}${todayRevenue.toFixed(0)}`, icon: DollarSign, change: "+12.5%", up: true, color: "text-primary" },
    { label: "Today's Orders", value: todayOrders.length.toString(), icon: ShoppingBag, change: "+8.3%", up: true, color: "text-secondary" },
    { label: "Total Revenue", value: `${sym}${totalRevenue.toFixed(0)}`, icon: TrendingUp, change: "+15.2%", up: true, color: "text-success" },
    { label: "Low Stock Items", value: lowStockItems.length.toString(), icon: AlertTriangle, change: lowStockItems.length > 0 ? "Needs attention" : "All good", up: lowStockItems.length === 0, color: "text-warning" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, {user?.name} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your restaurant today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-medium ${s.up ? "text-success" : "text-warning"}`}>
                {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Sales Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-3 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Sales Overview (7 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fill="url(#salesGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {orders.slice(0, 8).map(o => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.customerName || "Walk-in"} • {o.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{sym}{o.total.toFixed(0)}</p>
                  <span className={`text-xs ${o.paymentStatus === "paid" ? "text-success" : "text-warning"}`}>
                    {o.paymentStatus === "paid" ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Low Stock */}
      {lowStockItems.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-warning" /> Low Stock Alert
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {lowStockItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-warning/20">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-warning font-semibold">{item.stock} left</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
