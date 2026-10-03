'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMovieFilters } from '../hooks/useMovieFilters';

const mediaTypes = ['MOVIE', 'ANIME', 'SERIS', 'KDRAMA'];

function MediaTypeFilter() {
  const { mediaType, setMediaType } = useMovieFilters();

  return (
    <Select value={mediaType} onValueChange={setMediaType}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {mediaTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default MediaTypeFilter;