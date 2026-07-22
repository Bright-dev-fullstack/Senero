import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  // Purely static display data for visual presentation
  const categories = [
    { name: "Software Engineering", desc: "Build the future of the web.", icon: "💻", color: "text-blue-400", bg: "bg-blue-500/10" },
    { name: "Product Design", desc: "Shape intuitive user experiences.", icon: "🎨", color: "text-purple-400", bg: "bg-purple-500/10" },
    { name: "Growth Marketing", desc: "Scale innovative tech brands.", icon: "📈", color: "text-amber-400", bg: "bg-amber-500/10" },
    { name: "Customer Success", desc: "Empower global communities.", icon: "🤝", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  const steps = [
    { id: "01", title: "Discover", desc: "Browse curated collections of top-tier opportunities." },
    { id: "02", title: "Evaluate", desc: "Review transparent salaries, tech stacks, and remote policies." },
    { id: "03", title: "Connect", desc: "Reach out directly to hiring teams with your portfolio." },
  ];

  const reviews = [
    { id: 1, name: "Sarah Jenkins", role: "Product Designer", text: "Sereno completely changed how I look for roles. The aesthetic and the curation are unmatched. I found my dream position in days.", initial: "S" },
    { id: 2, name: "David Chen", role: "Frontend Engineer", text: "Finally, a platform that understands what modern developers actually care about. No clutter, just premium opportunities.", initial: "D" },
    { id: 3, name: "Elena Rodriguez", role: "Growth Lead", text: "The cleanest interface I've ever used. It feels less like a job board and more like a high-end portfolio.", initial: "E" },
    { id: 4, name: "Marcus Johnson", role: "UX Researcher", text: "I love the focus on transparency and design. It sets a new standard for how we should connect with companies.", initial: "M" },
    { id: 5, name: "Amira Patel", role: "Full Stack Dev", text: "Sereno's curation saved me hours of scrolling through irrelevant listings. Truly a game-changer.", initial: "A" },
    { id: 6, name: "Liam Smith", role: "Product Manager", text: "A breath of fresh air in the tech industry. The user experience is phenomenal.", initial: "L" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] w-full flex flex-col justify-center items-center px-4 overflow-hidden">
        {/* Video Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0" id="1">
          <video loop autoPlay muted playsInline className="w-full h-full object-cover"> 
            <source src="/bg.mp4" type="video/mp4"/>
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/80 to-slate-950 z-10" />
        </div>
      
        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-emerald-400 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Curated Career Paths
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
            Where Your Potential Meets Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Passion.</span>
          </h1>
          
          <p className="font-light text-lg md:text-2xl max-w-2xl text-slate-300">
            A showcase of modern tech opportunities. Elevate your career with transparent, premium roles.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto mt-4">
            <Link 
              href="/jobs" 
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.7)] text-center text-lg"
            >
              Explore Sectors
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 font-semibold text-white border border-white/10 backdrop-blur-md rounded-xl transition-all text-center text-lg"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF TICKER */}
      <section className="py-10 border-b border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest mb-6">Featured Ecosystems</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold text-white tracking-wider">VERCEL</span>
            <span className="text-xl font-bold text-white tracking-wider">STRIPE</span>
            <span className="text-xl font-bold text-white tracking-wider">FIVERR</span>
            <span className="text-xl font-bold text-white tracking-wider">NOTION</span>
            <span className="text-xl font-bold text-white tracking-wider">FIGMA</span>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="about" className="py-24 px-4 max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">The Sereno Experience.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="text-6xl font-black text-slate-800/50 absolute -top-4 -right-4 group-hover:text-emerald-900/20 transition-colors">{step.id}</div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
              <p className="text-slate-400 relative z-10 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPLORE CATEGORIES */}
      <section id="categories" className="py-24 px-4 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Explore by Category</h2>
            <p className="text-slate-400 mt-2 text-lg">Disciplines shaping the modern web.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all flex flex-col items-start gap-4 group">
                <div className={`p-4 rounded-xl ${cat.bg} ${cat.color} text-3xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{cat.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FLOATING REVIEWS (Wall of Love) */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative overflow-hidden">
        {/* Background glow for the review section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Stories of alignment.</h2>
          <p className="text-slate-400 text-lg">Hear from professionals who found their passion here.</p>
        </div>

        {/* Staggered Grid to create the "Floating" effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-12">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              // The magic logic for the floating look: pushes the middle column down on desktop, and adds a smooth hover lift.
              className={`p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 ${
                index % 3 === 1 ? 'lg:translate-y-12' : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold text-xl border border-slate-700">
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-bold text-white">{review.name}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM BANNER */}
      <section className="py-24 px-4 relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-emerald-500/5" />
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-slate-900/50 border border-emerald-500/20 p-12 md:p-20 rounded-3xl backdrop-blur-sm">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Designed for the Modern Web</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">This project demonstrates clean architecture, responsive flex layouts, and premium UI design patterns.</p>
          <Link href="#1" className="inline-block px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg text-lg">
            Back to Top
          </Link>
        </div>
      </section>

    </main>
  );
}