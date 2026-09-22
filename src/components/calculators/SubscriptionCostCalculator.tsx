"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Plus, Trash2 } from "lucide-react";

type Subscription = {
  id: string;
  name: string;
  cost: string;
  frequency: "weekly" | "monthly" | "yearly";
};

export function SubscriptionCostCalculator() {
  const [subs, setSubs] = useState<Subscription[]>([
    { id: "1", name: "Netflix", cost: "15.99", frequency: "monthly" },
    { id: "2", name: "Spotify", cost: "10.99", frequency: "monthly" },
  ]);

  const addSub = () => {
    setSubs([...subs, { id: Math.random().toString(), name: "", cost: "", frequency: "monthly" }]);
  };

  const removeSub = (id: string) => {
    if (subs.length > 1) {
      setSubs(subs.filter(s => s.id !== id));
    }
  };

  const updateSub = (id: string, field: keyof Subscription, value: string) => {
    setSubs(subs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculate = () => {
    let monthly = 0;
    let yearly = 0;

    subs.forEach(sub => {
      const c = parseFloat(sub.cost);
      if (!isNaN(c) && c > 0) {
        if (sub.frequency === "weekly") {
          monthly += c * 4.33;
          yearly += c * 52;
        } else if (sub.frequency === "monthly") {
          monthly += c;
          yearly += c * 12;
        } else if (sub.frequency === "yearly") {
          monthly += c / 12;
          yearly += c;
        }
      }
    });

    return {
      monthly: monthly.toFixed(2),
      yearly: yearly.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-bold text-slate-700">Your Subscriptions</label>
            <button 
              onClick={addSub}
              className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg flex items-center transition-colors"
            >
              <Plus className="w-3 h-3 mr-1" /> Add New
            </button>
          </div>

          <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-200">
            <AnimatePresence>
              {subs.map((sub, index) => (
                <motion.div 
                  key={sub.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 p-3 bg-slate-50/80 border border-slate-200 rounded-xl items-center shadow-sm"
                >
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => updateSub(sub.id, "name", e.target.value)}
                    placeholder={`Subscription ${index + 1}`}
                    className="flex-1 min-w-[120px] bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                  <input
                    type="number"
                    value={sub.cost}
                    onChange={(e) => updateSub(sub.id, "cost", e.target.value)}
                    placeholder="Cost"
                    className="w-24 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                  <select
                    value={sub.frequency}
                    onChange={(e) => updateSub(sub.id, "frequency", e.target.value)}
                    className="w-[100px] bg-white border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 appearance-none"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <button 
                    onClick={() => removeSub(sub.id)}
                    className={`p-2 rounded-lg transition-colors ${subs.length > 1 ? "text-slate-400 hover:text-red-500 hover:bg-red-50" : "text-slate-300 cursor-not-allowed"}`}
                    disabled={subs.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-rose-100 rounded-2xl h-full min-h-[300px] shadow-sm border border-rose-300">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Calculator className="w-8 h-8 text-rose-600" />
          </div>
          
          <p className="text-sm text-rose-800/70 uppercase tracking-widest font-bold mb-1">
            Total Monthly Cost
          </p>
          
          <motion.div 
            key={result.monthly}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-4 drop-shadow-sm"
          >
            ${result.monthly}
          </motion.div>

          <div className="w-full border-t border-rose-300 my-3" />

          <div className="w-full flex justify-between items-center mt-2 px-4 py-3 bg-white shadow-sm rounded-xl border border-white/10 backdrop-blur-sm">
            <span className="text-rose-800/70 font-medium">Total Yearly Cost:</span>
            <span className="text-slate-900 font-bold text-xl">${result.yearly}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
