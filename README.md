# **Qubo - AI Web Application**

Qubo is an AI-powered web application that allows users to ask questions and receive answers with 3D visualizations for better understanding. Built using **React** for the frontend, **Flask** for the backend, and **Firebase** for authentication, Qubo provides an interactive and intuitive way to explore AI-generated models.

## **Table of Contents**
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## **Features**

- **User Authentication**: Sign up and log in using Firebase authentication.
- **AI-Driven 3D Visualizations**: View AI-generated models for better understanding of complex concepts.
- **Protected Routes**: Certain pages require authentication to access.
- **Responsive Design**: Fully responsive UI built with React and styled components.

---

## **Tech Stack**

- **Frontend**:
  - React (for building the UI)
  - TypeScript (for type safety)
  - Vite (for fast development and build)
  - Firebase Authentication (for user authentication)
  - Supabase (for the database and storage)

- **Backend**:
  - Flask (Python framework)
  - Firebase Authentication (for backend validation)
  - AI integration for generating 3D models (could use services like OpenAI or custom solutions)

---

## **Project Structure**

/src ├── components │ ├── auth │ ├── layout │ ├── ui │ └── visualization ├── context ├── hooks ├── lib ├── pages │ ├── dashboard.tsx │ ├── home.tsx │ ├── login.tsx │ └── signup.tsx ├── services │ └── api.ts ├── types │ └── supabase.ts ├── App.tsx └── main.tsx


---

## **Installation**

### **Frontend Setup (React + Vite)**

1. Clone the repository:

   ```bash
   git clone https://github.com/chauhan081/sb1-ruskytbq.git
   cd sb1-ruskytbq

2. Install dependencies:

   '''bash
   npm install
3. Create a .env file and add your Firebase and Supabase credentials:

   '''makefile
   VITE_FIREBASE_API_KEY=<your_firebase_api_key>
   VITE_SUPABASE_URL=<your_supabase_url>
   
4. Start the frontend:
   '''bash
   npm run dev
   
