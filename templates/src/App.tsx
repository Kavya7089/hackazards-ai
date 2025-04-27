import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Places from './pages/Places';
import Shopping from './pages/Shopping';
import Translator from './pages/Translator';
import Loader from './components/Loader';  // Import your Loader component
import Contact from './pages/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading time (counting from 1 to 100 in 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 3 seconds, stop loading
    }, 3000); // 3 seconds for the loader

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {loading ? (
          <Loader /> // Show Loader if loading is true
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/places" element={<Places />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/translator" element={<Translator />} />
              <Route path="/Contact" element={<Contact/>} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
 
