"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Copy, Check, RotateCcw, PartyPopper, Calendar } from "lucide-react";

const ConfettiPiece = ({ delay, x, y }: { delay: number; x: number; y: number }) => {
  const emojis = ["🎉", "🎊", "🎈", "🎂", "✨", "🎁"];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [1, 1, 0], 
        scale: [0, 1.5, 1],
        x: x,
        y: y,
        rotate: Math.random() * 360
      }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 z-50 text-3xl pointer-events-none"
    >
      {randomEmoji}
    </motion.div>
  );
};

export function BirthdayCountdown() {
  const [name, setName] = useState<string>("");
  const [dobInput, setDobInput] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [turningAge, setTurningAge] = useState<number | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatInputDate = (val: string) => {
    let cleaned = val.replace(/\D/g, "");
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    if (cleaned.length > 5) {
      cleaned = cleaned.slice(0, 5) + "/" + cleaned.slice(5, 9);
    }
    return cleaned;
  };

  const parseDateStr = (str: string) => {
    if (!str || str.length !== 10) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const y = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (date.getDate() === d && date.getMonth() === m && date.getFullYear() === y) {
      return date;
    }
    return null;
  };

  const formatFriendlyDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const dobDateObj = parseDateStr(dobInput);

  useEffect(() => {
    if (!dobDateObj) {
      setTimeLeft(null);
      setTurningAge(null);
      setIsBirthday(false);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      let nextBday = new Date(dobDateObj.getTime());
      
      nextBday.setFullYear(now.getFullYear());
      
      const isToday = now.getMonth() === dobDateObj.getMonth() && now.getDate() === dobDateObj.getDate();
      
      if (isToday) {
         setIsBirthday(true);
         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
         setTurningAge(now.getFullYear() - dobDateObj.getFullYear());
         return;
      } else {
         setIsBirthday(false);
      }

      // We haven't reached the birthday today. So if the current time has passed the 00:00:00 of the birthday this year,
      // then it means the birthday was earlier this year, so next one is next year.
      if (now.getTime() > nextBday.getTime()) {
        nextBday.setFullYear(now.getFullYear() + 1);
      }

      const diff = nextBday.getTime() - now.getTime();
      const ageWillBe = nextBday.getFullYear() - dobDateObj.getFullYear();
      setTurningAge(ageWillBe);

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [dobDateObj]);

  // Trigger confetti if it's their birthday!
  useEffect(() => {
    if (isBirthday) {
      handleConfetti();
    }
  }, [isBirthday]);

  return (
    <div className="w-full md: relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-6 bg-fuchsia-50/50 border border-fuchsia-100/50 p-5 md:p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Name <span className="text-slate-400 font-medium normal-case">(Optional)</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Date of Birth</label>
            <input
              type="text"
              inputMode="numeric"
              value={dobInput}
              onChange={(e) => setDobInput(formatInputDate(e.target.value))}
              placeholder="DD/MM/YYYY"
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all shadow-inner"
            />
            {dobDateObj && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-1.5 mt-2 ml-1 px-2.5 py-1 bg-fuchsia-100/70 border border-fuchsia-200 text-fuchsia-800 rounded-md">
                 <Calendar className="w-3.5 h-3.5" />
                 <p className="text-xs md:text-sm font-bold">
                   {formatFriendlyDate(dobDateObj)}
                 </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-fuchsia-50 to-fuchsia-100/80 rounded-3xl shadow-[0_8px_30px_rgb(217,70,239,0.15)] border border-fuchsia-200/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#d946ef10_1px,transparent_1px),linear-gradient(to_bottom,#d946ef10_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/40 to-transparent" />
          
          <AnimatePresence>
            {showConfetti && (
              <>
                {Array.from({ length: 15 }).map((_, i) => (
                  <ConfettiPiece 
                    key={i} 
                    delay={Math.random() * 0.2} 
                    x={(Math.random() - 0.5) * 400} 
                    y={(Math.random() - 0.5) * 400 - 100}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
          
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10 w-full justify-end px-4">
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={handleConfetti} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-fuchsia-200 rounded-xl text-[11px] font-bold text-fuchsia-700 hover:bg-white transition-all shadow-sm">
                <PartyPopper className="w-3.5 h-3.5" />
                <span className="inline">Confetti</span>
              </button>
            </div>
            
            <button onClick={() => {
              const bdayText = isBirthday ? `Happy Birthday ${name}! You are exactly ${turningAge} years old today! 🎉` : `Next milestone celebration: Turning ${turningAge} years old!`;
              const text = `Birthday Countdown${name ? ` for ${name}` : ''}
Date of Birth: ${dobInput} ${dobDateObj ? `(${formatFriendlyDate(dobDateObj)})` : ''}
${dobDateObj ? bdayText : ''}
Time Left: ${timeLeft && !isBirthday ? `${timeLeft.days} Days, ${timeLeft.hours} Hrs, ${timeLeft.minutes} Min, ${timeLeft.seconds} Sec` : (isBirthday ? 'Today!' : 'N/A')}

Calculate Online: https://topcalcbox.com/birthday-countdown/`;
              copyToClipboard(text);
            }} className="flex items-center gap-1.5 px-3 py-1.5 bg-fuchsia-600 text-white rounded-xl text-[11px] font-bold hover:bg-fuchsia-700 transition-all shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="inline">{copied ? "Copied" : "Share"}</span>
            </button>
            <button onClick={() => { setDobInput(""); setName(""); }} className="p-1.5 bg-white/80 backdrop-blur-md border border-fuchsia-200 rounded-xl text-fuchsia-700 hover:bg-white transition-all shadow-sm">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center mt-8 sm:mt-12 mb-6 z-10">
            <h3 className="text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <span className="text-fuchsia-600">🎉</span>
              {name ? `${name}'s Next Birthday` : "Your Next Birthday"}
            </h3>
            {turningAge !== null && (
              <p className="text-sm font-medium text-slate-600 mt-2">
                {isBirthday ? (
                  <span className="text-fuchsia-600 font-bold text-lg">Happy Birthday! You are exactly {turningAge} years old today! 🎂</span>
                ) : (
                  <>Next milestone celebration: Turning <span className="text-fuchsia-600 font-bold text-lg">{turningAge}</span> years old!</>
                )}
              </p>
            )}
          </div>
          
          <div className="w-full max-w-sm z-10">
            {isBirthday ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-8 bg-white/60 border border-fuchsia-200/50 rounded-2xl backdrop-blur-sm shadow-sm text-center transform transition-transform hover:scale-105 duration-300"
              >
                <div className="text-5xl mb-4">🥳🎁🎈</div>
                <h2 className="text-2xl font-extrabold text-fuchsia-600 uppercase tracking-widest">Time to Celebrate!</h2>
              </motion.div>
            ) : timeLeft ? (
              <div className="grid grid-cols-4 gap-3 text-center text-slate-900">
                <div className="flex flex-col items-center p-3 bg-white/80 border border-fuchsia-200/60 rounded-2xl backdrop-blur-md shadow-md">
                  <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[10px] text-fuchsia-800/80 font-extrabold uppercase tracking-widest mt-1">Days</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/80 border border-fuchsia-200/60 rounded-2xl backdrop-blur-md shadow-md">
                  <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-fuchsia-800/80 font-extrabold uppercase tracking-widest mt-1">Hrs</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/80 border border-fuchsia-200/60 rounded-2xl backdrop-blur-md shadow-md">
                  <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-fuchsia-800/80 font-extrabold uppercase tracking-widest mt-1">Mins</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/80 border border-fuchsia-200/60 rounded-2xl backdrop-blur-md shadow-md">
                  <span className="text-3xl md:text-4xl font-extrabold text-fuchsia-600">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-fuchsia-800/80 font-extrabold uppercase tracking-widest mt-1">Secs</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-lg font-bold text-fuchsia-700/70 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-fuchsia-200/50 mt-2">
                Enter your date of birth
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
