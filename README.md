# Personal Journal App 🗒️

A simple personal journal application built with **React** (Vite) and **Firebase**.

This app allows users to:

- ✍️ Write and manage personal notes (journal-style)
- ✅ Keep a to-do list to organize daily tasks
- 📅 Use a calendar to mark important events

Firebase is used for both **user authentication** and **data storage** (Firestore), ensuring your notes, tasks, and events are securely saved and accessible across devices.

---

## Tech Stack

- ⚛️ React (Vite)
- 🔥 Firebase (Authentication & Firestore)
- 🎨 CSS Modules (or your styling method)

## Features

- Secure user login (Firebase Auth)
- Create, edit, and delete notes
- Task list (To-Do)
- Calendar with event tracking
- XSS protection for user inputs

**Clone the repository**
   ```bash
   git clone https://github.com/your-username/personal-journal-app.git
   cd personal-journal-app
   npm install


   Set up Firebase
   VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

    npm run dev