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

  const { useDocument, useLiveQuery } = useFireproof(`events/${eventId}`);
  const {doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);
  const storyCount = useLiveQuery("type", {key: "story"}).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Event: {event.name}</h1>
        <div className="space-x-4">
          <Link 
            to={`/leaderboard/${eventId}`}
            className="inline-flex items-center justify-center text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors px-8 py-4 shadow-lg hover:shadow-xl"
          >
            Leaderboard
          </Link>
          <Link 
            to={`/event/${eventId}/producer`}
            className="inline-flex items-center justify-center text-lg font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors px-8 py-4 shadow-lg hover:shadow-xl"
          >
            Producer Dashboard →
          </Link>
        </div>
      </div>
      
      <div className="text-white p-6 ">
        <h2 className="text-2xl font-extrabold mb-4">Event Overview</h2>
        <div className="space-y-2">
          <p className="font-bold">Event ID: {eventId}</p>
          <p className="font-bold">Total Stories: {storyCount}</p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
