import React from 'react';
import { useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';

interface Judge {
  _id: string;
  type: 'judge';
  eventId: string;
  name: string;
  timestamp: number;
}

export const ProducerJudgeDetail: React.FC = () => {
  const { eventId, judgeId } = useParams();
  const { useDocument } = useFireproof(`events/${eventId}`);
  const { doc: judge, merge, save, error } = useDocument<Judge>({ 
    _id: judgeId || '', 
    type: 'judge',
    eventId: eventId || '',
    name: '',
    timestamp: Date.now()
  } as Judge);

  if (error) {
    return <div className="text-red-600">Error loading judge: {error.message}</div>;
  }

  if (!judge) {
    return <div>Loading...</div>;
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    merge({ name: e.target.value });
  };

  const handleSave = () => {
    save();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Judge Details</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Judge Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xl p-2"
              value={judge.name}
              onChange={handleNameChange}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>

        <div className="mt-4">
          <h2 className="text-lg font-medium">QR Code</h2>
          <p className="text-sm text-gray-500">Scan to access judge interface:</p>
          <code className="mt-2 block bg-gray-50 p-2 rounded">
            {`/event/${eventId}/judge/${judgeId}`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default ProducerJudgeDetail;
