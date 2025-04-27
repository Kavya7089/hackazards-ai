import { useState, useEffect } from "react";

export default function Translator() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");
  const [translated, setTranslated] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);

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

  const handleTranslate = async () => {
    setTranslated("Translating...");
    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      setTranslated(data.translation || `❌ Error: ${data.error}`);
    } catch (err) {
      setTranslated("❌ Translation failed.");
    }
  };

  const handleMicInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setText((prevText) => `${prevText} ${speechToText}`.trim());
      console.log("📝 Recognized text:", speechToText);
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("🎤 Stopped listening.");
    };

    recognition.start();
  };

  const handleVoiceOutput = () => {
    if (!translated) {
      alert("No translated text to speak.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = getLanguageCode(language);
    window.speechSynthesis.speak(utterance);
  };

  const getLanguageCode = (language: string) => {
    const languageMap: { [key: string]: string } = {
      French: "fr-FR",
      Spanish: "es-ES",
      German: "de-DE",
      Hindi: "hi-IN",
      Japanese: "ja-JP",
      Arabic: "ar-SA",
    };
    return languageMap[language] || "en-US";
  };

  return (
    <div
      className={`min-h-screen py-10 font-[Poppins] ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-600 text-gray-200"
          : "bg-gradient-to-br from-blue-300 to-white text-gray-800"
      }`}
    >
      <div
        className={`max-w-xl mx-auto p-8 rounded-3xl shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-8 text-center ${
            darkMode ? "text-gray-200" : "text-primary"
          }`}
        >
          Text Translator
        </h1>

        <textarea
          placeholder="Enter text to translate"
          className={`w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500"
              : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
          }`}
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className={`w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500"
              : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
          }`}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="French">French</option>
          <option value="Spanish">Spanish</option>
          <option value="German">German</option>
          <option value="Hindi">Hindi</option>
          <option value="Japanese">Japanese</option>
          <option value="Arabic">Arabic</option>
        </select>

        <button
          onClick={handleTranslate}
          className={`w-full py-3 rounded-xl transition-all duration-300 shadow-md font-semibold  ${
            darkMode
              ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          Translate
        </button>

        {translated && (
          <div
            className={`mt-6 p-6 rounded-xl text-sm whitespace-pre-wrap shadow-md ${
              darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"
            }`}
          >
            {translated}
          </div>
        )}

        {translated && (
          <button
            onClick={handleVoiceOutput}
            className={`w-full py-3 rounded-xl transition-all duration-300 shadow-md mt-4 font-semibold  ${
              darkMode
                ? "bg-green-700 text-gray-200 hover:bg-green-600"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            🔊 Play Translation
          </button>
        )}

        <button
          onClick={handleMicInput}
          className={`w-full py-3 rounded-xl transition-all duration-300 shadow-md mt-4 font-semibold  ${
            darkMode
              ? "bg-blue-700 text-gray-200 hover:bg-blue-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } ${isListening ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isListening}
        >
          {isListening ? "Listening..." : "🎙Speech input"}
        </button>
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
          top: `${cursorPosition.y + window.scrollY}px`,
          left: `${cursorPosition.x + window.scrollX}px`,
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

