"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

export function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  
  const [weightKg, setWeightKg] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  
  const [weightLb, setWeightLb] = useState<string>("");
  const [heightFt, setHeightFt] = useState<string>("");
  const [heightIn, setHeightIn] = useState<string>("");

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    let w = 0;
    let hInMeters = 0;

    if (unitSystem === "metric") {
      w = parseFloat(weightKg);
      hInMeters = parseFloat(heightCm) / 100;
    } else {
      const lbs = parseFloat(weightLb);
      w = lbs * 0.453592; // lbs to kg
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inch;
      hInMeters = totalInches * 0.0254; // inches to meters
    }

    if (!isNaN(w) && w > 0 && hInMeters > 0) {
      const bmi = w / (hInMeters * hInMeters);
      return bmi;
    }
    return 0;
  };

  const bmi = calculate();
  const bmiStr = bmi > 0 ? bmi.toFixed(1) : "0.0";

  const getBMICategory = (bmiVal: number) => {
    if (bmiVal === 0) return "Enter your details";
    if (bmiVal < 18.5) return "Underweight";
    if (bmiVal >= 18.5 && bmiVal <= 24.9) return "Healthy Weight";
    if (bmiVal >= 25 && bmiVal <= 29.9) return "Overweight";
    if (bmiVal >= 30) return "Obesity";
    return "";
  };

  const category = getBMICategory(bmi);

  const reset = () => {
    setWeightKg("");
    setHeightCm("");
    setWeightLb("");
    setHeightFt("");
    setHeightIn("");
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        {/* Input Section */}
        <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 md:p-6 relative">
          
          {/* Unit System Toggle */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setUnitSystem("metric")}
              className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm ${
                unitSystem === "metric" 
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20" 
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Kilograms (kg) /<br />Centimeters (cm)
            </button>
            <button
              onClick={() => setUnitSystem("us")}
              className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm flex items-center justify-center text-center ${
                unitSystem === "us" 
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20" 
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Pounds (lb) /<br />Feet (ft)
            </button>
          </div>

          <div className="space-y-6">
            {unitSystem === "metric" ? (
              <>
                {/* Metric Inputs */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Weight — Kilograms (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="Example: 70"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Height — Centimeters (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="Example: 175"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
                  />
                </div>
              </>
            ) : (
              <>
                {/* US Inputs */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Weight — Pounds (lb)</label>
                  <input
                    type="number"
                    value={weightLb}
                    onChange={(e) => setWeightLb(e.target.value)}
                    placeholder="Example: 154"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Height — Feet (ft) / Inches (in)</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      placeholder="Feet (ft)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      placeholder="Inches (in)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Result Box */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-3xl shadow-[0_8px_30px_rgb(16,185,129,0.12)] border border-emerald-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-emerald-800">
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">BMI Result</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => {
                  const text = `BMI Calculator\n${unitSystem === 'metric' ? `Weight: ${weightKg} kg\nHeight: ${heightCm} cm` : `Weight: ${weightLb} lbs\nHeight: ${heightFt} ft ${heightIn} in`}\nBMI: ${bmiStr}\nCategory: ${category}\n\nCalculate Online: https://topcalcbox.com/bmi-calculator`;
                  copyToClipboard(text);
                }} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-xl text-[11px] font-bold text-emerald-700 hover:bg-white transition-all shadow-sm"
              >
                <span className="inline">{copied ? "Copied" : "Copy"}</span>
              </button>
              <button 
                onClick={reset}
                className="p-1.5 bg-white/80 backdrop-blur-md border border-emerald-200 rounded-xl text-emerald-700 hover:bg-white transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="w-full z-10">
            <motion.div 
              key={bmiStr}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full flex flex-col md:flex-row gap-4"
            >
              <div className="flex-1 bg-white/80 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-emerald-800/70 font-bold uppercase tracking-widest mb-2">Your BMI</p>
                <div className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-3 drop-shadow-sm truncate px-2">
                  {bmiStr}
                </div>
                <div className="bg-emerald-100/50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold">
                  {category}
                </div>
              </div>

              <div className="w-full md:w-1/3 bg-white/80 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-emerald-800/70 font-bold uppercase tracking-widest mb-2">Healthy BMI Range</p>
                <p className="text-xl md:text-2xl font-extrabold text-slate-800">18.5 – 24.9</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Categories Table */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 text-center mb-4">Adult BMI Categories</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-700 font-bold">Underweight</span>
              <span className="text-slate-900 font-bold">Below 18.5</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-700 font-bold">Healthy Weight</span>
              <span className="text-emerald-600 font-bold">18.5 – 24.9</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-700 font-bold">Overweight</span>
              <span className="text-orange-500 font-bold">25.0 – 29.9</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-700 font-bold">Obesity</span>
              <span className="text-red-500 font-bold">30.0 or above</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            <strong className="text-slate-700">Disclaimer:</strong> This BMI calculator is for general informational purposes and is not a medical diagnosis. BMI is a screening measure and does not directly measure body fat. Results may not be suitable for children, teenagers, pregnant people, or some athletes. Consult a qualified healthcare professional for personal medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
