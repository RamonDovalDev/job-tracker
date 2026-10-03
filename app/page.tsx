import ImageTabs from "@/components/ImageTabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.45),transparent_55%)]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl rounded-3xl border border-sky-100 bg-white/80 px-8 py-16 text-center shadow-[0_20px_60px_-20px_rgba(37,99,235,0.25)] backdrop-blur sm:px-12">
            <h1 className="mb-6 text-5xl font-bold text-slate-900 sm:text-6xl">
              A better way to track your job application
            </h1>
            <p className="mb-10 text-xl text-slate-600">
              Capture, organize and manage your job search in one place
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-12 bg-sky-600 px-8 text-lg font-medium text-white shadow-lg shadow-sky-200 hover:bg-sky-700"
                >
                  Start for free
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-slate-500">
                Free forever. Not credit card requored
              </p>
            </div>
          </div>
        </section>

        {/* Hero images section with tabs */}
        <ImageTabs />

        {/* Features section */}
        <section className="border-t border-sky-100 bg-sky-50/70 py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                  <Briefcase className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                  Organize Applications
                </h3>
                <p className="text-slate-600">
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>
              <div className="flex flex-col rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                  <TrendingUp className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                  Track Progress
                </h3>
                <p className="text-slate-600">
                  Monitor your application status from applied to interview to
                  offer with visual Kanban boards.
                </p>
              </div>
              <div className="flex flex-col rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                  <CheckCircle2 className="h-6 w-6 text-sky-600" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                  Stay Organized
                </h3>
                <p className="text-slate-600">
                  Never lose track of an application. Keep all your job search
                  information in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
