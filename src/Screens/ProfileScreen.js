import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, BackHandler, Image, ActivityIndicator } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomTab from '../Components/BottomTab'
import ImagePicker from "react-native-customized-image-picker"
import avatar from './ProfileAvatar'
import firestore, { firebase } from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation }) => {

    useEffect(()=>{
        GetUserInfo()
        GetUserImage()

        navigation.addListener('focus',()=>{
            const backAction = () => {
            navigation.navigate("DASHBOARD")
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
      })
      
    }, []);

    const [UserId, setUserId] = useState(null)
    const [UserName, setUserName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [PhoneNumber, setPhoneNumber] = useState(null)
    const [CNIC, setCNIC] = useState(null)
    const [Role, setRole] = useState(null)
    const [UserImage, setUserImage] = useState('')
    const [Loading, setLoading] = useState(false)

    const GetUserInfo = async() => {
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            console.log('=======', UserInfo)
            setUserId(JSON.parse(UserInfo).userid)
            setUserName(JSON.parse(UserInfo).userfullname)
            setEmail(JSON.parse(UserInfo).email)
            setRole(JSON.parse(UserInfo).userrole)
            setPhoneNumber(JSON.parse(UserInfo).phoneno)
            setCNIC(JSON.parse(UserInfo).cnic)
        } catch (error) {
            console.log(error)
        }
    }


    const GetUserImage = async() => {     
      setLoading(true);
      try {
      const UserInfo = await AsyncStorage.getItem('UserInfo');
      console.log(UserInfo);
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/getImage.php',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             employeeid : JSON.parse(UserInfo).userid
          }),
        },
      )
        .then(response => response.json())
        .then(josn => {
          // console.log("++++++++++++++",josn[0].Image)
          setUserImage(josn[0].Image)
          setLoading(false)
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    }


    const chooseFile = () => {
        ImagePicker.openPicker({
          isCamera:true,
          includeBase64: true,
          compressQuality: 99,
          minCompressSize: 5,
          cropping: true,
          hideCropBottomControls: false
        }).then(images => {
          setUserImage('data:'+images[0].mime+';base64,'+images[0].data)
        setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/uploadUserImageApi.php',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 employeeid : UserId,
                 images: 'data:'+images[0].mime+';base64,'+images[0].data
              }),
            },
          )
            .then(response => response.text())
            .then(josn => {
              /////////////////////////////////
              
              firestore()
              .collection('Users')
              .doc(UserId)
              .get()
              .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);
                if (documentSnapshot.exists) {
                  firestore()
                        .collection('Users')
                        .doc(UserId)
                        .update({
                          userimage: 'data:'+images[0].mime+';base64,'+images[0].data
                          })
                        .then(() => {
                          console.log('User Updated!')
                          setLoading(false)
                        });
                }
              });
              
              ////////////////////////////////
              // console.log('>>>>>>>>>>',josn)
              // setLoading(false)
            })
            .catch(error => {
              console.error(error);
              setLoading(false);
            });

        })
     };

    
     if (Loading == true) {
      return (
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator size="large" color="#f8ae4e" />
        </View>
      );
    } 
    else{
     return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#ededed'}}>
            
            <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{marginLeft: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>PROFILE</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
        
           {/* <View style={{backgroundColor: '#f8ae4e', width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20}}>
            <FontAwesome name={"user"} color= {"#fff"} size={100}/>
           </View> */}

           {/* <Image
                style={{width: 250, height: 50, marginTop: 20, alignSelf: 'center'}}
                source={require('../Images/PWLOGO2.png')}
            /> */}

        <View style={{alignSelf: 'center', justifyContent: 'flex-end', marginTop: 50}}>
        <Image
        style={{height: 120, width: 120, borderRadius: 60, borderColor: 'grey', borderWidth: 1}}
            source={{uri: UserImage == '' ? avatar : UserImage}}
        />

        <TouchableOpacity
        onPress={chooseFile}
        style={{backgroundColor: '#f8ae4e', height: 30, width: 30, borderRadius: 20, position: 'absolute', alignSelf: 'flex-end', borderWidth: 2, borderColor: '#ededed', alignItems: 'center', justifyContent: 'center'}}
        >
        <MaterialCommunityIcons name={"camera"} color= {"#fff"} size={15}/>
        </TouchableOpacity>

        </View>

        {/* <TouchableOpacity style={{backgroundColor: '#f8ae4e', alignSelf: 'center', marginTop: 20, height: 35, borderRadius: 5, alignItems: 'center', justifyContent: 'center', elevation: 5}}
        onPress={chooseFile}
        >
        <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10, paddingRight: 10}}>Upload Image</Text>
        </TouchableOpacity> */}

        <View style={{ width: '95%', marginTop: 20, alignSelf: 'center'}}>
        <TextInput
        style={{backgroundColor: '#ededed', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: '#000', text: 'grey'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Name"
        value={UserName}
        editable={false}
        //onChangeText={text => setAddress(text)}
        />        
        </View>

        <View style={{ width: '95%', marginTop: 10, alignSelf: 'center'}}>
        <TextInput
        style={{backgroundColor: '#ededed', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: '#000', text: 'grey'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Email"
        value={Email}
        editable={false}
        //onChangeText={text => setAddress(text)}
        />        
        </View>

        <View style={{ width: '95%', marginTop: 10, alignSelf: 'center'}}>
        <TextInput
        style={{backgroundColor: '#ededed', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: '#000', text: 'grey'}}}
        selectionColor="#000"
        mode= "outlined"
        label="User Role"
        value={Role}
        editable={false}
        //onChangeText={text => setAddress(text)}
        />        
        </View>

        <View style={{ width: '95%', marginTop: 10, alignSelf: 'center'}}>
        <TextInput
        style={{backgroundColor: '#ededed', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: '#000', text: 'grey'}}}
        selectionColor="#000"
        mode= "outlined"
        label="PhoneNumber"
        value={PhoneNumber}
        editable={false}
        //onChangeText={text => setAddress(text)}
        />        
        </View>

        <View style={{ width: '95%', marginTop: 10, alignSelf: 'center', marginBottom: 10}}>
        <TextInput
        style={{backgroundColor: '#ededed', marginLeft: 10, marginRight: 10,}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: '#000', text: 'grey'}}}
        selectionColor="#000"
        mode= "outlined"
        label="CNIC"
        value={CNIC}
        editable={false}
        //onChangeText={text => setAddress(text)}
        />        
        </View>


        </ScrollView>

        <BottomTab 
            colorc = "#f8ae4e"
                pathh = {()=>navigation.navigate("DASHBOARD")}
                
                pathm = {()=>navigation.navigate("HISTORY")}
                
                paths = {()=>navigation.navigate("STATS")}
                
                patho = {()=>{
                    Alert.alert("","Are you sure you want to logout?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                        AsyncStorage.setItem('Login', 'false') 
                        navigation.navigate("LOGIN")
                    }}
                    ])
                    }}
            />

        </View>
    )
    }
}

export default ProfileScreen;