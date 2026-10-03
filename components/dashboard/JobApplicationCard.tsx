"use client";

import { Column, JobApplication } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import JobApplicationDialog from "./JobApplicationDialog";
import MoveJobApplicationDialog from "./MoveJobApplicationDialog";
import DeleteJobApplicationDialog from "./DeleteJobApplicationDialog";

interface JobApplicationCardProps {
  application: JobApplication;
  columns: Column[];
}

const JobApplicationCard = ({
  application,
  columns,
}: JobApplicationCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <article className="bg-white rounded-xl border border-sky-100 p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Company & Position */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            {application.company}
          </h3>
          <p className="text-sm text-slate-600 mt-1">{application.position}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setEditOpen(true)}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMoveOpen(true)}
              className="cursor-pointer"
            >
              Move
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Location */}
      {application.location && (
        <p className="mt-4 text-sm text-slate-500">📍 {application.location}</p>
      )}

      {/* Salary */}
      {application.salary && (
        <p className="mt-2 text-sm text-slate-500"> 💰 {application.salary}</p>
      )}

      {/* Applied Date */}
      {application.appliedDate && (
        <p className="mt-2 text-xs text-slate-400">
          Applied {application.appliedDate}
        </p>
      )}

      {/* Tags */}
      {application.tags && application.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {application.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {editOpen && (
        <JobApplicationDialog
          boardId={application.boardId}
          columnId={application.columnId}
          mode="edit"
          application={application}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}

      {moveOpen && (
        <MoveJobApplicationDialog
          columns={columns}
          application={application}
          open={moveOpen}
          onOpenChange={setMoveOpen}
        />
      )}

      {deleteOpen && (
        <DeleteJobApplicationDialog
          application={application}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
        />
      )}
    </article>
  );
};

export default JobApplicationCard;
