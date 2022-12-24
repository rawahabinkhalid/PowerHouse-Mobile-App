/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(JSON.stringify(remoteMessage.notification.title));
    console.log(JSON.stringify(remoteMessage.notification.body));
  });

  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
  })

AppRegistry.registerComponent(appName, () => App);
