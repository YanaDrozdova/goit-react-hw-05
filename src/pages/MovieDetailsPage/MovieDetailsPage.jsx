import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiArrowSmLeft } from 'react-icons/hi';
import { getMovieById } from '../../../movies-api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.container}>
      <Link to={'/'}>
        <HiArrowSmLeft />
        Go back
      </Link>
      <div className={css.movieInfo}>
        <div className={css.pictureBox}>
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : 'placeholder_image_url'
            }
            alt={movie.original_title || 'Movie Image'}
          />
        </div>
        <div className={css.textBox}>
          <h3 className={css.title}>{movie.original_title}</h3>
          <h4>User score</h4>
          <p>{movie.vote_average}</p>
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <ul className={css.list}>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.addInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link>Cast</Link>
          </li>
          <li>
            <Link>Reviews</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
