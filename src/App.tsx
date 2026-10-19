import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import HowWeWorkPage from './pages/HowWeWorkPage';
import NotFoundPage from './pages/NotFoundPage';
import VenturesPage from './pages/VenturesPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="how-we-work" element={<HowWeWorkPage />} />
        <Route path="ventures" element={<VenturesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
