import { Board, Column, JobApplication } from "@/types";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  board: Board;
  columns: Column[];
  applications: JobApplication[];
}

const KanbanBoard = ({ board, columns, applications }: KanbanBoardProps) => {
  return (
    <section className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Board Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{board.name}</h1>
          <p className="text-gray-600 mt-2">Track your job applications</p>
        </div>

        {/* Columns */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4">
          {columns
            .sort((a, b) => a.order - b.order)
            .map((column) => {
              const columnApplications = applications.filter(
                (application) => application.columnId === column._id,
              );

              return (
                <KanbanColumn
                  key={column._id}
                  column={column}
                  applications={columnApplications}
                  columns={columns}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
