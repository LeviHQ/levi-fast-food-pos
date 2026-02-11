import React, { useState, useMemo, useRef } from "react";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import { Receipt, Printer, Download, Search, Eye, X } from "lucide-react";
import { type Order } from "@/data/sampleData";

export default function Billing() {
  const { orders, settings } = useStore();
  const [search, setSearch] = useState("");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const sym = settings.currencySymbol;

  const filtered = useMemo(() => {
    return orders.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const handlePrint = () => {
    const content = invoiceRef.current;
    if (!content) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Invoice ${viewOrder?.id}</title><style>body{font-family:system-ui,sans-serif;padding:40px;max-width:400px;margin:auto}table{width:100%;border-collapse:collapse}td,th{padding:6px 0;text-align:left;font-size:13px}th{border-bottom:1px solid #ddd}.right{text-align:right}.bold{font-weight:700}.sep{border-top:1px dashed #ccc;margin:10px 0}.center{text-align:center}.title{font-size:18px;font-weight:700;margin-bottom:4px}</style></head><body>${content.innerHTML}</body></html>`);
    win.document.close();
    win.print();
  };

  const handleDownloadPDF = async () => {
    if (!viewOrder) return;
    const { jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF({ unit: "mm", format: [80, 200] });
    let y = 10;
    doc.setFontSize(14);
    doc.text(settings.restaurantName, 40, y, { align: "center" }); y += 6;
    doc.setFontSize(8);
    doc.text(`Bill #${viewOrder.id}`, 40, y, { align: "center" }); y += 4;
    doc.text(`${viewOrder.date} ${viewOrder.time}`, 40, y, { align: "center" }); y += 4;
    if (viewOrder.customerName) { doc.text(`Customer: ${viewOrder.customerName}`, 40, y, { align: "center" }); y += 4; }
    y += 2;
    autoTable(doc, {
      startY: y,
      head: [["Item", "Qty", "Amt"]],
      body: viewOrder.items.map(i => [i.name, String(i.quantity), `${sym}${(i.price * i.quantity).toFixed(0)}`]),
      theme: "plain",
      styles: { fontSize: 7, cellPadding: 1.5 },
      margin: { left: 4, right: 4 },
    });
    y = (doc as any).lastAutoTable.finalY + 4;
    doc.setFontSize(8);
    doc.text(`Subtotal: ${sym}${viewOrder.subtotal.toFixed(2)}`, 76, y, { align: "right" }); y += 4;
    if (viewOrder.discountAmount > 0) { doc.text(`Discount: -${sym}${viewOrder.discountAmount.toFixed(2)}`, 76, y, { align: "right" }); y += 4; }
    doc.text(`Tax (${viewOrder.taxRate}%): ${sym}${viewOrder.taxAmount.toFixed(2)}`, 76, y, { align: "right" }); y += 4;
    doc.setFontSize(10);
    doc.text(`Total: ${sym}${viewOrder.total.toFixed(2)}`, 76, y, { align: "right" }); y += 6;
    doc.setFontSize(7);
    doc.text(`Payment: ${viewOrder.paymentMethod.toUpperCase()} (${viewOrder.paymentStatus})`, 40, y, { align: "center" }); y += 4;
    doc.text("Thank you for your order!", 40, y, { align: "center" });
    doc.save(`Invoice_${viewOrder.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Billing & Invoices</h1>
        <p className="text-sm text-muted-foreground mt-1">{orders.length} transactions</p>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{o.id}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{o.customerName || "Walk-in"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{o.items.length} items</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{sym}{o.total.toFixed(0)}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full bg-muted text-xs font-medium text-foreground uppercase">{o.paymentMethod}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${o.paymentStatus === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{o.paymentStatus}</span></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{o.time}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setViewOrder(o)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {viewOrder && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewOrder(null)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
            className="glass-card w-full max-w-sm p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-foreground">Invoice</h2>
              <div className="flex gap-2">
                <button onClick={handlePrint} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Printer size={16} /></button>
                <button onClick={handleDownloadPDF} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Download size={16} /></button>
                <button onClick={() => setViewOrder(null)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><X size={16} /></button>
              </div>
            </div>

            <div ref={invoiceRef}>
              <div className="text-center mb-4">
                <p className="title font-display font-bold text-lg text-foreground">{settings.restaurantName}</p>
                <p className="text-xs text-muted-foreground">Bill #{viewOrder.id}</p>
                <p className="text-xs text-muted-foreground">{viewOrder.date} • {viewOrder.time}</p>
                {viewOrder.customerName && <p className="text-xs text-muted-foreground">Customer: {viewOrder.customerName}</p>}
              </div>
              <div className="border-t border-dashed border-border my-3" />
              <table className="w-full text-sm">
                <thead><tr className="text-muted-foreground text-xs"><th className="text-left pb-2">Item</th><th className="text-center pb-2">Qty</th><th className="text-right pb-2">Amt</th></tr></thead>
                <tbody>
                  {viewOrder.items.map(i => (
                    <tr key={i.id}><td className="py-1 text-foreground">{i.name}</td><td className="text-center text-muted-foreground">{i.quantity}</td><td className="text-right text-foreground">{sym}{(i.price * i.quantity).toFixed(0)}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-dashed border-border my-3" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{sym}{viewOrder.subtotal.toFixed(2)}</span></div>
                {viewOrder.discountAmount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{sym}{viewOrder.discountAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between text-muted-foreground"><span>Tax ({viewOrder.taxRate}%)</span><span>{sym}{viewOrder.taxAmount.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border"><span>Total</span><span>{sym}{viewOrder.total.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-dashed border-border my-3" />
              <div className="text-center text-xs text-muted-foreground">
                <p>Payment: {viewOrder.paymentMethod.toUpperCase()} • {viewOrder.paymentStatus.toUpperCase()}</p>
                {viewOrder.cashReceived && <p>Cash: {sym}{viewOrder.cashReceived} | Change: {sym}{viewOrder.changeAmount?.toFixed(2)}</p>}
                <p className="mt-2">Thank you for your order!</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
