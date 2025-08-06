# Do It - To Do Task Management App

A modern React Native task management application built with Expo, featuring a beautiful UI, intuitive user experience, and advanced productivity features.  
**This project was developed as part of a hackathon run by [Katomaran](https://www.katomaran.com).**

---

## 📱 Download APK

**Latest APK Build:**  
[Download Sync Do - ToDoAppMobile.apk](https://expo.dev/accounts/avanti14/projects/bolt-expo-nativewind/builds/ff8fdf64-53be-4a69-8902-c13cc2939e11)

*This APK is built using EAS Build and is ready for installation on Android devices. Enable "Install from Unknown Sources" in your Android settings to install the APK.*

---

## 🎬 App Demo Video

**Google Drive Link:**  
[Watch Demo](https://drive.google.com/drive/folders/1AQTSWt-SLeFcGFYLEBr4OhiFpxrSFzFy)

---

## Features

### 🔐 Authentication & Onboarding
- Google OAuth login (Expo AuthSession)
- Demo mode for quick app preview
- Session persistence and error handling

### 📝 Task Management
- Create, edit, and delete tasks
- Task categorization and status tracking
- Calendar integration for scheduling
- Search and filter tasks
- Mark tasks as complete/incomplete

### 🎨 User Experience
- Modern, responsive UI with NativeWind styling
- Dark/Light theme support
- Smooth animations and transitions
- Pull-to-refresh and swipe-to-delete

### 🔧 Technical Features
- State management with React Hooks
- Local data persistence using AsyncStorage
- Modular, component-based architecture
- Cross-platform support (iOS & Android)

---

## Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** Expo Router
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Icons:** Lucide React Native
- **State Management:** React Hooks
- **Storage:** AsyncStorage
- **UI Components:** Custom components

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AvantiKumari-A/sync-do.git
   cd sync-do
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Run on your preferred platform:
   - **iOS:** Press `i` in the terminal or scan QR code with Expo Go app
   - **Android:** Press `a` in the terminal or scan QR code with Expo Go app

---

## 🚀 Building APK

1. **Install EAS CLI:**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure EAS Build:**
   ```bash
   eas build:configure
   ```

4. **Build APK:**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download APK:**
   - The build will provide a download link
   - Or use: `eas build:list` to see all builds

---

## Project Structure

```
sync-do/
├── app/                    # Expo Router pages
│   ├── (tabs)/             # Tab navigation
│   ├── task/               # Task detail pages
│   └── _layout.tsx         # Root layout
├── components/             # Reusable components
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── assets/                 # Images and static assets
└── app.json                # Expo configuration
```

---

## Key Components

- **TaskCard:** Displays individual task information
- **TaskModal:** Modal for creating/editing tasks
- **SearchBar:** Search functionality for tasks
- **FloatingActionButton:** Quick action button for adding tasks
- **ProfileModal:** User profile management

---

## Customization

- **Styling:** Modify styles in component files or create custom Tailwind classes.
- **Configuration:** Update `app.json` for app metadata, icons, and build settings.

---

## Troubleshooting

- **Metro bundler issues:** Clear cache with `npx expo start --clear`
- **Build failures:** Ensure all dependencies are properly installed
- **Device connection:** Make sure your device and computer are on the same network

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [NativeWind](https://www.nativewind.dev/)
- Hackathon by [Katomaran](https://www.katomaran.com)

---

## Assumptions Made

- User authentication for task management
- Local data persistence using AsyncStorage
- Modern, clean interface with dark/light theme support
- Cross-platform support (iOS & Android)
- Basic CRUD operations for tasks with categories and status
- Tab-based navigation for better mobile UX
- Search and calendar integration for tasks
- Profile management options
- Cloud-based build process using EAS for
