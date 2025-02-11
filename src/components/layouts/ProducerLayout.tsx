import { Link, useParams, Outlet } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { EventDoc } from './EventLayout';

export function ProducerLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');
  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 to-green-900 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-green-800/50 bg-green-900/95 backdrop-blur supports-[backdrop-filter]:bg-green-900/60 shadow-lg">
        <div className="container mx-auto px-4 flex h-16 items-center">
          <div className="flex w-full">
            <div className="flex items-center space-x-2">
              <Link 
                className="text-2xl font-bold text-white hover:text-green-200 transition-colors tracking-tight" 
                to={`/event/${eventId}`}
              >
                <span className="text-green-400 font-normal">Event:</span> {event.name}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4">
        <nav className="py-4">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to={`/event/${eventId}/producer/stories`}
                className="text-lg font-semibold text-green-300 hover:text-white transition-colors relative group"
              >
                Storytellers
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </li>
            <li>
              <Link 
                to={`/event/${eventId}/producer/judges`}
                className="text-lg font-semibold text-green-300 hover:text-white transition-colors relative group"
              >
                Judges
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </li>
            <li>
              <Link 
                to={`/leaderboard/${eventId}`}
                className="text-lg font-semibold text-green-300 hover:text-white transition-colors relative group"
              >
                Leaderboard
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
