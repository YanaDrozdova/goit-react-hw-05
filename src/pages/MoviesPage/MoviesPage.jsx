import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { getMoviesByTitle } from '../../../movies-api';
import { useEffect, useMemo, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleFilter = searchParams.get('title') ?? ''; // якщо в параметрах URL буде null або
  //undefined,то завдяки операнду "??" нам повернеться пустий рядок

  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState(titleFilter);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!titleFilter.trim()) {
      return;
    }
    async function fetchMovies() {
      try {
        setErrorMessage('');
        setError(false);
        const data = await getMoviesByTitle(titleFilter);
        setMovies(data);
        if (data.length === 0) {
          setErrorMessage('Please enter the correct movie title');
        }
        console.log(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchMovies();
  }, [titleFilter]);

  const handleInputChange = e => {
    setInputValue(e.target.value);
    setErrorMessage('');
  };

  const handleSearch = () => {
    setMovies([]);

    if (!inputValue.trim()) {
      setErrorMessage('Please enter a search term');
      return;
    }
    searchParams.set('title', inputValue);
    setSearchParams(searchParams);
    setInputValue('');
  };

  const filteredMovies = useMemo(() => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(titleFilter.toLowerCase())
    );
  }, [movies, titleFilter]);

  return (
    <div className={css.wrapper}>
      <div className={css.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          name="title"
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {errorMessage && <p className={css.error}>{errorMessage}</p>}
      {titleFilter && filteredMovies.length > 0 && (
        <MovieList items={filteredMovies} />
      )}
      {error && <ErrorMessage />}
    </div>
  );
}
