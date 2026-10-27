
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi,beforeEach } from "vitest";

const mockReplace = vi.fn();
const mockPathname = vi.fn(() => "/dashboard");
const mockProfile = {
  data: {
    data: {
      id: "1",
      email: "test@test.com",
      role: "USER",
    },
    message: "اطلاعات پروفایل با موفقیت دریافت شد",
    statusCode: 200,
  },
  isLoading: false,
  isError: false,
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => mockPathname(),
}));

vi.mock("@/features/auth/services/ProfileAction", () => ({
  useGetProfileQuery: () => mockProfile,
}));

beforeEach(() => {
  mockProfile.isError = false;
  mockProfile.data.data.role = "USER";
  mockPathname.mockReturnValue("/dashboard");
  mockReplace.mockClear();
});

import AuthProvider from './../provider/AuthProvider';




describe("AuthProvider", () => {
  it("should render children when user is authenticated", () => {
    render(
      <AuthProvider>
        <div>Dashboard Content</div>
      </AuthProvider>
    );

    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated", async () => {
    mockProfile.isError = true;
   

    render(
      <AuthProvider>
        <div>Dashboard Content</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });

    expect(screen.queryByText("Dashboard Content")).not.toBeInTheDocument();
  });
  it("should redirect USER from admin page to dashboard", async () => {

  mockPathname.mockReturnValue("/admin");

  render(
    <AuthProvider>
      <div>Admin Content</div>
    </AuthProvider>
  );

  await waitFor(() => {
    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
  });

  expect(screen.queryByText("Admin Content")).not.toBeInTheDocument();
});
it("should render children when ADMIN accesses admin page", () => {
  mockProfile.data.data.role = "ADMIN";
  mockPathname.mockReturnValue("/admin");

  render(
    <AuthProvider>
      <div>Admin Content</div>
    </AuthProvider>
  );

  expect(screen.getByText("Admin Content")).toBeInTheDocument();
});
});