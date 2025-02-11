import { Outlet, Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { EventDoc } from '../../types';


export function EventLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');

  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  
  return (
    <div className="min-h-screen bg-blue-900 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-blue-800/50 bg-gradient-to-b from-blue-950 to-blue-900 backdrop-blur supports-[backdrop-filter]:bg-blue-900/60 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-auto py-2 sm:py-3 items-center">
            <div className="flex flex-col min-w-0">
              <Link 
                className="text-lg sm:text-2xl font-bold text-white hover:text-blue-200 transition-colors tracking-tight" 
                to={`/event/${eventId}`}
              >
                {event.name}
              </Link>
              <div className="text-blue-300/90 text-sm sm:text-base font-normal mt-0.5">
                {event.theme && `(${event.theme})`} {event.venue && <span className="text-blue-300/90">{event.venue}</span>}
                {event.date && <span className="text-blue-300/90"> • {event.date}</span>}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4">
        <div className="flex-1 space-y-4 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
