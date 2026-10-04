"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getOrCreateBoard } from "@/lib/actions/board-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateBoardForm = () => {
  const router = useRouter();

  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    try {
      const result = await getOrCreateBoard(boardName);

      if (!result) {
        setError("Please, enter a board name and try again");
        return;
      }

      toast.success("Job Board successfully CREATED!");
      router.refresh();
    } catch (error) {
      setError("Coul not create the board. Please, ty again");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-sky-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-900">
          Create your new job board
        </CardTitle>
        <CardDescription className="text-slate-600">
          Choose a name to organiza your job applications
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="p-4">
        <CardContent className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label>Board </Label>
            <Input
              id="boardName"
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Your board name"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer mt-4"
          >
            {isPending ? "Creating board..." : "Create Board"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default CreateBoardForm;
