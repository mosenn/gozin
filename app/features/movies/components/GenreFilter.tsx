'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMovieGenre } from '../hooks/useMovieGenre';

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Politics',
  'Reality',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western',
];

function GenreFilter() {
  const { genre, setGenre } = useMovieGenre();

  return (
    <Select value={genre} onValueChange={setGenre}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Genre" />
      </SelectTrigger>

      <SelectContent>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default GenreFilter;