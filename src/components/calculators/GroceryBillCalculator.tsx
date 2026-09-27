"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Trash2, Copy, RotateCcw, IndianRupee, DollarSign } from "lucide-react";

type GroceryItem = {
  id: string;
  name: string;
  price: string;
  quantity: string;
};

const defaultItems: GroceryItem[] = [
  { id: "1", name: "Milk", price: "50", quantity: "2" },
  { id: "2", name: "Bread", price: "40", quantity: "1" },
  { id: "3", name: "Eggs", price: "7", quantity: "12" },
];

export function GroceryBillCalculator() {
  const [items, setItems] = useState<GroceryItem[]>(defaultItems);
  const [currency, setCurrency] = useState<"₹" | "$">("₹");
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("grocery-calculator-data");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved grocery items");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("grocery-calculator-data", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setItems(defaultItems);
    localStorage.setItem("grocery-calculator-data", JSON.stringify(defaultItems));
  };

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), name: "", price: "", quantity: "1" }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(s => s.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof GroceryItem, value: string) => {
    setItems(items.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const formatNumber = (num: number, maxDigits = 2) => {
    return num.toLocaleString(currency === '₹' ? 'en-IN' : 'en-US', {
      maximumFractionDigits: maxDigits,
    });
  };

  const calculate = () => {
    let total = 0;
    let totalItems = 0;

    items.forEach(item => {
      const p = parseFloat(item.price);
      const q = parseFloat(item.quantity);
      if (!isNaN(p) && p >= 0 && !isNaN(q) && q > 0) {
        total += p * q;
        totalItems += q;
      }
    });

    return {
      total: total,
      totalItems: totalItems
    };
  };

  const result = calculate();

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Currency Toggle */}
      <div className="flex justify-end mb-4 relative z-10">
        <div className="bg-slate-50 border border-slate-100 p-1 rounded-lg flex items-center shadow-sm">
          <button 
            onClick={() => setCurrency("$")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "$" ? "bg-white shadow-sm text-orange-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <DollarSign className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrency("₹")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold text-sm ${currency === "₹" ? "bg-white shadow-sm text-orange-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            <IndianRupee className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-orange-50/50 border border-orange-100/50 p-5 md:p-6 rounded-2xl">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-bold text-slate-700">Shopping List</label>
            <button 
              onClick={addItem}
              className="text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg flex items-center transition-colors border border-orange-200/50"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Item
            </button>
          </div>

          <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 p-3 bg-white border border-slate-200 rounded-xl items-center shadow-sm"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder={`Item ${index + 1}`}
                    className="flex-1 min-w-[120px] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                  />
                  <div className="relative w-24">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">{currency}</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", e.target.value)}
                      placeholder="Price"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-6 pr-2 py-2 text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2">
                    <span className="text-xs text-slate-400 font-bold">Qty:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                      placeholder="1"
                      className="w-12 bg-transparent py-2 text-sm text-slate-900 focus:outline-none text-center"
                    />
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className={`p-2 rounded-lg transition-colors ${items.length > 1 ? "text-slate-400 hover:text-red-500 hover:bg-red-50" : "text-slate-300 cursor-not-allowed"}`}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-orange-100 rounded-2xl h-full min-h-[300px] shadow-sm border border-orange-300 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
            <button onClick={() => {
              const itemsText = items.filter(s => s.name || s.price).map(s => `${s.name || 'Item'} (x${s.quantity || 1}): ${currency}${((parseFloat(s.price) || 0) * (parseFloat(s.quantity) || 1)).toFixed(2)}`).join('\n');
              const text = `Grocery Bill Calculator\n---\n${itemsText}\n---\nTotal Items: ${result.totalItems}\nTotal Bill: ${currency}${formatNumber(result.total)}\n\nCalculate Online: https://topcalcbox.com/grocery-bill-calculator/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-orange-200 rounded-lg text-[11px] font-bold text-orange-700 hover:bg-orange-50 transition-colors shadow-sm">
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1.5 bg-white border border-orange-200 rounded-lg text-orange-700 hover:bg-orange-50 transition-colors shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4 border border-orange-100">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
          </div>
          
          <p className="text-sm text-orange-800/80 uppercase tracking-widest font-bold mb-1">
            Total Bill
          </p>
          
          <div className="flex items-baseline overflow-hidden w-full justify-center px-2">
            <motion.div 
              key={result.total}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#78350f] tracking-tighter mb-4 drop-shadow-sm truncate"
              title={`${currency}${formatNumber(result.total)}`}
            >
              {currency}{formatNumber(result.total)}
            </motion.div>
          </div>

          <div className="w-full border-t border-orange-300 my-3" />

          <div className="w-full flex justify-between items-center mt-2 px-4 py-3 bg-white shadow-sm rounded-xl border border-orange-100">
            <span className="text-orange-800/80 font-bold uppercase text-[10px] tracking-wider">Total Items</span>
            <span className="text-slate-900 font-extrabold text-xl">{formatNumber(result.totalItems, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
