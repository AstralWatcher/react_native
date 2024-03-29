# My Universal React Project

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.io/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
  - If you have native iOS code run `npx pod-install`
- Run `yarn start` to start the bundler in CMD (git bash will not work).
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
 
  - Web: Any web browser

## How to debug:
- React devtools
	-1) yarn global add react-devtools
	-2) Type:"react-devtools"
	-3) You can see details of react native app
- Expo
	-1) shake device
	-2) Debug JS remotely
	-3) Go to debuggerWorker.js > Find your js file
- Simulator
	-1) CTRL + D 
  
  
## Adding Native Code

This project can be run from a web browser or the Expo client app. You may find that you want to add more native code later on. You can do this by ejecting the project and rebuilding it yourself.

- Run `yarn eject` to create the native projects.
- You can still run your project in the web browser or Expo client, you just won't be able to access any new native modules you add.

## Publishing

- Deploy the native app to the App store and Play store using this guide: [Deployment](https://docs.expo.io/distribution/app-stores/).
- Deploy the website using this guide: [Web deployment](https://docs.expo.io/distribution/publishing-websites/).

### Expo
- npm i -g expo-cli
- 1) expo signin -u <email> -p <pass>
- 2) expo publish
- 3) Go to website expo.io to check publishing

- 4) For build run: expo build:android

## 📝 Notes

- Learn more about [Universal React](https://docs.expo.io/).
- See what API and components are [available in the React runtimes](https://docs.expo.io/versions/latest/).
- Find out more about developing apps and websites: [Guides](https://docs.expo.io/guides/).

# React_native
## Software used:
- Command tool "Create React Native" app by Facebook (so that Xcode and Android studio is not required)
- Yarn by Facebook (alternative to npm)
- Expo client (Google Playstore and IOS) - for testing on phone (npm install -g expo-cli)

## How it was made with "Create React Native":
- yarn global add create-react-native-app (npm install -g create-react-native-app)
- create-react-native-app conFusion

## Libraries
create-react-native
react-native-elements
react-navigation @5
-- yarn add react-navigation
-- yarn add @react-navigation/stack
-- yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
-- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
-- yarn upgrade @react-navigation/native@latest
expo
-- yarn add @react-navigation/drawer
redux
-- yarn add redux
-- yarn add react-redux
-- yarn add redux-thunk
-- yarn add redux-logger (debug)
json-server
-- yarn add -g json-server 
→ yarn add react-native-swipeout

→ yarn add react-native-animatable
redux persist:
→ yarn add redux-persist
→ yarn add react-native-async-storage/async-storage

For storage on device using expo-secure-store SecureStore

For notifications and asking of permissions used: 'expo-notifications' 'expo-permissions'

How to use mocked json server
https://my-json-server.typicode.com/
Dishes : https://my-json-server.typicode.com/AstralWatcher/react_native_json_server/dishes
Dishes id 1 : https://my-json-server.typicode.com/AstralWatcher/react_native_json_server/dishes/1
Whole db https://my-json-server.typicode.com/AstralWatcher/react_native_json_server/db