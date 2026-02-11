⭐ HABITARC — Personal Habit Tracking App
A clean, modern habit‑tracking app built with React and Tailwind CSS.
HabitArc helps you build consistency through streaks, weekly progress, analytics, and a distraction‑free interface — all wrapped in a polished light/dark theme.

🚀 Features

✔ Habit Dashboard

• View all habits at a glance
• Category‑colored habit cards
• Daily check‑ins
• Streak indicators
• Edit & delete actions

✔ Habit Detail Analytics

• Current streak
• Longest streak
• Total check‑ins
• First & most recent check‑in
• Weekly progress (7‑day view)
• Streak chart (visual timeline)
• Notes section for reflections

✔ Dark Mode

• Persistent theme stored in localStorage
• Fully themed UI (dashboard, cards, analytics, modals, header)

✔ Local Persistence

• All habits, history, and notes saved per‑user
• No backend required for core functionality

✔ Authentication

• Email/password login
• Protected routes
• User‑specific habit storage

✔ Clean, Modern UI

• Tailwind CSS
• Smooth transitions
• Category‑based color system
• Mobile‑friendly layout

🛠 Tech Stack
Area    | Technology
Frontend| React (CRA)
Styling	| Tailwind CSS
State	| React Context API
Auth	| Custom email/password auth
Storage	| LocalStorage
Routing	| React Router
Build Tools	| CRACO + PostCSS

📁 Project Structure
src/
  components/
    HabitCard.jsx
    AddHabitModal.jsx
    Layout.jsx
    Card.jsx
  pages/
    Dashboard.jsx
    HabitDetail.jsx
    Login.jsx
    Register.jsx
  context/
    AuthContext.jsx
  utils/
    categoryColors.js
  index.css
  App.js

  ⚙️ Installation & Setup
1. Clone the repo
git clone https://github.com/yourusername/habitarc-client.git
cd habitarc-client

2. Install dependencies
npm install

3. Start the development server
npm start

The app will run at:

Live Demo
https://https://habitarc-9obc.vercel.app

Local Development
npm start
Runs at: http://localhost:3000

🧠 How It Works
Habit Storage

Each user’s habits are stored under a unique key:
habits_<user.email>

Streak Calculation

• Streak increments when the user checks in today
• Breaks when a day is missed
• Longest streak is tracked automatically

Weekly Progress

• The app builds a 7‑day window (Mon–Sun)
• Highlights days with check‑ins

Streak Chart

• Builds a timeline from first check‑in → today
• Visualizes streak clusters

🗺 Roadmap

Planned Enhancements:

• Monthly heatmap
• Calendar view
• Habit reminders
• Data export/import
• Cloud sync
• Profile page
• More habit categories
• Animated check‑in feedback

📄 License
MIT License — free to use, modify, and build on.

🙌 Author
Tyler Faraon  
Full‑stack JavaScript engineer focused on clean UI, product thinking, and polished user experiences.# habitarc
