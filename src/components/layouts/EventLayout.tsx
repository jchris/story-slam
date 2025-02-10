import { Outlet, Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

type EventDoc = {
  _id: string;
  name: string;
}

export function EventLayout() {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');

  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <div className="mr-6 flex items-center space-x-2">
              <Link className="link" to={`/event/${eventId}/producer`}>Event: {event.name}</Link>
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
