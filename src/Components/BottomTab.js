import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomTab = ({ paths, pathm, pathc, patho, colors, colorm, colorc, coloro, pathh, colorh }) => {
    return(
        <View style={{backgroundColor: '#fff', width: '100%', height: 60, elevation: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            
            <TouchableOpacity
            onPress= {pathh}
            style={{alignItems: 'center'}}
            >
                <AntDesign  name={"home"} size={35} color={colorh} />
                <Text style={{fontFamily: 'Karla-Regular', color: colorh}}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress= {paths}
            style={{alignItems: 'center'}}
            >
                <Ionicons  name={"ios-stats-chart-outline"} size={35} color={colors} />
                <Text style={{fontFamily: 'Karla-Regular', color: colors}}>Statistics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
            onPress= {pathm}
            style={{alignItems: 'center'}}
            >
                <MaterialCommunityIcons name={"history"} size={35} color={colorm} />
                <Text style={{fontFamily: 'Karla-Regular', color: colorm}}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={pathc}
            style={{alignItems: 'center'}}
            >
                <AntDesign name={"user"} size={32} style={{marginTop: 2}} color={colorc} />
                <Text style={{fontFamily: 'Karla-Regular', color: colorc, top: 1.5}}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={patho}
            style={{alignItems: 'center'}}
            >
                <AntDesign name={"poweroff"} size={30} color={coloro} style={{marginTop: 5}}/>
                <Text style={{fontFamily: 'Karla-Regular', color: coloro, top: 1.5}}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

export default BottomTab;