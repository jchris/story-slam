import { Outlet, Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

export type EventDoc = {
  _id: string;
  name: string;
}

export function EventLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');

  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  
  return (
    <div className="min-h-screen bg-blue-900 text-gray-100 p-4">
      <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-800/95 backdrop-blur supports-[backdrop-filter]:bg-blue-800/60 shadow-lg">
        <div className="container flex h-16 items-center px-4">
          <div className="flex w-full">
            <div className="flex items-center space-x-6">
              <Link 
                className="text-lg font-bold text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700" 
                to={`/event/${eventId}`}
              >
                Event: {event.name}
              </Link>
              <Link 
                className="text-lg font-semibold text-blue-100 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-blue-700" 
                to="/events"
              >
                All Events
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
