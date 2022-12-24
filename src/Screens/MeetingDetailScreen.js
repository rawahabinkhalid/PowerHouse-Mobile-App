import React, {useEffect, useState} from 'react'
import {View, Text, BackHandler, ScrollView, TouchableOpacity, Alert, Modal, ToastAndroid, Platform, Linking} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BottomTab from '../Components/BottomTab'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import {NavigationApps,actions,googleMapsTravelModes, search, mapsTravelModes} from "react-native-navigation-apps";
import moment from 'moment'
 
const MeetingDetailScreen = ({ navigation, route }) => {

  useEffect(() => {
    //navigation.addListener('focus',()=>{
      console.log(ClientData)
      //})
      navigation.addListener('focus',()=>{
        const backAction = () => {
            navigation.navigate("TOPTAB")
        return true;
            };
  
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
  
            return () => backHandler.remove();
        })

 }, []); 

  const [modalVisible, setModalVisible] = useState(false);
  const ClientData = route.params
  //const [CurrentTime, setCurrentTime] = useState((moment().format('hh:mm:ss')))
  const [StartTime, setStartTime] = useState(null)
  const [EndTime, setEndTime] = useState(null)
  const [MeetingDuration, setMeetingDuration]= useState(null)

  const Makecall = (number) =>{
    let phonenumber = '';
    if(Platform.OS === 'android'){
        phonenumber = 'tel:$'+number;
    } else{
        phonenumber = 'telprompt:$'+number
    }
    Linking.openURL(phonenumber);
};

    return(    
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("TOPTAB")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Meeting Details</Text>
            </View>
            
            <Text style={{marginLeft: 10}}></Text>
            {/* <TouchableOpacity
            onPress={()=>navigation.openDrawer()}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center',}}
        showsVerticalScrollIndicator={false}
        >
        <Entypo name={"location-pin"} size={50} color={"#fff"} style={{backgroundColor: '#f8ae4e', borderRadius: 35, padding: 10, marginTop: 20}} />
        <Text style={{color: '#000', fontFamily: 'Poppins-Bold', fontSize: 20, paddingTop: 15, textAlign: 'center'}}>{ClientData.ClientName}</Text>
        <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingTop: 10}}>Tap Number For Call</Text>
        <TouchableOpacity
        onPress={()=>Makecall(ClientData.ClientNumber)}
        >
        <Text style={{color: '#000', fontFamily: 'Poppins-Bold', fontSize: 20, paddingTop: 15}}>{ClientData.ClientNumber}</Text>
        </TouchableOpacity>
        <Text style={{color: '#f8ae4e', paddingBottom: 20, fontFamily: 'Karla-Bold', paddingTop: 10}}>Tap Icon For Direction</Text>        
        <View style={{marginBottom: 10, right: 25}}>
        <NavigationApps
                    iconSize={50}
                    row
                    viewMode='view'
                    waze={{address:'',lat:ClientData.Latitude,lon:ClientData.Longitude,action: actions.navigateByLatAndLon}}
                     googleMaps={{search,lat:ClientData.Latitude,lon:ClientData.Longitude,action: actions.navigateByLatAndLon,travelMode:googleMapsTravelModes.driving}} // specific settings for google maps
                     maps={{search,lat:ClientData.Latitude,lon:ClientData.Longitude,action: actions.navigateByLatAndLon,travelMode:mapsTravelModes.driving}}
                />
                <View style={{backgroundColor: '#fff', height: 50, width: 50, position: 'absolute'}}>

                </View>
                {/* <Text style={{color:'#fff'}}>{ClientData.Latitude}</Text>
                <Text style={{color:'#fff'}}>{ClientData.Longitude}</Text> */}
        </View>

        </ScrollView>
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto', justifyContent: 'center'}}>
          <AntDesign name={"exclamationcircleo"} size={35} color={"#f8ae4e"} style={{marginBottom: 20}} />
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000'}}>Are you sure you want to start meeting?</Text>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>setModalVisible(false)}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 45, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>NO</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
              setModalVisible(false)
              navigation.navigate("STARTMEETING",{
                ClientData: ClientData
              })
            }}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 45, alignItems: 'center', justifyContent: 'center', borderLeftColor: '#fff', borderLeftWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>YES</Text>
            </TouchableOpacity>
          
          </View>
          {/* <BottomTab
                colorm = "#f8ae4e"
                paths = {()=>navigation.navigate("SCOUTING")}
                pathc = {()=>navigation.navigate("CATALOG")}
                patho = {()=>navigation.navigate("ORDER")}
                pathh = {()=>navigation.navigate("DASHBOARD")}
            /> */}

          </View>
      </Modal>

        <TouchableOpacity 
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        onPress={()=>setModalVisible(true)}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>START MEETING</Text>
        </TouchableOpacity>

        
        </View>
    )

}

export default MeetingDetailScreen;