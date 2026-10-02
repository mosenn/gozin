import MovieDetail from "@/features/movies/components/MovieDetail";
import { getDetailMovie } from "@/features/movies/services/detailMovie.service";

type Props = {
  params:Promise<{
    id:string;
  }>
}

async function DetailMoviePage({params}:Props) {
  const {id} = await params;
  const movie = await getDetailMovie(id)
  
  
  return (
    <MovieDetail movie={movie} />
  )
}

export default DetailMoviePage