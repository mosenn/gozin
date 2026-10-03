import { TitlesResponse } from "../type/movies.type";
import { cacheLife } from 'next/cache';


type GetTitlesParams = {
    page?: number;
    mediaType?: string;
    search?: string;
    genre?: string;
    year?: string;
};

export async function getTitles({ page = 1, mediaType, search, genre, year }: GetTitlesParams): Promise<TitlesResponse> {
    'use cache';

  cacheLife({
    stale: 43200,
    revalidate: 43200,
  });
    try {
        
        const params = new URLSearchParams();
        params.set("page", String(page));

        if (mediaType) {
            params.set("mediaType", mediaType)
        }
        if (search) {
            params.set("search", search);
        }

        if (genre) {
            params.set('genre', genre);
        }

        if (year) {
            params.set('year', year);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/titles?${params.toString()}`)

        if (!res.ok) {

            throw new Error('Failed to fetch titles');
        }
        return res.json()
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}