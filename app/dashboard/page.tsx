import CreateBoardForm from "@/components/dashboard/CreateBoardForm";
import JobApplicationDialog from "@/components/dashboard/JobApplicationDialog";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import { getOrCreateBoard } from "@/lib/actions/board-actions";
import { getJobApplications } from "@/lib/actions/job_application.actions";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/sign-in");
  }

  const data = await getOrCreateBoard();
  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <CreateBoardForm />
        </div>
      </main>
    );
  }

  const applications = await getJobApplications();
  if (!applications) {
    return <div>Applications not found</div>;
  }

  const appliedColumn = data.columns.find(
    (column) => column.name === "Applied",
  );
  if (!appliedColumn) {
    return <div>"Applied coLumn" not found</div>;
  }

  const normalizedBoard = {
    _id: data.board._id.toString(),
    name: data.board.name,
    userId: data.board.userId,
  };

  const normalizedColumns = data.columns.map((column) => ({
    _id: column._id.toString(),
    name: column.name,
    boardId: column.boardId.toString(),
    order: column.order,
  }));

  const normalizedApplications = applications.map((application) => ({
    _id: application._id.toString(),
    userId: application.userId,
    boardId: application.boardId.toString(),
    columnId: application.columnId.toString(),
    company: application.company,
    position: application.position,
    location: application.location ?? "",
    notes: application.notes ?? "",
    salary: application.salary ?? "",
    jobUrl: application.jobUrl ?? "",
    tags: application.tags ?? [],
    appliedDate: application.appliedDate
      ? application.appliedDate.toISOString().split("T")[0]
      : "",
    order: application.order,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pt-24 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {normalizedBoard.name}
          </h1>

          <JobApplicationDialog
            boardId={normalizedBoard._id}
            columnId={appliedColumn._id.toString()}
            mode="create"
          />
        </div>

        <KanbanBoard
          board={normalizedBoard}
          columns={normalizedColumns}
          applications={normalizedApplications}
        />
      </div>
    </main>
  );
};

export default DashboardPage;
