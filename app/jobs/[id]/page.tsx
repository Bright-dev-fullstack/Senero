"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiShare2, FiUser } from "react-icons/fi";

interface JobDoc {
  postId: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  developer?: string;
  image?: string;
  timestamp?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract the dynamic 'id' parameter from the URL path /jobs/[id]
  const jobId = params?.id as string;

  const [job, setJob] = useState<JobDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobDetails() {
      if (!jobId) return;

      try {
        const docRef = doc(db, "jobs", jobId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJob({
            postId: docSnap.id,
            ...(docSnap.data() as Omit<JobDoc, "postId">),
          });
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobDetails();
  }, [jobId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title || "Job Opening on Sereno",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied to clipboard!");
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium tracking-widest uppercase">Loading Role Details...</p>
        </div>
      </main>
    );
  }

  // --- NOT FOUND STATE ---
  if (!job) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-slate-400 mb-6 text-sm">
            The role you are looking for may have been removed or does not exist.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors text-sm"
          >
            <GoArrowLeft /> Back to All Jobs
          </button>
        </div>
      </main>
    );
  }

  // --- JOB DETAIL VIEW ---
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <GoArrowLeft className="w-4 h-4" /> Back to opportunities
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-colors"
            title="Share Job"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
        </div>

        {/* Job Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {job.company}
                </span>
                {job.timestamp && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <FiClock /> {job.timestamp}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                {job.title}
              </h1>

              {/* Badges Grid */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <FiBriefcase className="text-emerald-400" /> {job.type}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <FiMapPin className="text-emerald-400" /> {job.location}
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <FiDollarSign className="text-emerald-400" /> {job.salary}
                </div>
              </div>
            </div>

            {/* Apply Action */}
            <div className="w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
              <a
                href={`mailto:apply@sereno.com?subject=Application for ${encodeURIComponent(job.title)}`}
                className="w-full md:w-auto inline-flex justify-center items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-center"
              >
                Apply for this Role
              </a>
            </div>

          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Main Description */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800">
              Role Description & Requirements
            </h2>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {job.description}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Posted By Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Posted By
              </h3>
              <div className="flex items-center gap-3">
                {job.image ? (
                  <img src={job.image} alt={job.developer} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                    <FiUser className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white text-sm">{job.developer || "Verified Employer"}</h4>
                  <p className="text-xs text-slate-500">Recruiter on Sereno</p>
                </div>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Job Overview
              </h3>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-500">Salary Range</span>
                <span className="font-medium text-emerald-400">{job.salary}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-500">Work Type</span>
                <span className="font-medium text-slate-200">{job.type}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Location</span>
                <span className="font-medium text-slate-200">{job.location}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}