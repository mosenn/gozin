'use client';

import { FormEvent, useState } from 'react';

import {
  getProfile,
  login,
  register,
} from '@/features/auth/api/authApi';

type Result = unknown;

export default function LoginPage() {
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  // -------------------------
  // Register
  // -------------------------

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const age = Number(formData.get('age'));

    try {
      setLoading(true);
      setResult(null);

      const data = await register({
        email,
        password,
        age,
      });

      setResult(data);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Login
  // -------------------------

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setLoading(true);
      setResult(null);

      const data = await login({
        email,
        password,
      });

      setResult(data);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Profile
  // -------------------------

  const handleProfile = async () => {
    try {
      setLoading(true);
      setResult(null);

      const data = await getProfile();

      setResult(data);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Error Handler
  // -------------------------

  const handleError = (error: unknown) => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error
    ) {
      const axiosError = error as {
        response?: {
          data?: unknown;
        };
        message?: string;
      };

      setResult(
        axiosError.response?.data ||
          axiosError.message ||
          'Something went wrong',
      );

      return;
    }

    setResult('Something went wrong');
  };

  return (
    <main className="min-h-screen  p-10">
      <div className="mx-auto max-w-4xl space-y-8">

        <h1 className="text-3xl font-bold">
          Auth API Test
        </h1>

        {/* ========================= */}
        {/* Register */}
        {/* ========================= */}

        <section className="rounded-xl  p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Register
          </h2>

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 block">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="admin@example.com"
                defaultValue="admin@example.com"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Password"
                defaultValue="Aw2$377778admin"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block">
                Age
              </label>

              <input
                name="age"
                type="number"
                placeholder="25"
                defaultValue="25"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
          </form>
        </section>

        {/* ========================= */}
        {/* Login */}
        {/* ========================= */}

        <section className="rounded-xl  p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <div>
              <label className="mb-1 block">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="admin@example.com"
                defaultValue="admin@example.com"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Password"
                defaultValue="Aw2$377778admin"
                required
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded bg-green-600 px-5 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </section>

        {/* ========================= */}
        {/* Profile */}
        {/* ========================= */}

        <section className="rounded-xl  p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">
            Profile
          </h2>

          <button
            onClick={handleProfile}
            disabled={loading}
            className="rounded bg-purple-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Profile'}
          </button>
        </section>

        {/* ========================= */}
        {/* Result */}
        {/* ========================= */}

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            API Response
          </h2>

          <pre className="overflow-auto rounded-xl bg-gray-900 p-5 text-sm text-white">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>

      </div>
    </main>
  );
}