import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, FlatList, ActivityIndicator, ToastAndroid, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import {Picker} from '@react-native-picker/picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const AddBuildingTypeScreen = ({ navigation }) => {


  useEffect(() => {
    FetchBuildingType()

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

    const [BuildingType, setBuildingType] = useState(null)
    const [EditBuildingType, setEditBuildingType] = useState(null)
    const [BuildingTypeId, setBuildingTypeId] = useState(null)
    const [ProjectType, setProjectType] = useState(null)
    const [EditProjectType, setEditProjectType] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [opacity, setopacity] = useState(1)
    const [BuildingTypeModal, setBuildingTypeModal] = useState(false)
    const [Search, setSearch] = useState(null)
    const [BuildingTypeList, setBuildingTypeList] = useState([])
    const [AllBuildingTypeList, setAllBuildingTypeList] = useState([])

    
    
    const FetchBuildingType = async() => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetBuildingTypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.json())
       .then((json) => {
         setBuildingTypeList(json)
         setAllBuildingTypeList(json)
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
        // Alert.alert("","Please check your internet connection!")
       });
  }


  const findBuildingType = (text) => {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
        if(BuildingTypeList.filter((buildingtype) => buildingtype.BuildingTypeName.search(regex) >= 0).length != 0){
          setBuildingTypeList(BuildingTypeList.filter((buildingtype) => buildingtype.BuildingTypeName.search(regex) >= 0))
          setSearch(text)
        }
        else{
          setBuildingTypeList(AllBuildingTypeList)
          //setSearch('')
          ToastAndroid.show("No Building Type found", ToastAndroid.SHORT)
          //Alert.alert("","No meeting Found")
        }          
    } else {
      setBuildingTypeList(AllBuildingTypeList)
      setSearch(text)
    }
  };


    const AddBuildingType = async() => {
        if(ProjectType == null){
          Alert.alert("","Please select project type")
        }
        else if(BuildingType == null){
            Alert.alert("","Please enter building name")
          }
        else{
        setLoading(true)
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BuildingTypeidApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.text())
       .then((text) => {
         console.log('==>', text)
    //////////////////////////////////////////
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AddbuildingtypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({

            "buildingtypeid" : text,
            "projecttype" : ProjectType,
            "buildingtype" : BuildingType

       })
       }).then((response) => response.text())
       .then((text) => {
         Alert.alert("","Building Type Add Successfully")
         FetchBuildingType()
         setProjectType(null)
         setBuildingType((null))
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


    const EditBuildingTypee = async() => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/EditBuildingTypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "buildingtypeid" : BuildingTypeId,
          "projecttype" : EditProjectType,
          "buildingtype" : EditBuildingType

       })
       }).then((response) => response.text())
       .then((txt) => {
         console.log('===>',txt)
        Alert.alert("","Building Type Update Successfully")
        setopacity(1)
        setBuildingTypeId(null)
        setEditBuildingType(null)
        setEditProjectType(null)
        setBuildingTypeModal(false)
        FetchBuildingType()
        setLoading(false)
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
        // Alert.alert("","Please check your internet connection!")
       });
    }

    const DeleteBuildingType = async(value) => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DeleteBuildingTypeApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "buildingtypeid" : value,

       })
       }).then((response) => response.text())
       .then((txt) => {
        console.log('====>',txt)
        Alert.alert("","Building Type Delete Successfully")
        FetchBuildingType()
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
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Add Building Type</Text>
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
        
        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={ProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setProjectType(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 46}}> Project Type </Text>
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Building Type Name"
        value={BuildingType}
        onChangeText={text => setBuildingType(text)}
        />
        </View>

        <TouchableOpacity
        onPress={()=>AddBuildingType()}
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
        onChangeText={text => findBuildingType(text)}
        />
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10, marginTop: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Building Type Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Action</Text>
        </View>

        </View>


        <FlatList
            data={BuildingTypeList}
            keyExtractor={(BuildingTypeList)=>BuildingTypeList.Id}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.BuildingTypeName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
            
          <TouchableOpacity 
          onPress={()=>{
              setopacity(0.4)
              setBuildingTypeId(item.Id)
              setEditBuildingType(item.BuildingTypeName)
              setEditProjectType(item.ProjectType)
              setBuildingTypeModal(true)
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"square-edit-outline"} color="skyblue" />
          <Text style={{color: "skyblue", fontFamily: 'Karla-Bold'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{
            Alert.alert("","Are you sure you want to delete "+item.BuildingTypeName+"?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      DeleteBuildingType(item.Id)
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
        visible={BuildingTypeModal}
        >
        <View style={{marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', marginTop: 'auto'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10}}>Edit Building Type</Text>
          
          <View style={{justifyContent: 'space-evenly', width: '100%', marginTop: 15, marginBottom: 20}}>
        

          <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5}}>
        <Picker
        selectedValue={EditProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setEditProjectType(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 46}}> Project Type </Text>
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Building Type Name"
        value={EditBuildingType}
        onChangeText={text => setEditBuildingType(text)}
        />
        </View>

          </View>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>{
                setopacity(1)
                setBuildingTypeId(null)
                setEditBuildingType(null)
                setEditProjectType(null)
                setBuildingTypeModal(false)
            }}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>EditBuildingTypee()}
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

export default AddBuildingTypeScreen;