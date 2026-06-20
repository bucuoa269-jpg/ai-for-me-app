import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ToastProvider } from './components/Toast';
import HomePage from './pages/HomePage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import InterviewsPage from './pages/InterviewsPage';
import CitiesPage from './pages/CitiesPage';
import LearningPage from './pages/LearningPage';
import RiskRadarPage from './pages/RiskRadarPage';
import LinksPage from './pages/LinksPage';
import SubmitPage from './pages/SubmitPage';
import AboutPage from './pages/AboutPage';
import ChangelogPage from './pages/ChangelogPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/interviews" element={<InterviewsPage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/risk-radar" element={<RiskRadarPage />} />
            <Route path="/links" element={<LinksPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
