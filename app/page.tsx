import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import HowItWorks from '@/components/home/HowItWorks'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      {/* Landing Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">school</span>
              <span className="text-xl font-bold tracking-tight text-gray-900">Moraja3aAI</span>
            </div>
            <nav className="hidden md:flex gap-8">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <a key={item} href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-[var(--primary-color)] transition-colors">
                Log in
              </Link>
              <Link href="/dashboard" className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Moraja3aAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
