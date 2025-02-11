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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Judge!</h1>
          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
            <p className="text-gray-300 text-sm font-medium">You are in the team</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{judgeTeam?.teamName}</p>
          </div>
        </div>

        <form className="mt-8 space-y-8">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-2">
              Your Nickname
            </label>
            <div className="relative">
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="Enter your nickname"
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Rules
            </h3>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-300 leading-relaxed">
                By participating in this event, you agree to The Moth's Code of Ethics and Conduct, which includes a commitment to honesty, integrity, and respect for all individuals, as well as a zero tolerance policy for discrimination, harassment, bullying, or sexual harassment.
              </p>
              <label className="flex items-center mt-4 space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-indigo-600 border-2 border-gray-500 rounded focus:ring-indigo-500 focus:ring-offset-gray-800 bg-gray-700 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors duration-150">
                  I agree to the rules
                </span>
              </label>
            </div>
          </div>

          <Link 
            to={`/judge/${eventId}/${judgeId}/stories`}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
          >
            <span>Start Judging</span>
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default JudgeOnboarding;
