# 🎧 Harmonix — Your Personal Music Universe

<p align="center">
  <b>A full-featured music streaming web app built with React, Firebase & iTunes API</b>
</p>

<p align="center">
  <a href="https://harmonix-psi.vercel.app">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel">
  </a>
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge">
</p>

---

## 🚀 Live Demo  
🔗 **Try it here:** https://harmonix-psi.vercel.app  

---

## 📸 Preview

<p align="center">
  <img src="src/assets/images/harmonix.png" width="80%" />
</p>

---

## ✨ Features

🎵 **Music Experience**
- 🔍 Real-time search (iTunes API — 15M+ tracks)
- ▶️ Instant 30-sec previews  
- 📈 Trending & discovery feed  

👤 **User Features**
- 🔐 Firebase Authentication  
- ❤️ Like & Favourite songs  
- 📂 Create custom playlists  

🎨 **UI/UX**
- 🌙 Dark / Light mode  
- 🔤 Adjustable font size  
- 📱 Fully responsive design  

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | Frontend UI |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Firebase Auth | User authentication |
| iTunes Search API | Song data & previews |
| React Router v6 | Client-side routing |
| Context API | Global state (dark mode, font size) |
| localStorage | Playlist & liked songs persistence |
| Vercel | Deployment |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Neeraj-singh140805/Harmonix.git
cd Harmonix

# 2. Install dependencies
npm install

# 3. Set up Firebase
# Create a .env file in the root and add your Firebase config:
```

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
# 4. Start the development server
npm run dev
```

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx        # Responsive navbar with hamburger menu
│   ├── Home.jsx          # Dashboard with section links
│   ├── Library.jsx       # Search songs + music player
│   ├── Feed.jsx          # Music feed
│   ├── Trending.jsx      # Trending tracks
│   ├── Favorites.jsx     # Favourite songs
│   ├── LikedSongs.jsx    # Liked songs
│   ├── Playlists.jsx     # User playlists
│   ├── Setting.jsx       # Dark mode & font size
│   ├── Login.jsx         # Firebase login
│   ├── SignUp.jsx        # Firebase sign up
│   ├── Welcome.jsx       # Landing page
│   ├── AboutUs.jsx       # About page
│   └── Footer.jsx        # Footer
├── context/
│   └── SettingContext.jsx # Dark mode & font size context
├── firebase.js           # Firebase config
├── App.jsx               # Routes & layout
└── main.jsx              # Entry point
```

---

## 🔒 Authentication Flow

- Users land on the **Welcome** page
- Must **Sign Up / Log In** with Firebase Auth to access the app
- Protected routes redirect unauthenticated users to `/login`
- User session stored in `localStorage`

---

## 🌐 Deployment

The app is deployed on **Vercel** with automatic deployments on every push to `main`.

To deploy your own fork:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Neeraj Singh**
- GitHub: [@Neeraj-singh140805](https://github.com/Neeraj-singh140805)

---