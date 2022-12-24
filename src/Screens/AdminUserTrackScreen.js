import React, {useEffect, useState, useRef, createRef} from 'react'
import {View, Text, Image,ToastAndroid, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal, Platform, Linking, FlatList, BackHandler, Dimensions} from 'react-native'
import BottomTab from '../Components/BottomTab'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Geolocation from "react-native-geolocation-service"
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Animated, { Value } from 'react-native-reanimated'
import Carousel from 'react-native-snap-carousel'
import Autocomplete from 'react-native-autocomplete-input'
import avatar from './ProfileAvatar'

const AdminUserTrackScreen = ({ navigation }) => {


  useEffect(() => { 
    
      CurrentLocation()
       getAllUserLocation()
       getMeeting()

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


          const {width, height} = Dimensions.get("window")
          const CARD_WIDTH = width * 0.8
          const map = React.createRef()

          const [CallOutRef, setCallOutRef] = useState([])

          const CarouselRef = React.createRef()
          const [SelectedMarker, setSelectedMarker] = useState(0)

          const [PersonSearch, setPersonSearch] = useState(null)

          const [UserLoc, setUserLoc] = useState({latitude: null, latitudeDelta: null, longitude: null, longitudeDelta: null})
          const [InitialRegion, setInitialRegion ] = useState({latitude: null, latitudeDelta: null, longitude: null, longitudeDelta: null})
          var [AllUserData, setAllUserData] = useState([])
          var [FilteredUser, setFilteredUser] = useState([]);
          var [SelectedUser, setSelectedUser] = useState({})
          var [AllUserMasterData, setAllUserMasterData] = useState([])
          var [Loading, setLoading] = useState(false) 

          var [UserModal, setUserModal] = useState(false)
          var [UserId, setUserId] = useState(null)
          var [UserName, setUserName] = useState(null)
          var [UserPhone, setUserPhone] = useState(null)
          var [LastUpdate, setLastUpdate] = useState(null)
          var [UserToken, setUserToken] = useState(null)

          const [Meeting, setMeeting] = useState([])
          const [Search, setSearch] = useState('')
          const [SearchMeeting, setSearchMeeting] = useState([])
          const [MeetingModal, setMeetingModal] = useState(false)

          const [User, setUser] = useState(null)
          const [UID, setUID] = useState(null)

          const findUser = (query) => {
            if (query) {
              const regex = new RegExp(`${query.trim()}`, 'i');
                setFilteredUser(AllUserData.filter((item) => item.username.search(regex) >= 0))
            } else {
              setFilteredUser([]);
            }
          };

            const onCardChange = (index) => {
              let location = AllUserData[index]
              map.current.animateToRegion({ // Takes a region object as parameter
                latitude: location.lat, 
                latitudeDelta: 0.0018351870686323934, 
                longitude: location.long, 
                longitudeDelta: 0.0010001286864138592
            },1000)
              CallOutRef[index].showCallout()
            }

            const onSearchPerson = (location, index) => {
              for(let i = 0 ; i < AllUserData.length ; i++){
                if(AllUserData[i].key  == location.key){
                  setUserLoc({
                    latitude: location.lat, 
                    latitudeDelta: 0.0018351870686323934, 
                    longitude: location.long, 
                    longitudeDelta: 0.0010001286864138592
                  })
                  CallOutRef[i].showCallout()
                  CarouselRef.current.snapToItem(i)                  
                }
              }
            }

            const OnMarkerPress = (location, index) => {
              map.current.animateToRegion({ // Takes a region object as parameter
                latitude: location.lat, 
                latitudeDelta: 0.0018351870686323934, 
                longitude: location.long, 
                longitudeDelta: 0.0010001286864138592
            },1000)
              CarouselRef.current.snapToItem(index)

            }


            const getAllUserLocation = async()=> {
              
              const subscriber = firestore()
              .collection('Users')
              .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                  users.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                  });
                });
                setAllUserData(users);
                setAllUserMasterData(users);
                setLoading(false);
              });

            return () => subscriber();
            }      

          const CurrentLocation = async() => {
            Geolocation.getCurrentPosition(
              position => {
                setUserLoc({latitude: position.coords.latitude,latitudeDelta: 0.11, longitude: position.coords.longitude, longitudeDelta: 0.11})
                setInitialRegion({latitude: position.coords.latitude, latitudeDelta: 0.11, longitude: position.coords.longitude, longitudeDelta: 0.11})
              },
              error => {
                Alert.alert("",error.message.toString());
                setLoading(false)
              },
              {
                showLocationDialog: true,
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
              }
            );
          }

          const getMeeting = async() => {
            setLoading(true)
          try {
              const UserInfo = await AsyncStorage.getItem('UserInfo')
              setUser(JSON.parse(UserInfo).userfullname)
              setUID(JSON.parse(UserInfo).userid)
              fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/Get_setmeetingApi.php',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "meetingsetbyid" : JSON.parse(UserInfo).userid,
          })
          }).then((response) => response.json())
          .then((josn) => {
            setMeeting(josn)
            setSearchMeeting(josn)
          })
          .catch((error) => {
            console.error(error);
          });
          } catch (error) {
              console.log(error)
          }
      }


      const findMeeting = (text) => {
        if (text) {
          const regex = new RegExp(`${text.trim()}`, 'i');
            if(Meeting.filter((architect) => architect.Architect.search(regex) >= 0).length != 0){
              setMeeting(Meeting.filter((architect) => architect.Architect.search(regex) >= 0))
              setSearch(text)
            }
            else if(Meeting.filter((architect) => architect.OwnerName.search(regex) >= 0).length != 0){
              setMeeting(Meeting.filter((architect) => architect.OwnerName.search(regex) >= 0))
              setSearch(text)
            }
            // else if(Meeting.filter((architect) => architect.City.search(regex) >= 0).length != 0){
            //   setMeeting(Meeting.filter((architect) => architect.City.search(regex) >= 0))
            //   setSearch(text)
            // }
            // else if(Meeting.filter((architect) => architect.Area.search(regex) >= 0).length != 0){
            //   setMeeting(Meeting.filter((architect) => architect.Area.search(regex) >= 0))
            //   setSearch(text)
            // }
            // else if(Meeting.filter((architect) => architect.ScoutType.search(regex) >= 0).length != 0){
            //   setMeeting(Meeting.filter((architect) => architect.ScoutType.search(regex) >= 0))
            //   setSearch(text)
            // }
            else{
              setMeeting(SearchMeeting)
              setSearch(text)
              ToastAndroid.show("No meeting found", ToastAndroid.SHORT)
            }          
        } else {
          setMeeting(SearchMeeting)
          setSearch(text)
        }
      };

          const Makecall = (number) =>{
            let phonenumber = '';
            if(Platform.OS === 'android'){
                phonenumber = 'tel:$'+number;
            } else{
                phonenumber = 'telprompt:$'+number
            }
            Linking.openURL(phonenumber);
        };


              const HandShakeMeeting = async(ProjectId, Date, Time, meeting) => {
              setLoading(true)
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/SendHandShakeReqApi.php',{
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({

                "projectid" : ProjectId,
                "employeeid" : UserId,
                "senderid" : UID,
                "requeststatus" : "Pending",
                "meetingwith" : meeting,
                "meetingdate": Date,
                "meetingtime": Time

            })
            }).then((response) => response.text())
            .then((text) => {
              console.log('>>>>>>>>>>>>>',text);
              if(text == 'Handshake request already sent'){
                setMeetingModal(false)
                setLoading(false)
                Alert.alert("","Already sent Hand-Shake request")
              }
              else if(text == 'Already alloted to this employee'){
                setMeetingModal(false)
                setLoading(false)
                Alert.alert("","This person is already in your team.")
              }
              else{

                ///////////////////////////////////////
              fetch('https://fcm.googleapis.com/fcm/send',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "key=AAAAVSUcVXQ:APA91bH7OYYts_0JMkq7EtGa6kqBdIcUhFjt56A1SRJmKpdJUeWmjPg_kLjAdGCNdkC1EdxE-kOdjiS9958VWsvkUXqVq0BeCHu5iAFtdM7zUF3DqSOjGARirDmmJ0PoCKLVC5AsuTXR"
                },
                body: JSON.stringify({
  
                  "notification": {
                    "title": "Hand-Shake request for meeting",
                    "body": User + " wants to HAND-SHAKE with You for the meeting at "+ Time + " on " + Date
                },
                "data" : {
                  "userid" : UserId,
                  "status" : "hand-shake"
                },
                "to": UserToken
  
              })
              }).then((response) => response.json())
              .then((json) => {
                ///////////////////////////////////////////////
  
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
                  method: 'POST',
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "user_id" : UserId,
                    "title": "Hand-Shake Request",
                    "body": User + " wants to HAND-SHAKE with You for the meeting at "+ Time + " on " + Date,
                    "status" : "hand-shake"
                  })
                  }).then((response) => response.text())
                .then((text) => {
                  console.log('+++>',text)
                  Alert.alert("","Hand-Shake request sent successfully")
                  setMeetingModal(false)
                  setUserId(null)
                  setUserName(null)
                  setUserPhone(null)
                  setLastUpdate(null)
                  setLoading(false)
                })
                    .catch((error) => {
                    console.error(error);
                    setLoading(false)
                })            
                ///////////////////////////////////////////////
              })
              .catch((error) => {
                console.error(error);
                setLoading(false)
              })
              /////////////////////////////////////////////

              }
                  
            })
            .catch((error) => {
              console.error(error);
              setLoading(false)
            })
          }

    if ( (Loading == true ) || (UserLoc.latitude == null) || (UserLoc.longitude == null) || (InitialRegion.latitude == null) || (InitialRegion.longitude == null) ){
      return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            size="large"
            color="#f8ae4e"
          />
        </View>
      )
    }
      
    else{
    return(
        
        <View style={{height: '100%', width: '100%'}}>
        <View>
        <MapView
              ref={map}
              showsUserLocation = {true}
              followsUserLocation = {true}
              provider={PROVIDER_GOOGLE}
              style={{width: '100%', height: '100%'}}
              initialRegion={InitialRegion}
              region={UserLoc}
              onRegionChange={(Loc)=>{
                Loc.latitude = UserLoc.latitude
                Loc.latitudeDelta = UserLoc.latitudeDelta
                Loc.longitude = UserLoc.longitude
                Loc.longitudeDelta = UserLoc.longitudeDelta
              }}
              showsMyLocationButton= {true}
              // onMapReady={()=>setBottom(0)}
            >

            {AllUserData.map((marker, index) =>(
            <Marker
             key={index}
             ref={ref=>CallOutRef[index] = ref}
             onPress={()=>OnMarkerPress(marker, index)}
             coordinate={{latitude: marker.lat, longitude: marker.long}}
            //  image={require('../Images/user.png')}
            //  image={{uri: avatar}}
            >
            <Image
            source={{uri: marker.userimage == '' ? avatar : marker.userimage}}
            style={{width: 60, height: 60, borderRadius: 30, borderColor: '#000', borderWidth: 1}}
            // resizeMode="contain"
            />
              {/* <Callout>
                  <Text style={{fontFamily: 'Karla-Bold', color: 'grey', paddingBottom: 5, textAlign: 'center'}}>{marker.username}</Text>
                  <Text style={{fontFamily: 'Karla-Bold', color: 'grey', paddingBottom: 5, textAlign: 'center'}}>Last Seen: {marker.time}</Text>
              </Callout> */}
            </Marker>
  ))}

            </MapView>
        </View>
        
        <View style={{position: 'absolute',height: '100%', width: '100%'}}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("ADMIN")}
        style={{backgroundColor: '#fff', elevation: 10, marginLeft: 10, marginTop: 12, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 40, height: 40, borderRadius: 10}}>
        <FontAwesome name={"angle-left"} size={35} color={'#000'} style={{marginRight: 4, marginBottom: 2.5}}/>
        </TouchableOpacity>

        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, backgroundColor: '#fff', borderRadius: 5}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5, width: '70%', alignSelf: 'center', marginTop: 5 }}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff', width: '65%', alignSelf: 'center'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredUser}
          defaultValue={
            JSON.stringify(SelectedUser) === '{}' ?
            '' :
            SelectedUser.username
          }
         onChangeText={(text) => findUser(text)}
          placeholder="Search"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.userid,
        renderItem: ({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedUser(item)
                setFilteredUser([])
                onSearchPerson(item, index)
                
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.username}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        <TouchableOpacity 
        onPress={()=>CurrentLocation()}
        style={{backgroundColor: '#fff', elevation: 10, marginTop: 12, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 40, height: 40, borderRadius: 10, alignSelf: 'flex-end', right: 10}}>
        <MaterialIcons name={"my-location"} size={25} color={'#000'} />
        </TouchableOpacity>

        </View>

        <View
        style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end', bottom: 10}}
        >

        <Carousel
              data={AllUserData}
              ref={CarouselRef}
              initialScrollIndex={SelectedMarker}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={CARD_WIDTH}
              onSnapToItem={(index)=>onCardChange(index)}
              removeClippedSubviews={false}
              renderItem={({ item, index })=>{
              return(
                <View 
                  style={{
                       backgroundColor: "#FFF",
                       height: 100,
                       width: CARD_WIDTH,
                       borderRadius: 20,
                       alignItems: 'center',
                       justifyContent: 'center',
                       borderWidth: 3,
                       borderColor: '#f8ae4e'
                     }}
                  >

                    <View style={{width: '95%', alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Karla-Bold', textAlign: 'center'}}>{item.username}</Text>
                    <Text style={{fontFamily: 'Karla-Bold', textAlign: 'center'}}>{item.usernumber}</Text>
                    <Text style={{fontFamily: 'Karla-Bold', textAlign: 'center'}}>Last Seen: {item.time}</Text>

                    </View>

                  {/* <View style={{width: '100%', flexDirection: 'row'}}>

                  <TouchableOpacity
                  onPress={()=>{
                    if(UID == item.userid){
                      Alert.alert("","You cannot Hand-Shake with yourself.")
                    }
                    else{
                      setMeetingModal(true)
                      setUserId(item.userid)
                      setUserToken(item.token)
                    }
                  }}
                  style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}
                  >
                    <FontAwesome5 name={"handshake"} size={21} color="#6d78fa" />
                    <Text style={{color: '#6d78fa', fontFamily: 'Karla-Bold', paddingBottom: 5}}>HAND-SHAKE</Text>
                  </TouchableOpacity>
                
                  <TouchableOpacity
                  onPress={()=>Makecall(item.usernumber)}
                  style={{ width: '50%', alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderColor: 'lightgrey'}}
                  >
                    <Feather name={"phone-call"} size={21} color="#328e10" />
                    <Text  style={{color: '#328e10', fontFamily: 'Karla-Bold', paddingBottom: 5}}>CALL</Text>
                  </TouchableOpacity>

                  </View> */}

                  </View>
                      )
                    }}
            />

        </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={MeetingModal}
        >
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>setMeetingModal(false)}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Select Meeting</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
        </View>

        { (Meeting.length !== 0) ?  
        <View style={{marginLeft: 41, marginRight: 41, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 20, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10, justifyContent: 'center', height: 50, backgroundColor: '#fff'}}
                placeholder="Search..."
                placeholderTextColor="grey" 
                value={Search}
                onChangeText={text=>findMeeting(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={25} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 15, right: 10 }}/>    
            </View> : null }

        { (Meeting.length !== 0) ?
        <FlatList
            style={{marginTop: 15, width: '80%', alignSelf: 'center', marginBottom: 10}}
            data={Meeting}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <TouchableOpacity 
               onPress={()=>HandShakeMeeting(item.ProjectId, item.Meeting_Date, item.Meeting_Time, item.Stack_Holder)}
                style={{backgroundColor: '#fff', borderRadius: 5, elevation: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, marginTop: 5, borderWidth: 1, borderColor: '#f8ae43', borderLeftWidth: 5}}>
                <View style={{flexDirection: 'row', marginLeft: 5, justifyContent: 'space-between'}}>

                    <View style={{marginLeft: 10, alignSelf: 'center', width: '90%'}}>
                    { (item.OwnerName == "") ?
                    <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e', paddingTop: 10, paddingRight: 10}}>{item.Architect}</Text>
                    :
                    <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e', paddingTop: 10, paddingRight: 10}}>{item.OwnerName}</Text>
                    }
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', paddingRight: 10}}>{item.ScoutType}</Text>
                    <Text style={{fontFamily: 'Karla-Bold', color: 'grey', paddingRight: 10}}>{item.Location}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', paddingRight: 10}}>{item.Meeting_Date}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', paddingRight: 10, paddingBottom: 10}}>{item.Meeting_Time}</Text>
                    </View>

                </View>

                </TouchableOpacity>
            )
        }}
      /> : 
      
      <View  style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoMeeting.png')}
            />
      </View>
      }

        </View>
        </Modal>

        </View>
    )
  }
}

export default AdminUserTrackScreen;