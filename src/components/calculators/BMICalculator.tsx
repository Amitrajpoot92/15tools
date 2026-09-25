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
    <div className="w-full space-y-4">
      {/* Input Section */}
      <div className="bg-[#e2faec] border border-[#bbf2d7] rounded-3xl p-5 md:p-6 relative">
        
        {/* Unit System Toggle */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setUnitSystem("metric")}
            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm ${
              unitSystem === "metric" 
                ? "bg-[#10b981] text-white border-[#10b981]" 
                : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            Kilograms (kg) /<br />Centimeters (cm)
          </button>
          <button
            onClick={() => setUnitSystem("us")}
            className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-sm flex items-center justify-center text-center ${
              unitSystem === "us" 
                ? "bg-[#10b981] text-white border-[#10b981]" 
                : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            Pounds (lb) / Feet (ft)
          </button>
        </div>

        <div className="space-y-6">
          {unitSystem === "metric" ? (
            <>
              {/* Metric Inputs */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">WEIGHT — Kilograms (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  placeholder="Example: 70"
                  className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">HEIGHT — Centimeters (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="Example: 175"
                  className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
                />
              </div>
            </>
          ) : (
            <>
              {/* US Inputs */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">WEIGHT — Pounds (lb)</label>
                <input
                  type="number"
                  value={weightLb}
                  onChange={(e) => setWeightLb(e.target.value)}
                  placeholder="Example: 154"
                  className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-800 uppercase tracking-wide">HEIGHT — Feet (ft) / Inches (in)</label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="Feet (ft)"
                    className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
                  />
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="Inches (in)"
                    className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
                  />
                </div>
              </div>
            </>
          )}

          {/* Result Box */}
          <div className="bg-[#b3f2d6] rounded-3xl p-6 relative shadow-sm border border-[#96e3c2] mt-8">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => {
                  const text = `BMI Calculator
${unitSystem === 'metric' ? `Weight: ${weightKg} kg\nHeight: ${heightCm} cm` : `Weight: ${weightLb} lbs\nHeight: ${heightFt} ft ${heightIn} in`}
BMI: ${bmiStr}
Category: ${category}

Calculate Online: https://topcalcbox.com/bmi-calculator`;
                  copyToClipboard(text);
                }} 
                className="flex items-center justify-center px-4 py-2 bg-white rounded-xl text-sm font-bold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button 
                onClick={reset}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center mt-10 mb-4 text-center">
              <p className="text-emerald-950 text-sm font-black uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                Your BMI
              </p>
              <motion.div 
                key={bmiStr}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm"
              >
                {bmiStr}
              </motion.div>
              <div className="bg-[#9ae4c5] text-emerald-950 px-4 py-1.5 rounded-full text-sm font-bold mt-1 shadow-sm">
                {category}
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-4 text-center mt-6">
              <p className="text-emerald-950/70 font-black text-xs uppercase mb-1">Healthy BMI Range</p>
              <p className="text-lg md:text-xl font-extrabold text-emerald-950">18.5 – 24.9</p>
            </div>
          </div>
          
          {/* Categories Table */}
          <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-emerald-100">
            <h3 className="text-lg font-bold text-slate-900 text-center mb-4">Adult BMI Categories</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-bold">Underweight</span>
                <span className="text-emerald-800 font-bold">Below 18.5</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-bold">Healthy Weight</span>
                <span className="text-emerald-800 font-bold">18.5 – 24.9</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-bold">Overweight</span>
                <span className="text-emerald-800 font-bold">25.0 – 29.9</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-bold">Obesity</span>
                <span className="text-emerald-800 font-bold">30.0 or above</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-4">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              <strong className="text-slate-700">Disclaimer:</strong> This BMI calculator is for general informational purposes and is not a medical diagnosis. BMI is a screening measure and does not directly measure body fat. Results may not be suitable for children, teenagers, pregnant people, or some athletes. Consult a qualified healthcare professional for personal medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
