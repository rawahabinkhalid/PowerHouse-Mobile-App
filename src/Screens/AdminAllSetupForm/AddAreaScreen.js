import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, FlatList, ToastAndroid, ActivityIndicator, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import Autocomplete from 'react-native-autocomplete-input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Value } from 'react-native-reanimated'

const AddAreaScreen = ({ navigation }) => {

    useEffect(() => {
        FetchCity()
        FetchArea()

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

    const [Area, setArea] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [City, setCity] = useState([])
    const [FilteredCity, setFilteredCity] = useState([]);
    const [SelectedCity, setSelectedCity] = useState({});

    const [AreaList, setAreaList] = useState([])
    const [AllAreaList, setAllAreaList] = useState([])
    const [Search, setSearch] = useState(null)

    const [EditCity, setEditCity] = useState(null)
    const [EditAreaa, setEditAreaa] = useState(null)
    const [AreaId, setAreaId] = useState(null)
    const [AreaModal, setAreaModal] = useState(false)
    const [opacity, setopacity] = useState(1)

    const FetchCity = async() => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/CityApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setCity(json)
         })
         .catch((error) => {
           console.error(error);
          // Alert.alert("","Please check your internet connection!")
         });
    }


    const FetchArea = async() => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetAreaApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.json())
       .then((json) => {
         setAreaList(json)
         setAllAreaList(json)
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
        // Alert.alert("","Please check your internet connection!")
       });
  }


  const findArea = (text) => {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
        if(AreaList.filter((areaname) => areaname.AreaName.search(regex) >= 0).length != 0){
          setAreaList(AreaList.filter((areaname) => areaname.AreaName.search(regex) >= 0))
          setSearch(text)
        }
        else{
          setAreaList(AllAreaList)
          //setSearch('')
          ToastAndroid.show("No Area found", ToastAndroid.SHORT)
          //Alert.alert("","No meeting Found")
        }          
    } else {
      setAreaList(AllAreaList)
      setSearch(text)
    }
  };


    const findCity = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredCity(City.filter((city) => city.CityName.search(regex) >= 0))
        } else {
          setFilteredCity([]);
        }
      };

    
      const AddArea = async() => {
        if(SelectedCity.CityName == null){
          Alert.alert("","Please enter city name")
        }
        else if(Area == null){
           Alert.alert("","Please enter area name")
        }
        else{
        setLoading(true)
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AreaIdApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.text())
       .then((text) => {
         console.log('==>', text)
    //////////////////////////////////////////
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AddAreaApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({
        
          "areaid" : text,
          "cityname" : SelectedCity.CityName,
          "areaname" : Area

       })
       }).then((response) => response.text())
       .then((text) => {
         Alert.alert("","Area Add Successfully")
         setSelectedCity({})
         setArea(null)
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


    const EditArea = async() => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/EditAreaApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "areaid" : AreaId,
          "cityname" : EditCity,
          "areaname" : EditAreaa

       })
       }).then((response) => response.text())
       .then((txt) => {
         console.log('===>',txt)
        Alert.alert("","Area Update Successfully")
         setopacity(1)
         setEditCity(null)
         setAreaId(null)
         setEditAreaa(null)
         setAreaModal(false)
         FetchArea()
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
        // Alert.alert("","Please check your internet connection!")
       });
    }


    const DeleteArea = async(value) => {
      console.log('===>',value)
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DeleteAreaApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "areaid" : value,

       })
       }).then((response) => response.text())
       .then((txt) => {
        console.log('====>',txt)
        Alert.alert("","Area Delete Successfully")
        FetchArea()
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
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', opacity: opacity}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ALLFORMS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Add Area</Text>
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

        <ScrollView style={{height: '100%', width: '100%', opacity: opacity}}
        showsVerticalScrollIndicator={false}
        >

      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredCity}
          defaultValue={
            JSON.stringify(SelectedCity) === '{}' ?
            '' :
            SelectedCity.CityName
          }
         onChangeText={(text) => findCity(text)}
          placeholder="City Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.CityId,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCity(item);
                setFilteredCity([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.CityName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />
      </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Area Name"
        value={Area}
        onChangeText={text => setArea(text)}
        />
        </View>

        <TouchableOpacity
        onPress={()=>AddArea()}
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
        onChangeText={text => findArea(text)}
        />
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10, marginTop: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Area Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Action</Text>
        </View>

        </View>


        <FlatList
            data={AreaList}
            keyExtractor={(AreaList)=>AreaList.Id}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.AreaName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
            
          <TouchableOpacity 
          onPress={()=>{
            setAreaId(item.Id)
            setEditCity(item.CityName)
            setEditAreaa(item.AreaName)
            setAreaModal(true)
            setopacity(0.4)
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"square-edit-outline"} color="skyblue" />
          <Text style={{color: "skyblue", fontFamily: 'Karla-Bold'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{
            Alert.alert("","Are you sure you want to delete "+item.AreaName+"?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      DeleteArea(item.Id)
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
        visible={AreaModal}
        >
        <View style={{marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', marginTop: 'auto'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10}}>Edit Area</Text>
          
          <View style={{justifyContent: 'space-evenly', width: '100%', marginTop: 15, marginBottom: 20}}>

          <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="City Name"
        value={EditCity}
        onChangeText={text => setEditCity(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Area Name"
        value={EditAreaa}
        onChangeText={text => setEditAreaa(text)}
        />
        </View>

          </View>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>{
              setAreaId(null)
              setEditCity(null)
              setEditAreaa(null)
              setopacity(1)
              setAreaModal(false)
                }}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>EditArea()}
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

export default AddAreaScreen;