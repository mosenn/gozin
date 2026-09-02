
'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';

import {
  getProfile,
  login,
  register,
} from '@/features/auth/api/authApi';

type ApiResult = {
  success: boolean;
  status?: number;
  message?: string | string[];
  data?: unknown;
};

export default function LoginPage() {
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // Error Handler
  // =========================

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      setResult({
        success: false,
        status,
        message:
          data?.message ||
          error.message ||
          'Request failed',
        data,
      });

      return;
    }

    if (error instanceof Error) {
      setResult({
        success: false,
        message: error.message,
      });

      return;
    }

    setResult({
      success: false,
      message: 'Something went wrong',
    });
  };

  // =========================
  // Register
  // =========================

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get('register-email') || '');
    const password = String(
      formData.get('register-password') || '',
    );
    const age = Number(
      formData.get('register-age'),
    );

    try {
      setLoading(true);
      setResult(null);

      const data = await register({
        email,
        password,
        age,
      });

      setResult({
        success: true,
        status: 200,
        message: 'Registration successful',
        data,
      });

      form.reset();
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Login
  // =========================

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(
      formData.get('login-email') || '',
    );

    const password = String(
      formData.get('login-password') || '',
    );

    try {
      setLoading(true);
      setResult(null);

      const data = await login({
        email,
        password,
      });

      setResult({
        success: true,
        status: 200,
        message: 'Login successful',
        data,
      });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Profile
  // =========================

  const handleProfile = async () => {
    try {
      setLoading(true);
      setResult(null);

      const data = await getProfile();

      setResult({
        success: true,
        status: 200,
        message: 'Profile fetched successfully',
        data,
      });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-4xl space-y-8">

        <h1 className="text-3xl font-bold">
          Auth API Test
        </h1>

        {/* ========================= */}
        {/* Register */}
        {/* ========================= */}

        <section className="rounded-xl p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Register
          </h2>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="register-email"
                className="mb-1 block"
              >
                Email
              </label>

              <input
                id="register-email"
                name="register-email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="mb-1 block"
              >
                Password
              </label>

              <input
                id="register-password"
                name="register-password"
                type="password"
                placeholder="Enter your password"
                required
                minLength={8}
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="register-age"
                className="mb-1 block"
              >
                Age
              </label>

              <input
                id="register-age"
                name="register-age"
                type="number"
                placeholder="Enter your age"
                required
                min={1}
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Register'}
            </button>
          </form>
        </section>

        {/* ========================= */}
        {/* Login */}
        {/* ========================= */}

        <section className="rounded-xl p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="login-email"
                className="mb-1 block"
              >
                Email
              </label>

              <input
                id="login-email"
                name="login-email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1 block"
              >
                Password
              </label>

              <input
                id="login-password"
                name="login-password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-green-600 px-5 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Login'}
            </button>
          </form>
        </section>

        {/* ========================= */}
        {/* Profile */}
        {/* ========================= */}

        <section className="rounded-xl p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Profile
          </h2>

          <button
            type="button"
            onClick={handleProfile}
            disabled={loading}
            className="rounded bg-purple-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Get Profile'}
          </button>
        </section>

        {/* ========================= */}
        {/* Result */}
        {/* ========================= */}

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            API Response
          </h2>

          {result && (
            <div className="mb-4 rounded-xl border p-4">
              <div className="flex gap-4">
                <strong>
                  Status:
                </strong>

                <span>
                  {result.status ?? 'Unknown'}
                </span>
              </div>

              <div className="mt-2">
                <strong>
                  Message:
                </strong>

                <pre className="mt-2 whitespace-pre-wrap">
                  {typeof result.message === 'string'
                    ? result.message
                    : JSON.stringify(
                        result.message,
                        null,
                        2,
                      )}
                </pre>
              </div>
            </div>
          )}

          <pre className="overflow-auto rounded-xl bg-gray-900 p-5 text-sm text-white">
            {result
              ? JSON.stringify(result, null, 2)
              : 'No response yet.'}
          </pre>
        </section>

      </div>
    </main>
  );
}
