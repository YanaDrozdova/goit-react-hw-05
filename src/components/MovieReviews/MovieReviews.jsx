import { useParams } from 'react-router-dom';
import { getReviewsById } from '../../../movies-api';
import { useEffect, useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import css from './MovieReviews.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setError(false);
        const data = await getReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (!reviews) {
    return <p>Loading...</p>;
  }

  if (reviews.length === 0) {
    return <p>Sorry, we dont have any reviews for this movie.</p>;
  }
  return (
    <div className={css.container}>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <div className={css.reviewBox}>
              <div className={css.userInfo}>
                <span>
                  <HiOutlineUserCircle />
                </span>
                <h4>Name:</h4>
                <p>{review.author}</p>
              </div>
              <p>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
      {error && <ErrorMessage />}
    </div>
  );
}
