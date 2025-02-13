import { useParams, Outlet } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { EventDoc } from '../../types';
import { useEffect } from 'react';

export function AudienceLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');
  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  
  useEffect(() => {
    if (!event.name) return;
    document.title = `Leaderboard - ${event.name}`;
  }, [event]);


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-auto py-2 sm:py-3 items-center">
            <div className="flex flex-col min-w-0">
              <div className="text-2xl font-bold tracking-tight">{event.name}</div>
              <div className="text-gray-600 text-sm sm:text-base font-normal mt-0.5">
                {event.theme && `(${event.theme})`} {event.venue && <span>{event.venue}</span>}
                {event.date && <span> • {event.date}</span>}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4">
        <main className="py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}