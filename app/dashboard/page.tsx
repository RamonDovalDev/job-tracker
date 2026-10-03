import { getOrCreateBoard } from "@/lib/actions/board-actions";
import { getJobApplications } from "@/lib/actions/job_application.actions";

const DashboardPage = async () => {
  const data = await getOrCreateBoard();
  if (!data) {
    <div>No board data</div>;
  }

  const applications = await getJobApplications();
  if (!applications) {
    return <div>No applications found</div>;
  }

  const appliedColumn = data.columns.find(
    (column) => column.name === "Applied",
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Job Hunt</h1>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
