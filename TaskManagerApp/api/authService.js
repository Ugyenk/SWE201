// api/authService.js
// Dummy token-based authentication (simulates sign-in / sign-up)
// Replace with a real endpoint if using a custom backend

import AsyncStorage from '@react-native-async-storage/async-storage';

// Simulated users list stored locally (replace with real API calls)
const DUMMY_USERS_KEY = 'dummy_users';

const generateToken = (email) =>
  `mock_token_${email.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}`;

/** Sign up — registers a new user locally */
export const signUp = async ({ name, email, password }) => {
  const raw = await AsyncStorage.getItem(DUMMY_USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];

  if (users.find((u) => u.email === email)) {
    throw { type: 'validation', message: 'Email already registered.' };
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  await AsyncStorage.setItem(DUMMY_USERS_KEY, JSON.stringify(users));

  const token = generateToken(email);
  await AsyncStorage.setItem('auth_token', token);
  await AsyncStorage.setItem('auth_user', JSON.stringify({ id: newUser.id, name, email }));

  return { token, user: { id: newUser.id, name, email } };
};

/** Sign in — validates credentials */
export const signIn = async ({ email, password }) => {
  const raw = await AsyncStorage.getItem(DUMMY_USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw { type: 'validation', message: 'Invalid email or password.' };
  }

  const token = generateToken(email);
  await AsyncStorage.setItem('auth_token', token);
  await AsyncStorage.setItem('auth_user', JSON.stringify({ id: user.id, name: user.name, email }));

  return { token, user: { id: user.id, name: user.name, email } };
};

/** Sign out — clears persisted auth */
export const signOut = async () => {
  await AsyncStorage.removeItem('auth_token');
  await AsyncStorage.removeItem('auth_user');
};

/** Rehydrate session from storage */
export const getStoredSession = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  const userRaw = await AsyncStorage.getItem('auth_user');
  if (token && userRaw) {
    return { token, user: JSON.parse(userRaw) };
  }
  return null;
};
