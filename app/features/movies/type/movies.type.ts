export type Title = {
  id: string;
  mediaType: string;
  titleFa: string | null;
  titleEn: string;
  year: number | null;
  genres: string[];
  country: string;
  director: string | null;
  author: string | null;
  translator: string | null;
  artist: string | null;
  durationMin: number | null;
  pageCount: number | null;
  summary: string;
  posterUrl: string;
  ageRating: number | null;
  avgRating: number | null;
  ratingsCount: number;
  isbn: string | null;
  episodesCount: number | null;
  seasonsCount: number | null;
  createdAt: string;
  updatedAt: string;
};

export type TitlesResponse = {
  items: Title[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};