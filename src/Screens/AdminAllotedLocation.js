import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, BackHandler, Alert, TextInput, FlatList, ActivityIndicator, Modal, ToastAndroid} from 'react-native'
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

const AllotedLocationsScreen = ({ navigation }) => {

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

    const [opacity, setopacity] = useState(1)

    const [SelectedSalePerson, setSelectedSalePerson] = useState(null)

    const [ModalRes, setModalRes] = useState(false)
    const [ModalCom, setModalCom] = useState(false)
    const [ModalMark, setModalMark] = useState(false)

    const [TotalRes, setTotalRes] = useState(null)
    const [TotalCom, setTotalCom] = useState(null)
    const [TotalMark, setTotalMark] = useState(null)

      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalRes}</Text>
        </View>

        <ScrollView style={{width: '100%', opacity: opacity}}
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

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '89.5%', marginBottom: 20, alignSelf: 'center'}}>

                    <TouchableOpacity
                    onPress={()=>{
                        setopacity(0.5)
                        setModalRes(true)
                        }}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 2, paddingLeft: 10, paddingRight: 10}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Alloted To Sale Person</Text>
                    </TouchableOpacity>

                  </View>


                  </View>

                </View>

                </View>
            )
        }}
      />   

        </ScrollView>

        <Modal
        animationType="slide"
        transparent={true}
        visible={ModalRes}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto'}}>
          
          <TouchableOpacity
          style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: 20, marginTop: 15}}
          onPress={()=>{
                setopacity(1)
                setModalRes(false)
                setSelectedSalePerson(null)
                }}
          >
          <MaterialCommunityIcons name="close" size={25}/>
          </TouchableOpacity>
          
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', top: 15}}>Select Sales Person</Text>
          
          
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 40, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedSalePerson}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6, width: 310}}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedSalePerson(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Sales Person" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Hamza" value="Hamza" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Taha" value="Taha" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Rafay" value="Rafay" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Sales Person </Text>
        </View>
        
          </View>
        
          <View>
            
            <TouchableOpacity
            onPress={()=>{
                setopacity(1)
                setModalRes(false)
                setSelectedSalePerson(null)
                }}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>DONE</Text>
            </TouchableOpacity>
          
          </View>
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalCom}</Text>
        </View>

        <ScrollView style={{width: '100%', opacity: opacity}}
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

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '89.5%', marginBottom: 20, alignSelf: 'center'}}>

                  <TouchableOpacity
                  onPress={()=>{
                        setopacity(0.5)
                        setModalCom(true)
                        }}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 2, paddingLeft: 10, paddingRight: 10}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Alloted To Sale Person</Text>
                    </TouchableOpacity>

                  </View>
                
                </View>

                </View>
                </View>
            )
        }}
      />
        </ScrollView>    

        <Modal
        animationType="slide"
        transparent={true}
        visible={ModalCom}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto'}}>
          
          <TouchableOpacity
          style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: 20, marginTop: 15}}
          onPress={()=>{
                setopacity(1)
                setModalCom(false)
                setSelectedSalePerson(null)
                }}
          >
          <MaterialCommunityIcons name="close" size={25}/>
          </TouchableOpacity>
          
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', top: 15}}>Select Sales Person</Text>
          
          
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 40, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedSalePerson}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6, width: 310}}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedSalePerson(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Sales Person" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Hamza" value="Hamza" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Taha" value="Taha" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Rafay" value="Rafay" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Sales Person </Text>
        </View>
        
          </View>
        
          <View>
            
            <TouchableOpacity
            onPress={()=>{
                setopacity(1)
                setModalCom(false)
                setSelectedSalePerson(null)
                }}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>DONE</Text>
            </TouchableOpacity>
          
          </View>
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Scouted Locations</Text>
            </View>
            
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', fontSize: 20, right: 20}}>{TotalMark}</Text>
        </View>

        <ScrollView style={{width: '100%', opacity: opacity}}
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

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, width: '89.5%', marginBottom: 20, alignSelf: 'center'}}>
                  
                  <TouchableOpacity
                    onPress={()=>{
                        setopacity(0.5)
                        setModalMark(true)
                        }}
                    style={{backgroundColor: '#f8ae4e', height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 5, elevation: 2, paddingLeft: 10, paddingRight: 10}}
                    >
                      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>Alloted To Sale Person</Text>
                    </TouchableOpacity>


                  </View>


                  </View>

                </View>

                </View>
            )
        }}
      />    

        </ScrollView>

        <Modal
        animationType="slide"
        transparent={true}
        visible={ModalMark}
        >
        <View style={{height: 200,marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
          <View style={{ alignItems: 'center', height: 150, marginTop: 'auto'}}>
          
          <TouchableOpacity
          style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: 20, marginTop: 15}}
          onPress={()=>{
                setopacity(1)
                setModalMark(false)
                setSelectedSalePerson(null)
                }}
          >
          <MaterialCommunityIcons name="close" size={25}/>
          </TouchableOpacity>
          
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', top: 15}}>Select Sales Person</Text>
          
          
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 40, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedSalePerson}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6, width: 310}}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedSalePerson(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Sales Person" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Hamza" value="Hamza" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Taha" value="Taha" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Rafay" value="Rafay" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Sales Person </Text>
        </View>
        
          </View>
        
          <View>
            
            <TouchableOpacity
            onPress={()=>{
                setopacity(1)
                setModalMark(false)
                setSelectedSalePerson(null)
                }}
            style={{width: '100%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>DONE</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>

            </View>

        </View>
    )
   }
 }
      
}

export default AllotedLocationsScreen;