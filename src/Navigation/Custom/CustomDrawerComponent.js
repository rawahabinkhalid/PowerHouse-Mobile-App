import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default function CustomAdminDrawerContent({ navigation }) {

    const [UserName, setUserName] = useState(null)
    const [Email, setEmail] = useState(null)

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            GetUserInfo()
      })
        
    }, []);

    const GetUserInfo = async() => {
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            console.log(JSON.parse(UserInfo))
            console.log(JSON.parse(UserInfo).email)
            setEmail(JSON.parse(UserInfo).email)
            console.log(JSON.parse(UserInfo).userfullname)
            setUserName(JSON.parse(UserInfo).userfullname)
        } catch (error) {
            console.log(error)
        }
    }

    const Logout = async() => {
        AsyncStorage.setItem('Login', 'false')
        navigation.closeDrawer()
        navigation.navigate("DASHBOARD")
        Alert.alert("","Are you sure you want to logout?",[
            { text: "Cancel", onPress: () => null},
            { text: "Yes", onPress: () => navigation.navigate("LOGIN")}
        ])
    }

    return (
        <View style={{backgroundColor: '#282828', height: '100%'}}>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: '#282828'}}
            >
            
            <TouchableOpacity
            onPress={()=>navigation.closeDrawer()}
            style={{marginLeft: 10, marginTop: 10}}
            >
            <AntDesign name={"close"} color= {"#fff"} size={25}/>
            </TouchableOpacity>

            <View style={{backgroundColor: '#f8ae4e', width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20}}>
            <FontAwesome name={"user"} color= {"#fff"} size={100}/>
            </View>

            <View style={{ alignItems: 'center', marginTop: 10, width: '95%', alignSelf: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', fontSize: 30, textAlign: 'center'}}>{UserName}</Text>
            <Text style={{color: '#fff',  fontFamily: 'Karla-Bold'}}>{Email}</Text>
            </View>

            <TouchableOpacity
            onPress={()=>{
                //navigation.closeDrawer()
                //navigation.navigate("MYSCOUT")
                Alert.alert("","Under Development")    
            }}
            style={{flexDirection: 'row', height: 60, alignItems: 'center', marginTop: 20, marginLeft: 40}}
            >
                <View style={{backgroundColor: '#f8ae4e', height: 40, width: 40, borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                <Ionicons name={"ios-location-sharp"} color= {"#fff"} size={30}/>
                </View>
                <Text style={{color: '#fff' , fontFamily: 'Karla-Bold', paddingLeft: 20}}>My Locations</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>Alert.alert("","Under Development")}
            style={{flexDirection: 'row', height: 60, alignItems: 'center', marginTop: 10, marginLeft: 40}}
            >
                <View style={{backgroundColor: '#f8ae4e', height: 40, width: 40, borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name={"history"} color= {"#fff"} size={30}/>
                </View>
                <Text style={{color: '#fff' , fontFamily: 'Karla-Bold', paddingLeft: 20}}>Order History</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>Alert.alert("","Under Development")}
            style={{flexDirection: 'row', height: 60, alignItems: 'center', marginTop: 10, marginLeft: 40}}
            >
                <View style={{backgroundColor: '#f8ae4e', height: 40, width: 40, borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                <FontAwesome name={"user"} color= {"#fff"} size={30}/>
                </View>
                <Text style={{color: '#fff' , fontFamily: 'Karla-Bold', paddingLeft: 20}}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>Alert.alert("","Under Development")}
            style={{flexDirection: 'row', height: 60, alignItems: 'center', marginTop: 10, marginLeft: 40}}
            >
                <View style={{backgroundColor: '#f8ae4e', height: 40, width: 40, borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                <Ionicons name={"settings-sharp"} color= {"#fff"} size={30}/>
                </View>
                <Text style={{color: '#fff' , fontFamily: 'Karla-Bold', paddingLeft: 20}}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>Alert.alert("","Under Development")}
            style={{flexDirection: 'row', height: 60, alignItems: 'center', marginTop: 10, marginLeft: 40}}
            >
                <View style={{backgroundColor: '#f8ae4e', height: 40, width: 40, borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                <Entypo name={"share"} color= {"#fff"} size={30}/>
                </View>
                <Text style={{color: '#fff' , fontFamily: 'Karla-Bold', paddingLeft: 20}}>Share Location</Text>
            </TouchableOpacity>



            </ScrollView>
            {/* <View style={{backgroundColor: '#fff', height: 2, width: '85%', alignSelf: 'center'}}/>
            <TouchableOpacity
            onPress={()=>Alert.alert("","Under Development")}
            style={{flexDirection: 'row', height: 60, alignItems: 'center', marginLeft: 40}}
            >
                <Ionicons name={"log-out-outline"} color= {"#fff"} size={30}/>
                <Text style={{color: '#fff' , fontFamily: 'Karla-Bold', paddingLeft: 20}}>Logout</Text>
            </TouchableOpacity> */}
        </View>

    );
}