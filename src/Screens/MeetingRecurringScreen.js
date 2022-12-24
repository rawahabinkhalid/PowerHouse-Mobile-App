import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler, Alert, ToastAndroid, FlatList, ActivityIndicator, Modal, LogBox} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { TextInput } from 'react-native-paper'
import ImageView from 'react-native-image-view'
import {NavigationApps,actions,googleMapsTravelModes, search, mapsTravelModes} from "react-native-navigation-apps";
import { Menu, MenuItem } from 'react-native-material-menu'
import firestore from '@react-native-firebase/firestore';

const MeetingRecurringScreen = ({ navigation, route }) => {

    const Screen = route.params  
    const [Search, setSearch] = useState('')
    const [UserId, setUserId] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [Meeting, setMeeting] = useState([])
    const [SearchMeeting, setSearchMeeting] = useState([])
    const [TotalAlloted, setTotalAlloted] = useState(0)
    const [Locationmodal, setLocationmodal] = useState(false)
    const [opacity, setopacity] = useState(1)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [SelectedDate, setSelectedDate] = useState('DD-MM-YYYY')

    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [SelectedTime, setSelectedTime] = useState('HH:MM')

    const [Venue, setVenue] = useState(null)
    const [StackHolder, setStackHolder] = useState(null)
    const [Comments, setComments] = useState(null)

    const [SelectedMeeting, setSelectedMeeting] = useState({})

    const [CloseProjectModal, setCloseProjectModal] = useState(false)
    const [ProjectId, setProjectId] = useState(null)
    const [ProjectCloseReason, setProjectCloseReason] = useState(null)

    const [MeetingModal, setMeetingModal] = useState(false)

    const [UserToken, setUserToken] = useState([])

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);  
    const showMenu = () => setVisible(true);


    ///////////////////////Residential & Commercial/////////////////////

  const [ResModal, setResModal] = useState(false)
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
  const [ContactPersonName, setContactPersonName] = useState(null)
  const [ContactPersonPhoneNumber, setContactPersonPhoneNumber] = useState(null)
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
  const [CloseRes, setCloseRes] = useState(false)
  const [IndexRes, setIndexRes] = useState(0)
  const [AlbumRes, setAlbumRes] = useState([])

  const [CloseCom, setCloseCom] = useState(false)
  const [IndexCom, setIndexCom] = useState(0)
  const [AlbumCom, setAlbumCom] = useState([])

  //////////////////////////////Market//////////////////

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

  //////////////////////////////Market//////////////////

      useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        //navigation.addListener('focus',()=>{
            GetMeeting()
          //})

          navigation.addListener('focus',()=>{
            const backAction = () => {
              if(Screen.Screen == 'Stats'){
                navigation.navigate("STATS")
              }
              else{
                navigation.navigate("DASHBOARD")
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


     const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.log("A date has been picked: ", moment(date).format('YYYY-MM-DD'));
      setSelectedDate(moment(date).format('YYYY-MM-DD'))
      hideDatePicker();
    };


    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleTimeConfirm = (time) => {
      console.log("A Time has been picked: ", moment(time).format('hh:mm:ss A'));
      setSelectedTime(moment(time).format('hh:mm A'))
      hideTimePicker();
    };

     const GetMeeting = async() => {
         setLoading(true)
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            console.log(UserInfo)
            fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/Get_Recurring_meeting_Api.php',{
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
        "meetingsetbyid" : JSON.parse(UserInfo).userid,
        })
        }).then((response) => response.json())
        .then((josn) => {
          //console.log(josn)
          setTotalAlloted(josn.length)
          setMeeting(josn)
          setSearchMeeting(josn)
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

    const findMeeting = (text) => {
      if (text) {
        const regex = new RegExp(`${text.trim()}`, 'i');
          if(Meeting.filter((architect) => architect.Architect.search(regex) >= 0).length != 0){
            setMeeting(Meeting.filter((architect) => architect.Architect.search(regex) >= 0))
            setSearch(text)
          }
          // else if(Meeting.filter((architect) => architect.OwnerName.search(regex) >= 0).length != 0){
          //   setMeeting(Meeting.filter((architect) => architect.OwnerName.search(regex) >= 0))
          //   setSearch(text)
          // }
          else if(Meeting.filter((architect) => architect.City.search(regex) >= 0).length != 0){
            setMeeting(Meeting.filter((architect) => architect.City.search(regex) >= 0))
            setSearch(text)
          }
          else if(Meeting.filter((architect) => architect.Area.search(regex) >= 0).length != 0){
            setMeeting(Meeting.filter((architect) => architect.Area.search(regex) >= 0))
            setSearch(text)
          }
          else if(Meeting.filter((architect) => architect.ScoutType.search(regex) >= 0).length != 0){
            setMeeting(Meeting.filter((architect) => architect.ScoutType.search(regex) >= 0))
            setSearch(text)
          }
          else{
            setMeeting(SearchMeeting)
            setSearch(text)
            ToastAndroid.show("No meeting found", ToastAndroid.SHORT)
            //Alert.alert("","No meeting Found")
          }          
      } else {
        setMeeting(SearchMeeting)
        setSearch(text)
      }
    };


    const SetMeeting = async()=>{
      if(SelectedDate == 'DD-MM-YYYY'){
        Alert.alert("","Please select meeting date!")
      }
      else if(SelectedTime == 'HH:MM'){
        Alert.alert("","Please select meeting time!")
      }
      else{
      setLoading(true)
      try {
        const UserInfo = await AsyncStorage.getItem('UserInfo')
        console.log(UserInfo)      
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/Set_meetingApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

        "projectid": SelectedMeeting.ProjectId,
        "meetingsetbyid": JSON.parse(UserInfo).userid,
        "meetingsetbyname": JSON.parse(UserInfo).userfullname,
        "employeename": SelectedMeeting.EmployeeName,
        "date": SelectedMeeting.Date,
        "time": SelectedMeeting.Time,
        "blockphase": SelectedMeeting.BlockPhase,
        "size": SelectedMeeting.Size,
        "images": SelectedMeeting.Image,
        "projectlead": SelectedMeeting.ProjectLead,
        "builder": SelectedMeeting.Builder,
        "interiordesigner": SelectedMeeting.InteriorDesigner,
        "electricalconsultant": SelectedMeeting.ElectricalConsultant,
        "civilconstructor": SelectedMeeting.CivilContractor,
        "tags": SelectedMeeting.Tags,
        "buildingstage": SelectedMeeting.BuildingStage,
        "comment": SelectedMeeting.Comment,
        "userid" : SelectedMeeting.EmployeeID,        
        "projecttype": SelectedMeeting.ScoutType,
        "area": SelectedMeeting.Area,
        "pinlocation": SelectedMeeting.PinLocation,
        "architect": SelectedMeeting.Architect,
        "architectphonenumber": SelectedMeeting.ArchitectPhoneNo,        
        "contactpersonname": SelectedMeeting.ContactPersonName,
        "contactphonenumber": SelectedMeeting.ContactPersonPhoneNumber,        
        "city": SelectedMeeting.City,
        "address": SelectedMeeting.Location,
        "buildingtype": SelectedMeeting.BuildingType,
        "client": SelectedMeeting.Client,
        "meetingdate": SelectedDate,
        "meetingtime": SelectedTime,
        "stackholder": StackHolder,
        "vanue": Venue,
        "meetingcomment": Comments,
        "shopname" : SelectedMeeting.ShopName,
        "ownerdetail" : SelectedMeeting.OwnerName,
        "ownerphonenumber" : SelectedMeeting.OwnerContactNumber,
        "products" : SelectedMeeting.ProductCategory,
        "ourcompetitorbrands" : SelectedMeeting.Compitetor,
        "status" : SelectedMeeting.UserStatus    
      })
      }).then((response) => response.text())
      .then((txt) => {
        console.log('===>',txt)
        
        /////////////////////////////////////////////
        for( let j = 0 ; j < UserToken.length  ; j++){
          if (UserToken[j].key == JSON.parse(UserInfo).userid){
            if(UserToken.length == 1){
              setSelectedDate('DD-MM-YYYY')
              setSelectedTime('HH:MM')
              setStackHolder(null)
              setVenue(null)
              setComments(null)
              setSelectedMeeting({})
              setopacity(1)
              setLocationmodal(false)
              GetMeeting()
              setLoading(false)
              setUserToken([])
              setMeetingModal(true)
            }
            console.log('No Notification')
            console.log('=+>', UserToken[j])
          }
          else{
          fetch('https://fcm.googleapis.com/fcm/send',{
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization" : "key=AAAAVSUcVXQ:APA91bH7OYYts_0JMkq7EtGa6kqBdIcUhFjt56A1SRJmKpdJUeWmjPg_kLjAdGCNdkC1EdxE-kOdjiS9958VWsvkUXqVq0BeCHu5iAFtdM7zUF3DqSOjGARirDmmJ0PoCKLVC5AsuTXR"
              },
              body: JSON.stringify({

                "notification": {
                  "title": "Meeting Set By " + JSON.parse(UserInfo).userfullname,
                  "body": "For project " + SelectedMeeting.ProjectId + " with " + StackHolder + " On " + moment(SelectedDate).format('DD-MM-YYYY') + " at " + SelectedTime
              },
              "data" : {
                "userid" : JSON.parse(UserInfo).userid,
                "status" : "meeting"
              },
              "to": UserToken[j].token

            })
            }).then((response) => response.json())
            .then((json) => {
              /////////////////////////////////////////////////////

              fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "user_id" : UserToken[j].key,
                  "title": "Meeting Set By " + JSON.parse(UserInfo).userfullname,
                  "body": "For project " + SelectedMeeting.ProjectId + " with " + StackHolder + " On " + moment(SelectedDate).format('DD-MM-YYYY') + " at " + SelectedTime,
                  "status" : "meeting"
                })
                }).then((response) => response.text())
              .then((text) => {
                console.log('+++>',text)
                setSelectedDate('DD-MM-YYYY')
                setSelectedTime('HH:MM')
                setStackHolder(null)
                setVenue(null)
                setComments(null)
                setSelectedMeeting({})
                setopacity(1)
                setLocationmodal(false)
                GetMeeting()
                setLoading(false)
                setUserToken([])
                setMeetingModal(true)               
              })
                  .catch((error) => {
                  console.error(error);
                  setLoading(false);
              })            
              ////////////////////////////////////////////////////
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            })
           }
        }
        /////////////////////////////////////////////        
      })
      .catch((error) => {
        console.error(error);
        //Alert.alert("","Please check your internet connection!")
       setLoading(false)
      });
    } catch (error) {
      console.log(error)
      setLoading(false)
     }
    }
  }


  const ShowDetail = (item) => {
    console.log('===>',item)
    
    if(item.ScoutType == 'Market'){
      setEmployeeName(item.EmployeeName)
                      setProjectType(item.ScoutType+"-("+item.ProjectId+")")
                      setBuildingType(item.BuildingType)
                      setShopName(item.ShopName)
                      setOwnerDetail(item.OwnerName)
                      setOwnerPhoneNumber(item.OwnerContactNumber)
                      setProducts(item.ProductCategory)
                      setOurCompetitorBrands(item.Compitetor)
                      setCity(item.City)
                      setArea(item.Area)
                      setPinLocation(item.PinLocation)
                      setAddress(item.Location)
                      setlat(item.PinLocation.split(", ")[0])
                      setlong(item.PinLocation.split(", ")[1])
                      setClientType(item.Client)
                      setClientStatus(item.UserStatus)
                      setComment(item.Comment)
                      setMarkModal(true)
                      for ( let i = 0 ; i < item.Image.split(",").length ; i++){
                      if( i % 2 == 1 ){
                      Images.push(item.Image.split(",")[i])
                      }
                      }
                }
        else if(item.ScoutType == 'Residential'){
          setEmployeeName(item.EmployeeName)
                      setProjectType(item.ScoutType+"-("+item.ProjectId+")")
                      setCity(item.City)
                      setArea(item.Area)
                      setBlockPhase(item.BlockPhase)
                      setBuildingType(item.BuildingType)
                      setSize(item.Size)
                      setAddress(item.Location)
                      setPinLocation(item.PinLocation)
                      setlat(item.PinLocation.split(", ")[0])
                      setlong(item.PinLocation.split(", ")[1])
                      setProjectLead(item.ProjectLead)
                      setContactPersonName(item.ContactPersonName)
                      setContactPersonPhoneNumber(item.ContactPersonPhoneNumber)
                      setArchitect(item.Architect)
                      setArchitectPhoneNumber(item.ArchitectPhoneNo)
                      setBuilder(item.Builder)
                      setInteriorDesigner(item.InteriorDesigner)
                      setElectricalConsultant(item.ElectricalConsultant)
                      setCivilConstructor(item.CivilContractor)
                      setTags(item.Tags)
                      setBuildingStage(item.BuildingStage)
                      setClientType(item.Client)
                      setComment(item.Comment)
                      setResModal(true)
                      for ( let i = 0 ; i < item.Image.split(",").length ; i++){
                      if( i % 2 == 1 ){
                      Images.push(item.Image.split(",")[i])
                      }
                      }
            }
        else if(item.ScoutType == 'Commercial'){
                      setEmployeeName(item.EmployeeName)
                      setProjectType(item.ScoutType+"-("+item.ProjectId+")")
                      setCity(item.City)
                      setArea(item.Area)
                      setBlockPhase(item.BlockPhase)
                      setBuildingType(item.BuildingType)
                      setSize(item.Size)
                      setAddress(item.Location)
                      setPinLocation(item.PinLocation)
                      setlat(item.PinLocation.split(", ")[0])
                      setlong(item.PinLocation.split(", ")[1])
                      setProjectLead(item.ProjectLead)
                      setArchitect(item.Architect)
                      setArchitectPhoneNumber(item.ArchitectPhoneNo)
                      setBuilder(item.Builder)
                      setInteriorDesigner(item.InteriorDesigner)
                      setElectricalConsultant(item.ElectricalConsultant)
                      setCivilConstructor(item.CivilContractor)
                      setTags(item.Tags)
                      setBuildingStage(item.BuildingStage)
                      setClientType(item.Client)
                      setComment(item.Comment)
                      setComModal(true)
                      for ( let i = 0 ; i < item.Image.split(",").length ; i++){
                      if( i % 2 == 1 ){
                      Images.push(item.Image.split(",")[i])
                      }
                      }
        }
  }

      if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }

      else if (Meeting.length == 0){
        return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
          
          <View style={{backgroundColor: '#fff', height: 60, width: '100%', elevation: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

            <TouchableOpacity
                onPress={()=>{
              if(Screen.Screen == 'Stats'){
                navigation.navigate("STATS")
              }
              else{
                navigation.navigate("DASHBOARD")
              }
              }}
                style={{left: 20}}
            >
            <FontAwesome name={"angle-left"} size={35} color={'#000'} />
            </TouchableOpacity>
              
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000', paddingTop: 5, paddingLeft: 20}}>Recurring Meetings</Text>
              
              <Text style={{right: 20, fontFamily: 'Karla-Bold', fontSize: 20}}>{TotalAlloted}</Text>
              
            </View>

            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoLocation.png')}
            />
            </ScrollView>    

        </View>
        )
      }
      else{
    return(
        <View style={{height: '100%', width: '100%'}}>

           
            <View style={{position: 'absolute', backgroundColor: '#fff', height: "100%", width: '100%'}}/>
            <View style={{height: '100%', width : '100%', position: 'absolute', alignItems: 'center'}}>
            
            <View style={{backgroundColor: '#fff', height: 60, width: '100%', elevation: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', opacity: opacity}}>

            <TouchableOpacity
                onPress={()=>{
                  setSearch('')
                  if(Screen.Screen == 'Stats'){
                navigation.navigate("STATS")
              }
              else{
                navigation.navigate("DASHBOARD")
              }
                  }}
                style={{left: 20}}
            >
            <FontAwesome name={"angle-left"} size={35} color={'#000'} />
            </TouchableOpacity>
              
              <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 20, color: '#000', paddingTop: 5, paddingLeft: 20}}>Recurring Meetings</Text>
              
              <Text style={{right: 20, fontFamily: 'Karla-Bold', fontSize: 20}}>{TotalAlloted}</Text>
            </View>

            

        <ScrollView style={{height: '100%', width: '100%', opacity: opacity}}
        showsVerticalScrollIndicator= {false}
            >

            <View style={{marginLeft: 41, marginRight: 41, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 20, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10, justifyContent: 'center', height: 50, backgroundColor: '#fff'}}
                placeholder="Search..."
                theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
                selectionColor="#000" 
                value={Search}
                onChangeText={text=>findMeeting(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={25} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 15, right: 10 }}/>    
            </View>

            
            <FlatList
            style={{marginTop: 15, width: '80%', alignSelf: 'center', marginBottom: 10}}
            data={Meeting}            
            keyExtractor={item => item.Id}
            renderItem={({ item, index }) =>{
            return(
                <View style={{backgroundColor: '#fff', borderRadius: 5, elevation: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, marginTop: 5, borderWidth: 1, borderColor: '#f8ae43', borderLeftWidth: 5}}>
                <View style={{marginLeft: 5}}>
                    {/* <View style={{width: 50, height: 50, backgroundColor: '#f8ae4e', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginLeft: 5, borderRadius: 25}}>
                        <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Karla-Bold'}}>{item.ScoutType.charAt(0)}</Text>
                    </View> */}            

                  {/* <TouchableOpacity 
                  onPress={showMenu}
                  style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: 10, right: 5}}
                  >
                  <Menu
                      visible={visible}
                      anchor={
                    <View style={{ alignItems: 'center', justifyContent: 'space-around'}}>
                      <MaterialCommunityIcons name={"dots-vertical"} size={25} color='#000'/>
                    </View>
                      }
                      onRequestClose={hideMenu}
                  >
                      <MenuItem 
                      onPress={()=>hideMenu()}
                          textStyle={{color: 'grey'}}
                          >Close Project</MenuItem>
                  </Menu>
            </TouchableOpacity> */}

                  <TouchableOpacity
                  onPress={()=>{
                    Alert.alert("","Are you sure you want to close project?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      setopacity(0.5)
                      setProjectId(item.ProjectId)
                      setCloseProjectModal(true)
                    }}
                    ])
                  }}
                  style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: 10, right: 5, width: 70, borderColor: 'grey', borderWidth: 0.7, borderRadius: 5, height: 25, justifyContent: 'center', alignItems: 'center'}}
                  >
                    <Text style={{fontSize: 10, fontFamily: 'Karla-Bold', color: 'grey'}}>Close Project</Text>
                  </TouchableOpacity>
                    
                    <TouchableOpacity 
                    onPress={()=>ShowDetail(item)}
                    style={{marginLeft: 12, width: '65%'}}>

                    { (item.OwnerName == null) ?
                    <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e', paddingTop: 10, paddingRight: 10}}>{item.Architect}</Text>
                    :
                    <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e', paddingTop: 10, paddingRight: 10}}>{item.OwnerName}</Text>
                    }
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', paddingRight: 10}}>{item.ScoutType} ({item.ProjectId})</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', color: 'grey', paddingRight: 10, paddingBottom: 10}}>{item.Location}</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row', marginBottom: 10}}>

                <TouchableOpacity 
                // onPress={()=>navigation.navigate("EDITALLOTED",{
                //       EditData: item
                //     })}
                onPress={()=>{
                  if(item.ScoutType == 'Market'){
                    //console.log('=>',item.Id)
                    navigation.navigate("EDITALLOTEDMARKET",{
                      EditData: item,
                      Screen: 'Recurring'
                    })
                  }
                  else{                    
                    navigation.navigate("EDITALLOTED",{
                      EditData: item,
                      Screen: 'Recurring'
                    })
                  }
                }}
                style={{height: 30, width: '35%', backgroundColor: '#f8ae4e', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 15}}>
                <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>{
                  setLoading(true)
                        fetch(
                          'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/Get_HandShake_Api.php',
                          {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              projectid: item.ProjectId,
                            }),
                          },
                        )
                          .then(response => response.json())
                          .then(josn => {
                            console.log('==>',josn);
                            ///////////////////////////////////
                            const users = [];
                            for ( let i = 0 ; i < josn.length ; i++){
                              firestore()
                              .collection('Users')
                              .where('userid', '==', josn[i].sale_person_id)
                              .get()
                              .then((querySnapshot) => {
                                querySnapshot.forEach(documentSnapshot => {
                                  
                                  users.push({
                                    ...documentSnapshot.data(),
                                    key: documentSnapshot.id,
                                  });
                                  console.log('+=>',users)
                                });
                              });
                            }
                                  setUserToken(users)
                                  setLoading(false)
                               if(item.OwnerName == null){
                                  setopacity(0.5)
                                  setLocationmodal(true)
                                  setSelectedMeeting(item)                    
                                  setStackHolder(item.Architect)
                                }
                                else{
                                  setopacity(0.5)
                                  setLocationmodal(true)
                                  setSelectedMeeting(item)
                                  setStackHolder(item.OwnerName)
                                }
                            //////////////////////////////////
                          })
                          .catch(error => {
                            console.error(error);
                          });
                       }}
                style={{height: 30, width: '35%', backgroundColor: '#f8ae4e', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 10}}>
                <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>Set Meeting</Text>
                </TouchableOpacity>

                </View>

                </View>
            )
        }}
      />

        

        </ScrollView>

        <Modal
        animationType="slide"
        transparent={true}
        visible={Locationmodal}
        >
        <View style={{height: 460,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', height: 400, marginTop: 'auto'}}>

          <TouchableOpacity
          style={{position: 'absolute', alignSelf: 'flex-start', marginTop: 5, marginLeft: 30}}
          onPress={()=>{
            setSelectedDate('DD-MM-YYYY')
            setSelectedTime('HH:MM')
            setStackHolder(null)
            setVenue(null)
            setComments(null)
            setopacity(1)
            setLocationmodal(false)
          }}
          >
            <MaterialCommunityIcons name={"close"} size={25} />
          </TouchableOpacity>

        <View style={{marginTop: 50}}>
        <TouchableOpacity
        onPress={showDatePicker}
        style={{height: 55, width: 300, borderWidth: 1, marginLeft: 10, marginRight: 10, borderRadius: 5, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: 'grey'}}>{SelectedDate}</Text>
        </TouchableOpacity>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 20, color: 'grey', fontSize: 13, bottom: 47}}> Select Date * </Text>
       </View>
       
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
       />


        <View style={{marginTop: 15}}>
        <TouchableOpacity
        onPress={showTimePicker}
        style={{height: 55, width: 300, borderWidth: 1, marginLeft: 10, marginRight: 10, borderRadius: 5, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: 'grey'}}>{SelectedTime}</Text>
        </TouchableOpacity>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 20, color: 'grey', fontSize: 13, bottom: 47}}> Select Time * </Text>
       </View>
       
       <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
       />

        <View style={{marginTop: 7}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, width: 300, justifyContent: 'center', height: 55}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Meeting With"
        value={StackHolder}
        onChangeText={text => setStackHolder(text)}
        />
        </View>

        <View style={{marginTop: 7}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, width: 300, justifyContent: 'center', height: 55}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Venue"
        value={Venue}
        onChangeText={text => setVenue(text)}
        />
        </View>

        <View style={{marginTop: 7}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, width: 300, justifyContent: 'center', height: 55}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Comment"
        value={Comments}
        onChangeText={text => setComments(text)}
        />
        </View>

        </View>
        
          <View>
            
            <TouchableOpacity
            onPress={()=>SetMeeting()}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Set Meeting</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={CloseProjectModal}
        >
        <View style={{height: 260,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', height: 200, marginTop: 'auto'}}>

          <TouchableOpacity
          onPress={()=>{
            setopacity(1)
            setCloseProjectModal(false)
              setProjectId(null)
              setProjectCloseReason(null)
          }}
          style={{position: 'absolute', alignSelf: 'flex-start', marginTop: 5, marginLeft: 30}}
          >
            <MaterialCommunityIcons name={"close"} size={25} />
          </TouchableOpacity>

          <Text style={{fontFamily: 'Karla-SemiBold', fontSize: 20, top: 3}}>Close Project</Text>

        <View style={{marginTop: 20}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, width: 300, justifyContent: 'center', height: 55}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        disabled={true}
        mode= "outlined"
        label="Project ID"
        value={ProjectId}
        />
        </View>

        <View style={{marginTop: 7}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, width: 300, justifyContent: 'center', height: 55}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Reason"
        value={ProjectCloseReason}
        onChangeText={text => setProjectCloseReason(text)}
        />
        </View>

        </View>
        
          <View>
            
            <TouchableOpacity
            onPress={()=>{
              setopacity(1)
              setCloseProjectModal(false)
              setProjectId(null)
              setProjectCloseReason(null)
            }}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Done</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>

      <Modal
            animationType="slide"
            transparent={true}
            visible={MeetingModal}>
            <View
            style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
            >

            <View style={{width: 300, height: 200, backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly'}}>

            <MaterialCommunityIcons name={"calendar-check"} color={"green"} size={50} style={{marginTop: 10}} />

            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingBottom: 5, fontSize: 16}}>Meeting Set Successfully</Text>

            <TouchableOpacity
            onPress={()=>setMeetingModal(false)}
            style={{backgroundColor: '#f8ae4e', width: 130, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 10}}
            >
              <Text style={{fontFamily:'Karla-Bold', color: '#fff',padding: 7}}>OK</Text>
            </TouchableOpacity>

            </View>

            </View>
            </Modal>


            {/* ///////////////////////////Residential Detail/////////////////// */}

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
           setContactPersonName(null)
           setContactPersonPhoneNumber(null)
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

        {/* <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ContactPersonName}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Contact Person Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ContactPersonPhoneNumber}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Contact Person Phone Number </Text>
        </View> */}
    
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
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Civil Contractor </Text>
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
        
        {/* <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Status </Text>
        </View> */}

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
                // setResImage(item)
                // setResModalImage(true)
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
            {/* ///////////////////////////Residential Detail/////////////////// */}



            {/* ///////////////////////////Commercial Detail/////////////////// */}

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
        
        {/* <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Status </Text>
        </View> */}

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

            {/* ///////////////////////////Commercial Detail/////////////////// */}

            
            {/* ///////////////////////////Market Detail/////////////////// */}

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
                      setPinLocation(null)
                      setAddress(null)
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

        {/* <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ProjectStatus}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Project Status </Text>
        </View> */}

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
                      setPinLocation(null)
                      setAddress(null)
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

            {/* ///////////////////////////Market Detail/////////////////// */}

            </View>

        </View>
    )
}
}

export default MeetingRecurringScreen;