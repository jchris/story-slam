import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { EventDoc } from '../../types';


export const EventPage: React.FC = () => {
  const { eventId } = useParams();
  if (!eventId) throw new Error('Event ID not found');

  const { useDocument, useLiveQuery } = useFireproof(`events/${eventId}`);
  const { doc: event, merge, save } = useDocument<EventDoc>({ _id: 'event-info' } as EventDoc);
  const storyCount = useLiveQuery("type", { key: "story" }).length;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).replace(/(\d+)$/, num => `${num}${getSuffix(parseInt(num))}`);
  };

  const getSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  useEffect(() => {
    if (!event.date) {
      const today = new Date('2025-02-11T08:43:51-08:00');
      merge({ date: formatDate(today) });
    }
  }, [event.date, merge]);

  const handleChange = (field: keyof EventDoc, value: string) => {
    merge({ [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await save();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-sm text-gray-300 font-medium">Event Name</label>
            <input
              type="text"
              value={event.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="text-2xl w-full font-bold tracking-tight bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none px-2"
              placeholder="Event Name"
            />
          </div>
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm text-gray-300 font-medium">Theme</label>
              <input
                type="text"
                value={event.theme || ''}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="text-lg w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none px-2"
                placeholder="Event Theme"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-300 font-medium">Venue</label>
              <input
                type="text"
                value={event.venue || ''}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="text-lg w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none px-2"
                placeholder="Event Venue"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-300 font-medium">Date</label>
              <input
                type="text"
                value={event.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                className="text-lg w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none px-2"
                placeholder="Event Date"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Event Info
          </button>
        </form>
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
        <div className="space-y-2">
          <p className="font-bold">Total Stories: {storyCount}</p>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
