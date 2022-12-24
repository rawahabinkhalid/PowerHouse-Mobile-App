import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler, Alert, ToastAndroid, TextInput, FlatList, ActivityIndicator, Modal} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
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

const AllAllotedReportScreen = ({ navigation }) => {

    useEffect(() => {
        GetAllUsers()
        
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

    const [Loading, setLoading] = useState(true)
    const [AllotedLocation, setAllotedLocation] = useState([])
    const [Search, setSearch] = useState('')
    const [SearchAllotedLocation, setSearchAllotedLocation] = useState([])

    const [AllUsers, setAllUsers] = useState([])
    const [SelectedEmployeeName, setSelectedEmployeeName] = useState(null)

    const [TotalAllotedLocation, setTotalAllotedLocation] = useState(null)

    const Users = AllUsers.map((myValue,myIndex)=>{
      //console.log('myCity: ' + myValue.CityName)
      return(
          <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label={myValue.EmployeeName} value={myValue.EmployeeID} key={myValue.EmployeeID} />
      )
  })

          const GetAllUsers = async() => {
            try {
                const UserInfo = await AsyncStorage.getItem('UserInfo')
                console.log(UserInfo)
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetAll_UserApi.php',{
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
            }).then((response) => response.json())
            .then((josn) => {
              //console.log(josn)
              setAllUsers(josn)
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
  
        const GetAllotedLocation = async(value) => {
          setSelectedEmployeeName(value)
          setLoading(true)
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AllotedScoutApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
         "employeeid" : value
       })
       }).then((response) => response.json())
       .then((josn) => {
         //console.log(josn)
         setTotalAllotedLocation(josn.length)
         setAllotedLocation(josn)
         setSearchAllotedLocation(josn)
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
        // Alert.alert("","Please check your internet connection!")
         setLoading(false)
       });
   }

   const findAllotedLocation = (text) => {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
        if(AllotedLocation.filter((architect) => architect.ProjectLead_Or_ClientName.search(regex) >= 0).length != 0){
          setAllotedLocation(AllotedLocation.filter((architect) => architect.ProjectLead_Or_ClientName.search(regex) >= 0))
          setSearch(text)
        }
        else if(AllotedLocation.filter((architect) => architect.Date.search(regex) >= 0).length != 0){
          setAllotedLocation(AllotedLocation.filter((architect) => architect.Date.search(regex) >= 0))
          setSearch(text)
        }
        else if(AllotedLocation.filter((architect) => architect.ProjectType.search(regex) >= 0).length != 0){
          setAllotedLocation(AllotedLocation.filter((architect) => architect.ProjectType.search(regex) >= 0))
          setSearch(text)
        }
        else if(AllotedLocation.filter((architect) => architect.Comments.search(regex) >= 0).length != 0){
          setAllotedLocation(AllotedLocation.filter((architect) => architect.Comments.search(regex) >= 0))
          setSearch(text)
        }
        else{
          setAllotedLocation(SearchAllotedLocation)
          //setSearch('')
          ToastAndroid.show("No meeting found", ToastAndroid.SHORT)
          //Alert.alert("","No meeting Found")
        }          
    } else {
      setAllotedLocation(SearchAllotedLocation)
      setSearch(text)
    }
  };

    if(Loading == true){
        return(
        <View style={{backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
        <ActivityIndicator  size="large" color="#f8ae4e"/>
        </View>
       )
      }

      else if (AllotedLocation.length == 0){
        return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
          
          <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ALLREPORTS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Alloted Reports</Text>
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
        selectedValue={SelectedEmployeeName}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(myValue,myIndex) =>
        GetAllotedLocation(myValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Employee Name" value={null} />
        {Users}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Employee Name </Text>
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
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
          
          <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ALLREPORTS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Alloted Reports</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalAllotedLocation}</Text>
        </View>

        <ScrollView style={{height: '100%', width: '100%'}}>
        
        {/* <View style={{marginLeft: 15, marginRight: 15, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 20, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10}}
                placeholder="Search..." 
                placeholderTextColor={"grey"}
                value={Search}
                onChangeText={text=>findAllotedLocation(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={30} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 10, right: 15 }}/>    
            </View> */}

            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedEmployeeName}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
         GetAllotedLocation(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Employee Name" value={null} />
        {Users}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Employee Name </Text>
        </View>

        <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={AllotedLocation}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View style={{backgroundColor: '#fff', borderRadius: 5, elevation: 5, marginBottom: 5, marginLeft: 5, marginRight: 5, marginTop: 5, borderWidth: 1, borderColor: '#f8ae43', borderLeftWidth: 5}}>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                    {/* <View style={{width: 50, height: 50, backgroundColor: '#f8ae4e', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginLeft: 5, borderRadius: 25}}>
                        <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Karla-Bold'}}>{item.ScoutType.charAt(0)}</Text>
                    </View> */}
                    
                    <View style={{marginLeft: 10, alignSelf: 'center', width: '65%'}}>
                    { (item.OwnerName == null) ?
                    <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e', paddingTop: 10, paddingRight: 10}}>{item.Architect}</Text>
                    :
                    <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 18, color: '#f8ae4e', paddingTop: 10, paddingRight: 10}}>{item.OwnerName}</Text>
                    }
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', paddingRight: 10}}>{item.ScoutType}</Text>
                    <Text style={{color: '#000',  fontFamily: 'Karla-Bold', color: 'grey', paddingRight: 10, paddingBottom: 10}}>{item.Location}</Text>
                    </View>

                    {/* <TouchableOpacity 
                    onPress={()=>{

                    const PinLocation = item.PinLocation.split(', ')
                     navigation.navigate("MEETINGDETAIL",{
                         ClientName: item.Architect,
                         ProjectType:item.ScoutType,
                         ClientNumber: item.ArchitectPhoneNo,
                         MeetingID: item.Id,
                         Latitude: PinLocation[0],
                         Longitude: PinLocation[1],
                     })
                    }}
                    style={{justifyContent: 'center'}}>
                    <AntDesign name={"arrowright"} size={30} color={'#000'} style={{right: 10}} />
                    </TouchableOpacity> */}

                </View>

                </View>
            )
        }}
      />

        </ScrollView>     
        

        </View>
    )
}
}

export default AllAllotedReportScreen;