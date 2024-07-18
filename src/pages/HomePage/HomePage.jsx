import { useEffect, useState } from 'react';
import { getTrendMovies } from '../../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        const data = await getTrendMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <h3>Trending movies for TODAY</h3>
      {movies.length > 0 && <MovieList items={movies} />}
      {error && <ErrorMessage />}
    </div>
  );
}
