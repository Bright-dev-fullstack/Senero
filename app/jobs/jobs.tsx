"use client";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState, Fragment } from "react";

interface JobsDoc {
  postId: string;
  uid: string;
  company: string;
  description: string;
  developer: string;
  image: string;
  location: string;
  salary: string;
  timestamp: string;
  title: string;
  type: string;
}

export default function Jobs({ session }: { session: any }) {
  const [jobs, setJobs] = useState<JobsDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Jobs Logic
  const fetchJobs = async () => {
    const jobArr: JobsDoc[] = [];
    try {
      // Fetch ordered by latest post first
      const q = query(collection(db, "jobs"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const jobsData = {
          postId: doc.id,
          ...doc.data(),
        } as JobsDoc;
        jobArr.push(jobsData);
      });

      setJobs(jobArr);
    } catch (error) {
      // Fallback in case ordering index is missing
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
          jobArr.push({ postId: doc.id, ...doc.data() } as JobsDoc);
        });
        setJobs(jobArr);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Run fetch ONCE when component mounts (empty dependency array to prevent infinite loop)
  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter Jobs Logic based on Search Input
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      job.title?.toLowerCase().includes(term) ||
      job.company?.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term) ||
      job.type?.toLowerCase().includes(term) ||
      job.description?.toLowerCase().includes(term)
    );
  });

  return (
    <Fragment>
      <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Live Opportunities</h1>
              <p className="text-slate-400 mt-2 text-lg">Browse and explore active roles on Sereno.</p>
            </div>
            
            <Link 
              href="/post-job" 
              className="hidden sm:inline-flex self-start md:self-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-colors text-sm"
            >
              + Post New Job
            </Link>
          </div>

          {/* Filter / Search Bar */}
          <div className="relative mb-8 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, company, location, or keyword..."
              className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
              <p className="text-slate-400 text-lg">
                {searchTerm ? "No jobs match your search criteria." : "No jobs have been posted yet."}
              </p>
            </div>
          ) : (
            /* Jobs Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div 
                  key={job.postId} 
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all group relative overflow-hidden"
                >
                  <div>
                    {/* Top Meta Data */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-medium text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        {job.timestamp || "Just now"}
                      </span>
                    </div>

                    {/* Job Title & Company */}
                    <h3 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors mb-1 line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm mb-4">{job.company}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md">
                        {job.type}
                      </span>
                      {job.location && (
                        <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md">
                          {job.location}
                        </span>
                      )}
                    </div>

                    {/* Description Snippet */}
                    <p className="text-slate-400 text-sm line-clamp-4 mb-6">
                      {job.description}
                    </p>
                  </div>

                  {/* Card Footer: Salary & View Link */}
                  <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-emerald-400 text-sm">
                      {job.salary}
                    </span>
                    
                    <Link 
                      href={`/jobs/${job.postId}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors group/link bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800"
                    >
                      View Details 
                      <GoArrowUpRight className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
}