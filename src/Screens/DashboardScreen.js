import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler, Alert, Modal, PermissionsAndroid, ActivityIndicator} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import BottomTab from '../Components/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service"
import firestore, { firebase } from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging'
import moment from 'moment'
import PushNotification from "react-native-push-notification"

const DashboardScreen = ({ navigation }) => {

    const [Admin, setAdmin] = useState(null)
    const [modalVisible, setmodalVisible] = useState(false)
    const [ProjectTypemodal, setProjectTypemodal] = useState(false)
    const [opacity, setopacity] = useState(1)
    const [CurrentTime, setCurrentTime] = useState(moment().format('DD-MMM-YY hh:mm A'))
    const [Today, setToday] = useState(moment().format('YYYY-MM-DD'))
    const [Loading, setLoading] = useState(false)
    const [HandShakeReqModal, setHandShakeReqModal] = useState(false)
    const [AllRequest, setAllRequest] = useState([])
    const [NotificationCount, setNotificationCount] = useState(0)

    // const [UserId, setUserId] = useState(null)
    // const [UserName, setUserName] = useState(null)
    // const [UserPhone, setUserPhone] = useState(null)

    useEffect(()=>{
    GetMeeting()
      setInterval(() => {
        getUser()
      }, 10000);
        navigation.addListener('focus',()=>{
            GetUserInfo()
            getNotificationCount()
            FetchHandShakeRequest()
          })
          const unsubscribe = NetInfo.addEventListener(state => {
            if( state.isInternetReachable == false){
              setmodalVisible(true)
            }
            else{
              setmodalVisible(false)
            }
            //console.log("Is Reachable?", state.isInternetReachable);
          });

          navigation.addListener('focus',()=>{
            const backAction = () => {
                Alert.alert("", "Are you sure you want to exit?", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
              ]);
              return true;
            };
        
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
        
            return () => backHandler.remove();
          })
          
    }, []);



    const getNotificationCount = async() => {
       try {
           const UserInfo = await AsyncStorage.getItem('UserInfo')
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetUnreadCount.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
              userid : JSON.parse(UserInfo).userid,
       })
       }).then((response) => response.json())
       .then((josn) => {
         console.log('====>', josn);
         setNotificationCount(josn)
       })
       .catch((error) => {
         console.log(error);
       });
       } catch (error) {
           console.log(error)
       }    
     }

    const FetchHandShakeRequest = async() => {
      
      setLoading(true);
    try {
      const UserInfo = await AsyncStorage.getItem('UserInfo');
      console.log(UserInfo);
      fetch(
        'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetHandShakeReqApi.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             employeeid : JSON.parse(UserInfo).userid
           // employeeid : 67
          }),
        },
      )
        .then(response => response.json())
        .then(josn => {
          console.log(josn)
          if(josn.length == 0){
            console.log('no request')
            setLoading(false)
          }
          else{
            setAllRequest(josn)
            setHandShakeReqModal(true)
            setLoading(false)
          }
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    }

    const HandShakeAccept = async(Status, item) => {
        setLoading(true)
        try {
          const UserInfo = await AsyncStorage.getItem('UserInfo');
           const users = [];
           firestore()
           .collection('Users')
           .where('userid', '==', item.SenderId)
           .get()
           .then((querySnapshot) => {
           querySnapshot.forEach(documentSnapshot => {
           users.push({
           ...documentSnapshot.data(),
           key: documentSnapshot.id,
           });
         });
         ////////////////////////////////////////
         console.log(users[0].token)
         fetch(
          'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HandShakeAcceptApi.php',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: item.Id, 
              employeeid: item.EmployeeId,
              projectid: item.ProjectId,
              requeststatus: Status              
            }),
           },
          )
          .then(response => response.text())
          .then(txt => {
            console.log(txt)
            ////////////////////Notification/////////////////////////
          fetch('https://fcm.googleapis.com/fcm/send',{
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization" : "key=AAAAVSUcVXQ:APA91bH7OYYts_0JMkq7EtGa6kqBdIcUhFjt56A1SRJmKpdJUeWmjPg_kLjAdGCNdkC1EdxE-kOdjiS9958VWsvkUXqVq0BeCHu5iAFtdM7zUF3DqSOjGARirDmmJ0PoCKLVC5AsuTXR"
              },
              body: JSON.stringify({

                "notification": {
                  "title": "Hand-Shake request " + Status + " by " + JSON.parse(UserInfo).userfullname,
                  "body": "For project " + item.ProjectId
              },
              "data" : {
                "userid" : item.EmployeeId,
                "status" : "hand-shake-accept"
              },
              "to": users[0].token

            })
            }).then((response) => response.json())
            .then((json) => {
              console.log(json)
              ///////////////////////////////////////////////////

              fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "user_id" : users[0].key,
                  "title": "Hand-Shake request " + Status + " by " + JSON.parse(UserInfo).userfullname,
                  "body": "For project " + item.ProjectId,
                  "status" : "hand-shake-accept"
                })
                }).then((response) => response.text())
              .then((text) => {
                console.log('+++>',text)
                if(AllRequest.length == 1){
                  setHandShakeReqModal(false)
                }
                FetchHandShakeRequest()
                setLoading(false)
                
              })
                  .catch((error) => {
                  console.error(error);
              })

              //////////////////////////////////////////////////                          
            })
            .catch((error) => {
              console.error(error);
              setLoading(false)
            })
        ////////////////////Notification/////////////////////////
            
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          })
            ////////////////////////////////////////////
        });
      } catch (error) {
        console.log(error)
        setLoading(false)
      }                       
    }


    const HandShakeReject = async(Status, item) => {
      setLoading(true)
      try {
        const UserInfo = await AsyncStorage.getItem('UserInfo');
         const users = [];
         firestore()
         .collection('Users')
         .where('userid', '==', item.SenderId)
         .get()
         .then((querySnapshot) => {
         querySnapshot.forEach(documentSnapshot => {
         users.push({
         ...documentSnapshot.data(),
         key: documentSnapshot.id,
         });
       });
       ////////////////////////////////////////
       console.log(users[0].token)
       fetch(
        'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HandShakeRejectApi.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: item.Id,
            requeststatus: Status              
          }),
         },
        )
        .then(response => response.text())
        .then(txt => {
          console.log(txt)
          ////////////////////Notification/////////////////////////
        fetch('https://fcm.googleapis.com/fcm/send',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "key=AAAAVSUcVXQ:APA91bH7OYYts_0JMkq7EtGa6kqBdIcUhFjt56A1SRJmKpdJUeWmjPg_kLjAdGCNdkC1EdxE-kOdjiS9958VWsvkUXqVq0BeCHu5iAFtdM7zUF3DqSOjGARirDmmJ0PoCKLVC5AsuTXR"
            },
            body: JSON.stringify({

              "notification": {
                "title": "Hand-Shake request " + Status + " by " + JSON.parse(UserInfo).userfullname,
                "body": "For project " + item.ProjectId
            },
            "data" : {
              "userid" : item.EmployeeId,
              "status" : "hand-shake-reject"
            },
            "to": users[0].token

          })
          }).then((response) => response.json())
          .then((json) => {
            //console.log(json)
            ///////////////////////////////////////////////////////

            fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "user_id" : users[0].key,
                  "title": "Hand-Shake request " + Status + " by " + JSON.parse(UserInfo).userfullname,
                  "body": "For project " + item.ProjectId,
                  "status" : "hand-shake-reject"
                })
                }).then((response) => response.text())
              .then((text) => {
                console.log('+++>',text)
                if(AllRequest.length == 1){
                  setHandShakeReqModal(false)
                }
                FetchHandShakeRequest()
                setLoading(false)
                
              })
                  .catch((error) => {
                  console.error(error);
              })

            //////////////////////////////////////////////////////                          
          })
          .catch((error) => {
            console.error(error);
            setLoading(false)
          })
      ////////////////////Notification/////////////////////////
          
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        })
          ////////////////////////////////////////////
      });
    } catch (error) {
      console.log(error)
      setLoading(false)
    }                           
  }
 
    const getUser = async() =>{
      try {
        const userData = await AsyncStorage.getItem('UserInfo')
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        TrackUser(userData, token)
      } catch (error) {
       console.log(error)
      } 
    }


    const TrackUser = async(userData, token) => {
      Geolocation.watchPosition(
        position => {
          //console.log(position.coords.latitude +","+ position.coords.longitude)
          fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GoogleMapMarkerApi.php',{
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
          "userid" : JSON.parse(userData).userid,
          "username" : JSON.parse(userData).userfullname,
          "usernumber" : JSON.parse(userData).phoneno,
          "lat" : position.coords.latitude,
          "long" : position.coords.longitude,
          "usertoken" : token
          })
        }).then((response) => response.text())
        .then((text) => {
          
          firestore()
  .collection('Users')
  .doc(JSON.parse(userData).userid)
  .get()
  .then(documentSnapshot => {
    //console.log('User exists: ', documentSnapshot.exists);
    if (documentSnapshot.exists) {
      firestore()
            .collection('Users')
            .doc(JSON.parse(userData).userid)
            .update({
                lat : position.coords.latitude,
                long : position.coords.longitude,
                time : CurrentTime,
                token: token
                })
            .then(() => {
              //console.log('User Updated!');
            });
    }
    else{
     firestore()
            .collection('Users')
            .doc(JSON.parse(userData).userid)
            .set({
                userid : JSON.parse(userData).userid,
                username : JSON.parse(userData).userfullname,
                usernumber : JSON.parse(userData).phoneno,
                lat : position.coords.latitude,
                long : position.coords.longitude,
                time : CurrentTime,
                token: token,
                userimage: ''
            })
            .then(() => {
              //console.log('User added!');
            });
    }
  });
          
  })
        .catch((error) => {
          console.error(error)
        });
        },
        error => {
          console.log(error);
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          distanceFilter: 0
        }
      );
    }

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission!",
              message:
                "Scouting needs access to your Location.",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigation.navigate("SCOUTING")
          } else {
            Alert.alert("","Location permission denied");
          }
        } catch (err) {
          console.log(err);
        }
      };


      const HandShake = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission!",
              message:
                "Scouting needs access to your Location.",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            navigation.navigate("HANDSHAKE")
          } else {
            Alert.alert("","Location permission denied");
          }
        } catch (err) {
          console.log(err);
        }
      };

    const GetUserInfo = async() => {
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            // console.log(JSON.parse(UserInfo))
            if(JSON.parse(UserInfo).userrole == 'Admin' || JSON.parse(UserInfo).userrole == 'Manager')
            {
                setAdmin('Admin or Manager')
            }
            else{
                setAdmin(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetMeeting = async() => {
     try {
         const UserInfo = await AsyncStorage.getItem('UserInfo')
         fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetMeetingNotificationDataApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({
     "meetingsetbyid" : JSON.parse(UserInfo).userid,
     })
     }).then((response) => response.json())
     .then((josn) => {
       console.log('===>',josn)
       //console.log('===>',new Date(josn[0].Meeting_Date))
         if(josn.length == 0){
           console.log(josn)
         }
         else{
           if(josn[0].OwnerName != ""){
             if(Today == josn[0].Meeting_Date){
               console.log('No Notification')
             }
             else{
              handleNotification(new Date(josn[0].Meeting_Date), josn[0].OwnerName, josn[0].Meeting_Time)
             }
        }
        else{
          if(Today == josn[0].Meeting_Date){
            console.log('No Notification')
          }
          else{
          handleNotification(new Date(josn[0].Meeting_Date), josn[0].Architect, josn[0].Meeting_Time)
          }
         }
         }
     })
     .catch((error) => {
       console.error(error);
      // Alert.alert("","Please check your internet connection!")
     });
     } catch (error) {
         console.log(error)
     }
 }

    const handleNotification = (date, name, time) => {
      console.log('++++>', date)
      console.log('++++>', name)
      console.log('++++>', time)
      // PushNotification.cancelAllLocalNotifications();

      // PushNotification.localNotification({
      //   channelId: "test-channel",
      //   message: "My Notification Message",
      //   date: new Date(Date.now() + (60 * 1000)),
      //   actions: ["ReplyInput"],
      //   reply_placeholder_text: "Write your response...",
      //   reply_button_text: "Reply"
      // })

      PushNotification.localNotificationSchedule({
        channelId: "test-channel",
        title: "Meeting Reminder",
        message: "Today you have meeting with "+name+" at "+time ,
        date: date,
        allowWhileIdle: true
      })
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
    } 
    else{
    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
            {/* <Image
            style={{width:  '100%', height: 200}}
                source={require('../Images/DBG1.jpg')}
            /> 
            <View style={{position: 'absolute', backgroundColor: 'rgba(45, 45, 45, 0.7)', height: "100%", width: '100%'}}/>*/}
            <View style={{height: '100%', width : '100%', position: 'absolute', alignItems: 'center'}}>
            <View style={{backgroundColor: '#fff', width: '100%', elevation: 10, height: 60, opacity: opacity}}>
            <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: 14, color: '#000'}}>HOME</Text>
            <TouchableOpacity
                //onPress={()=>handleNotification()}
                onPress={()=>navigation.navigate("NOTIFICATION")}
                style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 10, right: 20, height: 40, width: 35}}
            >
            <MaterialIcons name={"notifications-none"} size={35} color={'#000'} style={{marginTop: 4}} />

            { (NotificationCount == '0') ? null : 
            <View style={{height: 15, width: 15, borderRadius: 7.5, backgroundColor: 'red', alignSelf: 'flex-end', bottom: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#fff'}}>
            <Text style={{color: '#fff', fontSize: 8, fontFamily: 'Karla-Bold', bottom: 0.5}}>{NotificationCount}</Text>
            </View>
            }
            </TouchableOpacity>

            { Admin ? <TouchableOpacity
            //ALLREPORTS
                onPress={()=>navigation.navigate("ADMIN")}
                //onPress={()=>navigation.navigate("ALLSCOUTED")}
                style={{position: 'absolute', alignSelf: 'flex-start', marginTop: 10, left: 15}}
            >
            <MaterialCommunityIcons name={"account-cog-outline"} size={40} color={'#000'} style={{marginTop: 4}} />
            </TouchableOpacity> : null }
            
            </View>
            <ScrollView style={{ width: '100%', height: '100%', opacity: opacity}}
            showsVerticalScrollIndicator= {false}
            >
            <Image
                style={{width: 250, height: 50, marginTop: 20, alignSelf: 'center'}}
                source={require('../Images/PWLOGO2.png')}
            />
            <View style={{ width: '100%', alignSelf: 'center', marginTop: 10, marginBottom: 20, alignItems: 'center'}}>

            {/* <View style={{ alignItems: 'center', width: '100%', marginBottom: 30}}>
                <Text style={{fontSize: 12, color: '#696969'}}>There is no better way to understand the benefits of electrical</Text>
                <Text style={{fontSize: 12, color: '#696969'}}>products than seeing them in action at a</Text>
                <Text style={{fontSize: 12, color: '#696969'}}>Powerhouse Display Centers.</Text>
            </View> */}
            
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '95%'}}>

            <TouchableOpacity
            //onPress={()=>navigation.navigate("SCOUTING")}
            onPress={requestLocationPermission}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"clipboard-check-outline"} size={60} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>navigation.navigate("MEETING",{Screen: 'Alloted'})}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"map-marker-check-outline"} size={60} />
            </TouchableOpacity>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '95%'}}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Scouting</Text>
                <Text style={{fontFamily: 'Karla-Bold'}}>Project</Text>
                </View>
                
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Alloted</Text>
                <Text style={{fontFamily: 'Karla-Bold'}}>Locations</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '95%'}}>

            <TouchableOpacity
            onPress={()=>navigation.navigate("TOPTAB",{Screen: 'Meetings'})}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialIcons name={"people-outline"} size={60} />
            </TouchableOpacity>

            
            <TouchableOpacity
            onPress={HandShake}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', borderColor: 'grey'}}
            >
                <FontAwesome name={"handshake-o"} size={60} />
            </TouchableOpacity>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '95%'}}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Meetings</Text>
                </View>
                
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Hand</Text>
                <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Shake</Text>                
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '95%'}}>

            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("PLCATALOG")}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <FontAwesome name={"money"} size={60} />
            </TouchableOpacity>

            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>navigation.navigate("CATALOG")}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <FontAwesome name={"newspaper-o"} size={60} />
            </TouchableOpacity>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '95%'}}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Price List</Text>
                </View>
                
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Catalogs</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '95%'}}>

            <TouchableOpacity
            onPress={()=>navigation.navigate("RECURRINGMEETING",{Screen: 'RMeetings'})}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialIcons name={"loop"} size={65} />
            </TouchableOpacity>

            <TouchableOpacity
            //onPress={()=>Alert.alert("","Under Development")}
            onPress={()=>{
                setopacity(0.3)
                setProjectTypemodal(true)
                }}            
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"account-switch-outline"} size={60} />
            </TouchableOpacity>

            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '95%'}}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Recurring</Text>
                <Text style={{fontFamily: 'Karla-Bold'}}>Meetings</Text>
                </View>
                
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Referral</Text>
                <Text style={{fontFamily: 'Karla-Bold', color: '#000'}}>Project</Text>
                </View>
            </View>


            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '95%'}}>

            <TouchableOpacity
            onPress={()=>navigation.navigate("SERVICE")}
            style={{borderWidth: 1, borderColor: 'grey', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"file-document-edit-outline"} size={65} />
            </TouchableOpacity>

            <View
            //onPress={()=>Alert.alert("","Under Development")}
            style={{borderWidth: 1, borderColor: '#ebebeb', height: 120, width: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center'}}
            >
                <MaterialCommunityIcons name={"file-document-edit-outline"} size={65} color="#ebebeb" />
            </View>

            </View> */}

            {/* <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, width: '95%'}}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>Service/</Text>
                <Text style={{fontFamily: 'Karla-Bold'}}>Contracts</Text>
                </View> */}
                {/* Dummy Button */}
                {/* <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'Karla-Bold', color: '#ebebeb'}}>Service/</Text>
                <Text style={{fontFamily: 'Karla-Bold', color: '#ebebeb'}}>Contracts</Text>
                </View> */}
                {/* Dummy Button */}
            {/* </View> */}

            </View>
            
            </ScrollView>

            <View>
        <Modal
        animationType="slide"
        visible={modalVisible}  
        >

        <View style={{backgroundColor: '#fff', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        {/* <Image
          source={require('../Images/error.png')}
        /> */}
        <MaterialCommunityIcons name={"wifi-off"} size={100} color={"#f8ae4e"} />
          <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 20}}>No Internet Connection</Text>
        </View>

        </Modal>
        </View>

        <Modal
        animationType="slide"
        transparent={true}
        visible={ProjectTypemodal}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10}}>Select Project Type</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 25}}>
              <TouchableOpacity
              onPress={()=>{
                  setProjectTypemodal(false)
                  setopacity(1)
                  navigation.navigate("REFERRAL")
                  }}
              >
              <Entypo  name={"home"} size={50} color={"#f8ae4e"} />
              <Text style={{fontFamily: 'Karla-Bold'}}>Projects</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={()=>{
                  setProjectTypemodal(false)
                  setopacity(1)
                  navigation.navigate("MARKETREFERRAL")
                  }}
              >
              <Entypo  name={"shop"} size={50} color={"#f8ae4e"} />
              <Text style={{fontFamily: 'Karla-Bold'}}>Market</Text>
              </TouchableOpacity>
          </View>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>{
                setopacity(1)
                setProjectTypemodal(false)
                }}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Close</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>


      <Modal
            animationType="slide"
            transparent={true}
            visible={HandShakeReqModal}
            >
            <View
            style={{backgroundColor: 'rgba(000, 000, 000, 0.6)', height: '100%', width: '100%', alignItems: 'center'}}
            >

            <View style={{width: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'space-evenly'}}>

            <View style={{backgroundColor: '#f8ae43', height: 60, width: '100%', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', fontSize: 25, alignSelf: 'center'}}>Hand-Shake Request</Text>
            <TouchableOpacity
            onPress={()=>setHandShakeReqModal(false)}
            style={{alignSelf: 'flex-end', position: 'absolute', right: 5}}
            >
            <MaterialCommunityIcons name='close-circle-outline' color='#fff' size={30} />
            </TouchableOpacity>
            </View>

            { (AllRequest.length == 0) ?
              <ActivityIndicator size="large" color="#fff" style={{marginTop: 20}} />
            :
            <ScrollView style={{alignSelf: 'center', marginBottom: 5, marginTop: 5, width: '100%'}}>
            {AllRequest.map((item, index)=>(
              <View key={index}
              style={{width: '100%', alignSelf: 'center', }}
              >

              <View style={{backgroundColor: '#fff', marginTop: 5, marginBottom: 5, borderRadius: 5, elevation: 5, width: '95%', alignSelf: 'center'}}>
              <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingLeft: 5, paddingTop: 5 }}>Project ID: {item.ProjectId}</Text>
              <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingLeft: 5 }}>Meeting With: {item.Meeting_With}</Text>
              <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingLeft: 5 }}>Meeting Date: {item.Meeting_Date}</Text>
              <Text style={{fontFamily: 'Karla-Bold', paddingTop: 5, paddingLeft: 5, paddingBottom: 5 }}>Meeting Time: {item.Meeting_Time}</Text>
              
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 10}}>

              <TouchableOpacity
              onPress={()=>HandShakeReject('Rejected', item)}
                style={{backgroundColor: '#f23d31', height: 35, width: '40%', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 10}}
                >
                  <Text style={{color: '#fff', fontFamily: 'Karla-Bold', bottom: 1}}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={()=>HandShakeAccept('Accepted', item)}
                style={{backgroundColor: '#fff', height: 35, width: '40%', borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderColor: '#2c992e', borderWidth: 1}}
                >
                  <Text style={{color: '#2c992e', fontFamily: 'Karla-Bold', bottom: 1}}>Accept</Text>
                </TouchableOpacity>
              

              </View>

              </View>
                
              </View>
            ))}
            </ScrollView>
            }
            

            {/* <TouchableOpacity
            onPress={()=>setHandShakeReqModal(false)}
            style={{backgroundColor: '#f8ae4e', width: 130, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginBottom: 10}}
            >
              <Text style={{fontFamily:'Karla-Bold', color: '#fff',padding: 7}}>Close</Text>
            </TouchableOpacity> */}

            </View>

            </View>
            </Modal>

            <BottomTab 
            colorh = "#f8ae4e"
                paths = {()=>navigation.navigate("STATS")}
                
                pathm = {()=>navigation.navigate("HISTORY")}
                
                pathc = {()=>navigation.navigate("PROFILE")}
                
                patho = {()=>{
                    Alert.alert("","Are you sure you want to logout?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                        AsyncStorage.setItem('Login', 'false') 
                        navigation.navigate("LOGIN")
                    }}
                    ])
                    }}
            />
            
            </View>
        
        </View>        
    )
  }
    
}

export default DashboardScreen;