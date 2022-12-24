import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, ActivityIndicator, FlatList, Linking, TextInput} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import BottomTab from '../Components/BottomTab'
import Pdf from 'react-native-pdf'


const CatalogScreen = ({ navigation }) => {

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
         <View style={{height: '100%', width: '100%', backgroundColor:'#fff'}}>
             
             <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 20}}>CATALOGS</Text>
            </View>
            
            <View
            style={{right: 20, height: 35, width: 35}}
            >
            </View>        
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: 15}}>

        <Image
      style={{width: 250, height: 60, marginBottom: 15}}
          source={require('../Images/PWLOGO2.png')}
      />

      <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>
      <Text style={{fontFamily: 'Karla-Bold', fontSize: 22}}>MAIN CATALOGS</Text>
      <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>

      <View style={{marginTop: 20, flexDirection: 'row',width: '60%' ,justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/PHCatalogue.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Ionicons name={"newspaper-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Powerhouse</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Catalog</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/PIERLITE.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Ionicons name={"newspaper-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Pierlite</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Catalog</Text>
          </View>

      </View>

      <View style={{backgroundColor: 'grey', width: '80%', height: 1, marginTop: 20}}/>
      <Text style={{fontFamily: 'Karla-Bold', fontSize: 22}}>DEPARTMENT CATALOGS</Text>
      <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>

      <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/AVAutomation.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialIcons name={"brightness-auto"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>AV</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Automation</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/ElectricalAccessories.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Ionicons name={"ios-bulb-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Electrical</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Accessories</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/ELVSolutions.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialIcons name={"electrical-services"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>ELV</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Solutions</Text>
          </View>

      </View>

      <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/HomeCinemaMediaRoom.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Entypo name={"video"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>HCM</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Room</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/Industrial.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"factory"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Industrial</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/InternetofThings.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"home-automation"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Internet of</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Things</Text>
          </View>

      </View>

      <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/Lighting.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"lightning-bolt-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Lighting</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/LightingControlAutomation.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"lightbulb-group-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Lighting Control</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>& Automation</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/NetworkConnectivity.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Entypo name={"network"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Network</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Connectivity</Text>
          </View>

      </View>

      <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginBottom: 30, right: 25}}>

      <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/PDUCableManagement.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"cable-data"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>PDU &</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Cable Management</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PHCATALOG",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/WiringDevices.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"power-socket-au"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Wiring</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Devices</Text>
          </View>

          <View style={{height: 80, width: 80,}}/>

      </View>

        </ScrollView>

         </View>
     )
}

export default CatalogScreen;

