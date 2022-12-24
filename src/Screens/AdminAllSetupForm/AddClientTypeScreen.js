import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, FlatList, ToastAndroid, ActivityIndicator, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import { TooltipChildrenContext } from 'react-native-walkthrough-tooltip'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AddClientTypeScreen = ({ navigation }) => {

  useEffect(() => {
    FetchClientType()

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

    const [ClientType, setClientType] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [EditClientType, setEditClientType] = useState(null)
    const [ClientTypeId, setClientTypeId] = useState(null)
    const [ClientTypeList, setClientTypeList] = useState([])
    const [AllClientTypeList, setAllClientTypeList] = useState([])
    const [Search, setSearch] = useState(null)
    const [ClientTypeModal , setClientTypeModal] = useState(false)
    const [opacity, setopacity] = useState(1)

   
    
    const FetchClientType = async() => {
      setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetClienttypeApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           setClientTypeList(json)
           setAllClientTypeList(json)
           setLoading(false)
         })
         .catch((error) => {
           console.error(error);
           setLoading(false)
          // Alert.alert("","Please check your internet connection!")
         });
    }


    const findClientType = (text) => {
        if (text) {
          const regex = new RegExp(`${text.trim()}`, 'i');
            if(ClientTypeList.filter((clienttypename) => clienttypename.ClientTypeName.search(regex) >= 0).length != 0){
              setClientTypeList(ClientTypeList.filter((clienttypename) => clienttypename.ClientTypeName.search(regex) >= 0))
              setSearch(text)
            }
            else{
              setClientTypeList(AllClientTypeList)
              //setSearch('')
              ToastAndroid.show("No Client Type found", ToastAndroid.SHORT)
              //Alert.alert("","No meeting Found")
            }          
        } else {
          setClientTypeList(AllClientTypeList)
          setSearch(text)
        }
      };

      
    
    const AddClientType = async() => {
        if(ClientType == null){
          Alert.alert("","Please enter client type name")
        }
        else{
        setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ClienttypeIdApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.text())
       .then((text) => {
         console.log('==>', text)
    //////////////////////////////////////////
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AddClienttypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({

            "clienttypeid" : text,
            "clienttypename" : ClientType

       })
       }).then((response) => response.text())
       .then((text) => {
         Alert.alert("","Client Type Add Successfully")
         FetchClientType()
         setClientType(null)
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


    const EditClientTypee = async() => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/EditClienttypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "clienttypeid" : ClientTypeId,
          "clienttypename" : EditClientType

       })
       }).then((response) => response.text())
       .then((txt) => {
        Alert.alert("","Client Type Update Successfully")
         setopacity(1)
         setEditClientType(null)
         setClientTypeId(null)
         setClientTypeModal(false)
         FetchClientType()
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
        // Alert.alert("","Please check your internet connection!")
       });
    }


    const DeleteClientType = async(value) => {
      console.log('==>',value)
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DeleteClienttypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "clienttypeid" : value,

       })
       }).then((response) => response.text())
       .then((txt) => {
        console.log(txt)
        Alert.alert("","Client Type Delete Successfully")
        FetchClientType()
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
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Add Client Type</Text>
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
        label="Client Type Name"
        value={ClientType}
        onChangeText={text => setClientType(text)}
        />
        </View>

        <TouchableOpacity
        onPress={()=>AddClientType()}
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
        onChangeText={text => findClientType(text)}
        />
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10, marginTop: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Client Type Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Action</Text>
        </View>

        </View>


        <FlatList
            data={ClientTypeList}
            keyExtractor={(ClientTypeList)=>ClientTypeList.Id}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.ClientTypeName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
            
          <TouchableOpacity 
          onPress={()=>{
            setClientTypeId(item.Id)
            setEditClientType(item.ClientTypeName)
            setClientTypeModal(true)
            setopacity(0.4)
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"square-edit-outline"} color="skyblue" />
          <Text style={{color: "skyblue", fontFamily: 'Karla-Bold'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{
            Alert.alert("","Are you sure you want to delete "+item.ClientTypeName+"?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      DeleteClientType(item.Id)
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
        visible={ClientTypeModal}
        >
        <View style={{marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', marginTop: 'auto'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10}}>Edit Client Type</Text>
          
          <View style={{justifyContent: 'space-evenly', width: '100%', marginTop: 15, marginBottom: 20}}>

          <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Client Type Name"
        value={EditClientType}
        onChangeText={text => setEditClientType(text)}
        />
        </View>

          </View>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>{
              setClientTypeId(null)
              setEditClientType(null)
              setopacity(1)
              setClientTypeModal(false)
                }}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>EditClientTypee()}
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

export default AddClientTypeScreen;