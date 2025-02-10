import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

type EventDoc = {
  _id: string;
  name: string;
}

export const EventPage: React.FC = () => {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');

  const { useDocument } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Event: {event.name}</h1>
        <Link 
          to={`/event/${eventId}/producer`}
          className="inline-flex items-center justify-center text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors px-8 py-4 shadow-lg hover:shadow-xl"
        >
          Producer Dashboard →
        </Link>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Event Overview</h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Event ID: {eventId}</p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
