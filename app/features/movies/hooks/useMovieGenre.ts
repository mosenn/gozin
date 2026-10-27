'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function useMovieGenre() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const genre = searchParams.get('genre') || '';

  const setGenre = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('genre', value);
    params.set('page', '1');

    router.push(`/movies?${params.toString()}`);
  };

  return {
    genre,
    setGenre,
  };
}