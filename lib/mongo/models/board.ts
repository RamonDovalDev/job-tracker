import mongoose, { Document, Schema } from "mongoose";

export interface IBoard extends Document {
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);
