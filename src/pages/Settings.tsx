import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import { Save, Store, Receipt, DollarSign } from "lucide-react";

const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

export default function SettingsPage() {
  const { settings, updateSettings, addNotification } = useStore();
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    updateSettings(form);
    addNotification("Settings saved successfully!", "success");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your restaurant billing system</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
        {/* Restaurant */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Store size={18} className="text-primary" />
            <h2 className="font-display font-semibold text-foreground">Restaurant Info</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Restaurant Name</label>
              <input value={form.restaurantName} onChange={e => setForm({ ...form, restaurantName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Logo URL (optional)</label>
              <input value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Tax */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Receipt size={18} className="text-primary" />
            <h2 className="font-display font-semibold text-foreground">Tax Configuration</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">GST Rate (%)</label>
            <input type="number" min={0} max={100} value={form.taxRate} onChange={e => setForm({ ...form, taxRate: Number(e.target.value) })}
              className="w-full max-w-xs px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Currency */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={18} className="text-primary" />
            <h2 className="font-display font-semibold text-foreground">Currency</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currencies.map(c => (
              <button key={c.code} onClick={() => setForm({ ...form, currency: c.code, currencySymbol: c.symbol })}
                className={`p-3 rounded-xl border text-center transition-all
                ${form.currency === c.code ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                <span className="text-2xl block">{c.symbol}</span>
                <span className="text-xs font-medium">{c.code}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-all">
          <Save size={16} /> Save Settings
        </button>
      </motion.div>
    </div>
  );
}
