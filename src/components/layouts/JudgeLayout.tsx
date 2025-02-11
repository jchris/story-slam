import { Link, Outlet, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge } from '../../types';
import { useEffect, useState } from 'react';
import { EventDoc } from './EventLayout';

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
      <header className="sticky top-0 z-50 w-full bg-blue-800/95 backdrop-blur border-b border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={`/event/${eventId}/judge/${judgeId}`}
                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
              >
                {event.name}
              </Link>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to={`/leaderboard/${eventId}`}
                    className="font-semibold text-green-300 hover:text-white transition-colors relative group"
                  >
                    Leaderboard
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/event/${eventId}/judge/${judgeId}/stories`}
                    className="font-semibold text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Stories to Judge
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="space-y-3">
            <div className="flex space-x-6">
              <div>
                <span className="text-gray-400">Team</span>
                <h2 className="text-xl font-semibold text-white">{judge?.teamName}</h2>
              </div>
              <div>
                <span className="text-gray-400">Nickname</span>
                <h2 className="text-xl font-semibold text-white">{nickname}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
