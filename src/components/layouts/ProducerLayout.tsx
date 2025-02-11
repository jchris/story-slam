import { Link, useParams, Outlet } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { EventDoc } from './EventLayout';

export function ProducerLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');
  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  
  return (
    <div className="min-h-screen bg-green-950 text-gray-100 p-4">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <div className="mr-6 flex items-center space-x-2">
              <Link className="link" to={`/event/${eventId}/producer`}>Event: {event.name}</Link>
            </div>
          </div>
        </div>
      </header>
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
