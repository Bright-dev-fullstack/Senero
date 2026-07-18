"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState, Fragment } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface JobsDoc {
  postId: string; // Changed to match your mapping logic
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


export default function Jobs() {
  const [jobs, setJobs] = useState<JobsDoc[]>([]);
  const [loading, setLoading] = useState(true);
  
  // MUI Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  // Fetch Jobs Logic
  const fetchJobs = async () => {
    const jobArr: JobsDoc[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));

      querySnapshot.forEach((doc) => {
        const jobsData = {
          postId: doc.id,
          ...doc.data()
        } as JobsDoc;
        jobArr.push(jobsData);
      });
      
      setJobs(jobArr);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch ONCE when component mounts
  useEffect(() => {
    fetchJobs();
  }, [jobs]);

  // Delete Job Logic
  const confirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      await deleteDoc(doc(db, "jobs", jobToDelete));
      // Remove the deleted job from the UI without refreshing the page
      setJobs((prevJobs) => prevJobs.filter((job) => job.postId !== jobToDelete));
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setJobToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <Fragment>
      <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Live Opportunities</h1>
              <p className="text-slate-400 mt-2 text-lg">Browse and manage active roles on Sereno.</p>
            </div>
            {/* Optional: Add a link back to your post job page */}
            <Link href="/post" className="hidden sm:flex px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-colors text-sm">
              + Post New Job
            </Link>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : jobs.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
              <p className="text-slate-400 text-lg">No jobs have been posted yet.</p>
            </div>
          ) : (
            /* Jobs Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div 
                  key={job.postId} 
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all group relative overflow-hidden"
                >
                  <div>
                    {/* Top Meta Data & Delete Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-medium text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        {job.timestamp || "Just now"}
                      </span>
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => openDeleteDialog(job.postId)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400/10"
                        title="Delete Job"
                      >
                        <FaRegTrashAlt size={16} />
                      </button>
                    </div>

                    {/* Job Title & Company */}
                    <h3 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors mb-1 line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm mb-4">{job.company}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md">
                        {job.type}
                      </span>
                      <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md line-clamp-3">
                        {job.description}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Salary & View Link */}
                  <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-emerald-400">
                      {job.salary}
                    </span>
                    
                    <Link 
                      href={`/jobs/${job.postId}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors group/link"
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

      {/* MUI Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle className="text-white">{"Delete Job Posting?"}</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-slate-400">
            Are you sure you want to permanently delete this job posting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <button 
            onClick={() => setDeleteDialogOpen(false)}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 text-sm font-medium rounded-lg transition-colors"
          >
            Yes, Delete
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}