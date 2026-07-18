import Link from "next/link";
import { FiTarget, FiHeart, FiGlobe, FiZap, FiUsers, FiTrendingUp } from "react-icons/fi";
import Footer from "@/components/Footer"; // Optional: Include if you have your footer component

export default function About() {
  const stats = [
    { label: "Active Opportunities", value: "10,000+", icon: <FiTrendingUp /> },
    { label: "Hiring Partners", value: "850+", icon: <FiGlobe /> },
    { label: "Tech Professionals", value: "50k+", icon: <FiUsers /> },
    { label: "Successful Matches", value: "12k+", icon: <FiZap /> },
  ];

  const values = [
    {
      title: "Quality over Quantity",
      description: "We don't believe in endless scrolling. We curate only the most impactful roles from forward-thinking companies so you can focus on what matters.",
      icon: <FiTarget className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Radical Transparency",
      description: "No hidden salary ranges or vague job descriptions. We mandate upfront details so you can make informed decisions about your career.",
      icon: <FiHeart className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Borderless Potential",
      description: "Great talent lives everywhere. We champion remote-first and hybrid cultures that evaluate you on your skills, not your zip code.",
      icon: <FiGlobe className="w-6 h-6 text-emerald-400" />,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-emerald-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Redefining the Job Market
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            We are building the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">future of work.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Sereno isn&apos;t just another job board. It is a curated ecosystem designed to align exceptional tech talent with teams that actually value them.
          </p>
        </div>
      </section>

      {/* 2. OUR MISSION */}
      <section className="py-24 px-4 border-y border-slate-800/50 bg-slate-900/20 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-4">Our Mission</h2>
          <p className="text-3xl md:text-5xl font-semibold text-white leading-tight md:leading-snug">
            &quot;To bridge the gap between world-class tech talent and innovative companies through a transparent, seamless, and beautifully designed experience.&quot;
          </p>
        </div>
      </section>

      {/* 3. IMPACT STATS */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 bg-slate-950 text-slate-400 rounded-xl mb-4 border border-slate-800">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-24 px-4 bg-slate-900/50 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What drives us.</h2>
            <p className="text-slate-400 text-lg max-w-2xl">The principles that dictate every line of code we write and every role we curate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 group">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5" />
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-slate-900 border border-emerald-500/20 p-12 md:p-20 rounded-[2.5rem] backdrop-blur-sm shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to join the movement?</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Whether you are looking for your next big challenge or searching for the perfect addition to your team, Sereno is where you start.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/jobs" 
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg text-lg"
            >
              Find a Job
            </Link>
            <Link 
              href="/post" 
              className="px-8 py-4 bg-slate-950 hover:bg-slate-800 text-white border border-slate-800 font-semibold rounded-xl transition-all text-lg"
            >
              Post an Opening
            </Link>
          </div>
        </div>
      </section>      
    </main>
  );
}