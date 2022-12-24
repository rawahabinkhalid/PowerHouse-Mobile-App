import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomTab from '../Components/BottomTab'

const HistoryScreen = ({ navigation }) => {

    useEffect(()=>{

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

    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
            
            <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>HISTORY</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
        >

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 50}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("MYSCOUT",{Screen: 'History'})}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <Entypo name={"location"} size={50} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>My Scouted</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>Locations</Text>
        </View>

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("MYMEETING",{Screen: 'History'})}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialIcons name={"location-history"} size={70} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Meeting</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>History</Text>
        </View>

        {/* <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("MYORDER")}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialCommunityIcons name={"cart-outline"} size={60} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Order</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>History</Text>
        </View> */}


        </ScrollView>

        <BottomTab 
            colorm = "#f8ae4e"
                pathh = {()=>navigation.navigate("DASHBOARD")}
                
                paths = {()=>navigation.navigate("STATS")}
                
                pathc = {()=>navigation.navigate("PROFILE")}
                
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

export default HistoryScreen;