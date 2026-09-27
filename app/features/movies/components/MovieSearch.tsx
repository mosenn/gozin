'use client';


import { Input } from '@/components/ui/Input';
import { useMovieSearch } from '../hooks/useMovieSearch';

function MovieSearch() {
  const { search, setSearch } = useMovieSearch();

  return (
    <Input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search movies..."
    />
  );
}

export default MovieSearch;