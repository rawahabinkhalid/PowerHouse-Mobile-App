import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, BackHandler, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PushNotification from "react-native-push-notification"

const LoginScreen = ({ navigation }) => {

  const [UserName, setUserName] = useState(null)
  const [Password, setPassword] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [Show, setShow] = useState(true)

  useEffect(() => {
    CreateChannels()
    requestLocationPermission()

    navigation.addListener('focus',()=>{
      const backAction = () => {
        BackHandler.exitApp()
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  })
  
  }, [])


      const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission!",
              message:
                "Allow access of your Location.",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('done')
          } else {
            BackHandler.exitApp()
            return true;
          }
        } catch (err) {
          console.log(err);
        }
      };


  const CreateChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel"
      }
    )
  }

  const LOGIN = async() => {
    if( UserName == null || UserName == '' ){
      Alert.alert("","Please enter Email")
    }
    else if( Password == null || Password == '' ){
      Alert.alert("","Please enter Password")
    }
    else{    
    setLoading(true)
    console.log('Login')

    let details = {
      email: UserName,
      password: Password
  };
  let formBody = [];
  for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
    fetch('https://mobileapp.powerhouse.com.pk/Login/login_data.php',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if(json.userid == null){
        Alert.alert("","Invalid Email or Password")
        setLoading(false)
      }
      else{
        const UserInfo = JSON.stringify(json)
        AsyncStorage.setItem('UserInfo', UserInfo)
        AsyncStorage.setItem('Login', 'true')
        console.log('IN ELSE')
        navigation.navigate("DASHBOARD")
        setLoading(false)
        setUserName(null)
        setPassword(null)
        setShow(true)
      }
    })
    .catch((error) => {
      const { message } = error;
      console.log(message)
     Alert.alert("","Please check your internet connection!")
      setLoading(false)
    });
  }
}

  return(
    <View style={{height: '100%', width: '100%'}}>
      <Image
      style={{height: '100%', width: '100%'}}
        source={require('../Images/BG1.jpg')}
      />
      <View style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', height: '100%', width: '100%', position: 'absolute'}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
      style={{width: 300, height: 65}}
          source={require('../Images/PWLOGO2.png')}
      />
      <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 50}}>
      <Text style={{fontSize: 22, fontFamily: 'Karla-Light', color: 'grey'}}>Welcome to </Text>
      <Text style={{fontSize: 22, fontFamily: 'Karla-Bold', color: 'grey'}}>POWERHOUSE</Text>
      </View>
      <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
      <TextInput
      style={{backgroundColor: '#fff' , width: 250, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, marginBottom: 10, color: '#000000', padding: 10, height: 50, elevation: 10}}
        placeholder="Email"
        placeholderTextColor="grey"
        keyboardType="email-address"
        onChangeText={text => setUserName(text)}
        value={UserName}
      />
      <View style={{backgroundColor: '#fff', height: 50, borderBottomRightRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', elevation: 10}}>
      <Ionicons name={"ios-mail"} size={25} color={'#f8ae4e'} style={{paddingRight: 10}}/>
      </View>
      </View>
      <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
      <TextInput
      style={{backgroundColor: '#fff', width: 250, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, color: '#000000', padding: 10, height: 50, elevation: 10}}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry={Show}
        onChangeText={text => setPassword(text)}
        value={Password}
      />
      <View style={{backgroundColor: '#fff', height: 50, borderBottomRightRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', elevation: 10}}>
      
      { Show ? <TouchableOpacity
      onPress={()=>setShow(false)}
      >
      <Entypo name={"eye-with-line"} size={25} color={'#f8ae4e'} style={{paddingRight: 10}}/>
      </TouchableOpacity>
      :
      <TouchableOpacity
      onPress={()=>setShow(true)}
      >
      <Entypo name={"eye"} size={25} color={'#f8ae4e'} style={{paddingRight: 10}}/>
      </TouchableOpacity>}

      </View>
      </View>
      {Loading ? 
        <View style={{width: 280, alignItems: 'center', borderRadius: 10, height: 50, justifyContent: 'center', marginTop: 30}}>
        <ActivityIndicator size="large" color="#f8ae4e"/>
        </View>
        :
        <TouchableOpacity 
        onPress={LOGIN}
        style={{backgroundColor: '#f8ae4e', width: 285, alignItems: 'center', borderRadius: 10, height: 50, justifyContent: 'center', marginTop: 30}}>
        <Text style={{color: '#fff', fontFamily: 'Karla-SemiBold', fontSize: 20}}>Login</Text>
        </TouchableOpacity> 
        }
        {Loading ? <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={{color: '#f8ae4e', fontFamily: 'Poppins-SemiBold'}}>Loading</Text>
        </View> 
        : 
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate("FORGET")
          setShow(true)
          setUserName(null)
          setPassword(null)
          }}
        style={{marginTop: 20, marginBottom: 20}}>
          <Text style={{color: '#f8ae4e', fontFamily: 'Poppins-SemiBold'}}>Forgot Password?</Text>
        </TouchableOpacity>}
      </ScrollView>
      </View>
    </View>
  )
}

export default LoginScreen;