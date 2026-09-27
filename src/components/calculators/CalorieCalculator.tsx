"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, RotateCcw } from "lucide-react";

export function CalorieCalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  
  const [weightKg, setWeightKg] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  
  const [weightLb, setWeightLb] = useState<string>("");
  const [heightFt, setHeightFt] = useState<string>("");
  const [heightIn, setHeightIn] = useState<string>("");

  const [activity, setActivity] = useState<string>("1.55");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculate = () => {
    let w = 0; // kg
    let h = 0; // cm
    const a = parseFloat(age) || 0;
    const act = parseFloat(activity) || 1.2;

    if (unitSystem === "metric") {
      w = parseFloat(weightKg);
      h = parseFloat(heightCm);
    } else {
      const lbs = parseFloat(weightLb);
      w = lbs * 0.453592; // lbs to kg
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inch;
      h = totalInches * 2.54; // inches to cm
    }

    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const maintenance = bmr * act;
      const weightLoss = maintenance - 500;
      const weightGain = maintenance + 500;

      return {
        maintenance: Math.round(maintenance),
        weightLoss: Math.round(weightLoss),
        weightGain: Math.round(weightGain),
        hasValues: true
      };
    }
    return { maintenance: 0, weightLoss: 0, weightGain: 0, hasValues: false };
  };

  const { maintenance, weightLoss, weightGain, hasValues } = calculate();

  const reset = () => {
    setAge("");
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
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setUnitSystem("metric")}
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                unitSystem === "metric" 
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20" 
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Metric (kg / cm)
            </button>
            <button
              onClick={() => setUnitSystem("us")}
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                unitSystem === "us" 
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20" 
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              US / Imperial (lb / ft)
            </button>
          </div>

          {/* Gender Toggle */}
          <div className="space-y-2 mb-6">
            <label className="text-sm font-bold text-slate-700">Sex</label>
            <div className="flex gap-2">
              <button
                onClick={() => setGender("male")}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                  gender === "male" 
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                  gender === "female" 
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Example: 30"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
              />
            </div>

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

            {/* Activity Level */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg text-slate-900 font-bold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="1.2">Sedentary — Little or no exercise</option>
                <option value="1.375">Lightly Active — Exercise 1-3 days/week</option>
                <option value="1.55">Moderately Active — Exercise 3-5 days/week</option>
                <option value="1.725">Very Active — Exercise 6-7 days/week</option>
                <option value="1.9">Extra Active — Very hard exercise/job</option>
              </select>
            </div>
          </div>
        </div>

        {/* Result Box */}
        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-slate-50 to-emerald-50/40 rounded-3xl shadow-[0_8px_30px_rgb(16,185,129,0.12)] border border-emerald-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-emerald-800">
               <h3 className="font-bold text-sm md:text-base uppercase tracking-wider">Calorie Result</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => {
                  const text = `Calorie Calculator\n${unitSystem === 'metric' ? `Weight: ${weightKg} kg\nHeight: ${heightCm} cm` : `Weight: ${weightLb} lbs\nHeight: ${heightFt} ft ${heightIn} in`}\nAge: ${age}\nGender: ${gender}\nMaintain Weight: ${maintenance} kcal/day\nWeight Loss: ${weightLoss} kcal/day\nWeight Gain: ${weightGain} kcal/day\n\nCalculate Online: https://topcalcbox.com/calorie-calculator`;
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
              key={maintenance}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-4"
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <p className="text-[10px] text-emerald-800/70 font-bold uppercase tracking-widest mb-2">Daily Calorie Needs</p>
                <div className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-3 drop-shadow-sm truncate px-2">
                  {maintenance.toLocaleString('en-IN')} <span className="text-2xl md:text-3xl font-bold text-slate-400">kcal/day</span>
                </div>
                <div className="bg-emerald-100/50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold">
                  Maintain Current Weight
                </div>
              </div>

              {/* Target Cards */}
              <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-slate-500 text-center mb-4 uppercase tracking-wider">Estimated Daily Calorie Targets</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-600 font-bold">Weight Loss</span>
                    <span className="text-emerald-700 font-black">{weightLoss.toLocaleString('en-IN')} kcal/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-600 font-bold">Maintain Weight</span>
                    <span className="text-emerald-700 font-black">{maintenance.toLocaleString('en-IN')} kcal/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <span className="text-slate-600 font-bold">Weight Gain</span>
                    <span className="text-emerald-700 font-black">{weightGain.toLocaleString('en-IN')} kcal/day</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            <strong className="text-slate-700">Disclaimer:</strong> This calorie calculator provides an estimate for general informational purposes and is not medical advice. Actual calorie needs can vary based on body composition, health, lifestyle and other factors. Consult a qualified healthcare professional or registered dietitian for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
}
