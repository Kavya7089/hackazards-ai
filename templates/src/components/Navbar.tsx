import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <nav className="bg-primary text-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-extrabold font-[Poppins] tracking-wide text-black">
              Travel<span className="text-blue-400">Guide</span>
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            <Link
              to="/contact"
              className="px-4 py-2 rounded-full bg-black text-primary font-semibold hover:bg-blue-100 transition"
            >
              Contact
            </Link>
            <button onClick={toggleMenu} className="flex flex-col space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="flex flex-col items-end space-y-4 mt-4 bg-primary p-4 rounded-lg shadow-md absolute right-6 z-50">
            <Link to="/hotels" className="text-black hover:text-blue-300 dark:text-white dark:hover:text-blue-300">
              Hotels
            </Link>
            <Link to="/places" className="text-black hover:text-blue-300 dark:text-white dark:hover:text-blue-300">
              Places
            </Link>
            <Link to="/shopping" className="text-black hover:text-blue-300 dark:text-white dark:hover:text-blue-300">
              Shopping
            </Link>
            <Link to="/translator" className="text-black hover:text-blue-300 dark:text-white dark:hover:text-blue-300">
              Translator
            </Link>
          </div>
        )}
      </div>

      {/* Custom Magnet Cursor */}
      <div
        className="cursor-magnet"
        style={{
          position: "absolute",
          top: `${cursorPosition.y + window.scrollY}px`, // Adjusting for scroll
          left: `${cursorPosition.x + window.scrollX}px`, // Adjusting for scroll
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease-out",
          pointerEvents: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-black background
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)", // Adding subtle shadow for a cool effect
        }}
      />
    </nav>
  );
}