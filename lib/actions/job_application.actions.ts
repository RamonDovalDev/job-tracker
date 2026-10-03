"use server";

import { auth } from "../better-auth/auth";
import { connectDB } from "../mongo/mongo";
import { headers } from "next/headers";
import Board from "@/lib/mongo/models/board";
import Column from "@/lib/mongo/models/column";
import JobApplication from "@/lib/mongo/models/jobApplication";

export const getJobApplications = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const userId = session.user.id;

  await connectDB();

  const jobApplications = await JobApplication.find({
    userId,
  });

  return jobApplications;
};

export const createJobApplication = async ({
  boardId,
  columnId,
  company,
  position,
  location,
  notes,
  salary,
  jobUrl,
  tags,
  appliedDate,
}: {
  boardId: string;
  columnId: string;
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  appliedDate?: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const userId = session.user.id;

  await connectDB();

  const board = await Board.findOne({
    _id: boardId,
    userId,
  });

  if (!board) return null;

  const column = await Column.findOne({
    _id: columnId,
    boardId,
  });

  if (!column) return null;

  const jobApplication = await JobApplication.create({
    userId,
    boardId,
    columnId,
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    tags,
    appliedDate: appliedDate ? new Date(appliedDate) : undefined,
  });

  return {
    success: true,
  };
};

export const updateJobApplication = async ({
  jobApplicationId,
  company,
  position,
  location,
  notes,
  salary,
  jobUrl,
  appliedDate,
  tags,
  description,
}: {
  jobApplicationId: string;
  company?: string;
  position?: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  appliedDate?: Date;
  tags?: string[];
  description?: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const userId = session.user.id;

  await connectDB();

  const updates = Object.fromEntries(
    Object.entries({
      company,
      position,
      location,
      notes,
      salary,
      jobUrl,
      appliedDate,
      tags,
      description,
    }).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(updates).length === 0) {
    return null;
  }

  const jobApplication = await JobApplication.findOne({
    _id: jobApplicationId,
    userId,
  });

  if (!jobApplication) return null;

  const updatedJobApplication = await JobApplication.findOneAndUpdate(
    {
      _id: jobApplicationId,
      userId,
    },
    updates,
    {
      returnDocument: "after",
    },
  );

  return {
    success: true,
  };
};

export const moveJobApplication = async ({
  jobApplicationId,
  targetColumnId,
}: {
  jobApplicationId: string;
  targetColumnId: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const userId = session.user.id;

  await connectDB();

  // Search the application and check if it belongs to the user
  const jobApplication = await JobApplication.findOne({
    _id: jobApplicationId,
    userId,
  });

  if (!jobApplication) return null;

  // Check targetColumn belongs to the board
  const targetColumn = await Column.findOne({
    _id: targetColumnId,
    boardId: jobApplication.boardId,
  });

  if (!targetColumn) return null;

  // Move the application
  const movedJobApplication = await JobApplication.findOneAndUpdate(
    {
      _id: jobApplicationId,
      userId,
    },
    {
      columnId: targetColumnId,
    },
  );

  return { success: true };
};

export const deleteJobApplication = async ({
  jobApplicationId,
}: {
  jobApplicationId: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const userId = session.user.id;

  await connectDB();

  // Search and delete only if it belng to the user
  const deletedJobApplication = await JobApplication.findOneAndDelete({
    _id: jobApplicationId,
    userId,
  });

  if (!deletedJobApplication) return null;

  return { success: true };
};
