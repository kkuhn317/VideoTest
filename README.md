# expo-video TV Example

Example that shows a video using Expo's expo-video package.

This project uses

- the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- the [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv) to allow Expo prebuild to modify the project's native files for TV builds

## 🚀 How to use

Install dependencies:

```sh
yarn
```

Build for mobile devices:

```sh
npx expo prebuild --clean
yarn ios # Build for iOS
yarn android # Build for Android
```

Build for TV devices:

```sh
EXPO_TV=1 npx expo prebuild --clean
yarn ios # Build for Apple TV
yarn android # Build for Android TV
```

