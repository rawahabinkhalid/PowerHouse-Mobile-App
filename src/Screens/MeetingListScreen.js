import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  Alert,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  Modal,
  LogBox
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-paper';
import ImageView from 'react-native-image-view'
import {NavigationApps,actions,googleMapsTravelModes, search, mapsTravelModes} from "react-native-navigation-apps";
import firestore from '@react-native-firebase/firestore';

const MeetingListScreen = ({navigation}) => {
  const [Search, setSearch] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Meeting, setMeeting] = useState([]);
  const [SearchMeeting, setSearchMeeting] = useState([]);
  const [Locationmodal, setLocationmodal] = useState(false);
  const [opacity, setopacity] = useState(1);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [SelectedDate, setSelectedDate] = useState('DD-MM-YYYY');

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [SelectedTime, setSelectedTime] = useState('HH:MM');

  const [Venue, setVenue] = useState(null);
  const [StackHolder, setStackHolder] = useState(null);
  const [Comments, setComments] = useState(null);
  const [ProjectID, setProjectID] = useState(null);

  const [EditMeetingModal, setEditMeetingModal] = useState(false)

  const [TeamModal, setTeamModal] = useState(false)
  const [TeamData, setTeamData] = useState([])
  const [TeamProjectId, setTeamProjectId] = useState(null)

  const [UserToken, setUserToken] = useState([])
  const [PID, setPID] = useState(null)

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

  //////////////////////////////Meeting//////////////////

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

  //////////////////////////////Meeting//////////////////

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    //navigation.addListener('focus', () => {
     GetMeeting();
    //});
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('A date has been picked: ', moment(date).format('YYYY-MM-DD'));
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    console.log('A Time has been picked: ', moment(time).format('hh:mm:ss A'));
    setSelectedTime(moment(time).format('hh:mm A'));
    hideTimePicker();
  };


  const ViewTeam = async (val) => {
    console.log('=>',val)
    // setLoading(true);
      fetch(
        'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/Get_HandShake_Api.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectid: val,
          }),
        },
      )
        .then(response => response.json())
        .then(josn => {
          console.log('==>',josn);
          setTeamData(josn)          
          // setLoading(false);
        })
        .catch(error => {
          console.error(error);
          // Alert.alert("","Please check your internet connection!")
          // setLoading(false);
        });
    }

  const GetMeeting = async () => {
    setLoading(true);
    try {
      const UserInfo = await AsyncStorage.getItem('UserInfo');
      console.log(UserInfo);
      fetch(
        'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/Get_setmeetingApi.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            meetingsetbyid: JSON.parse(UserInfo).userid,
          }),
        },
      )
        .then(response => response.json())
        .then(josn => {
          //console.log(josn)
          setMeeting(josn);
          setSearchMeeting(josn);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          // Alert.alert("","Please check your internet connection!")
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const findMeeting = text => {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
      if (Meeting.filter(architect => architect.Architect.search(regex) >= 0).length != 0){
        setMeeting(Meeting.filter(architect => architect.Architect.search(regex) >= 0));
        setSearch(text);
      }
      else if(Meeting.filter((architect) => architect.OwnerName.search(regex) >= 0).length != 0){
        setMeeting(Meeting.filter((architect) => architect.OwnerName.search(regex) >= 0))
        setSearch(text)
      } 
      else if (Meeting.filter(architect => architect.City.search(regex) >= 0).length !=0){
        setMeeting(Meeting.filter(architect => architect.City.search(regex) >= 0));
        setSearch(text);
      } 
      else if (Meeting.filter(architect => architect.Area.search(regex) >= 0).length !=0){
        setMeeting(Meeting.filter(architect => architect.Area.search(regex) >= 0));
        setSearch(text);
      } 
      else if (Meeting.filter(architect => architect.ScoutType.search(regex) >= 0).length != 0){
        setMeeting(Meeting.filter(architect => architect.ScoutType.search(regex) >= 0));
        setSearch(text);
      } 
      else {
        setMeeting(SearchMeeting);
        setSearch(text)
        ToastAndroid.show('No meeting found', ToastAndroid.SHORT);
      }
    } 
    else {
      setMeeting(SearchMeeting);
      setSearch(text);
    }
  };

  const EditMeeting = async () => {
    if (SelectedDate == 'DD-MM-YYYY') {
      Alert.alert('', 'Please select meeting date!');
    }
    else if (SelectedDate == 'Invalid date') {
      Alert.alert('', 'Please select a valid date!');
    } else if (SelectedTime == 'HH:MM') {
      Alert.alert('', 'Please select meeting time!');
    } else {
      setLoading(true);
      try {
        const UserInfo = await AsyncStorage.getItem('UserInfo');
        fetch(
          'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/UpdateSetMeetingApi.php',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: ProjectID,
              meetingsetbyid: JSON.parse(UserInfo).userid,
              meetingsetbyname: JSON.parse(UserInfo).userfullname,
              meetingdate: SelectedDate,
              meetingtime: SelectedTime,
              stackholder: StackHolder,
              vanue: Venue,
              meetingcomment: Comments,
            }),
          },
        )
          .then(response => response.text())
          .then(text => {
            
            /////////////////////////////////////////////
        for( let j = 0 ; j < UserToken.length  ; j++){
          if (UserToken[j].key == JSON.parse(UserInfo).userid){
            if(UserToken.length == 1){
              setSelectedDate('DD-MM-YYYY');
              setSelectedTime('HH:MM');
              setStackHolder(null);
              setVenue(null);
              setComments(null);
              GetMeeting();
              setopacity(1);
              setLocationmodal(false);
              setLoading(false);
              setPID(null)
              setUserToken([])
              setEditMeetingModal(true)

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
                  "title": "Meeting Edit By " + JSON.parse(UserInfo).userfullname,
                  "body": "For project " + PID
              },
              "data" : {
                "userid" : JSON.parse(UserInfo).userid,
                "status" : "meeting"
              },
              "to": UserToken[j].token

            })
            }).then((response) => response.json())
            .then((json) => {
              /////////////////////////////////////////////////////////
              
              fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "user_id" : UserToken[j].key,
              "title": "Meeting Edit By " + JSON.parse(UserInfo).userfullname,
              "body": "For project " + PID,
              "status" : "meeting"
            })
            }).then((response) => response.text())
          .then((text) => {
            console.log('+++>',text)
            setSelectedDate('DD-MM-YYYY');
              setSelectedTime('HH:MM');
              setStackHolder(null);
              setVenue(null);
              setComments(null);
              GetMeeting();
              setopacity(1);
              setLocationmodal(false);
              setLoading(false);
              setPID(null)
              setUserToken([])
              setEditMeetingModal(true)
            
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
          .catch(error => {
            console.error(error);
            // Alert.alert("","Please check your internet connection!")
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

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

  if (Loading == true) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <ActivityIndicator size="large" color="#f8ae4e" />
      </View>
    );
  } else if (Meeting.length == 0) {
    return (
      <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 300, width: 300}}
            source={require('../Images/NoMeeting.png')}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            height: '100%',
            width: '100%',
          }}
        />
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            alignItems: 'center',
          }}>
          <ScrollView
            style={{height: '100%', width: '100%', opacity: opacity}}
            showsVerticalScrollIndicator={false}>
            {/* <Image
                style={{width: 250, height: 50, marginTop: 20, alignSelf: 'center'}}
                source={require('../Images/PWLOGO2.png')}
            /> */}

            <View
              style={{
                marginLeft: 41,
                marginRight: 41,
                borderRadius: 30,
                backgroundColor: '#fff',
                elevation: 10,
                marginTop: 20,
                borderRadius: 5,
              }}>
              <TextInput
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  marginRight: 20,
                  color: '#000',
                  paddingRight: 10,
                  justifyContent: 'center',
                  height: 50,
                  backgroundColor: '#fff',
                }}
                placeholder="Search..."
                theme={{
                  colors: {
                    primary: '#f8ae4e',
                    placeholder: 'grey',
                    text: '#000',
                  },
                }}
                selectionColor="#000"
                value={Search}
                onChangeText={text => findMeeting(text)}
                keyboardType="visible-password"
              />
              <AntDesign
                name={'search1'}
                size={25}
                color={'#000'}
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  top: 15,
                  right: 10,
                }}
              />
            </View>

            <FlatList
              scrollEnabled={true}
              style={{
                marginTop: 15,
                width: '80%',
                alignSelf: 'center',
                marginBottom: 10,
              }}
              data={Meeting}
              keyExtractor={item => item.Id}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 5,
                      elevation: 5,
                      marginBottom: 5,
                      marginLeft: 5,
                      marginRight: 5,
                      marginTop: 5,
                      borderWidth: 1,
                      borderColor: '#f8ae43',
                      borderLeftWidth: 5,
                    }}>

                    <TouchableOpacity 
                    // onPress={()=>console.log(item.ProjectId)}
                    onPress={()=>{
                      setTeamModal(true)
                      setTeamProjectId(item.ProjectId)
                      ViewTeam(item.ProjectId)
                      }}
                    style={{height: 35, width: 35, borderRadius: 17, position: 'absolute', alignSelf: 'flex-end', right: 10, top: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <MaterialCommunityIcons name={"account-group-outline"} size={30} color={'#000'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>ShowDetail(item)}
                      style={{
                        width:'80%',
                        marginLeft: 5,
                      }}>
                      <View
                        style={{
                          marginLeft: 10,
                          alignSelf: 'center',
                          width: '90%',
                        }}>
                        {item.OwnerName == '' ? (
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Karla-Bold',
                              fontSize: 18,
                              color: '#f8ae4e',
                              paddingTop: 10,
                              paddingRight: 10,
                            }}>
                            {item.Architect}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: '#000',
                              fontFamily: 'Karla-Bold',
                              fontSize: 18,
                              color: '#f8ae4e',
                              paddingTop: 10,
                              paddingRight: 10,
                            }}>
                            {item.OwnerName}
                          </Text>
                        )}
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Karla-Bold',
                            paddingRight: 10,
                          }}>
                          {item.ScoutType} ({item.ProjectId})
                        </Text>
                        <Text
                          style={{
                            color: 'grey',
                            fontFamily: 'Karla-Bold',
                            paddingRight: 10,
                          }}>
                          {item.Location}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Karla-Bold',
                            paddingRight: 10,
                          }}>
                          {moment(item.Meeting_Date).format('DD-MM-YYYY')}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: 'Karla-Bold',
                            paddingRight: 10,
                            paddingBottom: 10,
                          }}>
                          {item.Meeting_Time}
                        </Text>
                      </View>

                      {/* <TouchableOpacity                     
                    style={{justifyContent: 'center'}}>
                    <AntDesign name={"arrowright"} size={30} color={'#000'} style={{right: 10}} />
                    </TouchableOpacity> */}
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          // if (
                          //   moment().format('YYYY-MM-DD') +
                          //     ' ' +
                          //     moment().format('hh:mm A') >=
                          //   item.Meeting_Date + ' ' + item.Meeting_Time
                          // ) {
                            if(moment().format('YYYY-MM-DD') >= item.Meeting_Date){
                            if (item.ScoutType == 'Market') {
                              const PinLocation = item.PinLocation.split(', ');
                              navigation.navigate('MEETINGDETAIL', {
                                ClientName: item.OwnerName,
                                ProjectType: item.ScoutType,
                                ClientNumber: item.OwnerContactNumber,
                                MeetingID: item.Id,
                                Latitude: PinLocation[0],
                                Longitude: PinLocation[1],
                              });
                            } else {
                              const PinLocation = item.PinLocation.split(', ');
                              navigation.navigate('MEETINGDETAIL', {
                                ClientName: item.Architect,
                                ProjectType: item.ScoutType,
                                ClientNumber: item.ArchitectPhoneNo,
                                MeetingID: item.Id,
                                Latitude: PinLocation[0],
                                Longitude: PinLocation[1],
                              });
                            }
                          } else {
                            Alert.alert(
                              'Meeting Date ' +
                                moment(item.Meeting_Date).format('DD-MM-YYYY'),
                              'You cannot start the meeting before the scheduled date.',
                            );
                          }
                        }}
                        style={{
                          height: 30,
                          width: '40%',
                          backgroundColor: '#f8ae4e',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>
                          Start Meeting
                        </Text>
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
                             
                                setProjectID(item.Id);
                                setSelectedDate(item.Meeting_Date);
                                setSelectedTime(item.Meeting_Time);
                                setPID(item.ProjectId)
                                setStackHolder(item.Stack_Holder);
                                setVenue(item.Vanue);
                                setComments(item.Meeting_Comment);
                                setopacity(0.5);
                                setLocationmodal(true);
                            //////////////////////////////////
                          })
                          .catch(error => {
                            console.error(error);
                          });                 
                        }}
                        style={{
                          height: 30,
                          width: '40%',
                          backgroundColor: '#f8ae4e',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>
                          Edit Meeting
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={Locationmodal}>
            <View
              style={{
                height: 460,
                marginTop: 'auto',
                backgroundColor: '#fff',
                elevation: 10,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <View
                style={{alignItems: 'center', height: 400, marginTop: 'auto'}}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-start',
                    marginTop: 5,
                    marginLeft: 30,
                  }}
                  onPress={() => {
                    setProjectID(null);
                    setSelectedDate('DD-MM-YYYY');
                    setSelectedTime('HH:MM');
                    setStackHolder(null);
                    setVenue(null);
                    setComments(null);
                    setopacity(1);
                    setPID(null)
                    setUserToken([])
                    setLocationmodal(false);
                  }}>
                  <MaterialCommunityIcons name={'close'} size={25} />
                </TouchableOpacity>

                <View style={{marginTop: 50}}>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      height: 55,
                      width: 300,
                      borderWidth: 1,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 5,
                      borderColor: 'grey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontFamily: 'Karla-Bold', color: 'grey'}}>
                      {SelectedDate}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      position: 'absolute',
                      backgroundColor: '#fff',
                      marginLeft: 20,
                      color: 'grey',
                      fontSize: 13,
                      bottom: 47,
                    }}>
                    {' '}
                    Select Date *{' '}
                  </Text>
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
                    style={{
                      height: 55,
                      width: 300,
                      borderWidth: 1,
                      marginLeft: 10,
                      marginRight: 10,
                      borderRadius: 5,
                      borderColor: 'grey',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontFamily: 'Karla-Bold', color: 'grey'}}>
                      {SelectedTime}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      position: 'absolute',
                      backgroundColor: '#fff',
                      marginLeft: 20,
                      color: 'grey',
                      fontSize: 13,
                      bottom: 47,
                    }}>
                    {' '}
                    Select Time *{' '}
                  </Text>
                </View>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />

                <View style={{marginTop: 7}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginLeft: 10,
                      marginRight: 10,
                      width: 300,
                      justifyContent: 'center',
                      height: 55,
                    }}
                    keyboardType="visible-password"
                    theme={{
                      colors: {
                        primary: '#f8ae4e',
                        placeholder: 'grey',
                        text: '#000',
                      },
                    }}
                    selectionColor="#000"
                    mode="outlined"
                    label="Stakeholder"
                    value={StackHolder}
                    onChangeText={text => setStackHolder(text)}
                  />
                </View>

                <View style={{marginTop: 7}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginLeft: 10,
                      marginRight: 10,
                      width: 300,
                      justifyContent: 'center',
                      height: 55,
                    }}
                    keyboardType="visible-password"
                    theme={{
                      colors: {
                        primary: '#f8ae4e',
                        placeholder: 'grey',
                        text: '#000',
                      },
                    }}
                    selectionColor="#000"
                    mode="outlined"
                    label="Venue"
                    value={Venue}
                    onChangeText={text => setVenue(text)}
                  />
                </View>

                <View style={{marginTop: 7}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginLeft: 10,
                      marginRight: 10,
                      width: 300,
                      justifyContent: 'center',
                      height: 55,
                    }}
                    keyboardType="visible-password"
                    theme={{
                      colors: {
                        primary: '#f8ae4e',
                        placeholder: 'grey',
                        text: '#000',
                      },
                    }}
                    selectionColor="#000"
                    mode="outlined"
                    label="Comment"
                    value={Comments}
                    onChangeText={text => setComments(text)}
                  />
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => EditMeeting()}
                  style={{
                    width: '100%',
                    backgroundColor: '#f8ae4e',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightColor: '#fff',
                    borderRightWidth: 0.5,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 23,
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={EditMeetingModal}>
            <View
            style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
            >

            <View style={{width: 300, height: 200, backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly'}}>

            <Feather name={"check-square"} color={"green"} size={50} style={{marginTop: 10}} />

            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingBottom: 5, fontSize: 16}}>Meeting Edit Successfully</Text>

            <TouchableOpacity
            onPress={()=>setEditMeetingModal(false)}
            style={{backgroundColor: '#f8ae4e', width: 130, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 10}}
            >
              <Text style={{fontFamily:'Karla-Bold', color: '#fff',padding: 7}}>OK</Text>
            </TouchableOpacity>

            </View>

            </View>
            </Modal>

            <Modal
            animationType="slide"
            transparent={true}
            visible={TeamModal}>
            <View
            style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}
            >

            <View style={{width: 300, backgroundColor: '#fff', elevation: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 20}}>

            <View style={{backgroundColor: '#f8ae43', height: 40, width: 300, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', fontSize: 20}}>TEAM</Text>
            </View>

            <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingBottom: 5, fontSize: 16}}>ProjectID: {TeamProjectId}</Text>

            { (TeamData.length == 0) ?
              <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingBottom: 20}}>Fetching Team Members...</Text>
            :
            <ScrollView style={{alignSelf: 'center', marginBottom: 10, marginTop: 10}}>
            {TeamData.map((item, index)=>(
              <View key={index}>
                <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, fontSize: 16, textAlign: 'center'}}>{item.EmployeeName}</Text>
              </View>
            ))}
            </ScrollView>
            }
            

            <TouchableOpacity
            onPress={()=>{
              setTeamModal(false)
              setTeamProjectId(null)
              setTeamData([])
              }}
            style={{backgroundColor: '#f8ae4e', width: 130, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 10}}
            >
              <Text style={{fontFamily:'Karla-Bold', color: '#fff',padding: 7}}>Close</Text>
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

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ContactPersonName}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Contact Person Name </Text>
        </View>

        <View style={{borderColor: '#000', borderWidth:1, height: 50, borderRadius: 5, marginTop: 15, marginLeft: 10, marginRight: 10, justifyContent: 'center'}}>
        <Text style={{color: 'grey', paddingLeft: 15}}>{ContactPersonPhoneNumber}</Text>
        <Text style={{position: 'absolute', bottom: 42, backgroundColor: '#ededed', marginLeft: 10, fontSize: 12}}> Contact Person Phone Number </Text>
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
    );
  }
};

export default MeetingListScreen;
