import MovieCard from "@/features/movies/components/MovieCard";
import { getTitles } from "@/features/movies/services/movies.service"
import MoviesPagination from './../../features/movies/components/MoviesPagination';
import MediaTypeFilter from './../../features/movies/components/MediaTypeFilter';
import MovieSearch from "@/features/movies/components/MovieSearch";
import GenreFilter from "@/features/movies/components/GenreFilter";
import YearFilter from "@/features/movies/components/YearFilter";

type Props = {
    searchParams : Promise<{
    page?: string;
     mediaType?: string;
     search?:string;
     genre?:string;
     year?:string;

  }>;
}


async function MoviesPage({searchParams}:Props) {
const params = await searchParams;
  const page = Number(params.page) || 1;
  const mediaType = params.mediaType;
  const search = params.search;
  const genre = params.genre;
  const year = params.year;
    
    const movies = await getTitles({page,mediaType,search,genre,year})

    
   
    
  return (
    <div  className="mt-6" >
      

     
        
    
     

      {movies.items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {movies.items.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <MoviesPagination
            currentPage={movies.meta.page}
            totalPages={movies.meta.totalPages}
          />
        </>
      ) : (
        <p>No movies found.</p>
      )}
        <MovieSearch />
        <MediaTypeFilter />
        <GenreFilter />
        <YearFilter />
   </div>
  )
}

export default MoviesPage