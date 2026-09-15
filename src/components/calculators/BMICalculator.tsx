"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function BMICalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height); // in cm
    if (!isNaN(w) && !isNaN(h) && h > 0 && w > 0) {
      const heightInMeters = h / 100;
      const bmi = w / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return "0.0";
  };

  const getBMICategory = (bmiValue: string) => {
    const bmi = parseFloat(bmiValue);
    if (bmi === 0) return "Enter values";
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    if (bmi >= 30) return "Obese";
    return "";
  };

  const bmiResult = calculateBMI();
  const category = getBMICategory(bmiResult);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-2xl shadow-orange-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 175"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl h-full min-h-[200px] shadow-lg shadow-orange-500/30 border border-orange-400/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-100 mb-1 uppercase tracking-widest font-bold">Your BMI</p>
          <motion.div 
            key={bmiResult}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-sm mb-2"
          >
            {bmiResult}
          </motion.div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
            <p className="text-white font-bold text-sm">{category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
