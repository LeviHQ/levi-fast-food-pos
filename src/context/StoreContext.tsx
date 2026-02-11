import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type FoodItem, type CartItem, type Order, type AppSettings,
  sampleMenuItems, sampleOrders, defaultSettings, generateOrderId, getCurrentDate, getCurrentTime,
} from "@/data/sampleData";

interface StoreContextType {
  menuItems: FoodItem[];
  addMenuItem: (item: FoodItem) => void;
  updateMenuItem: (id: string, item: Partial<FoodItem>) => void;
  deleteMenuItem: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (order: Omit<Order, "id" | "date" | "time">) => Order;
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
  notifications: Notification[];
  addNotification: (msg: string, type?: "success" | "warning" | "error") => void;
  dismissNotification: (id: string) => void;
}

interface Notification {
  id: string;
  message: string;
  type: "success" | "warning" | "error";
  timestamp: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

function loadState<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

function saveState(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<FoodItem[]>(() => loadState("levi_menu", sampleMenuItems));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => loadState("levi_orders", sampleOrders));
  const [settings, setSettings] = useState<AppSettings>(() => loadState("levi_settings", defaultSettings));
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addMenuItem = useCallback((item: FoodItem) => {
    setMenuItems(prev => { const next = [...prev, item]; saveState("levi_menu", next); return next; });
  }, []);

  const updateMenuItem = useCallback((id: string, updates: Partial<FoodItem>) => {
    setMenuItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, ...updates } : i);
      saveState("levi_menu", next);
      return next;
    });
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems(prev => { const next = prev.filter(i => i.id !== id); saveState("levi_menu", next); return next; });
  }, []);

  const addToCart = useCallback((item: FoodItem) => {
    if (item.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        if (existing.quantity >= item.stock) return prev;
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) { setCart(prev => prev.filter(c => c.id !== id)); return; }
    setCart(prev => prev.map(c => c.id === id ? { ...c, quantity } : c));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const createOrder = useCallback((orderData: Omit<Order, "id" | "date" | "time">): Order => {
    const order: Order = { ...orderData, id: generateOrderId(), date: getCurrentDate(), time: getCurrentTime() };
    setOrders(prev => { const next = [order, ...prev]; saveState("levi_orders", next); return next; });
    // Decrease stock
    orderData.items.forEach(cartItem => {
      setMenuItems(prev => {
        const next = prev.map(m => m.id === cartItem.id ? { ...m, stock: Math.max(0, m.stock - cartItem.quantity) } : m);
        saveState("levi_menu", next);
        return next;
      });
    });
    setCart([]);
    return order;
  }, []);

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings(prev => { const next = { ...prev, ...s }; saveState("levi_settings", next); return next; });
  }, []);

  const addNotification = useCallback((message: string, type: "success" | "warning" | "error" = "success") => {
    const n: Notification = { id: crypto.randomUUID(), message, type, timestamp: Date.now() };
    setNotifications(prev => [n, ...prev].slice(0, 20));
    setTimeout(() => {
      setNotifications(prev => prev.filter(x => x.id !== n.id));
    }, 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(x => x.id !== id));
  }, []);

  return (
    <StoreContext.Provider value={{
      menuItems, addMenuItem, updateMenuItem, deleteMenuItem,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      orders, createOrder, settings, updateSettings,
      notifications, addNotification, dismissNotification,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
