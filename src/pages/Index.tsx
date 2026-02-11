import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, BarChart3, ShoppingCart, Receipt, Clock } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import friesImg from "@/assets/fries.jpg";
import drinkImg from "@/assets/drink.jpg";

const features = [
  { icon: ShoppingCart, title: "Smart Orders", desc: "Lightning-fast order management with instant calculations" },
  { icon: Receipt, title: "Auto Billing", desc: "Generate professional invoices with one click" },
  { icon: BarChart3, title: "Real Analytics", desc: "Track sales, revenue & inventory in real-time" },
  { icon: Shield, title: "Role Access", desc: "Admin & cashier roles with secure access control" },
  { icon: Zap, title: "Blazing Fast", desc: "Optimized for speed during peak hours" },
  { icon: Clock, title: "Inventory", desc: "Auto stock tracking with low-stock alerts" },
];

const foodImages = [
  { img: burgerImg, label: "Burgers" },
  { img: pizzaImg, label: "Pizza" },
  { img: friesImg, label: "Fries" },
  { img: drinkImg, label: "Beverages" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">L</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Levi</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/login" className="px-5 py-2.5 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground glow-primary transition-all hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap size={14} /> Fast Food Billing ERP
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-foreground">Smart, Fast &</span>
              <br />
              <span className="text-gradient">Reliable Billing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              The all-in-one billing system for modern food businesses. Manage orders, inventory, and analytics — all from one dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground glow-primary hover:scale-105 transition-all">
                Start Demo <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-border text-foreground hover:bg-muted transition-all">
                View Demo
              </Link>
            </div>

            {/* Demo credentials */}
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50">
              <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div><span className="text-muted-foreground">Admin:</span> <code className="text-foreground font-mono bg-muted px-1.5 py-0.5 rounded">admin / admin123</code></div>
                <div><span className="text-muted-foreground">Cashier:</span> <code className="text-foreground font-mono bg-muted px-1.5 py-0.5 rounded">cashier / cash123</code></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden glow-primary">
              <img src={heroFood} alt="Delicious fast food spread" className="w-full object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            {/* Floating stat cards */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-1/4 glass-card p-4 shadow-xl">
              <p className="text-xs text-muted-foreground">Today's Revenue</p>
              <p className="text-2xl font-display font-bold text-foreground">₹24,580</p>
              <p className="text-xs text-success">+12.5% ↑</p>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-1/4 glass-card p-4 shadow-xl">
              <p className="text-xs text-muted-foreground">Orders Today</p>
              <p className="text-2xl font-display font-bold text-foreground">156</p>
              <p className="text-xs text-success">+8.3% ↑</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Food showcase */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Manage Every Category</h2>
            <p className="text-muted-foreground">Burgers, pizza, sides, drinks — all in one system</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {foodImages.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer"
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display font-semibold text-foreground text-lg">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">Everything You Need</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">A complete billing ERP system built for speed and reliability</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-panel p-12 relative overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-10 pointer-events-none" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 relative z-10">
              Ready to Modernize Your Billing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto relative z-10">
              Try Levi free — no setup needed. Login with demo credentials and explore.
            </p>
            <Link to="/login" className="relative z-10 inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl gradient-primary text-primary-foreground glow-primary hover:scale-105 transition-all">
              Launch Demo <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-sm">L</span>
            </div>
            <span className="font-display font-semibold text-foreground">Levi</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Levi Smart Billing. Built for modern food businesses.</p>
        </div>
      </footer>
    </div>
  );
}
