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
          <div className="mt-2 flex gap-4">
            <input
              type="text"
              name="name"
              id="name"
              value={judge.teamName}
              onChange={handleNameChange}
              className="flex-1 rounded-md bg-gray-900 border-gray-700 text-gray-100 shadow-sm focus:border-green-500 focus:ring-green-500 text-xl p-2"
            />
            <button
              onClick={handleSave}
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-6 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">QR Code</h2>
          <p className="text-sm text-gray-400 mb-6">Scan to access judge's portal</p>
          <div className="flex justify-center">
            <a 
              href={theURL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <QRCodeSVG value={theURL} size={400} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerJudgeDetail;
