import { Link, Outlet, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge } from '../../types';
import { useState } from 'react';
import { EventDoc } from './EventLayout';

export function JudgeLayout() {
  const { eventId, judgeId } = useParams();
  if (!eventId || !judgeId) throw new Error('Event ID or Judge ID not found');

  const { useDocument } = useFireproof(`events/${eventId}`);
  const { doc: judge } = useDocument<Judge>({ _id: judgeId } as Judge);
  const [nickname] = useState(() => localStorage.getItem(`judge-${judgeId}-nickname`) || '');
  const { doc: event } = useDocument<EventDoc>({_id: 'event-info'} as EventDoc);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <div className="mr-6 flex items-center space-x-2">
              <Link className="link" to={`/event/${eventId}/judge/${judgeId}`}>Event: {event.name}</Link>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h1>Team: <span className="font-bold">{judge?.teamName}</span></h1>
          <h2>Nickname: <span className="font-bold">{nickname}</span></h2>
          <nav className="mb-4">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to={`/event/${eventId}/judge/${judgeId}/stories`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Stories to Judge
                </Link>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
