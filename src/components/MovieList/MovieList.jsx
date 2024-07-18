import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ items }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li key={item.id}>
          <Link to={`/movies/${item.id}`} state={location}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
