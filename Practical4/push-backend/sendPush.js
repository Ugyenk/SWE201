// push-backend/sendPush.js
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

async function sendPush() {
  // PASTE THE TOKEN FROM THE PHONE HERE
  const pushToken = 'ExponentPushToken[nqwnVgGQ356DxZundF4GM1]';

  // Step 1: validate the token shape.
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error('Invalid Expo push token.');
    return;
  }

  // Step 2: build the message.
  const messages = [
    {
      to: pushToken,
      sound: 'default',
      title: 'From the backend',
      body: 'This push came from a Node.js server.',
      data: { screen: 'Profile', userId: 42 },
    },
  ];

  // Step 3: Expo recommends chunking for batch sends (max 100 per request).
  const chunks = expo.chunkPushNotifications(messages);

  // Step 4: send each chunk and collect the tickets.
  for (const chunk of chunks) {
    try {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log('Tickets:', tickets);
    } catch (error) {
      console.error('Send error:', error);
    }
  }
}

sendPush();
