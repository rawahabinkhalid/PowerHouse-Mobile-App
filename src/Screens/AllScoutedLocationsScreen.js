import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler, Alert, TextInput, FlatList, ActivityIndicator, Modal, ToastAndroid, LogBox} from 'react-native'
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
import {NavigationApps,actions,googleMapsTravelModes, search, mapsTravelModes} from "react-native-navigation-apps";
import ImageView from 'react-native-image-view'

const AllScoutedLocationsScreen = ({ navigation, route }) => {

    const Screen = route.params
    const [SearchRes, setSearchRes] = useState(null)
    const [SearchCom, setSearchCom] = useState(null)
    const [SearchMark, setSearchMark] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [ScoutRes, setScoutRes] = useState([])
    const [MasterScoutRes, setMasterScoutRes] = useState([])
    const [ScoutCom, setScoutCom] = useState([])
    const [MasterScoutCom, setMasterScoutCom] = useState([])
    const [ScoutMark, setScoutMark] = useState([])
    const [MasterScoutMark, setMasterScoutMark] = useState([])
    const [SelectType, setSelectType] = useState(null)

    ///////////////////////Residential & Commercial/////////////////////

    const [ResModal, setResModal] = useState(false)
    const [ResModalImage, setResModalImage] = useState(false)
    const [ComModalImage, setComModalImage] = useState(false)
    const [MarkModalImage, setMarkModalImage] = useState(false)
    const [ResImage, setResImage] = useState(null)
    const [ComImage, setComImage] = useState(null)
    const [MarkImage, setMarkImage] = useState(null)
    const [ComModal, setComModal] = useState(false)
    const [EmployeeName, setEmployeeName] = useState(null)
    const [ProjectType, setProjectType] = useState(null)
    const [City, setCity] = useState(null)
    const [Area, setArea] = useState(null)
    const [BlockPhase, setBlockPhase] = useState(null)
    const [BuildingType, setBuildingType] = useState(null)
    const [Size, setSize] = useState(null)
    const [Address, setAddress] = useState(null)
    const [PinLocation, setPinLocation] = useState(null)
    const [lat, setlat] = useState(null)
    const [long, setlong] = useState(null)
    const [Images, setImages] = useState([])
    const [ProjectLead, setProjectLead] = useState(null)
    const [Architect, setArchitect]= useState(null)
    const [ArchitectPhoneNumber, setArchitectPhoneNumber] = useState(null)
    const [Builder, setBuilder] = useState(null)
    const [InteriorDesigner, setInteriorDesigner] = useState(null)
    const [ElectricalConsultant, setElectricalConsultant] = useState(null)
    const [CivilConstructor, setCivilConstructor] = useState(null)
    const [Tags, setTags] = useState(null)
    const [BuildingStage, setBuildingStage] = useState(null)
    const [ClientType, setClientType] = useState(null)
    const [ProjectStatus, setProjectStatus] = useState(null)
    const [Comment, setComment] = useState(null)
    const [TotalRes, setTotalRes] = useState(null)
    const [TotalCom, setTotalCom] = useState(null)
    const [TotalMark, setTotalMark] = useState(null)
    
    const [CloseRes, setCloseRes] = useState(false)
    const [IndexRes, setIndexRes] = useState(0)
    const [AlbumRes, setAlbumRes] = useState([])

    const [CloseCom, setCloseCom] = useState(false)
    const [IndexCom, setIndexCom] = useState(0)
    const [AlbumCom, setAlbumCom] = useState([])

    //////////////////////////// Market //////////////////////

    const [MarkModal, setMarkModal] = useState(false)
    const [ShopName, setShopName] = useState(null)
    const [OwnerDetail, setOwnerDetail] = useState(null)
    const [OwnerPhoneNumber, setOwnerPhoneNumber] = useState(null)
    const [Products, setProducts] = useState(null)
    const [OurCompetitorBrands, setOurCompetitorBrands] = useState(null)
    const [ClientStatus, setClientStatus] = useState(null)
    const [CloseMark, setCloseMark] = useState(false)
    const [IndexMark, setIndexMark] = useState(0)
    const [AlbumMark, setAlbumMark] = useState([])


      useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        navigation.addListener('focus',()=>{
          const backAction = () => {
            if(Screen.Screen == 'Stats'){
              navigation.navigate("STATS")
            }
            else{
              navigation.navigate("ALLREPORTS")
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

     const GetScoutRes = async() => {
         setLoading(true)
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            console.log(UserInfo)
            fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AllLocationResidentialApi.php',{
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
        }).then((response) => response.json())
        .then((josn) => {
          //console.log(josn[0].EmployeeName)
          setTotalRes(josn.length)
          setScoutRes(josn)
          setMasterScoutRes(josn)
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

    const GetScoutCom = async() => {
      setLoading(true)
     try {
         const UserInfo = await AsyncStorage.getItem('UserInfo')
         console.log(UserInfo)
         fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AllLocationCommercialApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.json())
     .then((josn) => {
       //console.log(josn)
       setTotalCom(josn.length)
       setScoutCom(josn)
       setMasterScoutCom(josn)
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

 const GetScoutMark = async() => {
  setLoading(true)
 try {
     const UserInfo = await AsyncStorage.getItem('UserInfo')
     console.log(UserInfo)
     fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AllLocationMarketApi.php',{
   method: 'POST',
   headers: {
       "Content-Type": "application/json"
   },
 }).then((response) => response.json())
 .then((josn) => {
   //console.log(josn)
   setTotalMark(josn.length)
   setScoutMark(josn)
   setMasterScoutMark(josn)
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

    const getScoutedByType = async(value) => {
      setSelectType(value)
      console.log(value)
      if(value == 'Residential'){
        GetScoutRes()
      }
      else if(value == 'Commercial'){
        GetScoutCom()
      }
      else if(value == 'Market'){
        GetScoutMark()
      }
      else{
        console.log(null)
      }
    }

    const findRes = (text) => {
      if (text) {
        const regex = new RegExp(`${text.trim()}`, 'i');
          if(ScoutRes.filter((architect) => architect.ProjectLead.search(regex) >= 0).length != 0){
            setScoutRes(ScoutRes.filter((architect) => architect.ProjectLead.search(regex) >= 0))
            setSearchRes(text)
          }
          else if(ScoutRes.filter((architect) => architect.City.search(regex) >= 0).length != 0){
            setScoutRes(ScoutRes.filter((architect) => architect.City.search(regex) >= 0))
            setSearchRes(text)
          }
          else if(ScoutRes.filter((architect) => architect.Area.search(regex) >= 0).length != 0){
            setScoutRes(ScoutRes.filter((architect) => architect.Area.search(regex) >= 0))
            setSearchRes(text)
          }
          else if(ScoutRes.filter((architect) => architect.Architect.search(regex) >= 0).length != 0){
            setScoutRes(ScoutRes.filter((architect) => architect.Architect.search(regex) >= 0))
            setSearchRes(text)
          }
          else if(ScoutRes.filter((architect) => architect.EmployeeName.search(regex) >= 0).length != 0){
            setScoutRes(ScoutRes.filter((architect) => architect.EmployeeName.search(regex) >= 0))
            setSearchRes(text)
          }
          else{
            setScoutRes(MasterScoutRes)
            //setSearchRes('')
            ToastAndroid.show("No scouted location found", ToastAndroid.SHORT)
            //Alert.alert("","No scouted location found")
          }          
      } else {
        setScoutRes(MasterScoutRes)
        setSearchRes(text)
      }
    };

    const findCom = (text) => {
      if (text) {
        const regex = new RegExp(`${text.trim()}`, 'i');  
        if(ScoutCom.filter((architect) => architect.ProjectLead.search(regex) >= 0).length != 0){
            setScoutCom(ScoutCom.filter((architect) => architect.ProjectLead.search(regex) >= 0))
            setSearchCom(text)
          }
          else if(ScoutCom.filter((architect) => architect.City.search(regex) >= 0).length != 0){
            setScoutCom(ScoutCom.filter((architect) => architect.City.search(regex) >= 0))
            setSearchCom(text)
          }
          else if(ScoutCom.filter((architect) => architect.Area.search(regex) >= 0).length != 0){
            setScoutCom(ScoutCom.filter((architect) => architect.Area.search(regex) >= 0))
            setSearchCom(text)
          }
          else if(ScoutCom.filter((architect) => architect.Architect.search(regex) >= 0).length != 0){
            setScoutCom(ScoutCom.filter((architect) => architect.Architect.search(regex) >= 0))
            setSearchCom(text)
          }
          else if(ScoutCom.filter((architect) => architect.EmployeeName.search(regex) >= 0).length != 0){
            setScoutCom(ScoutCom.filter((architect) => architect.EmployeeName.search(regex) >= 0))
            setSearchCom(text)
          }
          else{
            setScoutCom(MasterScoutCom)
            //setSearchCom('')
            ToastAndroid.show("No scouted location found", ToastAndroid.SHORT)
            //Alert.alert("","No scouted location found")
          }          
      } else {
        setScoutCom(MasterScoutCom)
        setSearchCom(text)
      }
    };

    const findMark = (text) => {
      if (text) {
        const regex = new RegExp(`${text.trim()}`, 'i');
        if(ScoutMark.filter((architect) => (architect.OwnerDetail).search(regex) >= 0).length != 0){
            setScoutMark(ScoutMark.filter((architect) => architect.OwnerDetail.search(regex) >= 0))
            setSearchMark(text)
          }
          else if(ScoutMark.filter((architect) => (architect.City).search(regex) >= 0).length != 0){
            setScoutMark(ScoutMark.filter((architect) => architect.City.search(regex) >= 0))
            setSearchMark(text)
          }
          else if(ScoutMark.filter((architect) => (architect.Area).search(regex) >= 0).length != 0){
            setScoutMark(ScoutMark.filter((architect) => architect.Area.search(regex) >= 0))
            setSearchMark(text)
          }
          else if(ScoutMark.filter((architect) => (architect.ShopName).search(regex) >= 0).length != 0){
            setScoutMark(ScoutMark.filter((architect) => architect.ShopName.search(regex) >= 0))
            setSearchMark(text)
          }
          else if(ScoutMark.filter((architect) => (architect.EmployeeName).search(regex) >= 0).length != 0){
            setScoutMark(ScoutMark.filter((architect) => architect.EmployeeName.search(regex) >= 0))
            setSearchMark(text)
          }
          else{
            setScoutMark(MasterScoutMark)
            //setSearchMark('')
            ToastAndroid.show("No scouted location found", ToastAndroid.SHORT)
            //Alert.alert("","No scouted location found")
          }          
      } else {
        setScoutMark(MasterScoutMark)
        setSearchMark(text)
      }
    };


    if(SelectType == null){
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
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
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
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>
            </ScrollView>    
            

        </View>
      )

    }
    else if(SelectType == 'Residential')
    {

      if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }

      else if (ScoutRes.length == 0){
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
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>

            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoScoutReport.png')}
            />
            </ScrollView>     

        </View>
        )
      }
      else{
    return(
        <View style={{height: '100%', width: '100%'}}>

        
            <View style={{position: 'absolute', backgroundColor: '#ededed', height: "100%", width: '100%'}}/>
            <View style={{height: '100%', width : '100%', position: 'absolute', alignItems: 'center'}}>
            
            <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>{
              if(Screen.Screen == 'Stats'){
              navigation.navigate("STATS")
            }
            else{
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalRes}</Text>
            
        </View>

        <ScrollView style={{ width: '100%'}}
        showsVerticalScrollIndicator= {false}
            >  

            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>         

        <View style={{marginLeft: 15, marginRight: 15, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 5, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10}}
                placeholder="Search..." 
                placeholderTextColor={"grey"}
                value={SearchRes}
                onChangeText={text=>findRes(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={30} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 10, right: 15 }}/>    
            </View>

            
            <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={ScoutRes}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View
                //style={{backgroundColor: '#fff', marginTop: 10, height: 80, borderRadius: 20, flexDirection: 'row', elevation: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                style={{backgroundColor: '#fff', marginBottom: 10, elevation: 5, marginLeft: 5, marginRight: 5, borderRadius: 5, borderColor: '#f8ae4e', borderWidth: 1, borderLeftWidth: 5 }}
                >
                <View style={{backgroundColor: '#fff', flexDirection: 'row', borderRadius: 5}}>
                  
                <View style={{justifyContent: 'center', backgroundColor: '#fff', width: 23, alignItems: 'center', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                  {/* <Fontisto name={"flash"} color= {"#f9bf08"} size= {70} /> */}
                  </View>

                  <View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 15}}>
                  <Ionicons name={"person"}  size={20} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, color: '#f8ae4e', fontSize: 20, width: '80%'}}>{item.ProjectLead}</Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"location-pin"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Address}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"account-search"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.EmployeeName}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"architecture"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Architect}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"local-phone"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.ArchitectPhoneNumber}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <Ionicons name={"calendar"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Date}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"clock-time-five"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Time}</Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '89.5%', marginBottom: 20, alignSelf: 'center'}}>

                    <TouchableOpacity
                    onPress={()=>{
                      //console.log(item.PinLocation.split(", ")[1])
                      setEmployeeName(item.EmployeeName)
                      setProjectType(item.ProjectType)
                      setCity(item.City)
                      setArea(item.Area)
                      setBlockPhase(item.BlockPhase)
                      setBuildingType(item.BuildingType)
                      setSize(item.Size)
                      setAddress(item.Address)
                      setPinLocation(item.PinLocation)
                      setlat(item.PinLocation.split(", ")[0])
                      setlong(item.PinLocation.split(", ")[1])
                      setProjectLead(item.ProjectLead)
                      setArchitect(item.Architect)
                      setArchitectPhoneNumber(item.ArchitectPhoneNumber)
                      setBuilder(item.Builder)
                      setInteriorDesigner(item.InteriorDesigner)
                      setElectricalConsultant(item.ElectricalConsultant)
                      setCivilConstructor(item.CivilConstructor)
                      setTags(item.Tags)
                      setBuildingStage(item.BuildingStage)
                      setClientType(item.Client)
                      setProjectStatus(item.ProjectRes_Status)
                      setComment(item.Comment)
                      setResModal(true)
                      for ( let i = 0 ; i < item.Image.split(",").length ; i++){
                      if( i % 2 == 1 ){
                      Images.push(item.Image.split(",")[i])
                      }
                      }
                      }}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("ADMINEDITPROJECT",{
                      EditData: item
                    })}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Edit</Text>
                    </TouchableOpacity>

                  </View>


                  </View>

                </View>
                   {/* <View style={{width: 50, height: 50, backgroundColor: '#f8ae4e', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginLeft: 5, borderRadius: 25}}>
                        <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Karla-Bold'}}>{item.ProjectType.charAt(0)}</Text>
                    </View>
                    
                     <View style={{marginLeft: 10, alignSelf: 'center', width: '65%'}}>
                    <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e'}}>{item.EmployeeName}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold'}}>{item.ProjectType}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', color: 'grey'}}>{item.PinLocation}</Text>
                    </View> */}

                </View>
            )
        }}
      />

        

        </ScrollView>

        {/* <Modal
        visible={ResModalImage}
        animationType="slide"
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff',}}>

        <Image
              resizeMode='contain'
              style={{height: '100%', width: '100%'}}  
              source={{uri:'data:image/jpeg;base64,'+ResImage}}
        />
        
        

        <TouchableOpacity
        style={{marginLeft: 20, position: 'absolute', marginTop: 20}}
        onPress={()=>{
          setResImage(null)
          setResModalImage(false)
        }}
        >
          <Ionicons name={"close"} size={30} style={{backgroundColor: '#fff', elevation: 10, borderRadius: 10}} />
        </TouchableOpacity>

        </View>
          
        </Modal> */}

        <ImageView
            images={AlbumRes}
            animationType="fade"
            isSwipeCloseEnabled={false}
            isPinchZoomEnabled={false}
            onClose={()=>{
                setAlbumRes([])
                setCloseRes(false)
                setIndexRes(0)
                }}
            imageIndex={IndexRes}
            isVisible={CloseRes}
        />

        <Modal
        visible={ResModal}
        animationType="slide"
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            onPress={()=>{
           setEmployeeName(null)
           setProjectType(null)
           setCity(null)
           setArea(null)
           setBlockPhase(null)
           setBuildingType(null)
           setSize(null)
           setAddress(null)
           setPinLocation(null)
           setlat(null)
           setlong(null)
           setImages([])
           setProjectLead(null)
           setArchitect(null)
           setArchitectPhoneNumber(null)
           setBuilder(null)
           setInteriorDesigner(null)
           setElectricalConsultant(null)
           setCivilConstructor(null)
           setTags(null)
           setBuildingStage(null)
           setClientType(null)
           setProjectStatus(null)
           setComment(null)
           setResModal(false)
              }}
            >
                <Ionicons name={"close"} size={30} style={{marginLeft: 15}} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Project Detail</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        <ScrollView style={{backgroundColor: '#ededed'}}>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 20, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{EmployeeName}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Employee Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{City}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> City </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Area}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Area </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BlockPhase}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Block/Phase </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BuildingType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Building Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Size}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Size </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 100, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Address}</Text>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Address </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{PinLocation}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> PinLocation </Text>
        <View style={{position: 'absolute', alignSelf: 'flex-end', top: 8, right: 5}}>
        <NavigationApps
                    iconSize={35}
                    row
                    viewMode='view'
                    waze={{address:'',lat:lat,lon:long,action: actions.navigateByLatAndLon}}
                     googleMaps={{search,lat:lat,lon:long,action: actions.navigateByLatAndLon,travelMode:googleMapsTravelModes.driving}} // specific settings for google maps
                     maps={{search,lat:lat,lon:long,action: actions.navigateByLatAndLon,travelMode:mapsTravelModes.driving}}
                />
                <View style={{backgroundColor: '#ededed', height: 35, width: 35, position: 'absolute'}}>

                </View>
        </View>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectLead}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Owner Name </Text>
        </View>
    
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Architect}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Architect </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ArchitectPhoneNumber}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Architect Phone Number </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Builder}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Builder </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{InteriorDesigner}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Interior Designer </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ElectricalConsultant}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Electrical Consultant </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{CivilConstructor}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Civil Constructor </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Tags}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Tags </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BuildingStage}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Building Stage </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ClientType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Client Type </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Status </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 100, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Comment}</Text>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Comment </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth: 1, marginTop: 10, height: 100, marginLeft: 10, marginRight: 10, borderRadius: 5, marginBottom: 10}}>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Images </Text>
        <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
          data={Images}
          numColumns={5}
          keyExtractor={(Images)=>Images.item}
          renderItem={({ item, index })=>{
            return(
              <TouchableOpacity 
              onPress={()=>{
                const img = []
                for(let i = 0 ; i < Images.length ; i++){
                  img.push(
                    {source: {uri: 'data:image/jpeg;base64,'+Images[i]}},
                  )
                }
                setAlbumRes(img)    
                  setCloseRes(true)
                  setIndexRes(index)
                //setResImage(item)
                //setResModalImage(true)
              }}
              style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2}}>
                <Image
                style={{width: 80, height: 80, borderRadius: 10}}
                  source={{uri:'data:image/jpeg;base64,'+item}}
                />
              </TouchableOpacity>
            )
          }}
        />
        </View>

        </ScrollView>

        <TouchableOpacity
         onPress={()=>{
           setEmployeeName(null)
           setProjectType(null)
           setCity(null)
           setArea(null)
           setBlockPhase(null)
           setBuildingType(null)
           setSize(null)
           setAddress(null)
           setPinLocation(null)
           setlat(null)
           setlong(null)
           setImages([])
           setProjectLead(null)
           setArchitect(null)
           setArchitectPhoneNumber(null)
           setBuilder(null)
           setInteriorDesigner(null)
           setElectricalConsultant(null)
           setCivilConstructor(null)
           setTags(null)
           setBuildingStage(null)
           setClientType(null)
           setProjectStatus(null)
           setComment(null)
           setResModal(false)
           }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>CLOSE</Text>
        </TouchableOpacity>

        </View>

        </Modal>

            </View>

        </View>
    )
  }

    }
    else if(SelectType == 'Commercial')
    {

      if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }

      else if (ScoutCom.length == 0){
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
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>

            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoScoutReport.png')}
            />
            </ScrollView> 

        </View>
        )
      }
      else{
    return(
        <View style={{height: '100%', width: '100%'}}>

        
            <View style={{position: 'absolute', backgroundColor: '#ededed', height: "100%", width: '100%'}}/>
            <View style={{height: '100%', width : '100%', position: 'absolute', alignItems: 'center'}}>
            
            <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>{
              if(Screen.Screen == 'Stats'){
              navigation.navigate("STATS")
            }
            else{
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalCom}</Text>

        </View>

        <ScrollView style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
            >  

            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>         

        <View style={{marginLeft: 15, marginRight: 15, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 5, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10}}
                placeholder="Search..." 
                placeholderTextColor={"grey"}
                value={SearchCom}
                onChangeText={text=>findCom(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={30} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 10, right: 15 }}/>    
            </View>

            
            <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={ScoutCom}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View
                //style={{backgroundColor: '#fff', marginTop: 10, height: 80, borderRadius: 20, flexDirection: 'row', elevation: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                style={{backgroundColor: '#fff', marginBottom: 10, elevation: 5, marginLeft: 5, marginRight: 5, borderRadius: 5, borderColor: '#f8ae4e', borderWidth: 1, borderLeftWidth: 5 }}
                >
                <View style={{backgroundColor: '#fff', flexDirection: 'row', borderRadius: 5}}>
                  
                <View style={{justifyContent: 'center', backgroundColor: '#fff', width: 23, alignItems: 'center', borderBottomLeftRadius: 5, borderTopLeftRadius: 5,}}>
                  {/* <Fontisto name={"flash"} color= {"#f9bf08"} size= {70} /> */}
                  </View>

                  <View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 15}}>
                  <Ionicons name={"person"}  size={20} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, color: '#f8ae4e', fontSize: 20, width: '80%'}}>{item.ProjectLead}</Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"location-pin"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Address}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"account-search"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.EmployeeName}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"architecture"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Architect}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"local-phone"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.ArchitectPhoneNumber}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <Ionicons name={"calendar"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Date}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"clock-time-five"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Time}</Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '89.5%', marginBottom: 20, alignSelf: 'center'}}>

                    <TouchableOpacity
                    onPress={()=>{
                      console.log('yes')
                      setEmployeeName(item.EmployeeName)
                      setProjectType(item.ProjectType)
                      setCity(item.City)
                      setArea(item.Area)
                      setBlockPhase(item.BlockPhase)
                      setBuildingType(item.BuildingType)
                      setSize(item.Size)
                      setAddress(item.Address)
                      setPinLocation(item.PinLocation)
                      setlat(item.PinLocation.split(", ")[0])
                      setlong(item.PinLocation.split(", ")[1])
                      setProjectLead(item.ProjectLead)
                      setArchitect(item.Architect)
                      setArchitectPhoneNumber(item.ArchitectPhoneNumber)
                      setBuilder(item.Builder)
                      setInteriorDesigner(item.InteriorDesigner)
                      setElectricalConsultant(item.ElectricalConsultant)
                      setCivilConstructor(item.CivilConstructor)
                      setTags(item.Tags)
                      setBuildingStage(item.BuildingStage)
                      setClientType(item.Client)
                      setProjectStatus(item.ProjectCom_Status)
                      setComment(item.Comment)
                      setComModal(true)
                      for ( let i = 0 ; i < item.Image.split(",").length ; i++){
                      if( i % 2 == 1 ){
                      Images.push(item.Image.split(",")[i])
                      }
                      }
                       }}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("ADMINEDITPROJECT",{
                      EditData: item
                    })}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Edit</Text>
                    </TouchableOpacity>

                  </View>


                  </View>

                </View>
                  

                </View>
            )
        }}
      />

        

        </ScrollView>

        {/* <Modal
        visible={ComModalImage}
        animationType="slide"
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff',}}>

        <Image
              resizeMode='contain'
              style={{height: '100%', width: '100%'}}  
              source={{uri:'data:image/jpeg;base64,'+ComImage}}
        />
        
        

        <TouchableOpacity
        style={{marginLeft: 20, position: 'absolute', marginTop: 20}}
        onPress={()=>{
          setComImage(null)
          setComModalImage(false)
        }}
        >
          <Ionicons name={"close"} size={30} style={{backgroundColor: '#fff', elevation: 10, borderRadius: 10}} />
        </TouchableOpacity>

        </View>
          
        </Modal> */}

        <ImageView
            images={AlbumCom}
            animationType="fade"
            isSwipeCloseEnabled={false}
            isPinchZoomEnabled={false}
            onClose={()=>{
                setAlbumCom([])
                setCloseCom(false)
                setIndexCom(0)
                }}
            imageIndex={IndexCom}
            isVisible={CloseCom}
        />

        <Modal
        visible={ComModal}
        animationType="slide"
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            onPress={()=>{
           setEmployeeName(null)
           setProjectType(null)
           setCity(null)
           setArea(null)
           setBlockPhase(null)
           setBuildingType(null)
           setSize(null)
           setAddress(null)
           setPinLocation(null)
           setlat(null)
           setlong(null)
           setImages([])
           setProjectLead(null)
           setArchitect(null)
           setArchitectPhoneNumber(null)
           setBuilder(null)
           setInteriorDesigner(null)
           setElectricalConsultant(null)
           setCivilConstructor(null)
           setTags(null)
           setBuildingStage(null)
           setClientType(null)
           setProjectStatus(null)
           setComment(null)
           setComModal(false)
              }}
            >
                <Ionicons name={"close"} size={30} style={{marginLeft: 15}} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Project Detail</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        <ScrollView style={{backgroundColor: '#ededed'}}>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 20, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{EmployeeName}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Employee Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{City}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> City </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Area}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Area </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BlockPhase}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Block/Phase </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BuildingType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Building Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Size}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Size </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 100, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Address}</Text>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Address </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{PinLocation}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> PinLocation </Text>
        <View style={{position: 'absolute', alignSelf: 'flex-end', top: 8, right: 5}}>
        <NavigationApps
                    iconSize={35}
                    row
                    viewMode='view'
                    waze={{address:'',lat:lat,lon:long,action: actions.navigateByLatAndLon}}
                     googleMaps={{search,lat:lat,lon:long,action: actions.navigateByLatAndLon,travelMode:googleMapsTravelModes.driving}} // specific settings for google maps
                     maps={{search,lat:lat,lon:long,action: actions.navigateByLatAndLon,travelMode:mapsTravelModes.driving}}
                />
                <View style={{backgroundColor: '#ededed', height: 35, width: 35, position: 'absolute'}}>

                </View>
        </View>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectLead}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Owner Name </Text>
        </View>
    
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Architect}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Architect </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ArchitectPhoneNumber}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Architect Phone Number </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Builder}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Builder </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{InteriorDesigner}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Interior Designer </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ElectricalConsultant}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Electrical Consultant </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{CivilConstructor}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Civil Constructor </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Tags}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Tags </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BuildingStage}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Building Stage </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ClientType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Client Type </Text>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Status </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 100, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Comment}</Text>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Comment </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth: 1, marginTop: 10, height: 100, marginLeft: 10, marginRight: 10, borderRadius: 5, marginBottom: 10}}>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Images </Text>
        <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
          data={Images}
          numColumns={5}
          keyExtractor={(Images)=>Images.item}
          renderItem={({ item, index })=>{
            return(
              <TouchableOpacity 
              onPress={()=>{
                const img = []
                for(let i = 0 ; i < Images.length ; i++){
                  img.push(
                    {source: {uri: 'data:image/jpeg;base64,'+Images[i]}},
                  )
                }
                  setAlbumCom(img)    
                  setCloseCom(true)
                  setIndexCom(index)
                //setComImage(item)
                //setComModalImage(true)
              }}
              style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2}}>
                <Image
                style={{width: 80, height: 80, borderRadius: 10}}
                  source={{uri:'data:image/jpeg;base64,'+item}}
                />
              </TouchableOpacity>
            )
          }}
        />
        </View>

        </ScrollView>

        <TouchableOpacity
         onPress={()=>{
           setEmployeeName(null)
           setProjectType(null)
           setCity(null)
           setArea(null)
           setBlockPhase(null)
           setBuildingType(null)
           setSize(null)
           setAddress(null)
           setPinLocation(null)
           setlat(null)
           setlong(null)
           setImages([])
           setProjectLead(null)
           setArchitect(null)
           setArchitectPhoneNumber(null)
           setBuilder(null)
           setInteriorDesigner(null)
           setElectricalConsultant(null)
           setCivilConstructor(null)
           setTags(null)
           setBuildingStage(null)
           setClientType(null)
           setProjectStatus(null)
           setComment(null)
           setComModal(false)
           }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>CLOSE</Text>
        </TouchableOpacity>

        </View>

        </Modal>

            </View>

        </View>
    )
  }

    }
    
    else
    {

      if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }

      else if (ScoutMark.length == 0){
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
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>

            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoScoutReport.png')}
            />
            </ScrollView>    
            
        </View>
        )
      }
      else{
    return(
        <View style={{height: '100%', width: '100%'}}>

        
            <View style={{position: 'absolute', backgroundColor: '#ededed', height: "100%", width: '100%'}}/>
            <View style={{height: '100%', width : '100%', position: 'absolute', alignItems: 'center'}}>
            
            <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>{
              if(Screen.Screen == 'Stats'){
              navigation.navigate("STATS")
            }
            else{
              navigation.navigate("ALLREPORTS")
            }
            }}
            //onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Reports</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalMark}</Text>
        </View>

        <ScrollView style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
            >  

            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        getScoutedByType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>         

        <View style={{marginLeft: 15, marginRight: 15, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 5, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10}}
                placeholder="Search..." 
                placeholderTextColor={"grey"}
                value={SearchMark}
                onChangeText={text=>findMark(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={30} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 10, right: 15 }}/>    
            </View>

            
            <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={ScoutMark}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View
                //style={{backgroundColor: '#fff', marginTop: 10, height: 80, borderRadius: 20, flexDirection: 'row', elevation: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                style={{backgroundColor: '#fff', marginBottom: 10, elevation: 5, marginLeft: 5, marginRight: 5, borderRadius: 5, borderColor: '#f8ae4e', borderWidth: 1, borderLeftWidth: 5 }}
                >
                <View style={{backgroundColor: '#fff', flexDirection: 'row', borderRadius: 5}}>
                  
                  <View style={{justifyContent: 'center', backgroundColor: '#fff', width: 23, alignItems: 'center', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                  {/* <Fontisto name={"flash"} color= {"#f9bf08"} size= {70} /> */}
                  </View>

                  <View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 15}}>
                  <Ionicons name={"person"}  size={20} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, color: '#f8ae4e', fontSize: 20, width: '80%'}}>{item.OwnerDetail}</Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"location-pin"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Address}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"account-search"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.EmployeeName}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <Entypo name={"shop"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.ShopName}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"local-phone"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.OwnerPhoneNumber}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <Ionicons name={"calendar"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Date}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"clock-time-five"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Time}</Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '89.5%', marginBottom: 20, alignSelf: 'center'}}>
                  
                    <TouchableOpacity
                    onPress={()=>{
                      setEmployeeName(item.EmployeeName)
                      setProjectType(item.ProjectType)
                      setBuildingType(item.BuildingType)
                      setShopName(item.ShopName)
                      setOwnerDetail(item.OwnerDetail)
                      setOwnerPhoneNumber(item.OwnerPhoneNumber)
                      setProducts(item.Products)
                      setOurCompetitorBrands(item.OurCompetitorBrands)
                      setCity(item.City)
                      setArea(item.Area)
                      setAddress(item.Address)
                      setPinLocation(item.PinLocation)
                      setlat(item.PinLocation.split(", ")[0])
                      setlong(item.PinLocation.split(", ")[1])
                      setClientType(item.Client)
                      setClientStatus(item.Status)
                      setProjectStatus(item.ProjectMar_Status)
                      setComment(item.Comment)
                      setMarkModal(true)
                      for ( let i = 0 ; i < item.Image.split(",").length ; i++){
                      if( i % 2 == 1 ){
                      Images.push(item.Image.split(",")[i])
                      }
                      }
                      }}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate("ADMINEDITMARKET",{
                      EditData: item
                    })}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', width: 90, borderRadius: 5, elevation: 2}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Edit</Text>
                    </TouchableOpacity>

                  </View>


                  </View>

                </View>
                   {/* <View style={{width: 50, height: 50, backgroundColor: '#f8ae4e', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginLeft: 5, borderRadius: 25}}>
                        <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Karla-Bold'}}>{item.ProjectType.charAt(0)}</Text>
                    </View>
                    
                     <View style={{marginLeft: 10, alignSelf: 'center', width: '65%'}}>
                    <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e'}}>{item.EmployeeName}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold'}}>{item.ProjectType}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', color: 'grey'}}>{item.PinLocation}</Text>
                    </View> */}

                </View>
            )
        }}
      />

        

        </ScrollView>

        {/* <Modal
        visible={MarkModalImage}
        animationType="slide"
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff',}}>

        <Image
              resizeMode='contain'
              style={{height: '100%', width: '100%'}}  
              source={{uri:'data:image/jpeg;base64,'+MarkImage}}
        />
        
        

        <TouchableOpacity
        style={{marginLeft: 20, position: 'absolute', marginTop: 20}}
        onPress={()=>{
          setMarkImage(null)
          setMarkModalImage(false)
        }}
        >
          <Ionicons name={"close"} size={30} style={{backgroundColor: '#fff', elevation: 10, borderRadius: 10}} />
        </TouchableOpacity>

        </View>
          
        </Modal> */}

        <ImageView
            images={AlbumMark}
            animationType="fade"
            isSwipeCloseEnabled={false}
            isPinchZoomEnabled={false}
            onClose={()=>{
                setAlbumMark([])
                setCloseMark(false)
                setIndexMark(0)
                }}
            imageIndex={IndexMark}
            isVisible={CloseMark}
        />

        <Modal
        visible={MarkModal}
        animationType="slide"
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            onPress={()=>{
              setEmployeeName(null)
                      setProjectType(null)
                      setBuildingType(null)
                      setShopName(null)
                      setOwnerDetail(null)
                      setOwnerPhoneNumber(null)
                      setProducts(null)
                      setOurCompetitorBrands(null)
                      setCity(null)
                      setArea(null)
                      setAddress(null)
                      setPinLocation(null)
                      setlat(null)
                      setlong(null)
                      setImages([])
                      setClientType(null)
                      setClientStatus(null)
                      setProjectStatus(null)
                      setComment(null)
                      setMarkModal(false)
              }}
            >
                <Ionicons name={"close"} size={30} style={{marginLeft: 15}} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Project Detail</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        <ScrollView style={{backgroundColor: '#ededed'}}>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 20, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{EmployeeName}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Employee Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{BuildingType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Building Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ShopName}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Shop Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{OwnerDetail}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Owner Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{OwnerPhoneNumber}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Owner Phone Number </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Products}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Product </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{OurCompetitorBrands}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Our Competitor Brand </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{City}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> City </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Area}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Area </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 100, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Address}</Text>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Address </Text>
        </View>
    
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{PinLocation}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> PinLocation </Text>
        <View style={{position: 'absolute', alignSelf: 'flex-end', top: 8, right: 5}}>
        <NavigationApps
                    iconSize={35}
                    row
                    viewMode='view'
                    waze={{address:'',lat:lat,lon:long,action: actions.navigateByLatAndLon}}
                     googleMaps={{search,lat:lat,lon:long,action: actions.navigateByLatAndLon,travelMode:googleMapsTravelModes.driving}} // specific settings for google maps
                     maps={{search,lat:lat,lon:long,action: actions.navigateByLatAndLon,travelMode:mapsTravelModes.driving}}
                />
                <View style={{backgroundColor: '#ededed', height: 35, width: 35, position: 'absolute'}}>

                </View>
        </View>
        </View>
        
        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ClientType}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Client Type </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ClientStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Client Status </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Status </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 100, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{Comment}</Text>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Comment </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth: 1, marginTop: 10, height: 100, marginLeft: 10, marginRight: 10, borderRadius: 5, marginBottom: 10}}>
        <Text style={{position: 'absolute', bottom: 92, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Images </Text>
        <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
          data={Images}
          numColumns={5}
          keyExtractor={(Images)=>Images.item}
          renderItem={({ item, index })=>{
            return(
              <TouchableOpacity 
              onPress={()=>{
                const img = []
                for(let i = 0 ; i < Images.length ; i++){
                  img.push(
                    {source: {uri: 'data:image/jpeg;base64,'+Images[i]}},
                  )
                }
                  setAlbumMark(img)    
                  setCloseMark(true)
                  setIndexMark(index)
                //setMarkImage(item)
                //setMarkModalImage(true)
              }}
              style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2}}>
                <Image
                style={{width: 80, height: 80, borderRadius: 10}}
                  source={{uri:'data:image/jpeg;base64,'+item}}
                />
              </TouchableOpacity>
            )
          }}
        />
        </View>

        </ScrollView>

        <TouchableOpacity
         onPress={()=>{
                      setEmployeeName(null)
                      setProjectType(null)
                      setBuildingType(null)
                      setShopName(null)
                      setOwnerDetail(null)
                      setOwnerPhoneNumber(null)
                      setProducts(null)
                      setOurCompetitorBrands(null)
                      setCity(null)
                      setArea(null)
                      setAddress(null)
                      setPinLocation(null)
                      setlat(null)
                      setlong(null)
                      setImages([])
                      setClientType(null)
                      setClientStatus(null)
                      setProjectStatus(null)
                      setComment(null)
                      setMarkModal(false)
           }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>CLOSE</Text>
        </TouchableOpacity>

        </View>

        </Modal>

            </View>

        </View>
    )
  }

    }
      
}

export default AllScoutedLocationsScreen;