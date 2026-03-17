import Link from "next/link";
import { ArrowRight, Globe, Layers, Clock, Map } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 overflow-x-hidden transition-colors">
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>
      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        {/* Background Mesh Gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08),_transparent_70%)] blur-3xl" />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm transition-all hover:border-zinc-300">
            <Globe className="h-3 w-3 text-blue-500" />
            <span>Discover Earth's History</span>
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-7xl">
            Explore the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent italic">Deep Time</span> Timeline
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400 md:text-xl">
            Journey through billions of years of history. From the formation of Earth to the rise and fall of dinosaurs, 
            explore our planet&apos;s geological epochs in an interactive, stunningly designed flow interface.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#learn-more"
              className="inline-flex h-12 items-center justify-center px-8 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <section id="learn-more" className="bg-zinc-50 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-start text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900">Hierarchical Exploration</h3>
              <p className="mt-2 text-zinc-600 leading-relaxed">
                Dive deep into Eons, Eras, Periods, and Epochs. Our interactive tree visualization makes complex geological scales intuitive.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900">Million-Year Precision</h3>
              <p className="mt-2 text-zinc-600 leading-relaxed">
                Accurate time ranges for every geological unit, synchronized across the entire timeline of Earth's 4.6 billion year history.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shadow-sm">
                <Map className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900">Interactive Map Flow</h3>
              <p className="mt-2 text-zinc-600 leading-relaxed">
                Built with a sophisticated node-based engine, allowing you to expand and collapse the tree to focus on specific historical segments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="mt-auto border-t border-zinc-100 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            <span className="font-bold tracking-tight text-zinc-900">ChronoEarth</span>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} ChronoEarth. Designed for deep time exploration.
          </p>
          <div className="flex gap-6 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Github</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Feedback</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
