import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getMovies } from '../../../movies-api';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className={css.container}>
      <h3>Trending movies for TODAY</h3>
      {movies.length > 0 && <MovieList items={movies} />}
    </div>
  );
}
