import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { QRCodeSVG } from 'qrcode.react';

export interface Judge {
  _id: string;
  type: 'judge';
  eventId: string;
  teamName: string;
  timestamp: number;
}

export const ProducerJudgeDetail: React.FC = () => {
  const { eventId, judgeId } = useParams();
  const { useDocument } = useFireproof(`events/${eventId}`);
  const { doc: judge, merge, save } = useDocument<Judge>({
    _id: judgeId || '',
    type: 'judge',
    eventId: eventId || '',
    teamName: '',
    timestamp: Date.now()
  } as Judge);

  if (!judge) {
    return <div>Loading...</div>;
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    merge({ teamName: e.target.value });
  };

  const handleSave = () => {
    save();
  };

  const theURL = `${window.location.origin}/event/${eventId}/judge/${judgeId}`;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-100">Judge Details</h1>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-100">
            Judge Team Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              value={judge.teamName}
              onChange={handleNameChange}
              className="block w-full rounded-md bg-gray-900 border-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xl p-2"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Save
        </button>

        <div className="mt-4">
          <h2 className="text-lg font-medium">QR Code</h2>
          <p className="text-sm text-gray-500">Scan to access</p>
          <a href={theURL} target="_blank" rel="noopener noreferrer" className="inline-block">
            <div className="p-16">
              <QRCodeSVG value={theURL} size={400} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProducerJudgeDetail;
