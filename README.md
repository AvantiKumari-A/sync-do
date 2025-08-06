# Task Management App

A modern React Native task management application built with Expo, featuring a beautiful UI and intuitive user experience.

# 📱 Download APK

**Latest APK Build**: Download TodoAppMobile.apk

**Video Drive Link**: https://drive.google.com/drive/folders/1FtOvPjwg57kVoNgxmV76k2UlUdGKs5oE

This APK is built using EAS Build and is ready for installation on Android devices. Enable "Install from Unknown Sources" in your Android settings to install the APK.

## Features

- 📱 Cross-platform mobile app (iOS & Android)
- 🎨 Modern, responsive UI with NativeWind styling
- 📅 Calendar integration for task scheduling
- 🔍 Search functionality for tasks
- 👤 User authentication and profile management
- 📝 Create, edit, and delete tasks
- 🎯 Task categorization and status tracking
- 🌙 Dark/Light theme support

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **State Management**: React Hooks
- **Storage**: AsyncStorage
- **UI Components**: Custom components with modern design

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Run on Device/Simulator

- Install the Expo Go app on your mobile device
- Scan the QR code displayed in the terminal
- Or press 'a' for Android emulator or 'i' for iOS simulator

## Building for Production

### Android APK

To build an APK for Android:

1. **Install EAS CLI**:

   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to Expo**:

   ```bash
   eas login
   ```

3. **Configure EAS Build**:

   ```bash
   eas build:configure
   ```

4. **Build APK**:

   ```bash
   eas build --platform android --profile preview
   ```

5. **Download APK**:
   - The build will provide a download link
   - Or use: `eas build:list` to see all builds
   - Download the APK from the provided URL

### iOS Build

For iOS builds (requires Apple Developer account):

```bash
eas build --platform ios --profile preview
```

## Project Structure

```
project/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   ├── task/              # Task detail pages
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── assets/               # Images and static assets
└── app.json              # Expo configuration
```

## Key Components

- **TaskCard**: Displays individual task information
- **TaskModal**: Modal for creating/editing tasks
- **SearchBar**: Search functionality for tasks
- **FloatingActionButton**: Quick action button for adding tasks
- **ProfileModal**: User profile management

## Customization

### Styling

The app uses NativeWind for styling. Modify styles in the component files or create custom Tailwind classes.

### Configuration

Update `app.json` for app metadata, icons, and build settings.

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Build failures**: Ensure all dependencies are properly installed
3. **Device connection**: Make sure your device and computer are on the same network

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native documentation](https://reactnative.dev/)
- Open an issue in this repository

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [NativeWind](https://www.nativewind.dev/)

---

**This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)**

## Assumptions Made

1. **User Authentication**: Assumed the app requires user authentication for task management
2. **Data Persistence**: Assumed tasks need to be stored locally using AsyncStorage
3. **UI/UX**: Assumed a modern, clean interface with dark/light theme support
4. **Platform Support**: Assumed cross-platform support (iOS & Android)
5. **Task Features**: Assumed basic CRUD operations for tasks with categories and status
6. **Navigation**: Assumed tab-based navigation for better mobile UX
7. **Search Functionality**: Assumed users need to search through their tasks
8. **Calendar Integration**: Assumed calendar view for task scheduling
9. **Profile Management**: Assumed users need profile customization options
10. **Build Process**: Assumed cloud-based build process using EAS for easier deployment
#

