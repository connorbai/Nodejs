import admin from 'firebase-admin'
import path from 'path'


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(path.resolve(__dirname, 'serviceAccountKey.json')),
});

// Send a notification to a specific user
const message = {
  token: 'YOUR_FCM_TOKEN',
  notification: {
    title: 'Notification Title',
    body: 'Notification Body',
  },
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });
