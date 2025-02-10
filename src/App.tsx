import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventLayout } from './components/EventLayout';
import ScoringInterface from './components/ScoringInterface';

// Page imports
import Home from './components/pages/Home';
import EventsList from './components/pages/EventsList';
import EventPage from './components/pages/producer/EventPage';
import ProducerDashboard from './components/pages/producer/ProducerDashboard';
import ProducerStories from './components/pages/producer/ProducerStories';
import ProducerStoryDetail from './components/pages/producer/ProducerStoryDetail';
import ProducerJudges from './components/pages/producer/ProducerJudges';
import ProducerJudgeDetail from './components/pages/producer/ProducerJudgeDetail';
import JudgeOnboarding from './components/pages/judge/JudgeOnboarding';
import JudgeStories from './components/pages/judge/JudgeStories';
import JudgeStoryView from './components/pages/judge/JudgeStoryView';
import AudienceDashboard from './components/pages/audience/AudienceDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App bg-gray-900 text-gray-100 max-w-screen-sm mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsList />} />
          
          {/* Event routes with EventLayout */}
          <Route path="/event/:eventId" element={<EventLayout><EventPage /></EventLayout>} />
          
          {/* Producer routes */}
          <Route path="/event/:eventId/producer" element={<EventLayout><ProducerDashboard /></EventLayout>} />
          <Route path="/event/:eventId/producer/stories" element={<EventLayout><ProducerStories /></EventLayout>} />
          <Route path="/event/:eventId/producer/story/:storyId" element={<EventLayout><ProducerStoryDetail /></EventLayout>} />
          <Route path="/event/:eventId/producer/judges" element={<EventLayout><ProducerJudges /></EventLayout>} />
          <Route path="/event/:eventId/producer/judge/:judgeId" element={<EventLayout><ProducerJudgeDetail /></EventLayout>} />
          
          {/* Judge routes */}
          <Route path="/event/:eventId/judge/:judgeId" element={<EventLayout><JudgeOnboarding /></EventLayout>} />
          <Route path="/event/:eventId/judge/:judgeId/stories" element={<EventLayout><JudgeStories /></EventLayout>} />
          <Route path="/event/:eventId/judge/:judgeId/story/:storyId" element={<EventLayout><JudgeStoryView /></EventLayout>} />
          
          {/* Audience routes */}
          <Route path="/event/:eventId/audience" element={<EventLayout><AudienceDashboard /></EventLayout>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
