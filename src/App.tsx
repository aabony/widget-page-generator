import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {PageGenerator} from "./pages/PageGenerator.tsx";
import {Home} from "./pages/Home.tsx"

export function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/page-generator" element={<PageGenerator />} />
              </Routes>
          </Router>
      </>
  );
}
