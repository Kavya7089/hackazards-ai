import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [language, setLanguage] = useState("English");
  const [response, setResponse] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);

  // Update cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY + window.scrollY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Apply dark mode class to the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Handle AI tour guide query
  const askGuide = async () => {
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, language }),
      });

      const data = await response.json();
      setResponse(data.response || `❌ Error: ${data.error}`);
    } catch (err) {
      setResponse("❌ Failed to fetch response.");
    }
  };

  // Handle image query
  const askWithImage = async () => {
    if (!image) {
      setResponse("❌ Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("language", language);

    try {
      const res = await fetch("http://localhost:5000/image-search", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setResponse(`❌ ${data.error}`);
      } else {
        const combined = `📸 Caption: ${data.caption}\n\n📖 Info: ${data.info}`;
        setResponse(combined);
      }
    } catch (err) {
      setResponse("❌ Failed to fetch image info.");
    }
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-700"
          : "bg-gradient-to-br from-primary to-blue-900"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Side - Cards */}
        <div className="md:col-span-2 space-y-8">
          {/* Card 1 - AI Tour Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              darkMode
                ? "bg-gray-800/90 hover:shadow-gray-500"
                : "bg-stone-800/90 hover:shadow-primary"
            } p-8 rounded-3xl shadow-2xl transition-all`}
          >
            <h1
              className={`text-4xl font-bold mb-8 text-center ${
                darkMode ? "text-gray-200" : "text-white"
              }`}
            >
              AI Tour Guide
            </h1>

            <input
              type="text"
              placeholder="Enter a location (e.g., Taj Mahal)"
              className={`w-full border ${
                darkMode ? "border-gray-600 bg-gray-700" : "border-primary/50 bg-stone-700"
              } text-white rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 ${
                darkMode ? "focus:ring-gray-500" : "focus:ring-primary"
              }`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-white"
              } mb-3`}
            >
              Choose Language:
            </h3>
            <select
              className={`w-full border ${
                darkMode ? "border-gray-600 bg-gray-700" : "border-primary/50 bg-stone-700"
              } text-white rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 ${
                darkMode ? "focus:ring-gray-500" : "focus:ring-primary"
              }`}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Hindi">Hindi</option>
            </select>

            <button
              onClick={askGuide}
              className={`w-full ${
                darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-primary hover:bg-primary/90"
              } text-white py-3 rounded-lg font-semibold transition-all`}
            >
              Ask
            </button>
          </motion.div>

          {/* Card 2 - Image Query */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`${
              darkMode
                ? "bg-gray-800/90 hover:shadow-gray-500"
                : "bg-stone-800/90 hover:shadow-primary"
            } p-8 rounded-3xl shadow-2xl transition-all`}
          >
            <h3
              className={`text-3xl font-bold text-center ${
                darkMode ? "text-gray-200" : "text-white"
              } mb-8`}
            >
              Image Query
            </h3>

            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-200" : "text-white"
              } mb-3`}
            >
              Upload a photo:
            </h3>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className={`w-full mb-6 ${
                darkMode ? "bg-gray-700" : "bg-stone-700"
              } text-white rounded-lg py-2 px-4`}
            />

            <button
              onClick={askWithImage}
              className={`w-full ${
                darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-primary hover:bg-primary/90"
              } text-white py-3 rounded-lg font-semibold transition-all mb-6`}
            >
              Ask With Image
            </button>

            <div
              className={`${
                darkMode ? "bg-gray-700/70" : "bg-stone-700/70"
              } text-white p-4 rounded-lg text-sm whitespace-pre-wrap`}
            >
              {response}
            </div>
          </motion.div>
        </div>

        {/* Right Side - How to Use Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className={`${
            darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          } p-8 rounded-3xl shadow-2xl font-sans`}
        >
          <h2
            className={`text-3xl font-extrabold mb-6 text-center ${
              darkMode ? "text-gray-200" : "text-black"
            } animate-bounce`}
          >
            Description
          </h2>
          <h3 className="text-xl font-bold mb-4">Summary</h3>
          <p className="italic mb-6">
            To use this service, you can type in a famous landmark and select a language to get a detailed tour from the AI guide, or upload a photo to get insights.
          </p>
          <h3 className="text-xl font-bold mb-4">Steps</h3>
          <ul className="list-disc pl-6 space-y-4 text-lg leading-relaxed">
            <li>
              <span className="font-bold">Type</span> a famous location name.
            </li>
            <li>
              <span className="font-bold">Select</span> your language.
            </li>
            <li>
              <span className="font-bold">Click "Ask"</span> to get an AI tour!
            </li>
            <li>
              <span className="font-bold">Or upload</span> a landmark photo.
            </li>
            <li>
              <span className="font-bold">Click "Ask With Image"</span> for magic!
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Custom Magnet Cursor */}
      <div
        className="cursor-magnet"
        style={{
          position: "absolute",
          top: `${cursorPosition.y}px`,
          left: `${cursorPosition.x}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease-out",
          pointerEvents: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
}