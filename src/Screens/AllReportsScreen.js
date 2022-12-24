import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const AllReportsScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.addListener('focus',()=>{
            const backAction = () => {
            navigation.navigate("ADMIN")
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

        <View style={{height : 60, width: '100%', elevation: 10, backgroundColor: '#fff', justifyContent: 'center'}}>

        <TouchableOpacity
        style={{position: 'absolute', left: 20}}
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>

        <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: 14, color: '#000'}}>REPORTS</Text>

        </View>

        <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
        >

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 50, marginBottom: 20}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("ALLSCOUTED",{Screen: 'AllScout'})}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialCommunityIcons name={"map-marker-multiple-outline"} size={50} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>All Scouted</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>Locations Report</Text>
        </View>

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("ALLALLOTEDREP")}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialCommunityIcons name={"map-marker-check-outline"} size={50} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>All Alloted</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>Locations Report</Text>
        </View>

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("ALLMEETING")}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialCommunityIcons name={"account-group-outline"} size={50} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>All Meetings</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>Report</Text>
        </View>

        {/* <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity
            onPress={()=>Alert.alert("","Under Development")}
            //onPress={()=>navigation.navigate("ALLORDER")}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialCommunityIcons name={"text-box-multiple-outline"} size={50} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>All Orders</Text>
            <Text style={{fontFamily: 'Karla-Bold'}}>Report</Text>
        </View> */}

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 30}}>
            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("ALLUSER")}
            style={{height: 120, width: 120, borderColor: 'grey', borderWidth: 1, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
            <MaterialCommunityIcons name={"account-tie-outline"} size={50} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Users Report</Text>
        </View>

        </ScrollView>
            
        </View>
    )
}

export default AllReportsScreen;