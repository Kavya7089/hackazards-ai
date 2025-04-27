import { useState, useEffect } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", { name, email, message });
    setSubmitted(true);
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
        className={`max-w-3xl mx-auto p-8 rounded-3xl shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-4xl font-bold mb-8 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Contact Me
        </h1>

        {submitted ? (
          <div className="text-center">
            <h2
              className={`text-2xl font-semibold ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              Thank you for reaching out!
            </h2>
            <p
              className={`mt-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              I will get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full border rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                }`}
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full border rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                }`}
                placeholder="Your Email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className={`w-full border rounded-xl px-4 py-3 mt-1 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                }`}
                rows={5}
                placeholder="Your Message"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl transition-all duration-300 shadow-md ${
                darkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-primary text-white hover:bg-blue-700"
              }`}
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-10 right-10 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}
