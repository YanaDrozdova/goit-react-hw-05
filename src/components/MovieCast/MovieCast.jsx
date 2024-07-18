import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCastById } from '../../../movies-api';
import css from './MovieCast.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setError(false);
        const data = await getMovieCastById(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (!cast) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {cast.map(actor => (
          <li key={actor.id} className={css.item}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name || 'Actor Image'}
              width="80px"
            />
            <div className={css.actorInfo}>
              <div className={css.info}>
                <h4>Name:</h4>
                <p>{actor.name}</p>
              </div>
              <div className={css.info}>
                <h4>Character:</h4>
                <p>{actor.character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {error && <ErrorMessage />}
    </div>
  );
}
