import React, {useEffect, useState} from 'react'
import {View, Text, BackHandler, ScrollView, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator, Image, FlatList} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from "react-native-customized-image-picker";

const StartMeeting = ({ navigation, route }) => {

    useEffect(() => {
        //navigation.addListener('focus',()=>{
          GetUserInfo()
          //})

          navigation.addListener('focus',()=>{
            const backAction = () => {
              Alert.alert("","Are you sure you want to leave meeting?",[
                {text: 'No', onPress:()=> null},
                {text: 'Yes', onPress:()=> navigation.navigate("MEETINGDETAIL") }
              ])
            return true;
                };
      
                const backHandler = BackHandler.addEventListener(
                  "hardwareBackPress",
                  backAction
                );
      
                return () => backHandler.remove();
            })
     }, []);

  const [StartTime, setStartTime] = useState((moment().format('hh:mm:ss A')))
  const [EndTime, setEndTime] = useState(null)
  const [MeetingDate, setMeetingDate] = useState(moment().format('LL'))
  const [MeetingDuration, setMeetingDuration]= useState(null)
  const [AlertMeeting, setAlertMeeting] = useState(false)
  const [DoneMeeting, setDoneMeeting] = useState(false)
  const [MeetingComment, setMeetingComment] = useState(null)
  const ClientData = route.params
  const [EmployeeID, setEmployeeID] = useState(null)
  const [EmployeeName, setEmployeeName] = useState(null)
  const [Loading, setLoading] = useState(false)

  const [images, setimages] = useState([
    {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
  ])
  const [ConvertedImg, setConvertedImg] = useState([])
  
  const GetUserInfo = async() => {
    try {
        const UserInfo = await AsyncStorage.getItem('UserInfo')
        console.log(JSON.parse(UserInfo).userid)
        setEmployeeID(JSON.parse(UserInfo).userid)
        console.log(JSON.parse(UserInfo).userfullname)
        setEmployeeName(JSON.parse(UserInfo).userfullname)
    } catch (error) {
        console.log(error)
    }
} 
  const LeaveMeeting = async() => {
      Alert.alert("","Are you sure you want to leave meeting?",[
        {text: 'No', onPress:()=> null},
        {text: 'Yes', onPress:()=> navigation.navigate("MEETINGDETAIL") }
      ])
  }

  const EndMeeting = async() => {
    setDoneMeeting(true)
    setAlertMeeting(false)
    setEndTime((moment().format("hh:mm:ss A")))
    const then = StartTime
    const now = moment().format("hh:mm:ss A")
    var ms = moment(now,"HH:mm:ss A").diff(moment(then,"HH:mm:ss A"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    console.log('===============', s)
    setMeetingDuration(s)
   }

   const PostMeeting = () => {
       setLoading(true)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/MeetingFeedbackApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "scoutid": ClientData.ClientData.MeetingID,
            "userid": EmployeeID,
            "employeename": EmployeeName,
            "projectlead": ClientData.ClientData.ClientName,
            "projecttype": ClientData.ClientData.ProjectType,
            "meetingstarttime": StartTime,
            "meetingendtime": EndTime,
            "totalduration": MeetingDuration,
            "comments": MeetingComment,
            "pictures": ConvertedImg.toString(),
            "date": MeetingDate
      })
      }).then((response) => response.text())
      .then((text) => {
        console.log(text)
        setDoneMeeting(false)
        navigation.navigate("THANKYOU")
          setLoading(false)
      })
      .catch((error) => {
        console.error(error);
       // Alert.alert("","Please check your internet connection!")
        setLoading(false)
      });
   }

   const chooseFile = () => {
    ImagePicker.openPicker({
      multiple: true,
      isCamera:true,
      multipleShot:true,
      includeBase64: true,
      compressQuality: 50,
      minCompressSize: 100,
      maxSize: 4
    }).then(images => {
      const SelectedImages = []
      const ConvertImages = []
      for(var i = 0; i < images.length; i++ ){
        console.log(images[i].path)
        SelectedImages.push({id: i, Image: images[i].path})
        ConvertImages.push('data:'+images[i].mime+';base64,'+images[i].data)
      }
      setTimeout(() => {
        setimages(SelectedImages)
        console.log(SelectedImages.length)
        console.log(ConvertImages.length)
        setConvertedImg(ConvertImages)
      }, 100);
    })  
 };

   if(Loading == true){
    return(
    <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
    <ActivityIndicator  size="large" color="#f8ae4e"/>
    </View>
   )
  }

  else{

    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
            
        <TouchableOpacity 
        onPress={LeaveMeeting}
        style={{backgroundColor: '#fff', elevation: 10, marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 10}}>
        <FontAwesome name={"angle-left"} size={35} color={'#000'} style={{marginRight: 4, marginBottom: 2.5}}/>
        </TouchableOpacity>

        <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center',}}>
            
            <View style={{ width: '90%', justifyContent: 'space-between', marginTop: 70}}>
          
            <Feather name={"clock"} size={35} color={"#000"} style={{alignSelf: 'center', marginBottom: 20}} />

          <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={{fontFamily: 'Karla-Bold'}}>Meeting Start Time</Text>
          <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e'}}>{StartTime}</Text>
          </View>

          <Entypo name={"stopwatch"} size={35} color={"#000"} style={{alignSelf: 'center', marginBottom: 20, marginTop: 10}} />
          
          <View style={{alignItems: 'center', marginBottom: 20}}>
          <Text style={{fontFamily: 'Karla-Bold'}}>Meeting End Time</Text>
          {EndTime ? <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e'}}>{EndTime}</Text>
          :
          <Text style={{fontFamily: 'Karla-Bold', color: '#f8ae4e'}}>In Progress...</Text>
          }
          </View>
          
          </View>

          {/* <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 10, marginRight: 10,marginBottom: 10, justifyContent: 'center', height: 40}}> */}
            <TouchableOpacity
            onPress={()=>navigation.navigate("MEETINGCATALOGUE")}
            style={{backgroundColor: '#f8ae4e',marginRight: 5, width: '47%', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 5}}
            >
                <Text style={{color: '#fff', fontSize: 15, fontFamily: 'Karla-Bold'}}>View Catalogue</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
            onPress={()=>navigation.navigate("MEETINGORDER")}
            style={{backgroundColor: '#f8ae4e', marginLeft: 5, width: '47%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 5}}
            >
                <Text style={{color: '#fff', fontSize: 15, fontFamily: 'Karla-Bold'}}>Generate Order</Text>
            </TouchableOpacity>
        </View> */}

        <TextInput
        style={{backgroundColor: '#fff' , width: '92%', borderRadius: 5, color: '#000', height: 100, padding: 10, borderColor: '#000', borderWidth: 1, marginTop: 15}}
        placeholder="Meeting Comment *"
        placeholderTextColor="grey"
        //keyboardType="visible-password"
        keyboardType="visible-password"
        onChangeText={text => setMeetingComment(text)}
        value={MeetingComment}
        multiline={true}
      />

      <View style={{width: '92%', borderColor: '#000', borderWidth: 1, marginTop: 10, borderRadius:5}}>

      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
        numColumns={5}
          data={images}
          renderItem={({item})=>{
            return(
              <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 2, marginTop: 5, marginBottom: 5}}>
                <Image
                style={{width: 75, height: 75, borderRadius: 10}}
                  source={{
            uri: item.Image,
            }}
                />
              </View>
            )
          }}
        />

      </View>

      <TouchableOpacity
      style={{width: '92%', height: 50, backgroundColor: '#f8ae4e', marginTop: 10, borderRadius: 5, marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}
      onPress={chooseFile}
      >
      <Text style={{color: '#fff', fontFamily: 'Karla-Bold' }}>Camera/Gallery</Text>
      </TouchableOpacity>

        </ScrollView>

        <Modal
        animationType="slide"
        transparent={true}
        visible={AlertMeeting}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto', justifyContent: 'center'}}>
          <AntDesign name={"exclamationcircleo"} size={35} color={"#f8ae4e"} style={{marginBottom: 20}} />
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000'}}>Are you sure you want to end meeting?</Text>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>setAlertMeeting(false)}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>NO</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={EndMeeting}            
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderLeftColor: '#fff', borderLeftWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>YES</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={DoneMeeting}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto', justifyContent: 'center'}}>
          <Feather name={"clock"} size={35} color={'#f8ae4e'} style={{marginBottom: 20}} />
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', bottom: 10, paddingBottom: 10}}>Meeting Duration</Text>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#f8ae4e', bottom: 10}}>{MeetingDuration}</Text>
          
          </View>

            <TouchableOpacity
            onPress={PostMeeting}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderLeftColor: '#282828', borderLeftWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>DONE</Text>
            </TouchableOpacity>
          
          </View>

      </Modal>

        <TouchableOpacity
        onPress={()=>{
          if( (MeetingComment == '') || (MeetingComment == null) ){
            Alert.alert("","Please enter meeting comments!")
          }
          else{
            setAlertMeeting(true)
          }
          }} 
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>END MEETING</Text>
        </TouchableOpacity>

        </View>
    )
}
}

export default StartMeeting;