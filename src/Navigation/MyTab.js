import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MeetingListScreen from "../Screens/MeetingListScreen";
import MeetingCalendarScreen from "../Screens/MeetingCalendarScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Tab = createMaterialTopTabNavigator();

const MyTopTab = ({ navigation, route }) => {

    const Screen = route.params

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            const backAction = () => {
                if(Screen.Screen == 'Stats'){
                    navigation.navigate("STATS")
                  }
                  else if(Screen.Screen == 'Noti'){
                    navigation.navigate("NOTIFICATION")
                  }
                  else{
                    navigation.navigate("DASHBOARD")
                  }
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
      })
    },[])

    return(
        <>
        

        <View style={{backgroundColor: '#fff', height: 60, width: '100%', elevation: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

            <TouchableOpacity
                onPress={()=>{
              if(Screen.Screen == 'Stats'){
                navigation.navigate("STATS")
              }
              else if(Screen.Screen == 'Noti'){
                    navigation.navigate("NOTIFICATION")
                  }
              else{
                navigation.navigate("DASHBOARD")
              }
              }}
                style={{left: 20}}
            >
            <FontAwesome name={"angle-left"} size={35} color={'#000'} />
            </TouchableOpacity>
              
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000', paddingTop: 5, paddingLeft: 20}}>Meetings</Text>
              
              <Text style={{right: 20, fontFamily: 'Karla-Bold', fontSize: 20, color: '#fff'}}>0</Text>
              
            </View>

        <Tab.Navigator
        initialRouteName="List View"
        tabBarOptions={{
        activeTintColor: '#fff',
        labelStyle: { fontSize: 15, color:"#f8ae4e" },
        style: { backgroundColor: '#fff' },
        indicatorStyle: { backgroundColor: '#f8ae4e', height: 4}
        }}
        >
        <Tab.Screen
        name="List View"
        component={MeetingListScreen}
        option={{ tabBarLabel: "List View"  }}
        />
        <Tab.Screen
        name="Calender View"
        component={MeetingCalendarScreen}
        option={{ tabBarLabel: "Calender View" }}
        />
        </Tab.Navigator>
        </>
    );
}

export default MyTopTab;