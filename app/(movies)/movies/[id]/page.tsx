import { Suspense } from "react";
import MovieDetail from "@/features/movies/components/MovieDetail";
import { getDetailMovie } from "@/features/movies/services/detailMovie.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function MovieDetailContent({ params }: Props) {
  const { id } = await params;

  const movie = await getDetailMovie(id);

  if (!movie) {
    return null;
  }

  return <MovieDetail movie={movie} />;
}

export default function DetailMoviePage({ params }: Props) {
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات فیلم...</div>}>
      <MovieDetailContent params={params} />
    </Suspense>
  );
}