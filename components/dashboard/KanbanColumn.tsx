import { Column, JobApplication } from "@/types";
import JobApplicationCard from "./JobApplicationCard";

interface KanbanColumnProps {
  column: Column;
  applications: JobApplication[];
  columns: Column[];
}

const KanbanColumn = ({ column, applications, columns }: KanbanColumnProps) => {
  return (
    <div className="min-h-75 flex flex-col bg-sky-50/70 rounded-2xl border border-sky-100 p-4">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-900">{column.name}</h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-sm font-medium text-slate-500 shadow-sm">
          {applications.length}
        </span>
      </div>

      {/* Applications */}
      <div className="flex flex-col gap-3">
        {applications.map((application) => (
          <JobApplicationCard
            key={application._id}
            application={application}
            columns={columns}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
