# Practical 2 

## Overview
A React Native app built with Expo that demonstrates responsive layouts and navigation across two screens: **Dashboard** and **Profile**.

## Project Structure
```
Practical2App/
├── App.js                  # Entry point with Stack Navigator
├── app.json                # Expo configuration
├── index.js                # Root component registration
├── package.json            # Dependencies
├── assets/                 # Icons and images
└── screens/
    ├── DashboardScreen.js  # Responsive dashboard with stats and cards
    └── ProfileScreen.js    # Responsive profile with user info
```

## Features
- Responsive layouts using **Flexbox**
- **`useWindowDimensions`** hook for breakpoint-based layout switching
- **ScrollView** to handle smaller screen sizes
- Stack **Navigation** between Dashboard and Profile screens
- Layout adapts from single-column (phones) to side-by-side (tablets/landscape)

## Setup & Installation

### Prerequisites
- Node.js installed
- Expo Go app on your phone (v55+)

### Steps
```bash
# Install dependencies
npm install

# Start the app
npx expo start
```

Scan the QR code with Expo Go to run on your device.

## Dependencies
| Package | Version |
|---|---|
| expo | ~55.0.17 |
| react | 19.2.0 |
| react-native | 0.83.6 |
| @react-navigation/native | 6.1.18 |
| @react-navigation/native-stack | 6.11.0 |
| react-native-screens | 4.23.0 |
| react-native-safe-area-context | 5.6.2 |

## Screens
- **Dashboard** – Shows a welcome header, stat boxes, responsive cards, and recent activity
- **Profile** – Shows user info, preferences, and an about section

## Module
SWE101 – Mobile Application Development  
Practical 2 | Units 2 and 3