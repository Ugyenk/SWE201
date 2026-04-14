```md
#  Campus Companion App

##  Overview
Campus Companion is a mobile application built using **React Native (Expo)**. It is designed to help new students quickly access important campus information such as contacts, schedules, and map locations.

The app demonstrates core mobile development concepts including navigation, component-based architecture, and responsive UI design.

---

##  Features

-  Home screen with app introduction
-  Contacts list using FlatList
-  Contact detail screen with parameter passing
-  Weekly class schedule using ScrollView
-  Campus map screen with external link
-  Bottom Tab Navigation
-  Stack Navigation for detail screen
-  Clean UI using StyleSheet and Flexbox
-  Optional dark mode support

---

##  Tech Stack

- React Native
- Expo
- JavaScript (ES6+)
- React Navigation:
  - Stack Navigator
  - Bottom Tab Navigator

---

##  Project Structure

```

campus-companion/
│
├── App.js
├── navigation/
│   ├── StackNavigator.js
│   └── TabNavigator.js
│
├── screens/
│   ├── HomeScreen.js
│   ├── ContactsScreen.js
│   ├── ContactDetailScreen.js
│   ├── ScheduleScreen.js
│   └── MapScreen.js
│
├── components/
│   └── ContactItem.js
│
├── data/
│   ├── contacts.js
│   └── schedule.js
│
├── styles/
│   └── globalStyles.js
│
└── assets/

````

---

##  Installation & Setup

### 1. Install dependencies
```bash
npm install
````

### 2. Install required packages

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

### 3. Start the project

```bash
npx expo start
```

---

##  Running the App

You can run the app using:

*  Expo Go (Android / iOS)
*  ndroid Emulator
*  iOS Simulator

---

## 🔄 Navigation Flow

```
Home Screen
   ↓
Bottom Tab Navigation
   ├── Home
   ├── Contacts
   │      └── Contact Detail (Stack Navigation)
   ├── Schedule
   └── Map
```

---

##  Contacts Feature

* Displays a list of campus contacts using FlatList
* Each contact is clickable
* Navigates to Contact Detail screen
* Uses route parameters for data passing

---

##  Schedule Feature

* Displays weekly timetable
* Uses ScrollView for smooth scrolling

---

##  Map Feature

* Opens Google Maps link externally
* Uses Linking API

---

##  UI/UX Features

* Clean and simple design
* Flexbox-based responsive layout
* Consistent styling using StyleSheet
* Tab icons using FontAwesome / Ionicons
* Optional dark mode support

---

##  Learning Outcomes

* React Native components (View, Text, FlatList, ScrollView)
* Navigation (Stack + Tabs)
* Props and parameter passing
* Component-based architecture
* Responsive UI design
* Mobile app development using Expo

---

##  Troubleshooting

If the app does not run properly:

```bash
npx expo start -c
```


