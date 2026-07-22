import { auth, signIn } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function SignIn() {
    const session = await auth()
    if (session){
      redirect("/")
    }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative subtle ambient glows in background to keep the premium "Sereno" feel */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto w-full sm:max-w-md z-10 px-4">
        <div className="text-center">
          <Link href="/" className="inline-block text-white font-bold text-3xl tracking-wide">
            Sereno<span className="text-emerald-400">.</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Continue matching your potential with passion.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900 py-8 px-4 border border-slate-800 shadow-2xl rounded-2xl sm:px-10">
          
          {/* SOCIAL SIGN IN BUTTONS */}
          <div className="grid grid-cols-2 gap-3">
            {/* GOOGLE BUTTON */}
           
                <form
                action={ async() => {
                  "use server"
                  await signIn("google")
                }}
                className="flex justify-center items-center gap-2 px-3 py-3 bg-white hover:bg-slate-50 text-slate-900 text-sm font-semibold rounded-xl transition-colors shadow-sm focus:outline-none"
              >
                 <button
              type="submit"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="hidden xs:inline">Google</span>
            </button>
              </form>

            {/* GITHUB BUTTON */}
               <form
                    action={async () => {
                      "use server"
                      await signIn("github")
                    }}
                   className="flex justify-center items-center gap-2 px-3 py-3 bg-slate-950 hover:bg-slate-900 text-white border border-slate-800 text-sm font-semibold rounded-xl transition-colors shadow-sm focus:outline-none"
                  >
                  <button
              type="submit"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="hidden xs:inline">GitHub</span>
            </button>
              </form>
          </div>

          {/* DIVIDER LINE */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm font-medium">
              <span className="bg-slate-900 px-3 text-slate-500">Or credentials</span>
            </div>
          </div>

          {/* STANDARD SIGN IN FORM */}
          <form className="space-y-5 mt-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled
                  placeholder="you@example.com"
                  className="disabled:cursor-not-allowed w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Link href="#" className="cursor-not-allowed text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled
                  placeholder="••••••••"
                  className="disabled:cursor-not-allowed w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled
                className="disabled:cursor-not-allowed w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-500/20 focus:outline-none"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* BOTTOM UTILITY ROUTE LINK */}
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-400">Don&apos;t have an account? </span>
            <Link href="#" className="cursor-not-allowed font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}