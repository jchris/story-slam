import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge } from '../../../types';

export const ProducerJudges: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  if (!eventId) {
    throw new Error('Event ID not found');
  }
  const { database, useLiveQuery } = useFireproof(`events/${eventId}`);

  const judges = useLiveQuery<Judge>('type', { key: 'judge' });

  const onAddJudge = async () => {
    const newJudge: Judge = {
      type: 'judge',
      eventId,
      teamName: '',
      timestamp: Date.now(),
      status: 'active'
    };
    const ok = await database.put(newJudge);
    navigate(`/event/${eventId}/producer/judge/${ok.id}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Judges Management</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Judge Team</h2>
          <div className="space-y-4">
            <button
              onClick={onAddJudge}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out w-full sm:w-auto"
            >
              Add Judge
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Judge Teams List</h2>
          {judges.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No judges added yet</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {judges.map((judge) => (
                <li key={judge._id}>
                  <Link
                    to={`/event/${eventId}/producer/judge/${judge._id}`}
                    className="block py-4 px-2 hover:bg-gray-50 rounded-md transition duration-150 ease-in-out"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{judge.teamName || 'Unnamed Team'}</span>
                      <span className="text-sm text-gray-500">{new Date(judge.timestamp).toLocaleString()}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProducerJudges;
