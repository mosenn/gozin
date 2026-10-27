'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function useMovieYear() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const year = searchParams.get('year') || '';

  const setYear = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('year', value);
    params.set('page', '1');

    router.push(`/movies?${params.toString()}`);
  };

  return {
    year,
    setYear,
  };
}