import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, ActivityIndicator, FlatList, ToastAndroid, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Picker} from '@react-native-picker/picker'
import { TextInput, Provider } from 'react-native-paper'
import BottomTab from '../Components/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Autocomplete from 'react-native-autocomplete-input'
import moment from 'moment'

const NotificationScreen = ({ navigation }) => {

    useEffect(() => { 
        // getUserNotification()

        navigation.addListener('focus',()=>{
            getUserNotification()
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

    const [Loading, setLoading] = useState(false)
    const [Notification, setNotification] = useState([])

    const getUserNotification = async() => {

        setLoading(true)
         try {
             const UserInfo = await AsyncStorage.getItem('UserInfo')
             fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetUserNotificationApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
         "user_id" : JSON.parse(UserInfo).userid,
         })
         }).then((response) => response.json())
         .then((josn) => {
             console.log(josn[0].Read_Status);
           setNotification(josn)
           setLoading(false)
         })
         .catch((error) => {
           console.log(error);
           setLoading(false)
         });
         } catch (error) {
             console.log(error)
             setLoading(false)
         }    
       }


       const ReadElseNotification = async(val) => {
        //    setLoading(true)
             fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationReadApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               id : val
         })
         }).then((response) => response.json())
         .then((josn) => {
             console.log('===>',josn);
            //  getUserNotification()
            //  setLoading(false)
         })
         .catch((error) => {
           console.log(error);
        //    setLoading(false)
         })   
       }


       const ReadNotification = async(val) => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationReadApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          id : val
    })
    }).then((response) => response.json())
    .then((josn) => {
        console.log('===>',josn);
    })
    .catch((error) => {
      console.log(error);
    })   
  }
    
    if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }
    
      else{
        return(
            <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
    
    <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>NOTIFICATION</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>
    
            {/* <View style={{backgroundColor: '#fff',height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Image
                style={{height: 300, width: 300}}
                    source={require('../Images/UnderDev.png')}
                />
            </View> */}
            <ScrollView style={{height: '100%', width: '100%'}}>

            <FlatList
                data={Notification}
                scrollEnabled= {true}
                keyExtractor={id=>id.Id}
                renderItem={({ item })=>{
                    if(item.Status === 'meeting' || item.Status === 'alloted location'){
                    return(
                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate("TOPTAB",{Screen: 'Noti'})
                            ReadNotification(item.Id)
                            }}
                        style={{backgroundColor: (item.Read_Status == 'Unread') ? 'rgba(000, 000, 000, 0.1)' : '#fff',flexDirection : 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        { (item.Status === 'meeting') ? 
                        <View style={{backgroundColor: '#f8ae4e', width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                        <MaterialIcons name={"people-outline"} size={40} color="#fff"/>
                        </View>
                         : 
                         <View style={{backgroundColor: '#f8ae4e', width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                         <MaterialCommunityIcons name={"map-marker-check-outline"} size={40} color="#fff" />
                         </View>
                        }
                        
                        <View style={{width: '75%', marginTop: 10}}>
                        <Text style={{fontFamily: 'Karla-Bold', bottom: 3}}>{item.Title}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13}}>{item.Body}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13, color: 'grey', paddingTop: 5, paddingBottom: 5}}>{moment(item.Time).format('LLLL')}</Text>
                        </View>
                                                    
                        </TouchableOpacity>
                    )
                    }
                    else if(item.Status === 'hand-shake'){
                        return(
                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate("DASHBOARD")
                            ReadNotification(item.Id)
                        }}
                        style={{backgroundColor: (item.Read_Status == 'Unread') ? 'rgba(000, 000, 000, 0.1)' : '#fff',flexDirection : 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        
                        <View style={{backgroundColor: '#f8ae4e', width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                         <FontAwesome name={"handshake-o"} size={33} color="#fff" />
                        </View>

                        <View style={{width: '75%', marginTop: 10}}>
                        <Text style={{fontFamily: 'Karla-Bold', bottom: 3}}>{item.Title}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13}}>{item.Body}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13, color: 'grey', paddingTop: 5, paddingBottom: 5}}>{moment(item.Time).format('LLLL')}</Text>
                        </View>                        
                                                    
                        </TouchableOpacity>
                    )
                    }
                    else if(item.Status === 'alloted'){
                        return(
                        <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate("MEETING",{Screen: 'allote'})
                            ReadNotification(item.Id)
                        }}
                        style={{backgroundColor: (item.Read_Status == 'Unread') ? 'rgba(000, 000, 000, 0.1)' : '#fff',flexDirection : 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        
                        <View style={{backgroundColor: '#f8ae4e', width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                         <MaterialCommunityIcons name={"map-marker-check-outline"} size={40} color="#fff" />
                        </View>

                        <View style={{width: '75%', marginTop: 10}}>
                        <Text style={{fontFamily: 'Karla-Bold', bottom: 3}}>{item.Title}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13}}>{item.Body}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13, color: 'grey', paddingTop: 5, paddingBottom: 5}}>{moment(item.Time).format('LLLL')}</Text>
                        </View>
                                                    
                        </TouchableOpacity>
                    )
                    }
                    else{
                        return(
                        <TouchableOpacity
                        onPress={()=>ReadElseNotification(item.Id)}
                        style={{backgroundColor: (item.Read_Status == 'Unread') ? 'rgba(000, 000, 000, 0.1)' : '#fff',flexDirection : 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        
                        <View style={{backgroundColor: '#f8ae4e', width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                         <MaterialCommunityIcons name={"email-outline"} size={40} color="#fff" />
                        </View>

                        <View style={{width: '75%', marginTop: 10}}>
                        <Text style={{fontFamily: 'Karla-Bold', bottom: 3}}>{item.Title}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13}}>{item.Body}</Text>
                        <Text style={{fontFamily: 'Karla-Regular', fontSize: 13, color: 'grey', paddingTop: 5, paddingBottom: 5}}>{moment(item.Time).format('LLLL')}</Text>
                        </View>
                                                    
                        </TouchableOpacity>
                    )   
                    }
                }}
            />

            </ScrollView>
            </View>
        )
      }
}

export default NotificationScreen;