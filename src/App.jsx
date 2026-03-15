import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import MemberPage from './pages/MemberPage';
import WriteupsPage from './pages/WriteupsPage';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:memberId" element={<MemberPage />} />
          <Route path="/writeups" element={<WriteupsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen hex-bg flex flex-col items-center justify-center text-center px-6">
      <div className="font-display text-8xl font-black text-cyber-accent/20 mb-4">
        404
      </div>
      <div className="font-mono text-cyber-accent mb-2">
        ERROR: Page not found
      </div>
      <p className="text-cyber-muted text-sm mb-8">
        The flag you're looking for doesn't exist here.
      </p>
      <a href="/" className="btn-cyber">
        <span>Return to Base</span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="noise-overlay">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
