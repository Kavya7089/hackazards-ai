// src/components/Loader.tsx
import { useEffect, useState } from 'react';
import './Loader.css'; // Import the CSS file for styling

const Loader = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) {
          return prev + 1;  // Increment by 1 to simulate percentage counting
        } else {
          clearInterval(interval);  // Stop the interval when it reaches 100
          return 100;
        }
      });
    }, 30); // Increase count by 1 every 30ms
  }, []);

  return (
    <div className="loader">
      <div className="black-screen">
        <p className="loading-text">Your app is loading...</p>
        <div className="count-wrapper">
          <p className="count">{count}%</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;