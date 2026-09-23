"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Copy, Check } from "lucide-react";

export function CalorieCalculator() {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<string>(""); // kg
  const [height, setHeight] = useState<string>(""); // cm
  const [activity, setActivity] = useState<string>("1.2");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateCalories = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);

    if (!isNaN(a) && !isNaN(w) && !isNaN(h) && a > 0 && w > 0 && h > 0) {
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const maintenance = bmr * act;
      const mildLoss = maintenance - 250;
      const weightLoss = maintenance - 500;

      return {
        maintenance: Math.round(maintenance),
        mildLoss: Math.round(mildLoss),
        weightLoss: Math.round(weightLoss)
      };
    }
    return { maintenance: 0, mildLoss: 0, weightLoss: 0 };
  };

  const results = calculateCalories();

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-4 bg-amber-50/50 border border-amber-100/50 p-5 md:p-6 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "male" | "female")}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="kg"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="cm"
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            >
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Lightly active (Exercise 1-3 days/week)</option>
              <option value="1.55">Moderately active (Exercise 3-5 days/week)</option>
              <option value="1.725">Very active (Exercise 6-7 days/week)</option>
              <option value="1.9">Super active (Very hard exercise/job)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-amber-100 border border-amber-300 rounded-2xl shadow-sm  relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <button onClick={() => {
            const text = `Calorie Calculator
Age: ${age || 0}
Gender: ${gender}
Weight: ${weight || 0} kg
Height: ${height || 0} cm
Maintain Weight: ${results.maintenance.toLocaleString()} kcal/day
Mild Weight Loss: ${results.mildLoss.toLocaleString()} kcal/day
Weight Loss: ${results.weightLoss.toLocaleString()} kcal/day

Calculate Online: https://topcalcbox.com/calorie-calculator/`;
            copyToClipboard(text);
          }} className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-[11px] font-bold text-amber-700 hover:bg-amber-50 transition-colors shadow-sm z-10">
            <span className="inline">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <div className="p-3 bg-white rounded-xl shadow-sm mb-4">
            <Flame className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-800/70 mb-1 uppercase tracking-widest font-bold">Maintain Weight</p>
          <motion.div 
            key={results.maintenance}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter drop-shadow-sm mb-6 text-center"
          >
            {results.maintenance.toLocaleString()} <span className="text-2xl text-orange-700">kcal/day</span>
          </motion.div>
          
          <div className="w-full space-y-3">
            <div className="bg-white shadow-sm backdrop-blur-md rounded-xl p-3 border border-slate-200 flex justify-between items-center">
              <span className="text-orange-800/70 text-sm font-medium">Mild Weight Loss</span>
              <span className="text-slate-900 font-bold">{results.mildLoss.toLocaleString()} kcal</span>
            </div>
            <div className="bg-white shadow-sm backdrop-blur-md rounded-xl p-3 border border-slate-200 flex justify-between items-center">
              <span className="text-orange-800/70 text-sm font-medium">Weight Loss (-0.5kg/wk)</span>
              <span className="text-slate-900 font-bold">{results.weightLoss.toLocaleString()} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
