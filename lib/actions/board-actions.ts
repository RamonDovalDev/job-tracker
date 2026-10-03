"use server";

import { headers } from "next/headers";
import mongoose from "mongoose";
import { auth } from "../better-auth/auth";
import { connectDB } from "../mongo/mongo";
import Board from "@/lib/mongo/models/board";
import Column from "@/lib/mongo/models/column";

const createDefaultColumns = (boardId: mongoose.Types.ObjectId) =>
  Column.insertMany([
    { name: "Applied", boardId, order: 0 },
    { name: "Interview", boardId, order: 1 },
    { name: "Offer", boardId, order: 2 },
    { name: "Rejected", boardId, order: 3 },
  ]);

export const getOrCreateBoard = async (name?: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return null;

  const userId = session.user.id;

  await connectDB();

  let board = await Board.findOne({
    userId,
  });

  if (!board) {
    const boardName = name?.trim();
    if (!boardName) return null;

    board = await Board.create({
      name: boardName,
      userId,
    });

    await createDefaultColumns(board._id);
  }

  const columns = await Column.find({
    boardId: board._id,
  }).sort({ order: 1 });

  return {
    board: {
      _id: board._id.toString(),
      name: board.name,
      userId: board.userId,
    },
    columns: columns.map((column) => ({
      _id: column._id.toString(),
      name: column.name,
      boardId: column.boardId.toString(),
      order: column.order,
    })),
  };
};
