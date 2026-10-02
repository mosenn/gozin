import Image from 'next/image';
import { Title } from '../type/movies.type';
import AddToList from './AddToList';


type Props = {
  movie: Title;
};

function MovieDetail({ movie }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-[280px_1fr]">
      <div>
        <Image
          src={movie.posterUrl}
          alt={movie.titleEn}
          width={280}
          height={420}
          className="w-full rounded-lg object-cover"
        />
      </div>

      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-bold">{movie.titleEn}</h1>

          {movie.titleFa && (
            <p className="mt-2 text-lg text-muted-foreground">
              {movie.titleFa}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-md bg-muted px-3 py-1 text-sm"
            >
              {genre}
            </span>
          ))}
        </div>

        <AddToList movieId={movie.id} />

        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Year</p>
            <p>{movie.year ?? '-'}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Country</p>
            <p>{movie.country || '-'}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Director</p>
            <p>{movie.director || '-'}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Rating</p>
            <p>{movie.avgRating ?? '-'}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Votes</p>
            <p>{movie.ratingsCount}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Age Rating</p>
            <p>{movie.ageRating ?? '-'}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Summary</h2>

          <p className="leading-7 text-muted-foreground">
            {movie.summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;