import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "TopCalcBox Blog - Math, Finance & Productivity Tips",
  description: "Read the latest tutorials, financial tips, and mathematical hacks from the TopCalcBox editorial team.",
};

export default function BlogPage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-12 mb-10 mt-2 shadow-xl border border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 shadow-sm backdrop-blur-md mb-6">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            The TopCalcBox Blog
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-xl font-medium">
            In-depth tutorials, financial tips, and mathematical hacks to help you make the most out of your daily life.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                Read Article
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
