import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ServiceCallScreen = ({ navigation }) => {

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
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

        <View style={{height : 60, width: '100%', elevation: 10, backgroundColor: '#fff', justifyContent: 'center'}}>

        <TouchableOpacity
        style={{position: 'absolute', left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>

        <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: 14, color: '#000'}}>Service/Contracts</Text>

        </View>

        <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
        >

        <View style={{marginTop: 70}}>
            <TouchableOpacity style={{height: 150, width: 150, borderRadius: 75, borderColor: 'grey', borderWidth: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome5 name={"file-contract"} size={60} />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>Annual Maintenance</Text>
            <Text style={{textAlign: 'center', fontFamily: 'Karla-Bold'}}>Contracts</Text>
        </View>

        <View style={{marginTop: 70}}>
            <TouchableOpacity style={{height: 150, width: 150, borderRadius: 75, borderColor: 'grey', borderWidth: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <MaterialCommunityIcons name={"text-box-plus"} size={70} />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', paddingTop: 10, fontFamily: 'Karla-Bold'}}>New Projects</Text>
        </View>

        </ScrollView>
        </View>
    )
}

export default ServiceCallScreen;