'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMovieYear } from '../hooks/useMovieYear';

const years = Array.from(
  { length: new Date().getFullYear() - 1899 },
  (_, index) => String(new Date().getFullYear() - index)
);

function YearFilter() {
  const { year, setYear } = useMovieYear();

  return (
    <Select value={year} onValueChange={setYear}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Year" />
      </SelectTrigger>

      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default YearFilter;