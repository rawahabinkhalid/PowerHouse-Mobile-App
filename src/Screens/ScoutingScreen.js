import React, {useEffect, useState} from 'react'
import {View, Text, BackHandler, Image, TouchableOpacity, Alert, ActivityIndicator, Modal} from 'react-native'
import BottomTab from '../Components/BottomTab'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import GetLocation from 'react-native-get-location'
import DeviceSettings from 'react-native-device-settings'
import Geolocation from "react-native-geolocation-service"
import Geocoder from 'react-native-geocoding';

const ScoutingScreen = ({ navigation }) => {

  useEffect(() => {
      
    CurrentLocation()
    getScoutedLocation()
      //getLocation()
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
  
  const [DMarker, setDMarker] = useState({latitude: 0, longitude: 0})
  const [UserLoc, setUserLoc] = useState({latitude: null, longitude: null})
  const [ShowMarker, setShowMarker] = useState(false)
  const [ScoutedLocationR, setScoutedLocationR] = useState([])
  const [ScoutedLocationC, setScoutedLocationC] = useState([])
  const [ScoutedLocationM, setScoutedLocationM] = useState([])
  const [Loading, setLoading] = useState(true)    
  const [Bottom, setBottom] = useState(1)

  const getScoutedLocation = async()=> {
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ApprovedLocation_ForMobileMapApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((json) => {
      const LocationsR = []
      const LocationsC = []
      const LocationsM = []
      for(let i = 0 ; i < json.length ; i++){
        if (json[i].ProjectType == 'Residential'){
        LocationsR.push(
               {
                 title:json[i].EmployeeName,
                 Latitude: parseFloat(json[i].PinLocation.split(", ")[0]), 
                 Longitude:parseFloat(json[i].PinLocation.split(", ")[1]),
                 ProjectType: json[i].ProjectType,
                 PhoneNumber: json[i].ArchitectPhoneNumber,
                 Name: json[i].Architect
                }               
               )
        }
        else if(json[i].ProjectType == 'Commercial'){
          LocationsC.push(
            {
              title:json[i].EmployeeName,
              Latitude: parseFloat(json[i].PinLocation.split(", ")[0]), 
              Longitude:parseFloat(json[i].PinLocation.split(", ")[1]),
              ProjectType: json[i].ProjectType,
              PhoneNumber: json[i].ArchitectPhoneNumber,
              Name: json[i].Architect
             }               
            )
        }
        else {
          LocationsM.push(
            {
              title:json[i].EmployeeName,
              Latitude: parseFloat(json[i].PinLocation.split(", ")[0]), 
              Longitude:parseFloat(json[i].PinLocation.split(", ")[1]),
              ProjectType: "Market",
              PhoneNumber: json[i].OwnerPhoneNumber,
              Name: json[i].OwnerDetail
             }               
            )
        }
      }
      
      setScoutedLocationR(LocationsR)
      setScoutedLocationC(LocationsC)
      setScoutedLocationM(LocationsM)
      setLoading(false)      
    })
    .catch((error) => {
      console.error(error);
     // Alert.alert("","Please check your internet connection!")
     setLoading(false)
    });
    }

    const getLocation = async() => {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {        
            console.log('==================',location)
            setUserLoc({latitude: location.latitude, longitude: location.longitude})
            setDMarker({latitude: location.latitude, longitude: location.longitude})
            //setLoading(false)
        })
        .catch(error => {
            const { code, message } = error;
            console.log(code, message);
            if( message == 'Location not available' ){
              navigation.navigate("DASHBOARD")
              Alert.alert("", "Please turn ON your location",[
                
                { text: "OK", onPress: () => DeviceSettings.location()}
              ]);
              //setLoading(false)
            }
            else if( message == 'Authorization denied')
            {
              Alert.alert("","You must have to turn ON your location",[
                
                { text: "OK", onPress: () => BackHandler.exitApp()}
              ]);
              //setLoading(false)
              return () => backHandler.remove();
            }
        })      
      }      

    const CurrentLocation = async() => {
      Geolocation.getCurrentPosition(
        position => {
          setUserLoc({latitude: position.coords.latitude, longitude: position.coords.longitude})
          setDMarker({latitude: position.coords.latitude, longitude: position.coords.longitude})
        },
        error => {
          Alert.alert("",error.message.toString());
          //setLoading(false)
          //setUserLoc({latitude: 24.839422,longitude: 67.1060053})
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
    }

    // Geolocation.getCurrentPosition(
      //   position => {
      //     const initialPosition = JSON.stringify(position.coords);
      //   setUserLoc({latitude: position.coords.latitude, longitude: position.coords.longitude})
      //   setDMarker({latitude: position.coords.latitude, longitude: position.coords.longitude})
      //   //setLoading(false)
      //   },
      //   error => {
      //     const { code, message } = error;  
      //     if(message == "No location provider available."){
      //     navigation.navigate("DASHBOARD")
      //     Alert.alert("", "Please turn ON your location", [
                
      //       { text: "OK", onPress: () => DeviceSettings.location()}
      //     ]);
      //     //setLoading(false)
      //     }
      //     else if(message == "Location permission was not granted."){
      //       Alert.alert("","You must have to turn ON your location",[
      //         { text: "OK", onPress: () => BackHandler.exitApp()}
      //       ]);
      //       //setLoading(false)
      //       return () => backHandler.remove();
      //     }
      //   },
      //   {enableHighAccuracy: true, timeout: 20000},
      // );

    if ( (Loading == true) || (UserLoc.latitude == null) || (UserLoc.longitude == null) ){
      return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingBottom: 20}}>Fetching Location...</Text>
          <ActivityIndicator
            size="large"
            color="#f8ae4e"
          />
        </View>
      )
    }
      
    else{
    return(
        
        <View style={{height: '100%', width: '100%'}}>
        <View>
        <MapView
              provider={PROVIDER_GOOGLE}
              //onLongPress={()=>{
               // setShowMarker(true)
               // }}
               // onRegionChange={(e)=>{
                 // console.log(e)
               // }}
              style={{width: '100%', height: '100%', marginBottom: Bottom}}
              initialRegion={{
                latitude: 24.839422,
                longitude: 67.1060053,
                latitudeDelta: 0.11,
                longitudeDelta: 0.11,
              }}
              region={{
                latitude: UserLoc.latitude,
                longitude: UserLoc.longitude,
                latitudeDelta: 0.0018351870686323934,
                longitudeDelta: 0.0010001286864138592,
              }}
              showsMyLocationButton= {true}
              showsUserLocation={true}
              onMapReady={()=>setBottom(0)}
            >

             
             <Marker draggable
             coordinate={DMarker}
             onDragEnd={(e) => {
               setDMarker(e.nativeEvent.coordinate)
               setUserLoc(e.nativeEvent.coordinate)
               }}
               title={'Draggable Marker'}
             />

            {ScoutedLocationR.map((marker, index) => (
            <Marker
             key={index}
             coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
             image={require('../Images/Res.png')}
            >
              <Callout>
                  <MaterialCommunityIcons name={"account-search"} color={"grey"} size={25} style={{alignSelf: 'center', marginTop: 10}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.title}</Text>
                  <Entypo name={"shop"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.ProjectType}</Text>
                  <MaterialIcons name={"person"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.Name}</Text>
                  <MaterialIcons name={"phone"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', textAlign: 'center', paddingBottom: 10}}>{marker.PhoneNumber}</Text>
              </Callout>
            </Marker>
  ))}

  {ScoutedLocationC.map((marker, index) => (
            <Marker
             key={index}
             coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
             image={require('../Images/Com.png')}
            >
              <Callout>
                  <MaterialCommunityIcons name={"account-search"} color={"grey"} size={25} style={{alignSelf: 'center', marginTop: 10}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.title}</Text>
                  <Entypo name={"shop"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.ProjectType}</Text>
                  <MaterialIcons name={"person"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.Name}</Text>
                  <MaterialIcons name={"phone"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', textAlign: 'center', paddingBottom: 10}}>{marker.PhoneNumber}</Text>
              </Callout>
            </Marker>
  ))}

  {ScoutedLocationM.map((marker, index) => (
            <Marker
             key={index}
             coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
             image={require('../Images/Mark.png')}
            >
            <Callout>
              <MaterialCommunityIcons name={"account-search"} color={"grey"} size={25} style={{alignSelf: 'center', marginTop: 10}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.title}</Text>
                  <Entypo name={"shop"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.ProjectType}</Text>
                  <MaterialIcons name={"person"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', paddingBottom: 5, textAlign: 'center'}}>{marker.Name}</Text>
                  <MaterialIcons name={"phone"} color={"grey"} size={25} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e', textAlign: 'center', paddingBottom: 10}}>{marker.PhoneNumber}</Text>
              </Callout>
            </Marker>
  ))}

            </MapView>
        </View>
        
        <View style={{position: 'absolute',height: '100%', width: '100%'}}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("DASHBOARD")}
        style={{backgroundColor: '#fff', elevation: 10, marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 40, height: 40, borderRadius: 10}}>
        <FontAwesome name={"angle-left"} size={35} color={'#000'} style={{marginRight: 4, marginBottom: 2.5}}/>
        </TouchableOpacity>
        {/* <TouchableOpacity 
        onPress={CurrentLocation}
        style={{backgroundColor: '#fff', elevation: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 40, height: 40, borderRadius: 10, alignSelf: 'flex-end', right: 20}}>
        <MaterialIcons name={"my-location"} size={27} color={'#000'}/>
        </TouchableOpacity> */}
        </View>

        <View  style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end', bottom: 50}}>
          
          <TouchableOpacity 
          onPress={()=>navigation.navigate("PROJECT", {
            Latitude: DMarker.latitude,
            Longitude: DMarker.longitude
          })}
          style={{height: 100, width: 100, backgroundColor: '#fff', marginRight: 10, borderRadius: 20, elevation: 10, alignItems: 'center', justifyContent: 'center'}}>
          <Entypo  name={"home"} size={50} color={"#f8ae4e"} />
          <Text style={{fontFamily: 'Karla-Bold'}}>Projects</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
          onPress={()=>navigation.navigate("MARKET", {
            Latitude: DMarker.latitude,
            Longitude: DMarker.longitude
          })}
          style={{height: 100, width: 100, backgroundColor: '#fff', borderRadius: 20, elevation: 10, justifyContent: 'center', alignItems: 'center'}}
          >
          <Entypo  name={"shop"} size={50} color={"#f8ae4e"} />
          <Text style={{fontFamily: 'Karla-Bold'}}>Market</Text>
          </TouchableOpacity>
        </View>
        

        </View>
    )
  }
}

export default ScoutingScreen;