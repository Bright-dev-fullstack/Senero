"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Footer() {
  const {data: session} = useSession()
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h3 className="text-white font-bold text-2xl tracking-wide">
              Sereno<span className="text-emerald-400">.</span>
            </h3>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Where your potential meets your next passion. Connecting modern talent with meaningful opportunities worldwide.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-emerald-400 transition-colors">Find Jobs</Link>
              </li>
              <li>
                <Link href="/post" className="hover:text-emerald-400 transition-colors">Post Job</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Stay Updated</h4>
            <p className="text-sm text-slate-400">Get fresh openings matching your passion sent weekly.</p>
            
            <form className="flex gap-2 max-w-md w-full mt-1">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Utility Area */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © 2026 Sereno. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            {
              !session ? (
              <Link href="/signin" className="hover:text-slate-300 transition-colors">Candidate Account</Link>

              ):(
                <span></span>                
              )
            }
            <span className="text-slate-800">|</span>
            <Link href="/jobs" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}