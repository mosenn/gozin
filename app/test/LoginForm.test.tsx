
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));
const mockLogin = vi.fn();
vi.mock("@/features/auth/services/LoginAction", () => ({
    useLoginMutation: () => [mockLogin],
}));

const mockErrorToast = vi.hoisted(() => vi.fn());
const mockSuccessToast = vi.hoisted(() => vi.fn());

vi.mock("react-toastify", () => ({
  toast: {
    error: mockErrorToast,
    success: mockSuccessToast,
  },
}));;

import LoginForm from './../features/auth/components/loginForm';

describe("LoginForm", () => {
    it("should render login form", () => {
        render(<LoginForm />);

        expect(screen.getByPlaceholderText("ایمیل خود را وارد کنید")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("رمز خود را وارد کنید")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "ورود" })).toBeInTheDocument();
    });
    it("should show validation errors when form is submitted empty", async () => {
        render(<LoginForm />);

        const form = document.querySelector("form");

        fireEvent.submit(form!);
        expect(
            await screen.findByText("لطفاً یک ایمیل معتبر وارد کنید")
        ).toBeInTheDocument();

        expect(
            await screen.findByText("رمز عبور باید حداقل ۸ کاراکتر باشد")
        ).toBeInTheDocument();
    });
    it("should login successfully", async () => {
        mockLogin.mockReturnValue({
            unwrap: () =>
                Promise.resolve({
                    user: {
                        email: "test@test.com",
                    },
                    message: "ورود موفق بود",
                }),
        });

        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText("ایمیل خود را وارد کنید");
        const passwordInput = screen.getByPlaceholderText("رمز خود را وارد کنید");

        fireEvent.change(emailInput, {
            target: { value: "test@test.com" },
        });

        fireEvent.change(passwordInput, {
            target: { value: "Password123!" },
        });
        const form = document.querySelector("form");

        fireEvent.submit(form!);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: "test@test.com",
                password: "Password123!",
            });
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/");
        });
    });

    it("should show API error message", async () => {
  mockLogin.mockReturnValue({
    unwrap: () =>
      Promise.reject({
        data: {
          message: "ایمیل یا رمز عبور اشتباه است",
        },
      }),
  });

  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText("ایمیل خود را وارد کنید");
  const passwordInput = screen.getByPlaceholderText("رمز خود را وارد کنید");

  fireEvent.change(emailInput, {
    target: { value: "test@test.com" },
  });

  fireEvent.change(passwordInput, {
    target: { value: "Password123!" },
  });

  const form = document.querySelector("form");

  fireEvent.submit(form!);

  await waitFor(() => {
    expect(mockErrorToast).toHaveBeenCalledWith(
      "ایمیل یا رمز عبور اشتباه است"
    );
  });
});
it("should show default error message", async () => {
  mockLogin.mockReturnValue({
    unwrap: () =>
      Promise.reject({
        data: {},
      }),
  });

  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText("ایمیل خود را وارد کنید");
  const passwordInput = screen.getByPlaceholderText("رمز خود را وارد کنید");

  fireEvent.change(emailInput, {
    target: { value: "test@test.com" },
  });

  fireEvent.change(passwordInput, {
    target: { value: "Password123!" },
  });

  const form = document.querySelector("form");

  fireEvent.submit(form!);

  await waitFor(() => {
    expect(mockErrorToast).toHaveBeenCalledWith("ورود ناموفق بود");
  });
});

});