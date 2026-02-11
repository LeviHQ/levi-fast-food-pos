import React, { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, ShoppingCart, Trash2, CreditCard, Banknote, Smartphone, X, Check } from "lucide-react";
import { type Category, categories, type CartItem, type Order } from "@/data/sampleData";

export default function OrderPanel() {
  const { menuItems, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, createOrder, settings, addNotification } = useStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [discountType, setDiscountType] = useState<"percent" | "flat">("percent");
  const [discountValue, setDiscountValue] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "card">("cash");
  const [cashReceived, setCashReceived] = useState("");
  const sym = settings.currencySymbol;

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [menuItems, search, activeCategory]);

  const subtotal = useMemo(() => cart.reduce((s, c) => s + c.price * c.quantity, 0), [cart]);
  const discountAmount = discountType === "percent" ? subtotal * (discountValue / 100) : Math.min(discountValue, subtotal);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (settings.taxRate / 100);
  const total = afterDiscount + taxAmount;
  const change = paymentMethod === "cash" ? Math.max(0, parseFloat(cashReceived || "0") - total) : 0;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setPaymentModal(true);
  };

  const confirmPayment = () => {
    if (paymentMethod === "cash" && parseFloat(cashReceived || "0") < total) return;
    const order: Omit<Order, "id" | "date" | "time"> = {
      items: cart,
      subtotal,
      taxRate: settings.taxRate,
      taxAmount,
      discountType,
      discountValue,
      discountAmount,
      total,
      paymentMethod,
      paymentStatus: "paid",
      cashReceived: paymentMethod === "cash" ? parseFloat(cashReceived) : undefined,
      changeAmount: paymentMethod === "cash" ? change : undefined,
      customerName,
    };
    createOrder(order);
    addNotification(`Order placed successfully! Total: ${sym}${total.toFixed(2)}`, "success");
    setPaymentModal(false);
    setDiscountValue(0);
    setCustomerName("");
    setCashReceived("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-7rem)]">
      {/* Menu */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search menu..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
          {["All", ...categories].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeCategory === cat ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
          {filteredItems.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            const outOfStock = item.stock <= 0;
            return (
              <motion.button key={item.id} layout whileHover={{ scale: outOfStock ? 1 : 1.02 }} whileTap={{ scale: outOfStock ? 1 : 0.98 }}
                onClick={() => !outOfStock && addToCart(item)} disabled={outOfStock}
                className={`glass-card overflow-hidden text-left transition-all ${outOfStock ? "opacity-50 cursor-not-allowed" : "hover:border-primary/30 cursor-pointer"} ${inCart ? "ring-2 ring-primary/50" : ""}`}>
                <div className="relative aspect-[4/3]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {outOfStock && <div className="absolute inset-0 bg-background/70 flex items-center justify-center"><span className="text-xs font-semibold text-destructive">OUT OF STOCK</span></div>}
                  {inCart && <div className="absolute top-2 right-2 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{inCart.quantity}</div>}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-bold text-primary">{sym}{item.price}</p>
                    <p className="text-xs text-muted-foreground">{item.stock} left</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-96 glass-card flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <ShoppingCart size={18} /> Cart ({cart.length})
          </h2>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Clear All</button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Your cart is empty</p>
              <p className="text-xs mt-1">Tap items to add them</p>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map(item => (
                <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{sym}{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-foreground hover:bg-border transition-colors"><Minus size={14} /></button>
                    <span className="w-7 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-foreground hover:bg-border transition-colors"><Plus size={14} /></button>
                  </div>
                  <p className="text-sm font-semibold text-foreground w-16 text-right">{sym}{(item.price * item.quantity).toFixed(0)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Customer name (optional)"
              className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <div className="flex gap-2">
              <select value={discountType} onChange={e => setDiscountType(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none">
                <option value="percent">% Off</option>
                <option value="flat">Flat Off</option>
              </select>
              <input type="number" min={0} value={discountValue || ""} onChange={e => setDiscountValue(Number(e.target.value))}
                placeholder="Discount" className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{sym}{subtotal.toFixed(2)}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{sym}{discountAmount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>GST ({settings.taxRate}%)</span><span>{sym}{taxAmount.toFixed(2)}</span></div>
              <div className="flex justify-between text-foreground font-display font-bold text-lg pt-2 border-t border-border"><span>Total</span><span>{sym}{total.toFixed(2)}</span></div>
            </div>

            <button onClick={handlePlaceOrder} className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-all glow-primary">
              Place Order
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPaymentModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">Payment</h2>
                <button onClick={() => setPaymentModal(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
              </div>

              <p className="text-3xl font-display font-bold text-foreground text-center mb-6">{sym}{total.toFixed(2)}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { method: "cash" as const, icon: Banknote, label: "Cash" },
                  { method: "upi" as const, icon: Smartphone, label: "UPI" },
                  { method: "card" as const, icon: CreditCard, label: "Card" },
                ].map(pm => (
                  <button key={pm.method} onClick={() => setPaymentMethod(pm.method)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all
                    ${paymentMethod === pm.method ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                    <pm.icon size={24} />
                    <span className="text-sm font-medium">{pm.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === "cash" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-1.5">Cash Received</label>
                  <input type="number" value={cashReceived} onChange={e => setCashReceived(e.target.value)}
                    placeholder={`Min ${sym}${total.toFixed(2)}`}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-lg font-semibold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  {parseFloat(cashReceived || "0") >= total && (
                    <p className="mt-2 text-sm text-success font-medium">Change: {sym}{change.toFixed(2)}</p>
                  )}
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Simulated UPI Payment</p>
                  <p className="text-foreground font-mono">levi@upi</p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">Simulated Card Payment</p>
                  <p className="text-foreground font-mono">•••• •••• •••• 4242</p>
                </div>
              )}

              <button onClick={confirmPayment}
                disabled={paymentMethod === "cash" && parseFloat(cashReceived || "0") < total}
                className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2">
                <Check size={18} /> Confirm Payment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
