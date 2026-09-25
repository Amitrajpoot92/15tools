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
    <div className="w-full space-y-4">
      {/* Input Section */}
      <div className="bg-[#e2faec] border border-[#bbf2d7] rounded-3xl p-5 md:p-6 relative">
        
        {/* Unit System Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setUnitSystem("metric")}
            className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
              unitSystem === "metric" 
                ? "bg-[#10b981] text-white border-[#10b981]" 
                : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            Metric (kg / cm)
          </button>
          <button
            onClick={() => setUnitSystem("us")}
            className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
              unitSystem === "us" 
                ? "bg-[#10b981] text-white border-[#10b981]" 
                : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            US / Imperial (lb / ft)
          </button>
        </div>

        {/* Gender Toggle */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Sex</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender("male")}
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                gender === "male" 
                  ? "bg-[#10b981] text-white border-[#10b981]" 
                  : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender("female")}
              className={`flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
                gender === "female" 
                  ? "bg-[#10b981] text-white border-[#10b981]" 
                  : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              Female
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Example: 30"
              className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm"
            />
          </div>

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

          {/* Activity Level */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-800 uppercase tracking-wide">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full bg-white border border-emerald-100/50 rounded-2xl px-4 py-3 text-lg text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="1.2">Sedentary — Little or no exercise</option>
              <option value="1.375">Lightly Active — Exercise 1-3 days/week</option>
              <option value="1.55">Moderately Active — Exercise 3-5 days/week</option>
              <option value="1.725">Very Active — Exercise 6-7 days/week</option>
              <option value="1.9">Extra Active — Very hard exercise/job</option>
            </select>
          </div>

          {/* Result Box */}
          <div className="bg-[#b3f2d6] rounded-3xl p-6 relative shadow-sm border border-[#96e3c2] mt-8">
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => {
                  const text = `Calorie Calculator
${unitSystem === 'metric' ? `Weight: ${weightKg} kg\nHeight: ${heightCm} cm` : `Weight: ${weightLb} lbs\nHeight: ${heightFt} ft ${heightIn} in`}
Age: ${age}
Gender: ${gender}
Maintain Weight: ${maintenance} kcal/day
Weight Loss: ${weightLoss} kcal/day
Weight Gain: ${weightGain} kcal/day

Calculate Online: https://topcalcbox.com/calorie-calculator`;
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
            
            <div className="flex flex-col items-center mt-10 mb-6 text-center">
              <p className="text-emerald-950 text-sm font-black uppercase tracking-[0.2em] mb-2 drop-shadow-sm">
                Daily Calorie Needs
              </p>
              <motion.div 
                key={maintenance}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tight mb-2 drop-shadow-sm"
              >
                {maintenance.toLocaleString()} <span className="text-2xl md:text-3xl">kcal/day</span>
              </motion.div>
              <p className="text-emerald-950 font-bold text-sm drop-shadow-sm">
                Estimated calories to maintain your current weight
              </p>
            </div>

            {/* Target Cards */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-5 shadow-sm border border-emerald-100">
              <h3 className="text-sm font-black text-slate-800 text-center mb-4 uppercase tracking-wide">Estimated Daily Calorie Targets</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 font-bold">Weight Loss</span>
                  <span className="text-emerald-800 font-black">{weightLoss.toLocaleString()} kcal/day</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 font-bold">Maintain Weight</span>
                  <span className="text-emerald-800 font-black">{maintenance.toLocaleString()} kcal/day</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 font-bold">Weight Gain</span>
                  <span className="text-emerald-800 font-black">{weightGain.toLocaleString()} kcal/day</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-4">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              <strong className="text-slate-700">Disclaimer:</strong> This calorie calculator provides an estimate for general informational purposes and is not medical advice. Actual calorie needs can vary based on body composition, health, lifestyle and other factors. Consult a qualified healthcare professional or registered dietitian for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
