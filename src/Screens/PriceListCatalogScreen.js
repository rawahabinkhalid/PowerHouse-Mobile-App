import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, ActivityIndicator, FlatList, Linking, TextInput, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import BottomTab from '../Components/BottomTab'
import Pdf from 'react-native-pdf'


const PriceListCatalogScreen = ({ navigation }) => {

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

     const [PDFmodal, setPDFmodal] = useState(false)

     const [pdf, setpdf] = useState([])

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
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 20}}>PRICE LIST</Text>
            </View>
            
            <View
            style={{right: 20, height: 35, width: 35}}
            >
            </View>       
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: 15}}>

        <Image
      style={{width: 250, height: 60, marginBottom: 25}}
          source={require('../Images/PWLOGO2.png')}
      />

      {/* <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>
      <Text style={{fontFamily: 'Karla-Bold', fontSize: 22}}>MAIN PRICE LIST</Text>
      <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>

      <View style={{marginTop: 20, flexDirection: 'row',width: '60%' ,justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PRICELIST",{
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
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Ionicons name={"newspaper-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Pierlite</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Catalog</Text>
          </View>

      </View> */}

      <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>
      <Text style={{fontFamily: 'Karla-Bold', fontSize: 22}}>DEPARTMENT PRICE LIST</Text>
      <View style={{backgroundColor: 'grey', width: '80%', height: 1}}/>

      <View style={{marginTop: 30, flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Maxhub', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/MaxhubPrices.pdf'}
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialIcons name={"brightness-auto"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>AV</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Automation</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Khind', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/KhindPricelist.pdf'},
                  {id: 2, name: 'Riva', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/RivaPriceList.pdf'},
                  {id: 3, name: 'Riva door bells', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/RivaDoorBells.pdf'},
                  {id: 4, name: 'Riva Pop-Up Box', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/RivaPopupbox.pdf'},
                  {id: 5, name: 'Riva Extension Socket', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/RivaExtensionSocket.pdf'}
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Ionicons name={"ios-bulb-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Electrical</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Accessories</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Clipsal Industrial', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/ClipsalIndustrial.pdf'},
                  {id: 2, name: 'Himel', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/HimelPriceLVS.pdf'},
                  {id: 3, name: 'Pce Merz', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/PCEMerzPriceList.pdf'},
                  {id: 4, name: 'Pce', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/PCEPriceList.pdf'},
                  {id: 5, name: 'Phoenix', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/PhoenixContactPrice.pdf'},
                  {id: 6, name: 'Vteke', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/VTEKEPriceList.pdf'},
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"factory"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Industrial</Text>
          </View>

      </View>

      <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>

      <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Coarts Lighting', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/CoartsLightingPriceList.pdf'},
                  {id: 2, name: 'Architectural Light', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/ArchitecturalLightsPPL.pdf'},
                  {id: 3, name: 'Commercial Light', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/CommercialLights.pdf'},
                  {id: 4, name: 'Down Light', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/Downlights.pdf'},
                  {id: 5, name: 'Industrial Light', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/IndustriaLights.pdf'}
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"lightning-bolt-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Lighting</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'C-Bus', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/CBusPriceListRevision.pdf'},
                  {id: 2, name: 'KNX', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/KNXPricelistRevision.pdf'},
                  {id: 3, name: 'Sensors', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/SensorsPriceListRevision.pdf'},
                  {id: 4, name: 'Ulti Impress', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/ULTIImpressPriceListRevision.pdf'},
                  {id: 5, name: 'Ulti Zigbee', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/ULTIZigbeePriceListRevision.pdf'},
                  {id: 6, name: 'U-Motion', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/UMotionTouchPanelPriceListRevision.pdf'},
                  {id: 7, name: 'Emergency & Exit', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/EmergencyAndExit.pdf'}
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"lightbulb-group-outline"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Lighting Control</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>& Automation</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Blue Dot', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/BluedotPriceList.pdf'}
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"home-automation"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Internet of</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Things</Text>
          </View>

      </View>

      {/* <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("PRICELIST",{
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
          onPress={()=>navigation.navigate("PRICELIST",{
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
          onPress={()=>navigation.navigate("PRICELIST",{
              uri: 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/NetworkConnectivity.pdf'
          })}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <Entypo name={"network"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>Network</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Connectivity</Text>
          </View>

      </View> */}

      <View style={{marginTop: 20, flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginBottom: 30, right: 25}}>

      <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Davis Floor Boxes', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/DavisFloorBoxesPriceList.pdf'},
                  {id: 2, name: 'Dietzel Univolt', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/DietzelUnivoltConduitPriceList.pdf'},
                  ])
              }}
          style={{borderWidth: 1, height: 80, width: 80, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
          >
          <MaterialCommunityIcons name={"cable-data"} size={40} />

          </TouchableOpacity>
          <Text style={{fontFamily: 'Karla-Bold', paddingTop: 10}}>PDU &</Text>
          <Text style={{fontFamily: 'Karla-Bold'}}>Cable Management</Text>
          </View>

          <View style={{alignItems: 'center'}}>
          <TouchableOpacity
          onPress={()=>{
              setPDFmodal(true)
              setpdf([
                  {id: 1, name: 'Clipsal EWA', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/ClipsalEWA.pdf'},
                  {id: 2, name: 'Himel', uri : 'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PriceList_PDF/HimelPriceListEWA.pdf'},
                  ])
              }}
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

        <Modal
        animationType="slide"
        transparent={true}
        visible={PDFmodal}
        //visible={true}
        >
        <View style={{marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderColor: '#f8ae4e', borderWidth : 1}}>
          <View style={{ alignItems: 'center', marginTop: 'auto'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10, paddingBottom: 10}}>Select Catalog</Text>

          <FlatList
            scrollEnabled={true}
            horizontal={true}
              data={pdf}
              keyExtractor={id=>id.id}
              renderItem={({ item })=>{
                  return(

                    <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={()=>{
                          navigation.navigate("PRICELIST",{
                          uri: item.uri
                      })
                      setPDFmodal(false)
                      }
                      }
                    style={{borderWidth: 1, height: 60, width: 60, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
                    >
                    <MaterialCommunityIcons name={"file-pdf-outline"} size={40} />

                    </TouchableOpacity>
                    <Text style={{fontFamily: 'Karla-SemiBold', paddingTop: 5, paddingBottom: 10, width: 80, textAlign: 'center', fontSize: 13}}>{item.name}</Text>
                    </View>
                      
                  )
              }}
          />

          </View>
        
          <View>

            <TouchableOpacity
            onPress={()=>{
                setpdf([])
                setPDFmodal(false)
                }}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-SemiBold', fontSize: 20, paddingTop: 5}}>Close</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>

         </View>
     )
}

export default PriceListCatalogScreen;

