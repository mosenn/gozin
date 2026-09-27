'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useMovieSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    if (search === urlSearch) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set('search', search);
      } else {
        params.delete('search');
      }

      params.set('page', '1');

      router.push(`/movies?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, urlSearch, router, searchParams]);

  return {
    search,
    setSearch,
  };
}