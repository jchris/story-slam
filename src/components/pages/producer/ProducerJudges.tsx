import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

export const ProducerJudges: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { database, useLiveQuery } = useFireproof(`events/${eventId}`);

  const judges = useLiveQuery(
    'type',
    { key: 'judge' }
  );

  const onAddJudge = async () => {
    const ok = await database.put({
      type: 'judge',
      eventId,
      teamName: '',
      timestamp: Date.now(),
      status: 'active'
    });
    navigate(`/event/${eventId}/producer/judge/${ok.id}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Judges Management</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Judge team</h2>
        <button 
          onClick={onAddJudge}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Judge
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Judge List</h2>
        {judges.length === 0 ? (
          <p className="text-gray-500">No judges added yet</p>
        ) : (
          <ul className="space-y-2">
            {judges.map((judge) => (
              <li key={judge._id} className="border p-3 rounded hover:bg-gray-50">
                <Link 
                  to={`/event/${eventId}/producer/judge/${judge._id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {judge.teamName || 'Unnamed Team'}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProducerJudges;
