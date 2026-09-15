import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SEOContent } from "@/components/SEOContent";

// Generate static routes for all blog posts
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: `${post.title} | TopCalcBox Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | TopCalcBox Blog`,
      description: post.excerpt,
      type: "article",
    },
    twitter: {
      title: `${post.title} | TopCalcBox Blog`,
      description: post.excerpt,
    }
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": new Date(post.date).toISOString(),
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "TopCalcBox Editorial Team"
    }
  };

  return (
    <div className="pb-16 max-w-4xl mx-auto px-4 md:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Back Button */}
      <div className="my-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-10 mb-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-start text-left">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-300 mb-6 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-white text-sm font-bold">TopCalcBox Editorial</p>
              <p className="text-slate-400 text-xs font-medium">Expert Math & Finance Team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content via SEOContent */}
      <SEOContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </SEOContent>
    </div>
  );
}
