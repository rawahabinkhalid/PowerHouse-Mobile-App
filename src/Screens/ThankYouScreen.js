import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Picker} from '@react-native-picker/picker';
import { TextInput, Provider } from 'react-native-paper';
import BottomTab from '../Components/BottomTab';

const ThankYouScreen = ({ navigation }) => {

    useEffect(() => {
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
        <View style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
        >

        <Ionicons name={"chatbox"} color={"#f8ae4e"} size={80} style={{marginLeft: 50}} />
        <FontAwesome name={"check"} color={"#fff"} size={40} style={{marginLeft: 70, bottom: 70}} />
        
        <View style={{bottom: 55}}>
        <Text style={{color: '#000', paddingLeft: 30, fontFamily: 'Karla-Bold', fontSize: 80}}>Thank</Text>
        <Text style={{color: '#000', paddingLeft: 30, fontFamily: 'Karla-Bold', fontSize: 80, bottom: 25}}>You.</Text>
        </View>

        <View style={{height: 2, width: '100%', backgroundColor: '#000', bottom: 70}}/>
        
        <View style={{bottom: 50}}>
        <Text style={{color: '#000', paddingLeft: 30, fontFamily: 'Karla-Regular', fontSize: 20}}>Your details are successfully</Text>
        <Text style={{color: '#000', paddingLeft: 30, fontFamily: 'Karla-Regular', fontSize: 20}}>submitted</Text>
        </View>
        
        </ScrollView>
        
        <TouchableOpacity 
        onPress={()=>navigation.navigate("DASHBOARD")}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>OK</Text>
        </TouchableOpacity>
        </View>
    )
}

export default ThankYouScreen;