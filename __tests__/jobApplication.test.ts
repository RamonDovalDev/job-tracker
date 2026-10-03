import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/better-auth/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

vi.mock("@/lib/mongo/mongo", () => ({
  connectDB: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

vi.mock("@/lib/mongo/models/jobApplication", () => ({
  default: {
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
  },
}));

import { auth } from "@/lib/better-auth/auth";
import { connectDB } from "@/lib/mongo/mongo";
import { updateJobApplication } from "@/lib/actions/job_application.actions";
import jobApplication from "@/lib/mongo/models/jobApplication";

describe("updateJobApplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should reject the update when there is no authenticated user", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null);

    const result = await updateJobApplication({
      jobApplicationId: "fake-job-id",
      company: "New Company",
    });

    expect(result).toBeNull();
    expect(connectDB).not.toHaveBeenCalled();
  });

  it("should reject updating a job application that belongs to another user", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: "user-a",
      },
    } as any);

    vi.mocked(jobApplication.findOne).mockResolvedValue(null);

    const result = await updateJobApplication({
      jobApplicationId: "application-of-user-b",
      company: "New Company",
    });

    expect(result).toBeNull();

    expect(jobApplication.findOne).toHaveBeenCalledWith({
      _id: "application-of-user-b",
      userId: "user-a",
    });

    expect(jobApplication.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it("should update a job application that belongs to the authenticated user", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: {
        id: "user-a",
      },
    } as any);

    vi.mocked(jobApplication.findOne).mockResolvedValue({
      _id: "application-of-user-a",
      userId: "user-a",
    } as any);

    vi.mocked(jobApplication.findOneAndUpdate).mockResolvedValue({} as any);

    const result = await updateJobApplication({
      jobApplicationId: "application-of-user-a",
      company: "Updated Company",
      position: "Frontend Developer",
    });

    expect(result).toEqual({
      success: true,
    });

    expect(jobApplication.findOne).toHaveBeenCalledWith({
      _id: "application-of-user-a",
      userId: "user-a",
    });

    expect(jobApplication.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: "application-of-user-a",
        userId: "user-a",
      },
      {
        company: "Updated Company",
        position: "Frontend Developer",
      },
      {
        returnDocument: "after",
      },
    );
  });
});
