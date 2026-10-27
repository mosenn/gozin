
import Link from "next/link";
import { Title } from "../type/movies.type";
import { Button } from "@/components/ui/Button";


type Props = {
  movie: Title;
};

function MovieCard({ movie }: Props) {
  return (
    <div className="rounded-lg border p-3">
      <img
        src={movie.posterUrl}
        alt={movie.titleEn}
        className="h-60 w-full rounded object-cover"
      />

      <h2 className="mt-2 font-semibold">{movie.titleEn}</h2>

      <p className="text-sm text-gray-500">{movie.year}</p>

      <Button className="mt-3 w-full rounded bg-black px-3 py-2 text-white">
        <Link href={`/movies/${movie.id}`}> دیدن جزئیات</Link>
       
      </Button>
    </div>
  );
}

export default MovieCard;