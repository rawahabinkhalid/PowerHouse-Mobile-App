import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler, Alert, ToastAndroid, TextInput, FlatList, ActivityIndicator, Modal} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomTab from '../Components/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-picker/picker'

const MyMeetingScreen = ({ navigation, route }) => {

    useEffect(() => {
        GetMeetingHistory()

        navigation.addListener('focus',()=>{
          const backAction = () => {
            if(Screen.Screen == 'Stats'){
              navigation.navigate("STATS")
            }
            else{
              navigation.navigate("HISTORY")
            }
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    })
    
     }, []);

    const Screen = route.params

    const [Loading, setLoading] = useState(true)
    const [Meeting, setMeeting] = useState([])
    const [Search, setSearch] = useState('')
    const [SearchMeeting, setSearchMeeting] = useState([])

    const GetMeetingHistory = async() => {
       try {
           const UserInfo = await AsyncStorage.getItem('UserInfo')
           console.log(UserInfo)
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/MeetingFeedbackHistoryApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
       "employeeid" : JSON.parse(UserInfo).userid,
       })
       }).then((response) => response.json())
       .then((josn) => {
         console.log(josn)
         setMeeting(josn)
         setSearchMeeting(josn)
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
        // Alert.alert("","Please check your internet connection!")
         setLoading(false)
       });
       } catch (error) {
           console.log(error)
           setLoading(false)
       }
   }

   const findMeeting = (text) => {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
        if(Meeting.filter((architect) => architect.ProjectLead_Or_ClientName.search(regex) >= 0).length != 0){
          setMeeting(Meeting.filter((architect) => architect.ProjectLead_Or_ClientName.search(regex) >= 0))
          setSearch(text)
        }
        else if(Meeting.filter((architect) => architect.Date.search(regex) >= 0).length != 0){
          setMeeting(Meeting.filter((architect) => architect.Date.search(regex) >= 0))
          setSearch(text)
        }
        else if(Meeting.filter((architect) => architect.ProjectType.search(regex) >= 0).length != 0){
          setMeeting(Meeting.filter((architect) => architect.ProjectType.search(regex) >= 0))
          setSearch(text)
        }
        else if(Meeting.filter((architect) => architect.Comments.search(regex) >= 0).length != 0){
          setMeeting(Meeting.filter((architect) => architect.Comments.search(regex) >= 0))
          setSearch(text)
        }
        else{
          setMeeting(SearchMeeting)
          //setSearch('')
          ToastAndroid.show("No meeting found", ToastAndroid.SHORT)
          //Alert.alert("","No meeting Found")
        }          
    } else {
      setMeeting(SearchMeeting)
      setSearch(text)
    }
  };

    if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }

      else if (Meeting.length == 0){
        return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
          
          <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>{
              if(Screen.Screen == 'Stats'){
                navigation.navigate("STATS")
              }
              else{
                navigation.navigate("HISTORY")
              }
              }}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Meeting History</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoMeetingHistory.png')}
            />
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
      
    else{
    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
          
          <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>{
              if(Screen.Screen == 'Stats'){
                navigation.navigate("STATS")
              }
              else{
                navigation.navigate("HISTORY")
              }
              }}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Meeting History</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

        <ScrollView style={{height: '100%', width: '100%'}}>
        
        <View style={{marginLeft: 15, marginRight: 15, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 20, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10}}
                placeholder="Search..." 
                placeholderTextColor={"grey"}
                value={Search}
                onChangeText={text=>findMeeting(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={30} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 10, right: 15 }}/>    
            </View>

        <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={Meeting}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View 
                //style={{backgroundColor: '#fff', marginTop: 10, height: 80, borderRadius: 20, flexDirection: 'row', elevation: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                style={{backgroundColor: '#fff', marginBottom: 10, elevation: 5, marginLeft: 5, marginRight: 5, borderRadius: 5 }}
                >
                <View style={{backgroundColor: '#fff', flexDirection: 'row', borderRadius: 5}}>
                  
                <View style={{justifyContent: 'center', backgroundColor: '#fff', width: 20, alignItems: 'center', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                  {/* <Fontisto name={"flash"} color= {"#f9bf08"} size= {70} /> */}
                  </View>

                  <View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <FontAwesome name={"user-o"}  size={20} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, color: '#f8ae4e', fontSize: 20, width: '80%'}}>{item.ProjectLead_Or_ClientName}</Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"calendar-month-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Date}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"clock-time-three-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.MeetingStartTime}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"timer-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.MeetingEndTime}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"timelapse"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.TotalDuration}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                  <MaterialCommunityIcons name={"comment-text-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Comments}</Text>
                  </View>

                  {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50, width: '89.5%', marginBottom: 10}}>

                    <TouchableOpacity
                    onPress={()=>Alert.alert("","Under Development")}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>Alert.alert("","Under Development")}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Edit</Text>
                    </TouchableOpacity>

                  </View> */}


                  </View>

                </View>

                </View>
            )
        }}
      />

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
}

export default MyMeetingScreen;