import { JobApplication } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { deleteJobApplication } from "@/lib/actions/job_application.actions";
import { toast } from "sonner";

interface DeleteJobApplicationDialog {
  application: JobApplication;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteJobApplicationDialog = ({
  application,
  open,
  onOpenChange,
}: DeleteJobApplicationDialog) => {
  const router = useRouter();

  const handleDeleteApplication = async () => {
    const result = await deleteJobApplication({
      jobApplicationId: application._id,
    });

    if (result?.success) {
      toast.success("Job Application successfully DELETED!");

      onOpenChange(false);
      router.refresh();
    } else {
      toast.error("Error deleting Job Application");
      return;
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete job application?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete the application for{" "}
            <strong>{application.company}</strong>- {application.position}? This
            action can't be undone
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDeleteApplication}>
            Delete Application
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJobApplicationDialog;
