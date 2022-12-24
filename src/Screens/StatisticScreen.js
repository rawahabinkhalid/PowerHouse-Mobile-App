import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, BackHandler, ActivityIndicator, Image, Modal } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProgressCircle from 'react-native-progress-circle'
import BottomTab from '../Components/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage'

const StatsScreen = ({ navigation }) => {

    useEffect(() => {
       getAllLocations()
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

    const [Loading, setLoading] = useState(true)
     const [TotalLocations, setTotalLocations] = useState(0)
    const [UserScotedLocations, setUserScotedLocations] = useState(0)
    const [UserAllotedMeetings, setUserAllotedMeetings] = useState(0)
    const [UserMeetingsDone, setUserMeetingsDone] = useState(0)
    const [UserMeetingsPending, setUserMeetingsPending] = useState(0)
    const [RecurringMeetings, setRecurringMeetings] = useState(0)

    const AllScouted = async() =>{
        try {
          const userData = await AsyncStorage.getItem('UserInfo')
          if(JSON.parse(userData).userrole == 'Admin' || JSON.parse(userData).userrole == 'Manager'){
            navigation.navigate("ALLSCOUTED",{Screen: 'Stats'})
          }
          else{
              Alert.alert("","Only admin and manager can see all scouted locations.")
          }
        } catch (error) {
         console.log(error)
        } 
      }

    const getAllLocations = async() => {
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            console.log('=======', JSON.parse(UserInfo).userid)

            ////////////////for all location/////////////

        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/StatsTotalLocationApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.json())
       .then((json) => {
         console.log(json)
         if(json == null){
            setTotalLocations(0)
        }
        else{
            setTotalLocations(json)
        }
       })
       .catch((error) => {
         console.error(error);
        // Alert.alert("","Please check your internet connection!")
       });

       ////////////////for all userlocation/////////////

       fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/StatsEmpSocutedLocationApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "employeeid" : JSON.parse(UserInfo).userid
      })
      }).then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json == null){
            setUserScotedLocations(0)
        }
        else{
            setUserScotedLocations(json)
        }        
      })
      .catch((error) => {
        console.error(error);
       // Alert.alert("","Please check your internet connection!")
      });

      ////////////////for all meeting/////////////

      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/StatsEmpAllotedLocationApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "employeeid" : JSON.parse(UserInfo).userid
      })
      }).then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json == null){
            setUserAllotedMeetings(0)
        }
        else{
            setUserAllotedMeetings(json)
        }        
      })
      .catch((error) => {
        console.error(error);
       // Alert.alert("","Please check your internet connection!")
      });

      ////////////////for meeting done/////////////

      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/StatsEmpConfirmMeetingApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "employeeid" : JSON.parse(UserInfo).userid
      })
      }).then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json == null){
            setUserMeetingsDone(0)
        }
        else{
            setUserMeetingsDone(json)
        }
      })
      .catch((error) => {
        console.error(error);
       // Alert.alert("","Please check your internet connection!")
      });

      ////////////////for meeting pending/////////////

      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/StatsEmpPendingMeetingApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "employeeid" : JSON.parse(UserInfo).userid
      })
      }).then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json == null){
            setUserMeetingsPending(0)
        }
        else{
            setUserMeetingsPending(json)
        }
      })
      .catch((error) => {
        console.error(error);
       // Alert.alert("","Please check your internet connection!")
      });

      ////////////////for all order generated/////////////

      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/StatsEmpRecurringApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "employeeid" : JSON.parse(UserInfo).userid
      })
      }).then((response) => response.json())
      .then((json) => {
          console.log(json)
          if(json == null){
              setRecurringMeetings(0)
              setLoading(false)
          }
          else{
            setRecurringMeetings(json)
            setLoading(false)
          }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
       // Alert.alert("","Please check your internet connection!")
      });

    } catch (error) {
            console.log(error)
            setLoading(false)
    }
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
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

           <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>STATISTICS</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        <ScrollView
        showsVerticalScrollIndicator={false}
        >

        <Image
                style={{width: 250, height: 50, marginTop: 30, alignSelf: 'center'}}
                source={require('../Images/PWLOGO2.png')}
            />

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop:30}}>
            <TouchableOpacity 
            onPress={()=>AllScouted()}
            style={{width: '46%', backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center'}}>

            <MaterialCommunityIcons name={"map-marker-multiple-outline"} size={40} style={{marginTop: 5}} />
            <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Total Locations</Text>
            <Text style={{ fontSize: 25, fontFamily: 'Karla-Bold', color:"#f8ae4e" }}>{TotalLocations}</Text>
            <Text style={{ fontFamily: 'Karla-Bold', color: '#000', paddingBottom: 10 }}>Locations</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=>navigation.navigate("MYSCOUT",{Screen: 'Stats'})}
            style={{width: '46%', backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center'}}>

            <MaterialCommunityIcons name={"map-marker-outline"} size={40} style={{marginTop: 5}} />
            <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Your Scouted Locations</Text>
            <Text style={{ fontSize: 25, fontFamily: 'Karla-Bold', color:"#f8ae4e" }}>{UserScotedLocations}</Text>
            <Text style={{ fontFamily: 'Karla-Bold', color: '#000', paddingBottom: 10  }}>Locations</Text>

            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
            
            <TouchableOpacity 
            onPress={()=>navigation.navigate("MEETING",{Screen: 'Stats'})}
            style={{width: '46%', backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center'}}>

            <MaterialCommunityIcons name={"account-group-outline"} size={40} style={{marginTop: 5}} />
            <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Total Alloted</Text>
            <Text style={{ fontSize: 25, fontFamily: 'Karla-Bold', color:"#f8ae4e" }}>{UserAllotedMeetings}</Text>
            <Text style={{ fontFamily: 'Karla-Bold', color: '#000', paddingBottom: 10 }}>Locations</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=>navigation.navigate("MYMEETING",{Screen: 'Stats'})}
            style={{width: '46%', backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center'}}>

            <MaterialCommunityIcons name={"account-multiple-check-outline"} size={40} style={{marginTop: 5}} />
            <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Have Done</Text>
            <Text style={{ fontSize: 25, fontFamily: 'Karla-Bold', color:"#f8ae4e" }}>{UserMeetingsDone}</Text>
            <Text style={{ fontFamily: 'Karla-Bold', color: '#000', paddingBottom: 10 }}>Meetings</Text>

            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 20}}>
            
            <TouchableOpacity 
            onPress={()=>navigation.navigate("TOPTAB",{Screen: 'Stats'})}
            style={{width: '46%', backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center'}}>

            <MaterialCommunityIcons name={"account-clock-outline"} size={40} style={{marginTop: 5}} />
            <Text style={{fontFamily: 'Karla-Bold', color:'#000'}}>Meetings Pending</Text>
            <Text style={{ fontSize: 25, fontFamily: 'Karla-Bold', color:"#f8ae4e" }}>{UserMeetingsPending}</Text>
            <Text style={{ fontFamily: 'Karla-Bold', color: '#000', paddingBottom: 10 }}>Meetings</Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=>navigation.navigate("RECURRINGMEETING",{Screen: 'Stats'})}
            style={{width: '46%', backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center'}}>

            <MaterialIcons name={"loop"} size={40} style={{marginTop: 5}} />
            <Text style={{fontFamily: 'Karla-Bold', color:'#000'}}>Recurring Meetings</Text>
            <Text style={{ fontSize: 25, fontFamily: 'Karla-Bold', color:"#f8ae4e" }}>{RecurringMeetings}</Text>
            <Text style={{ fontFamily: 'Karla-Bold', color: '#000', paddingBottom: 10 }}>Meetings</Text>

            </TouchableOpacity>

        </View>

        {/* <View style={{backgroundColor: '#fff', marginTop: 10, marginLeft: 20,  marginRight: 20, borderRadius: 10, elevation: 10, marginBottom: 10}}>

        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{height: 1, width: '30%', backgroundColor: '#000'}}/>
            <Text style={{bottom: 13, fontFamily: 'Karla-Bold', fontSize: 20}}> STATISTICS </Text>
            <View style={{height: 1, width: '30%', backgroundColor: '#000'}}/>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        
        <View>
        <ProgressCircle
            percent={TotalLocations}
            radius={60}
            borderWidth={7}
            color="#f8ae4e"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold' }}>{TotalLocations}</Text>
            <Text style={{ fontFamily: 'Karla-Bold' }}>Locations</Text>
        </ProgressCircle>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Total</Text>
        <Text  style={{alignSelf: 'center',fontFamily: 'Karla-Bold'}}>Locations</Text>
        </View>

        <View>
        <ProgressCircle
            percent={UserScotedLocations}
            radius={60}
            borderWidth={7}
            color="#f8ae4e"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold' }}>{UserScotedLocations}</Text>
            <Text style={{ fontFamily: 'Karla-Bold' }}>Locations</Text>
        </ProgressCircle>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Your Scouted</Text>
        <Text  style={{alignSelf: 'center',fontFamily: 'Karla-Bold'}}>Locations</Text>
        </View>
        
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20}}>
        
        <View>
        <ProgressCircle
            percent={UserAllotedMeetings}
            radius={60}
            borderWidth={7}
            color="#f8ae4e"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold' }}>{UserAllotedMeetings}</Text>
            <Text style={{ fontFamily: 'Karla-Bold' }}>Meetings</Text>
        </ProgressCircle>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Total</Text>
        <Text  style={{alignSelf: 'center',fontFamily: 'Karla-Bold'}}>Alloted</Text>
        </View>

        <View>
        <ProgressCircle
            percent={UserMeetingsDone}
            radius={60}
            borderWidth={7}
            color="#f8ae4e"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold' }}>{UserMeetingsDone}</Text>
            <Text style={{ fontFamily: 'Karla-Bold' }}>Meetings</Text>
        </ProgressCircle>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Have</Text>
        <Text  style={{alignSelf: 'center',fontFamily: 'Karla-Bold'}}>Done</Text>
        </View>
        
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 10}}>
        
        <View>
        <ProgressCircle
            percent={UserMeetingsPending}
            radius={60}
            borderWidth={7}
            color="#f8ae4e"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold' }}>{UserMeetingsPending}</Text>
            <Text style={{ fontFamily: 'Karla-Bold' }}>Meetings</Text>
        </ProgressCircle>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Meetings</Text>
        <Text  style={{alignSelf: 'center',fontFamily: 'Karla-Bold'}}>Pending</Text>
        </View>

        <View>
        <ProgressCircle
            percent={RecurringMeetings}
            radius={60}
            borderWidth={7}
            color="#f8ae4e"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18, fontFamily: 'Karla-Bold' }}>{RecurringMeetings}</Text>
            <Text style={{ fontFamily: 'Karla-Bold' }}>Orders</Text>
        </ProgressCircle>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Orders</Text>
        <Text  style={{alignSelf: 'center',fontFamily: 'Karla-Bold'}}>Generated</Text>
        </View>
        
        </View>

        </View> */}

        </ScrollView>       

        <BottomTab 
            colors = "#f8ae4e"
                pathh = {()=>navigation.navigate("DASHBOARD")}
                
                pathm = {()=>navigation.navigate("HISTORY")}
                
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
}

export default StatsScreen;