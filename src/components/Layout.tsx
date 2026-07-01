import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-slate-900 transition-colors hover:text-blue-600"
          >
            Creator Search
          </Link>

          {title && (
            <span className="hidden text-sm font-medium text-slate-500 md:block">
              {title}
            </span>
          )}

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-8">
        {children}
      </main>
    </div>
  );
}