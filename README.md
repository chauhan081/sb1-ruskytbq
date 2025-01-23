Qubo - AI Web Application
Qubo is an AI-based web application that allows users to ask questions and receive answers with 3D examples for better understanding. It uses Firebase for authentication, Flask as the backend, and React for the frontend. The app includes features like login/signup, subscription models, and AI-driven visualizations.

Project Structure
css
Copy
Edit
/src
├── components
│   ├── auth
│   ├── layout
│   ├── ui
│   └── visualization
├── context
├── hooks
├── lib
├── pages
│   ├── dashboard.tsx
│   ├── home.tsx
│   ├── login.tsx
│   └── signup.tsx
├── services
│   └── api.ts
├── types
│   └── supabase.ts
├── App.tsx
└── main.tsx
Main Folders/Files:
components/: Contains reusable UI components like buttons, inputs, navbar, etc.
context/: Provides global state management for authentication using React Context.
hooks/: Custom hooks for handling logic like authentication and settings.
pages/: Contains pages for different sections of the app (login, signup, dashboard).
services/: API logic for interacting with the backend.
lib/: Contains Firebase and Supabase configuration files.
types/: TypeScript type definitions (for Supabase, etc.).
Features
Authentication: Users can sign up, log in, and access personalized content.
3D Visualization: AI-driven 3D models are fetched from the backend for a better understanding of complex questions.
Protected Routes: Certain routes are protected and only accessible to authenticated users.
Subscription Models: Future plans include subscription models for premium access.
Tech Stack
Frontend:

React (for building UI)
TypeScript (for type safety)
Vite (for fast development and build)
Firebase Authentication (for user authentication)
Supabase (for database)
Backend:

Flask (Python framework)
Firebase Authentication (for backend validation)
AI integration for generating 3D models (may use services like OpenAI or custom solutions)
Installation and Setup
Prerequisites:
Node.js (v14 or higher)
Python (v3.8 or higher)
Firebase account
Supabase account
Frontend Setup (React + Vite)
Clone the repository:

bash
Copy
Edit
git clone https://github.com/chauhan081/sb1-ruskytbq.git
cd sb1-ruskytbq
Install frontend dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root and add your Firebase and Supabase credentials:

makefile
Copy
Edit
VITE_FIREBASE_API_KEY=<your_firebase_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_KEY=<your_supabase_key>
Start the frontend:

bash
Copy
Edit
npm run dev
The frontend will be available at http://localhost:3000.

Backend Setup (Flask)
Navigate to the backend folder:

bash
Copy
Edit
cd qubo-backend
Create a virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows
Install backend dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Set up your Firebase and Supabase credentials in the backend (/utils/firebase_helper.py or .env).

Start the Flask backend:

bash
Copy
Edit
python app.py
The backend will be available at http://127.0.0.1:5000.

Usage
Sign Up / Log In: Navigate to /login or /signup to authenticate.
Dashboard: Once logged in, you will be redirected to the dashboard, where you can interact with AI-powered visualizations.
Model Viewer: The model-viewer.tsx component fetches 3D models from the backend based on the user's query.
Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit pull requests with your improvements. Please make sure your code is well-documented and follows the existing style guide.

License
This project is licensed under the MIT License - see the LICENSE file for details.
