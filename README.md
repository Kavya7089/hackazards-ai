#AI Tour Guide
AI Tour Guide is a web application that provides users with personalized travel assistance. It offers features such as hotel recommendations, tourist attraction details, shopping locations, text translation, and image-based landmark recognition. The project leverages AI-powered APIs and machine learning models to deliver accurate and user-friendly travel information.

Features
1. Home Page
Search for famous landmarks and get detailed AI-generated descriptions.
Upload images of landmarks to receive captions and related information.
Supports multiple languages for queries and responses.
2. Hotels Page
Displays a list of hotels in a specified location.
Includes hotel details such as name, location, rating, price, amenities, and reviews.
Dark mode support for enhanced user experience.
3. Places Page
Lists famous tourist attractions in a specified location.
Provides details like name, type, location, rating, description, and reviews.
Includes a collapsible review section for user feedback.
4. Shopping Page
Displays shopping places in a specified location.
Includes details like name, type, location, rating, description, and reviews.
Dark mode support for better usability.
5. Translator Page
Translate text into multiple languages.
Supports voice input and output for translations.
Dark mode support for improved accessibility.
6. Contact Page
Allows users to send messages or inquiries.
Includes a form with fields for name, email, and message.
Dark mode support for better readability.
Tech Stack
Frontend
React.js with TypeScript
Tailwind CSS for styling
Framer Motion for animations
Backend
Python with Flask
Groq API for AI-powered responses
Hugging Face Transformers for image captioning
Google Maps API for location-based services
Other Tools
dotenv for environment variable management
Pillow (PIL) for image processing
Torch for deep learning models
Installation
1. Clone the Repository:  
   **git clone https://github.com/Kavya7089/hackazards-ai.git**
   ,**cd hachazards-ai**
2. Set enviorment:  
    **python -m venv venv**
3. Activate enviorment:  
    **venv\Scripts\activate**
4. Install Backend Dependencies:
   **pip install -r requirements.txt**
5. Install Frontend Dependencies:
     **cd template**
    ,**npm install**
6. Set Up Environment Variables
Create a .env file in the backend directory.
Add the following variables:
   # GROQ_API_KEY=your_groq_api_key
    # GOOGLE_MAPS_API_KEY=your_google_maps_api_key

7. Start the Backend Server
    **cd ..**
    **python app.py**
8. Start the Frontend Development Server
   **cd templates**
   ,**npm run dev**
API Endpoints
Backend API
GET /places

Returns a list of tourist attractions for a given location.
GET /hotels

Returns a list of hotels for a given location.
GET /shopping

Returns a list of shopping places for a given location.
POST /translate

Translates text into the specified language.
POST /image-search

Processes an uploaded image and returns related information.


How to Use
Home Page:

Enter a location or upload an image to get AI-generated information.
Hotels Page:

Search for hotels in a specific location and view details.
Places Page:

Explore famous tourist attractions in a location.
Shopping Page:

Discover shopping places in a location.
Translator Page:

Translate text into multiple languages with voice input/output support.
Contact Page:

Send inquiries or feedback using the contact form.
Dark Mode
All pages support dark mode.
Toggle the dark mode button in the bottom-right corner of the screen.
Future Enhancements
Add user authentication for personalized experiences.
Integrate booking APIs for hotels and tours.
Add more languages for translation.
Improve image recognition for better landmark identification.

Contributors
Your Name - Kavya Rajoria
Your Team Members - Tech Hunters
Feel free to contribute to this project by submitting issues or pull requests!
