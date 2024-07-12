import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ items }) {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li key={item.id}>
          <Link to={`/movies/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
