"use client";

import { Column, JobApplication } from "@/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { moveJobApplication } from "@/lib/actions/job_application.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MoveApplicationDialogProps {
  application: JobApplication;
  columns: Column[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MoveJobApplicationDialog = ({
  application,
  columns,
  open,
  onOpenChange,
}: MoveApplicationDialogProps) => {
  const router = useRouter();
  const [selectedColumnId, setSelectedColumnId] = useState(
    application.columnId,
  );

  const handleMoveApplication = async () => {
    const result = await moveJobApplication({
      jobApplicationId: application._id,
      targetColumnId: selectedColumnId,
    });

    if (result?.success) {
      toast.success(
        "Job Application successfully MOVED to the selected column!",
      );
      onOpenChange(false);

      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move your Job Application</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pb-4">
          {columns
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <Button
                key={column._id}
                variant={
                  selectedColumnId === column._id ? "default" : "outline"
                }
                className="w-full justify-start cursor-pointer"
                onClick={() => setSelectedColumnId(column._id)}
              >
                <span>{column.name}</span>
                {selectedColumnId === column._id && <span>✓</span>}
              </Button>
            ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={handleMoveApplication} className="cursor-pointer">
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoveJobApplicationDialog;
