"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { db, storage } from "@/config/firebase";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { FiEdit3, FiLogOut, FiGlobe, FiCamera, FiX, FiBriefcase } from "react-icons/fi";
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface userProfile {
  name?: string;
  email?: string;
  image?: string;
  bio?: string;
  links?: { github?: string; website?: string };
}

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

export default function ProfileClient({ session }: { session: any }) {
  const uid = session?.user?.id;
  const [profile, setProfile] = useState<userProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "", github: "", website: "" });
  const [upLoading, setUpLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Renamed from apis to jobs
  const [myJobs, setMyJobs] = useState<JobsDoc[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // ---- load the user's own document ----
  useEffect(() => {
    async function loadProfile() {
      if (!uid) {
        console.error("No UID found in session object:", session);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", uid));
        
        if (snap.exists()) {
          const data = snap.data() as userProfile;
          setProfile(data);
          setFormData({
            name: data.name || "",
            bio: data.bio || "",
            github: data.links?.github || "",
            website: data.links?.website || "",
          });
        } else {
          // Fallback if they log in but have no database document yet
          console.log("No Firestore document found for this user. Using session fallback.");
          const fallbackProfile = {
            name: session?.user?.name || "New User",
            email: session?.user?.email || "",
            image: session?.user?.image || "",
          };
          
          setProfile(fallbackProfile);
          setFormData({
            name: fallbackProfile.name,
            bio: "",
            github: "",
            website: "",
          });
        }
      } catch (error) {
        console.error("Error loading profile from Firestore:", error);
      }
    }
    
    loadProfile();
  }, [uid, session]);

  // ---- load the user's jobs ----
  useEffect(() => {
    async function loadMyJobs() {
      if (!uid) return;
      try {
        // Changed collection to "jobs"
        const q = query(collection(db, "jobs"), where("uid", "==", uid), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        const results: JobsDoc[] = snapshot.docs.map((doc) => ({
          postId: doc.id,
          ...(doc.data() as Omit<JobsDoc, "postId">),
        }));
        setMyJobs(results);
      } catch (error) {
        console.error("error fetching jobs", error);
      } finally {
        setLoadingJobs(false);
      }
    }
    loadMyJobs();
  }, [uid]);

  async function handleSave() {
    if (!uid) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", uid), {
        name: formData.name,
        bio: formData.bio,
        links: { github: formData.github, website: formData.website },
      });
      setProfile((prev) => ({
        ...prev,
        name: formData.name,
        bio: formData.bio,
        links: { github: formData.github, website: formData.website },
      }));
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!uid) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setUpLoading(true);
    try {
      const storageRef = ref(storage, `avatars/${uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", uid), { image: url });
      setProfile((prev) => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setUpLoading(false);
    }
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium tracking-widest uppercase">Loading Profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PROFILE CARD */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              
              <div className="relative group mb-6">
                <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800 shadow-xl ${upLoading ? 'animate-pulse' : ''}`}>
                  {profile.image ? (
                    <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-500 bg-slate-800">
                      {profile.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                  <FiCamera className="w-6 h-6" />
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} disabled={upLoading} />
                </label>
              </div>

              {!editing ? (
                <div className="w-full">
                  <h2 className="text-2xl font-bold text-white mb-1">{profile.name || "Anonymous User"}</h2>
                  <p className="text-sm text-slate-400 mb-6">{profile.email}</p>
                  
                  {profile.bio && (
                    <p className="text-sm text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800 mb-6 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  <div className="flex justify-center gap-4 mb-8">
                    {profile.links?.github && (
                      <Link href={profile.links.github} target="_blank" className="p-2.5 bg-slate-950 text-slate-400 hover:text-white hover:bg-emerald-500/20 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all">
                        <FaGithub className="w-5 h-5" />
                      </Link>
                    )}
                    {profile.links?.website && (
                      <Link href={profile.links.website} target="_blank" className="p-2.5 bg-slate-950 text-slate-400 hover:text-white hover:bg-emerald-500/20 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all">
                        <FiGlobe className="w-5 h-5" />
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button 
                      onClick={() => setEditing(true)}
                      className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <FiEdit3 /> Edit Profile
                    </button>
                    <button 
                      onClick={() => signOut()}
                      className="flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/10 text-sm font-medium rounded-xl transition-colors"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full text-left space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-white">Edit Details</h3>
                    <button onClick={() => setEditing(false)} className="text-slate-400 hover:text-white p-1"><FiX /></button>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Display Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Bio</label>
                    <textarea 
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">GitHub URL</label>
                    <input 
                      type="url" 
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Portfolio Website</label>
                    <input 
                      type="url" 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3 mt-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: USER'S POSTS */}
        <div className="lg:col-span-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FiBriefcase className="text-emerald-500" /> My Active Postings
            </h2>
            <Link href="/post" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              + Post New
            </Link>
          </div>

          {loadingJobs ? (
            <div className="flex justify-center items-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : myJobs.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
              <p className="text-slate-400 text-lg">You haven&apos;t posted any roles yet.</p>
              <Link href="/post" className="inline-block mt-4 px-6 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-medium rounded-xl transition-colors text-sm">
                Create your first posting
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myJobs.map((job) => (
                <div key={job.postId} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-medium text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        {job.timestamp || "Recent"}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors mb-1 line-clamp-1">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm mb-4">{job.company}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md">
                        {job.type}
                      </span>
                      <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-md line-clamp-3">
                        {job.description}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-emerald-400 text-sm">
                      {job.salary}
                    </span>
                    
                    <Link 
                      href={`/jobs/${job.postId}`}
                      className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors group/link bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg"
                    >
                      View <GoArrowUpRight className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}