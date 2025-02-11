import { Link, Outlet, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge } from '../../types';
import { useEffect, useState } from 'react';
import { EventDoc } from '../../types';

export function JudgeLayout() {
  const { eventId, judgeId } = useParams();
  if (!eventId || !judgeId) throw new Error('Event ID or Judge ID not found');

  const { useDocument } = useFireproof(`events/${eventId}`);
  const { doc: judge } = useDocument<Judge>({ _id: judgeId } as Judge);
  const [nickname] = useState(() => localStorage.getItem(`judge-${judgeId}-nickname`) || '');
  const { doc: event } = useDocument<EventDoc>({ _id: 'event-info' } as EventDoc);

  useEffect(() => {
    if (!judge.teamName) return;
    if (!event.name) return;
    document.title = `Judge: ${judge.teamName} - ${event.name}`;
  }, [judge, event]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-blue-900 to-blue-800 backdrop-blur border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-auto py-2 sm:py-3 items-center justify-between">
            <div className="flex flex-col min-w-0">
              <Link
                to={`/judge/${eventId}/${judgeId}`}
                className="text-lg sm:text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors truncate"
              >
                {event.name}
              </Link>
              <div className="text-gray-300/90 text-sm sm:text-base font-normal mt-0.5">
                {event.theme && `(${event.theme})`} {event.venue && <span className="text-gray-300/90">{event.venue}</span>}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div>
                  <span className="text-xs text-gray-400">Team </span>
                  <span className="text-base font-bold text-gray-200">{judge?.teamName}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Nickname </span>
                  <span className="text-base font-bold text-gray-200">{nickname}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4">
        <nav className="py-4">
          <ul className="flex space-x-8">
            <li>
              <Link
                to={`/leaderboard/${eventId}`}
                target="_blank"
                className="text-lg font-semibold text-blue-300 hover:text-white transition-colors relative group tracking-wide"
              >
                Leaderboard
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </li>
            <li>
              <Link
                to={`/judge/${eventId}/${judgeId}/stories`}
                className="text-lg font-semibold text-blue-300 hover:text-white transition-colors relative group tracking-wide"
              >
                Stories to Judge
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="space-y-4 sm:space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
