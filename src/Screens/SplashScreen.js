import React, {useEffect, useState} from 'react'
import { View, Text, Image, Modal, StatusBar, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification"

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            GetLoginStatus()
        }, 2000)
         /////////////////background////////////////////////
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log('===> background state:',remoteMessage.data);
          if(remoteMessage.data.status == 'meeting'){
            navigation.navigate("TOPTAB",{Screen: 'Open'})
          }
          else if(remoteMessage.data.status == 'hand-shake'){
            navigation.navigate("DASHBOARD")
          }
          else if(remoteMessage.data.status == 'hand-shake-accept' ||  remoteMessage.data.status == 'hand-shake-reject'){
            navigation.navigate("NOTIFICATION")
          }
          else{
            navigation.navigate("DASHBOARD")
          }
        });

        /////////////////quite state////////////////////////
        messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
            navigation.navigate("DASHBOARD")
        }
      });
        /////////////////foreground////////////////////////
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('===> background state:',remoteMessage.data);
          PushNotification.localNotification({
              channelId: "test-channel",
              message: remoteMessage.notification.title,
              date: new Date(Date.now() + (60 * 1000)),
          })  
          // if(remoteMessage.data.status == 'meeting'){
          //   navigation.navigate("TOPTAB",{Screen: 'Open'})
          // }
          // else if(remoteMessage.data.status == 'hand-shake'){
          //   navigation.navigate("DASHBOARD")
          // }
          // else if(remoteMessage.data.status == 'hand-shake-accept' ||  remoteMessage.data.status == 'hand-shake-reject'){
          //   navigation.navigate("NOTIFICATION")
          // }
          // else{
          //   navigation.navigate("DASHBOARD")
          // }
      });
    
        return unsubscribe;
      });
      

      const GetLoginStatus = async() => {
        try {
            const UserStatus = await AsyncStorage.getItem('Login')
            console.log(UserStatus)
            if(UserStatus == null){
              navigation.navigate("LOGIN")
            }
            else if(UserStatus == 'false'){
              navigation.navigate("LOGIN")
            }
            else{
              navigation.navigate("DASHBOARD")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return(
    <View style={{height: '100%', width: '100%', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff"/>
      <View>
      <Image
      style={{width: 300, height: 75}}
          source={require('../Images/PWLOGO2.png')}
      />
      </View>

    </View>
  )
}

export default SplashScreen;