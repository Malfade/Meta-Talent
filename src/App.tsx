import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import ChatWidget from './components/chat/ChatWidget';
import Navbar from './components/layout/Navbar';
import Clubs from './sections/Clubs';
import Landing from './sections/Landing';
import Insights from './sections/Insights';
import Roadmap from './sections/Roadmap';
import TestWizard from './sections/TestWizard';

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-surface text-brand-dark">
      <Navbar />
      <main className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-28 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/test" element={<TestWizard />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <ChatWidget />
    </div>
  );
};

export default App;
