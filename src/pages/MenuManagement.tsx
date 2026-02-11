import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Search, Package } from "lucide-react";
import { type FoodItem, type Category, categories } from "@/data/sampleData";
import burgerImg from "@/assets/burger.jpg";

export default function MenuManagement() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, addNotification } = useStore();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<Category | "All">("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<FoodItem | null>(null);
  const [form, setForm] = useState({ name: "", category: "Burger" as Category, price: "", stock: "", description: "" });

  const filtered = menuItems.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || i.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => { setEditing(null); setForm({ name: "", category: "Burger", price: "", stock: "", description: "" }); setShowModal(true); };
  const openEdit = (item: FoodItem) => { setEditing(item); setForm({ name: item.name, category: item.category, price: String(item.price), stock: String(item.stock), description: item.description }); setShowModal(true); };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editing) {
      updateMenuItem(editing.id, { name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock), description: form.description });
      addNotification(`${form.name} updated!`, "success");
    } else {
      const newItem: FoodItem = {
        id: crypto.randomUUID(), name: form.name, category: form.category,
        price: Number(form.price), stock: Number(form.stock) || 0,
        image: burgerImg, description: form.description,
      };
      addMenuItem(newItem);
      addNotification(`${form.name} added to menu!`, "success");
    }
    setShowModal(false);
  };

  const handleDelete = (item: FoodItem) => {
    deleteMenuItem(item.id);
    addNotification(`${item.name} removed from menu`, "warning");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Menu Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{menuItems.length} items</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-all">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value as any)}
          className="px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none">
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(item => (
          <motion.div key={item.id} layout className="glass-card overflow-hidden group">
            <div className="relative aspect-[4/3]">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              {item.stock <= 0 && <div className="absolute inset-0 bg-background/70 flex items-center justify-center"><span className="text-xs font-semibold text-destructive">OUT OF STOCK</span></div>}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item)} className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
              </div>
              <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-medium text-foreground">{item.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-display font-bold text-primary">₹{item.price}</span>
                <span className={`flex items-center gap-1 text-xs font-medium ${item.stock <= 10 ? "text-warning" : "text-muted-foreground"}`}>
                  <Package size={12} /> {item.stock}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="glass-card w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">{editing ? "Edit Item" : "Add Item"}</h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Item name"
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} placeholder="Stock"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description"
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <button onClick={handleSave} className="w-full py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-all">
                  {editing ? "Update Item" : "Add Item"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
