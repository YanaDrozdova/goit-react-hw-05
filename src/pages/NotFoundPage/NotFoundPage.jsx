import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p>
        Oops! No page was found! Please go to <Link to="/">home page</Link>!
      </p>
    </div>
  );
}
