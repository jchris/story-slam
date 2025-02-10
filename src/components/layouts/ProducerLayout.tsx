import { Link, useParams, Outlet } from 'react-router-dom';

export function ProducerLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');

  return (
    <div>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link 
              to={`/event/${eventId}/producer/stories`}
              className="text-blue-500 hover:text-blue-600"
            >
              Stories
            </Link>
          </li>
          <li>
            <Link 
              to={`/event/${eventId}/producer/judges`}
              className="text-blue-500 hover:text-blue-600"
            >
              Judges
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
