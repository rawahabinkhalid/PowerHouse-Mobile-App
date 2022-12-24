import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, FlatList, ToastAndroid, ActivityIndicator, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AddArchitectScreen = ({ navigation }) => {


    useEffect(() => {
        FetchArchitect()
        
        navigation.addListener('focus',()=>{
          const backAction = () => {
          navigation.navigate("ALLFORMS")
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    })

     }, []);

    const [Architect, setArchitect] = useState(null)
    const [ArchitectId, setArchitectId] = useState(null)
    const [ArchitectModal, setArchitectModal] = useState(false)
    const [ArchitectList, setArchitectList] = useState([])
    const [AllArchitectList, setAllArchitectList] = useState([])
    const [Search, setSearch] = useState(null)
    const [CompanyName, setCompanyName] = useState(null)
    const [ContactPersonName, setContactPersonName] = useState(null)
    const [Designation, setDesignation] = useState(null)
    const [Address, setAddress] = useState(null)
    const [UAN, setUAN] = useState(null)
    const [Office, setOffice] = useState(null)
    const [Mobile, setMobile] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [opacity, setopacity] = useState(1)
//////////////////////////////EDIT/////////////////

    const [EditArchitect, setEditArchitect] = useState(null)
    const [EditCompanyName, setEditCompanyName] = useState(null)
    const [EditContactPersonName, setEditContactPersonName] = useState(null)
    const [EditDesignation, setEditDesignation] = useState(null)
    const [EditAddress, setEditAddress] = useState(null)
    const [EditUAN, setEditUAN] = useState(null)
    const [EditOffice, setEditOffice] = useState(null)
    const [EditMobile, setEditMobile] = useState(null)
    const [EditEmail, setEditEmail] = useState(null)

    const FetchArchitect = async() => {
      setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ArchitectApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           setArchitectList(json)
           setAllArchitectList(json)
           setLoading(false)
         })
         .catch((error) => {
           console.error(error);
           setLoading(false)
          // Alert.alert("","Please check your internet connection!")
         });
    }


    const findArchitect = (text) => {
        if (text) {
          const regex = new RegExp(`${text.trim()}`, 'i');
            if(ArchitectList.filter((cityname) => cityname.ArchitectName.search(regex) >= 0).length != 0){
              setArchitectList(ArchitectList.filter((cityname) => cityname.ArchitectName.search(regex) >= 0))
              setSearch(text)
            }
            else{
              setArchitectList(AllArchitectList)
              //setSearch('')
              ToastAndroid.show("No Architect found", ToastAndroid.SHORT)
              //Alert.alert("","No meeting Found")
            }          
        } else {
          setArchitectList(AllArchitectList)
          setSearch(text)
        }
      };

    
    const AddArchitect = async() => {
      if(Architect == null || Architect == ''){
        Alert.alert("","Please enter architect name")
      }
      else if(Mobile == null || Mobile == ''){
        Alert.alert("","Please enter mobile number")
      }
      else{
      setLoading(true)
         fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HighestID_ArchitectApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.text())
     .then((text) => {
       console.log('==>', text)
  //////////////////////////////////////////
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ArchitectAddSubmitApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify({

              "architectid": text,
              "architectname": Architect,
              "companyname":  CompanyName,
              "contactpersonname":  ContactPersonName,
              "designation":   Designation,
              "address":   Address,
              "UAN":  UAN,
              "office":  Office,
              "mobile":   Mobile,
              "email": Email

     })
     }).then((response) => response.text())
     .then((text) => {
       Alert.alert("","Architect Add Successfully")
       setArchitect(null)
       setCompanyName(null)
       setContactPersonName(null)
       setDesignation(null)
       setAddress(null)
       setUAN(null)
       setOffice(null)
       setMobile(null)
       setEmail(null)
       FetchArchitect()
       setLoading(false)
     })
     .catch((error) => {
       console.error(error);
       setLoading(false)
     })     
  //////////////////////////////////////////////////    
     })
     .catch((error) => {
       console.error(error);
       setLoading(false)
     })
    }
  }


  const EditArchitectt = async() => {
    setLoading(true)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/EditArchitectApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({

        "architectid" : ArchitectId,
        "architectname" : EditArchitect,
        "companyname" : EditCompanyName,
        "contactpersonname" : EditContactPersonName,
        "designation" : EditDesignation,
        "address" : EditAddress,
        "UAN" : EditUAN,
        "office" : EditOffice,
        "mobile" : EditMobile,
        "email" : EditEmail

     })
     }).then((response) => response.text())
     .then((txt) => {
      Alert.alert("","Architect Update Successfully")
      setArchitectId(null)
      setEditArchitect(null)
      setEditCompanyName(null)
      setEditContactPersonName(null)
      setEditDesignation(null)
      setEditAddress(null)
      setEditUAN(null)
      setEditOffice(null)
      setEditMobile(null)
      setEditEmail(null)
      setopacity(1)
      setArchitectModal(false)
      FetchArchitect()
      setLoading(false)
     })
     .catch((error) => {
       console.error(error);
       setLoading(false)
      // Alert.alert("","Please check your internet connection!")
     });
  }
  
  const DeleteArchitect = async(value) => {
    console.log('==>',value)
    setLoading(true)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DeleteArchitectApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({

        "architectid" : value

     })
     }).then((response) => response.text())
     .then((txt) => {
      console.log('==>',txt)
      Alert.alert("","Architect Delete Successfully")
      FetchArchitect()
       setLoading(false)
     })
     .catch((error) => {
       console.error(error);
       setLoading(false)
      // Alert.alert("","Please check your internet connection!")
     });
  }

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
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', opacity : opacity}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ALLFORMS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Add Architect</Text>
            </View>
            
            <View
              style={{right: 20}}
            />
            {/* <TouchableOpacity
            style={{right: 20}}
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} />
            </TouchableOpacity>         */}
        </View>

        <ScrollView style={{height: '100%', width: '100%', opacity : opacity}}
        showsVerticalScrollIndicator={false}
        >

        <View style={{marginTop: 20}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Architect Name *"
        value={Architect}
        onChangeText={text => setArchitect(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={CompanyName}
        onChangeText={text => setCompanyName(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={ContactPersonName}
        onChangeText={text => setContactPersonName(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={Designation}
        onChangeText={text => setDesignation(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Address"
        value={Address}
        onChangeText={text => setAddress(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="numeric"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        placeholder="e.g 111-234567"
        maxLength={10}
        value={UAN}
        onChangeText={text => setUAN(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="numeric"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        placeholder="e.g 021-34567890"
        maxLength={12}
        value={Office}
        onChangeText={text => setOffice(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="numeric"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Mobile Number *"
        placeholder="e.g 0300-1234567"
        maxLength={12}
        value={Mobile}
        onChangeText={text => setMobile(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="email-address"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Email"
        value={Email}
        onChangeText={text => setEmail(text)}
        />
        </View>

        <TouchableOpacity
        onPress={()=>AddArchitect()}
        style={{height: 50, backgroundColor: '#f8ae4e', marginLeft: 10, marginRight: 10, marginTop: 15, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10}}
        >
        <Text style={{color: '#fff', fontFamily: 'Karla-Bold', fontSize: 20}}>SUBMIT</Text>
        </TouchableOpacity>


        <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Search"
        value={Search}
        onChangeText={text => findArchitect(text)}
        />
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10, marginTop: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Architect Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Action</Text>
        </View>

        </View>


        <FlatList
            data={ArchitectList}
            keyExtractor={(ArchitectList)=>ArchitectList.Id}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.ArchitectName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
            
          <TouchableOpacity 
          onPress={()=>{
            setArchitectId(item.Id)
            setEditArchitect(item.ArchitectName)
            setEditCompanyName(item.CompanyName)
            setEditContactPersonName(item.ContactPersonName)
            setEditDesignation(item.Designation)
            setEditAddress(item.Address)
            setEditUAN(item.UAN)
            setEditOffice(item.OfficeNumber)
            setEditMobile(item.MobileNumber)
            setEditEmail(item.Email)
            setopacity(0.4)
            setArchitectModal(true)            
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"square-edit-outline"} color="skyblue" />
          <Text style={{color: "skyblue", fontFamily: 'Karla-Bold'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{
            Alert.alert("","Are you sure you want to delete "+item.ArchitectName+"?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      DeleteArchitect(item.Id)
                    }}
                    ])
                   }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"delete-outline"} color="red" />
          <Text style={{color: 'red', fontFamily: 'Karla-Bold'}}>Delete</Text>
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
        visible={ArchitectModal}
        >
        <View style={{marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <ScrollView style={{ width: '100%'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10}}>Edit Architect</Text>
          
          <View style={{justifyContent: 'space-evenly', width: '100%', marginTop: 15, marginBottom: 20}}>

          <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Architect Name"
        value={EditArchitect}
        onChangeText={text => setEditArchitect(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={EditCompanyName}
        onChangeText={text => setEditCompanyName(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={EditContactPersonName}
        onChangeText={text => setEditContactPersonName(text)}
        />
        </View>


        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={EditDesignation}
        onChangeText={text => setEditDesignation(text)}
        />
        </View>


        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Address"
        value={EditAddress}
        onChangeText={text => setEditAddress(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="numeric"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        placeholder="e.g 111-234567"
        maxLength={10}
        value={EditUAN}
        onChangeText={text => setEditUAN(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="numeric"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        placeholder="e.g 021-34567890"
        maxLength={12}
        value={EditOffice}
        onChangeText={text => setEditOffice(text)}
        />
        </View>


        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="numeric"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Mobile Number"
        placeholder="e.g 0300-1234567"
        maxLength={12}
        value={EditMobile}
        onChangeText={text => setEditMobile(text)}
        />
        </View>


        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="email-address"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Email"
        value={EditEmail}
        onChangeText={text => setEditEmail(text)}
        />
        </View>

          </View>
          </ScrollView>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>{
              setArchitectId(null)
              setEditArchitect(null)
              setEditCompanyName(null)
              setEditContactPersonName(null)
              setEditDesignation(null)
              setEditAddress(null)
              setEditUAN(null)
              setEditOffice(null)
              setEditMobile(null)
              setEditEmail(null)
              setopacity(1)
              setArchitectModal(false)
                }}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>EditArchitectt()}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Done</Text>
            </TouchableOpacity>
          
          </View>
          </View>
      </Modal>

        </View>
    )
  }
}

export default AddArchitectScreen;