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
      
      {/* Grid container taking full width without extra top margin */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2 bg-orange-50/50 border border-orange-100/50 p-3 md:p-5 rounded-2xl">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 md:gap-4">
              <label className="text-sm font-bold text-slate-700 hidden sm:block">Shopping List</label>
              {/* Currency Toggle moved inline */}
              <div className="bg-white border border-slate-200 p-0.5 rounded-lg flex items-center shadow-sm">
                <button 
                  onClick={() => setCurrency("$")}
                  className={`px-2 py-1 rounded-md transition-all font-bold text-xs ${currency === "$" ? "bg-orange-100 shadow-sm text-orange-700" : "text-slate-500 hover:text-slate-700"}`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setCurrency("₹")}
                  className={`px-2 py-1 rounded-md transition-all font-bold text-xs ${currency === "₹" ? "bg-orange-100 shadow-sm text-orange-700" : "text-slate-500 hover:text-slate-700"}`}
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <button 
              onClick={addItem}
              className="text-[10px] sm:text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2 py-1.5 rounded-lg flex items-center transition-colors border border-orange-200/50"
            >
              <Plus className="w-3 h-3 mr-1" /> Add
            </button>
          </div>

          <div className="max-h-[250px] md:max-h-[350px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-slate-200">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl items-center shadow-sm overflow-hidden"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    placeholder={`Item ${index + 1}`}
                    className="flex-1 min-w-0 w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                  />
                  <div className="relative w-16 md:w-20 shrink-0">
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 font-bold">{currency}</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, "price", e.target.value)}
                      placeholder="Price"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 md:pl-4 pr-1 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                    />
                  </div>
                  <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200 rounded-lg px-1 shrink-0">
                    <span className="text-[9px] text-slate-400 font-bold hidden sm:block">Qty:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                      placeholder="1"
                      className="w-6 md:w-8 bg-transparent py-1.5 text-xs text-slate-900 focus:outline-none text-center px-0"
                    />
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className={`p-1 shrink-0 rounded-lg transition-colors ${items.length > 1 ? "text-slate-400 hover:text-red-500 hover:bg-red-50" : "text-slate-300 cursor-not-allowed"}`}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-orange-100 rounded-2xl h-full min-h-[180px] md:min-h-[250px] shadow-sm border border-orange-300 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button onClick={() => {
              let copyStr = "Grocery Bill Calculator \n--------------------\n";
              let index = 1;
              items.forEach(s => {
                if (s.name || s.price) {
                  const qty = parseFloat(s.quantity) || 1;
                  const price = parseFloat(s.price) || 0;
                  const total = price * qty;
                  copyStr += `${index}. ${s.name || 'Item'} - ${currency}${formatNumber(price, 2)} × ${qty} = ${currency}${formatNumber(total, 2)}\n`;
                  index++;
                }
              });
              copyStr += "--------------------\n";
              copyStr += `Total Bill: ${currency}${formatNumber(result.total, 2)}\n\n`;
              copyStr += "Calculate Online: https://topcalcbox.com/grocery-bill-calculator";
              
              copyToClipboard(copyStr);
            }} className="flex items-center gap-1 px-2.5 py-1 bg-white border border-orange-200 rounded-lg text-[10px] font-bold text-orange-700 hover:bg-orange-50 transition-colors shadow-sm">
              <span className="inline">{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={reset} className="p-1 bg-white border border-orange-200 rounded-lg text-orange-700 hover:bg-orange-50 transition-colors shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="p-2 bg-white rounded-xl shadow-sm mb-2 border border-orange-100">
            <ShoppingCart className="w-5 h-5 text-orange-600" />
          </div>
          
          <p className="text-[10px] md:text-xs text-orange-800/80 uppercase tracking-widest font-bold mb-1">
            Total Bill
          </p>
          
          <div className="flex items-baseline overflow-hidden w-full justify-center px-2">
            <motion.div 
              key={result.total}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#78350f] tracking-tighter mb-2 drop-shadow-sm truncate"
              title={`${currency}${formatNumber(result.total)}`}
            >
              {currency}{formatNumber(result.total)}
            </motion.div>
          </div>

          <div className="w-full border-t border-orange-300 my-2" />

          <div className="w-full flex justify-between items-center mt-1 px-3 py-2 bg-white shadow-sm rounded-xl border border-orange-100">
            <span className="text-orange-800/80 font-bold uppercase text-[9px] tracking-wider">Total Items</span>
            <span className="text-slate-900 font-extrabold text-lg">{formatNumber(result.totalItems, 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
