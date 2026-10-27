import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockProfile: {
  data: {
    data: {
      id: string;
      email: string;
      role: "USER" | "ADMIN";
    };
    message: string;
    statusCode: number;
  } | undefined;
  isLoading: boolean;
  isError: boolean;
} = {
  data: undefined,
  isLoading: true,
  isError: false,
};

vi.mock("@/features/auth/services/ProfileAction", () => ({
  useGetProfileQuery: () => mockProfile,
}));
const mockLogout = vi.fn();
vi.mock("@/features/auth/services/LogoutAction", () => ({
  useLogoutMutation: () => [mockLogout, { isLoading: false }],
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));
const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

import UserAuth from "../features/auth/components/UserAuth";

describe("UserAuth", () => {
  it("should show loading state", () => {
    render(<UserAuth />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should show login and register links when user is not authenticated",()=>{
     mockProfile.isLoading = false;
  mockProfile.data = undefined;
  mockProfile.isError = true;
  render(<UserAuth />)
  expect(screen.getByRole("link", { name: "ورود" })).toHaveAttribute(
    "href",
    "/login"
  );
  expect(screen.getByRole("link",{name:"ثبت نام"})).toHaveAttribute("href", "/register")
  });
  it("should show user information when user is authenticated", () => {
  mockProfile.isLoading = false;
  mockProfile.isError = false;
  mockProfile.data = {
    data: {
      id: "1",
      email: "test@test.com",
      role: "USER",
    },
    message: "اطلاعات پروفایل با موفقیت دریافت شد",
    statusCode: 200,
  };

  render(<UserAuth />);

  expect(screen.getByText("test@test.com")).toBeInTheDocument();
  expect(screen.getByText("USER")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "خروج" })
  ).toBeInTheDocument();
});
it("should logout and redirect to login", async () => {
  mockLogout.mockReturnValue({
    unwrap: () => Promise.resolve(),
  });

  render(<UserAuth />);

  fireEvent.click(screen.getByRole("button", { name: "خروج" }));

  await waitFor(() => {
    expect(mockLogout).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });
});
});