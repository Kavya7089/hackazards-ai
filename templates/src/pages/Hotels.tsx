import { useEffect, useState } from "react";
import { MapPin, Star, ChevronDown, ChevronUp } from "lucide-react";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [place, setPlace] = useState("");
  const [query, setQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
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

  useEffect(() => {
    if (!query) return;

    console.log("🔍 Fetching hotels for:", query);

    fetch("http://localhost:5000/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ place: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.hotels) {
          console.error("❌ No hotel data received:", data);
          return;
        }

        try {
          const parsed = Array.isArray(data.hotels)
            ? data.hotels.map((item) =>
                typeof item === "string" ? JSON.parse(item) : item
              )
            : [];
          setHotels(parsed);
          console.log("✅ Hotels parsed:", parsed);
        } catch (error) {
          console.error("❌ Error parsing hotel data:", error);
        }
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
      });
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (place.trim()) {
      setQuery(place.trim());
    }
  };

  return (
    <div
      className={`min-h-screen py-10 font-[Poppins] ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-700 text-gray-200"
          : "bg-gradient-to-br from-blue-50 to-white text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1
          className={`text-4xl font-bold mb-10 text-center ${
            darkMode ? "text-gray-200" : "text-primary"
          }`}
        >
          Find Hotels Near You
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter place or city name"
            className={`w-full sm:w-1/2 px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-200 focus:ring-gray-500"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-full shadow-md transition-all duration-300 ${
              darkMode
                ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <div
                key={index}
                className={`rounded-3xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
              
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {hotel.name}
                    </h3>
                    <div className="flex items-center">
                      <Star
                        className={`h-5 w-5 ${
                          darkMode ? "text-yellow-300" : "text-yellow-400"
                        } mr-1`}
                      />
                      <span
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        {hotel.rating}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center text-sm mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{hotel.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1 rounded-full ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-2xl font-bold ${
                        darkMode ? "text-gray-200" : "text-primary"
                      }`}
                    >
                      {hotel.price}
                    </span>
                    <button
                      className={`px-5 py-2 rounded-full transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                          : "bg-primary text-white hover:bg-blue-700"
                      }`}
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Review Section */}
                  <div className="mt-6">
                    <details className="group">
                      <summary
                        className={`cursor-pointer flex items-center justify-between ${
                          darkMode
                            ? "text-gray-200 hover:text-gray-400"
                            : "text-gray-800 hover:text-gray-600"
                        }`}
                      >
                        <span className="font-semibold">Reviews</span>
                        <ChevronDown className="group-open:hidden h-5 w-5" />
                        <ChevronUp className="hidden group-open:block h-5 w-5" />
                      </summary>
                      <div
                        className={`mt-4 space-y-4 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {hotel.reviews?.map((review, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg shadow ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p className="font-semibold">{review}</p>
                            
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p
              className={`text-center col-span-full ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No hotels found. Try searching another place!
            </p>
          )}
        </div>
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