import React, { useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, Award, Calendar } from "lucide-react";

const COLORS = ["hsl(0,84%,50%)", "hsl(42,93%,52%)", "hsl(25,95%,53%)", "hsl(0,0%,40%)", "hsl(142,76%,36%)"];

export default function Reports() {
  const { orders, menuItems, settings } = useStore();
  const [period, setPeriod] = useState<"daily" | "monthly">("daily");
  const sym = settings.currencySymbol;

  const todayStr = new Date().toISOString().split("T")[0];
  const todayOrders = useMemo(() => orders.filter(o => o.date === todayStr), [orders, todayStr]);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;

  const bestSelling = useMemo(() => {
    const counts: Record<string, { name: string; quantity: number; revenue: number }> = {};
    orders.forEach(o => o.items.forEach(i => {
      if (!counts[i.id]) counts[i.id] = { name: i.name, quantity: 0, revenue: 0 };
      counts[i.id].quantity += i.quantity;
      counts[i.id].revenue += i.price * i.quantity;
    }));
    return Object.values(counts).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  }, [orders]);

  const dailyData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      const ds = d.toISOString().split("T")[0];
      const dayOrders = orders.filter(o => o.date === ds);
      return { day: d.toLocaleDateString("en-US", { weekday: "short" }), revenue: dayOrders.reduce((s, o) => s + o.total, 0), orders: dayOrders.length };
    });
  }, [orders]);

  const paymentData = useMemo(() => {
    const pm: Record<string, number> = { cash: 0, upi: 0, card: 0 };
    orders.forEach(o => pm[o.paymentMethod] = (pm[o.paymentMethod] || 0) + 1);
    return Object.entries(pm).map(([name, value]) => ({ name: name.toUpperCase(), value }));
  }, [orders]);

  const exportCSV = () => {
    const headers = "Order ID,Customer,Date,Time,Subtotal,Tax,Discount,Total,Payment,Status\n";
    const rows = orders.map(o => `${o.id},${o.customerName || "Walk-in"},${o.date},${o.time},${o.subtotal},${o.taxAmount},${o.discountAmount},${o.total},${o.paymentMethod},${o.paymentStatus}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "levi_report.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Insights into your business performance</p>
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Today's Revenue", value: `${sym}${todayRevenue.toFixed(0)}`, icon: Calendar },
          { label: "Total Revenue", value: `${sym}${totalRevenue.toFixed(0)}`, icon: TrendingUp },
          { label: "Avg Order Value", value: `${sym}${avgOrder.toFixed(0)}`, icon: Award },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <s.icon size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Payment Methods */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="font-display font-semibold text-foreground mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={paymentData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {paymentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Best Selling */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award size={18} className="text-secondary" /> Best Selling Items
        </h3>
        <div className="space-y-3">
          {bestSelling.map((item, i) => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <div className="h-2 rounded-full bg-muted mt-1 overflow-hidden">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${(item.quantity / (bestSelling[0]?.quantity || 1)) * 100}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{item.quantity} sold</p>
                <p className="text-xs text-muted-foreground">{sym}{item.revenue.toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
