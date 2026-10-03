"use client";

import { JobApplication } from "@/types";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  createJobApplication,
  updateJobApplication,
} from "@/lib/actions/job_application.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JobApplicationDialogProps {
  boardId: string;
  columnId: string;
  mode: "create" | "edit";
  application?: JobApplication;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const JobApplicationDialog = ({
  boardId,
  columnId,
  mode,
  application,
  open: controlledOpen,
  onOpenChange,
}: JobApplicationDialogProps) => {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [salary, setSalary] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [tags, setTags] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (!application) return;

    setCompany(application.company);
    setPosition(application.position);
    setLocation(application.location ?? "");
    setNotes(application.notes ?? "");
    setSalary(application.salary ?? "");
    setJobUrl(application.jobUrl ?? "");
    setTags(application.tags?.join(", ") ?? "");
    setAppliedDate(application.appliedDate ?? "");
  }, [application]);

  const open = controlledOpen ?? internalOpen;
  const handleOpenChange = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const result =
      mode === "create"
        ? await createJobApplication({
            boardId,
            columnId,
            company,
            position,
            location,
            notes,
            salary,
            jobUrl,
            tags: normalizedTags,
            appliedDate,
          })
        : await updateJobApplication({
            jobApplicationId: application!._id,
            company,
            position,
            location,
            notes,
            salary,
            jobUrl,
            tags: normalizedTags,
            appliedDate: appliedDate ? new Date(appliedDate) : undefined,
          });

    if (result?.success) {
      if (mode === "create") {
        toast.success("New Job Application successfully ADDED!");
      } else {
        toast.success("Job Application successfully EDITED!");
      }

      // Once created or updated, clean the form
      setCompany("");
      setPosition("");
      setLocation("");
      setNotes("");
      setSalary("");
      setJobUrl("");
      setTags("");
      setAppliedDate("");

      // Close the Dialog
      handleOpenChange(false);

      // Reset
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!application && (
        <DialogTrigger>
          <Plus className="w-4 h-4 cursor-pointer" />
          Add Application
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "New Job Application"
              : "Edit your Job Application"}
          </DialogTitle>
          {mode === "create" && (
            <DialogDescription>
              Add a new job application to your board
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="min-h-0 flex flex-col">
          <div className="max-h-[65vh] overflow-y-auto space-y-4 pb-6 pr-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input
                id="jobUrl"
                type="text"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="www.joburl.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appliedDate">Applied Date</Label>
              <Input
                id="appliedDate"
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer">
              {mode === "create" ? "Add Application" : "Edit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationDialog;
