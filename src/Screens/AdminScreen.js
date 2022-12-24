import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert, PermissionsAndroid, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const AdminScreen = ({ navigation }) => {

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


    const UserTrack = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission!",
              message:
                "Scouting needs access to your Location.",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigation.navigate("USERTRACK")
          } else {
            Alert.alert("","Location permission denied");
          }
        } catch (err) {
          console.log(err);
        }
      };


    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

        <View style={{height : 60, width: '100%', elevation: 10, backgroundColor: '#fff', justifyContent: 'center'}}>

        <TouchableOpacity
        style={{position: 'absolute', left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>

        <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: 14, color: '#000'}}>ADMIN</Text>

        </View>

        <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
        >

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '95%', marginTop: 50, alignSelf: 'center'}}>

            <View>
            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("USERREG")}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <AntDesign name={"adduser"} size={60} />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>User</Text>
            <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Registration</Text>
            </View>

            <View>
            <TouchableOpacity
           // onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("ALLFORMS")}            
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <AntDesign name={"form"} size={60} />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Setup</Text>
            <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Forms</Text>
            </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '95%', marginTop: 40, alignSelf: 'center'}}>

            <View>
            <TouchableOpacity
            onPress={()=>navigation.navigate("ALLREPORTS")}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"newspaper-variant-outline"} size={60} />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Reports</Text>
            </View>

            <View>
            <TouchableOpacity
            onPress={()=>UserTrack()}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"target-account"} size={60} />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>User</Text>
            <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Tracking</Text>
            </View>

            {/* <View>
            <TouchableOpacity            
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("ALLALLOTED")}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
            >
                <MaterialCommunityIcons name={"map-marker-radius-outline"} size={60} color= "#000" />
            </TouchableOpacity>
            <Text style={{alignSelf: 'center', paddingTop: 10, fontFamily: 'Karla-Bold', color:'#000'}}>Alloted</Text>
            <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold', color:'#000'}}>Location</Text>
            </View> */}

            </View>

        </ScrollView>
            
        </View>
    )
}

export default AdminScreen;