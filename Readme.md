# Movie Search App - React Native

## 📌 Introduction

This is a **React Native** movie search app that allows users to search for movies, view details, and navigate seamlessly between different screens.

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```sh
git clone [https://github.com/aayushchauhan10/MovieSearch.git]
cd MovieSearchApp
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Run the App**

For Android:

```sh
npm run start
```

---

## 📂 Project Structure

```
MovieSearchApp/
│-- assets/              # Icons and other images
│-- src/                  # Main source code
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screens of the app
│   │   ├── HomeScreen.tsx
│   │   ├── MovieDetailsScreen.tsx
│   │   ├── SearchResultsScreen.tsx
│   │   ├── SplashScreen.tsx
|   |   ├── LikedMoviesScreen.tsx
│   ├── services/
|       ├── api.ts    # All API calls here
|-- App.tsx           # Main App file
│-- package.json      # Project dependencies
│-- README.md         # Project Documentation
```

---

## 🛠 Features

✅ Search for movies using a search bar  
✅ View detailed information about selected movies  
✅ Smooth navigation between screens  
✅ React Navigation for seamless transitions  
✅ Expo or React Native CLI support

---

## 📌 Important Dependencies

- **React Native** - `react-native`
- **React Navigation** - `@react-navigation/native`, `@react-navigation/stack`
- **Icons** - `@expo/vector-icons`
- **Expo CLI (optional)** - `expo`

---

## 📸 Updating App Icon

1. Replace icon images in `android/app/src/main/res/` (for Android).
2. Replace images inside `ios/YourApp/Images.xcassets/AppIcon.appiconset/` (for iOS).
3. Run:
   ```sh
   cd android && ./gradlew clean && cd ..
   npx react-native run-android
   ```

---

## 📦 Build APK for Android

```sh
eas build -p android
```

---

## 📧 Contact & Support

For any issues, feel free to open an issue in the repository or reach out!

---

### 🚀 Happy Coding! 🎬
