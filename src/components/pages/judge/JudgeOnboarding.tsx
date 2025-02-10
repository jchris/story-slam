import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFireproof } from 'use-fireproof';
import { Judge } from '../producer/ProducerJudgeDetail';

export const JudgeOnboarding: React.FC = () => {
  const { eventId, judgeId } = useParams();
  const { useDocument } = useFireproof(`events/${eventId}`);
  const [nickname, setNickname] = React.useState(() => localStorage.getItem(`judge-${judgeId}-nickname`) || '');

  const { doc: judgeTeam } = useDocument({ _id: judgeId, type: 'judge', teamName: '' } as Judge);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    localStorage.setItem(`judge-${judgeId}-nickname`, newNickname);
  };

  return (
    <div className="max-w-md mx-auto p-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-200">Welcome Judge!</h1>
      <p className="text-gray-400">You are in the team:</p>
      <p className="text-lg text-gray-100">{judgeTeam?.teamName}</p>
      <form className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-100">
            Your Nickname
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Your Nickname"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 text-gray-100 bg-gray-700"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-400">Rules</h3>
          <p className="text-sm text-gray-400">
            By participating in this event, you agree to The Moth's Code of Ethics and Conduct, which includes a commitment to honesty, integrity, and respect for all individuals, as well as a zero tolerance policy for discrimination, harassment, bullying, or sexual harassment.
          </p>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded bg-gray-700" />
            <span className="text-sm text-gray-400">I agree to the rules</span>
          </label>
        </div>
        <Link to={`/event/${eventId}/judge/${judgeId}/stories`}>
          <button type="button" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Start Judging
          </button>
        </Link>
      </form>
    </div>
  );
};

export default JudgeOnboarding;
