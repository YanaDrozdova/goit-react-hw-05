import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { HiArrowSmLeft } from 'react-icons/hi';
import clsx from 'clsx';
import { getMovieById } from '../../../movies-api';
import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const location = useLocation();
  // console.log(location);
  const backLinkRef = useRef(location.state ?? '/');

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  // if (!movie) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current}>
        <HiArrowSmLeft />
        Go back
      </Link>
      {error && <ErrorMessage />}
      {loading && <p>Loading...</p>}
      {!loading && movie && (
        <>
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
        </>
      )}
      <div className={css.addInfo}>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast" className={makeNavLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={makeNavLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
