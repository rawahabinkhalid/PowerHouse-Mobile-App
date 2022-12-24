import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const AdminUserReportsScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.addListener('focus',()=>{
          const backAction = () => {
          navigation.navigate("ALLREPORTS")
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
            onPress={()=>navigation.navigate("ALLREPORTS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>

        <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: 14, color: '#000'}}>User Report</Text>

        </View>

        <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
        >

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 120, marginBottom: 20}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("USERDPT")}
            style={{height: 150, width: 150, borderColor: 'grey', borderWidth: 1, borderRadius: 75, alignItems: 'center', justifyContent: 'center'}}
            >
            <Entypo name={"flow-tree"} size={60} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Department</Text>
        </View>

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
            <TouchableOpacity
            onPress={()=>navigation.navigate("USERBRAND")}
            style={{height: 150, width: 150, borderColor: 'grey', borderWidth: 1, borderRadius: 75, alignItems: 'center', justifyContent: 'center'}}
            >
            <Entypo name={"flash"} size={70} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Brand</Text>
        </View>

        </ScrollView>
            
        </View>
    )
}

export default AdminUserReportsScreen;