import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Mock data for categories and jobs
  const categories = [
    { name: "Tech & Dev", count: "100+ Jobs", icon: "💻" },
    { name: "Design & Creative", count: "82+ Jobs", icon: "🎨" },
    { name: "Marketing & Sales", count: "70+ Jobs", icon: "📈" },
    { name: "Remote Support", count: "97+ Jobs", icon: "🎧" },
  ];

  const featuredJobs = [
    { id: 1, title: "Senior Frontend Engineer", company: "Linear Tech", type: "Remote", salary: "$120k - $140k" },
    { id: 2, title: "Product Designer", company: "Stripe", type: "Hybrid (NYC)", salary: "$110k - $130k" },
    { id: 3, title: "Growth Marketing Lead", company: "Vercel", type: "Remote", salary: "$95k - $115k" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <video 
          loop
          autoPlay
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        > 
          <source src="/bg.mp4" type="video/mp4"/>
          Your browser does not support the video tag
        </video>
      
        {/* Hero Overlay Content */}
        <div className="bg-black/60 absolute top-0 left-0 h-full w-full text-white flex items-center justify-center px-4">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
            
            <h1 className="text-2xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
              <span className="text-emerald-400">Sereno</span> - Where Your Potential Meets Your Next Passion.
            </h1>
            
            <p className="font-light text-base md:text-lg max-w-2xl text-slate-200">
              Skip the endless search. Match with top employers hiring right now based on your unique skills, values, and career goals.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto mt-4">
              <Link 
                href="/jobs" 
                className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 font-medium text-white rounded-lg transition-colors text-center"
              >
                Explore Openings
              </Link>
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-8 py-3 bg-white/10 hover:bg-white/20 font-medium text-white border border-white/30 backdrop-blur-sm rounded-lg transition-colors text-center"
              >
                Create Account
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* JOB CATEGORIES SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Explore by Category</h2>
          <p className="text-slate-500 mt-2">Find your niche and jump straight into open opportunities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-3 group">
              <span className="text-3xl bg-slate-100 p-3 rounded-lg group-hover:bg-emerald-50 transition-colors">{cat.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">{cat.name}</h3>
                <p className="text-slate-500 text-sm mt-0.5">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED JOBS SECTION */}
      <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Opportunities</h2>
              <p className="text-slate-500 mt-2">Handpicked roles active within the last 24 hours.</p>
            </div>
            <Link href="/jobs" className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1 group">
              View All Jobs <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {featuredJobs.map((job) => (
              <div key={job.id} className="p-6 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-200 transition-colors">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="font-medium text-slate-700">{job.company}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">{job.salary}</span>
                  </div>
                </div>
                <Link href={`/jobs/${job.id}`} className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm text-center font-medium transition-colors">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}