import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventLayout } from './components/layouts/EventLayout';
import { ProducerLayout } from './components/layouts/ProducerLayout';
import { JudgeLayout } from './components/layouts/JudgeLayout';

// Page imports
import Home from './components/pages/Home';
import EventsList from './components/pages/EventsList';
import EventPage from './components/pages/EventPage';
import ProducerDashboard from './components/pages/producer/ProducerDashboard';
import ProducerStories from './components/pages/producer/ProducerStories';
import ProducerStoryDetail from './components/pages/producer/ProducerStoryDetail';
import ProducerJudges from './components/pages/producer/ProducerJudges';
import ProducerJudgeDetail from './components/pages/producer/ProducerJudgeDetail';
import JudgeOnboarding from './components/pages/judge/JudgeOnboarding';
import JudgeStories from './components/pages/judge/JudgeStories';
import JudgeStoryView from './components/pages/judge/JudgeStoryView';
import AudienceDashboard from './components/pages/audience/AudienceDashboard';
import { AudienceLayout } from './components/layouts/AudienceLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsList />} />
          
          {/* Event routes */}
          <Route path="/event/:eventId" element={<EventLayout />}>
              <Route index element={<EventPage />} />
              

          </Route>

          {/* Producer routes */}
          <Route path="/event/:eventId/producer" element={<ProducerLayout />}>
            <Route index element={<ProducerDashboard />} />
            <Route path="stories" element={<ProducerStories />} />
            <Route path="story/:storyId" element={<ProducerStoryDetail />} />
            <Route path="judges" element={<ProducerJudges />} />
            <Route path="judge/:judgeId" element={<ProducerJudgeDetail />} />
          </Route>

          {/* Judge routes */}
          <Route path="/event/:eventId/judge/:judgeId" element={<JudgeLayout />}>
            <Route index element={<JudgeOnboarding />} />
            <Route path="stories" element={<JudgeStories />} />
            <Route path="story/:storyId" element={<JudgeStoryView />} />
          </Route>

          {/* Audience routes */}
          <Route path="/event/:eventId/leaderboard" element={<AudienceLayout />}>
            <Route index element={<AudienceDashboard />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
