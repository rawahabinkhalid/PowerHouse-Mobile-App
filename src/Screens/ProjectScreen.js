import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, FlatList} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-paper'
import BottomTab from '../Components/BottomTab'
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from "react-native-customized-image-picker"
import Autocomplete from 'react-native-autocomplete-input'
import Geocoder from 'react-native-geocoding';

const ProjectScreen = ({ navigation, route }) => {

  useEffect(() => {
    //console.log('=========',Latitude)
    //navigation.addListener('focus',()=>{
      setTimeout(() => {
        ProjectTypeStatus()
        getAddress()
    }, 2000)
    //})
      FetchCity()

      navigation.addListener('focus',()=>{
        const backAction = () => {
        navigation.navigate("SCOUTING")
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  })

   }, []);

    //States For Residential
    const [ProjectType, setProjectType] = useState(null)
    const [ContactPersonName, setContactPersonName] = useState(null)
    const [ContactPersonPhoneNumber, setContactPersonPhoneNumber] = useState(null)
    const [Block, setBlock] = useState(null)
    const [Size, setSize] = useState(null)
    const [Address, setAddress] = useState(null)
    const Latitude = route.params.Latitude.toString()
    const Longitude = route.params.Longitude.toString()
    
    const [images, setimages] = useState([
      {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    ])
    const [ConvertedImg, setConvertedImg] = useState([])

    const [imagesC, setimagesC] = useState([
      {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    ])
    const [ConvertedImgC, setConvertedImgC] = useState([])
    
    const [LoadCity, setLoadCity] = useState(null)
    const [City, setCity] = useState([])
    const [FilteredCity, setFilteredCity] = useState([]);
    const [SelectedCity, setSelectedCity] = useState({})
    
    const [Area, setArea] = useState([])
    const [FilteredArea, setFilteredArea] = useState([]);
    const [SelectedArea, setSelectedArea] = useState({})

    const [Type, setType] = useState([])
    const [SelectedType, setSelectedType] = useState(null)

    // const myCities = City.map((myValue,myIndex)=>{
    //     //console.log('myCity: ' + myValue.CityName)
    //     return(
    //         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.CityName} value={myValue.CityName} key={myValue.CityId} />
    //     )
    // })

    // const myArea = Area.map((myValue,myIndex)=>{
    //     //console.log('myArea: ' + myValue.AreaName)
    //     return(
    //         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.AreaName} value={myValue.AreaName} key={myValue.AreaId} />
    //     )
    // })

    const myType = Type.map((myValue,myIndex)=>{
        //console.log('myType: ' + myValue.BuildingTypeName)
        return(
            <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BuildingTypeName} value={myValue.BuildingTypeName} key={myValue.BuildingTypeId} />
        )
    })

    //States For Commercial
    const [BlockC, setBlockC] = useState(null)
    const [SizeC, setSizeC] = useState(null)
    const [AddressC, setAddressC] = useState(null)

     
    const getAddress = async() => {

      Geocoder.init('AIzaSyBXDrw0XmVRV8-IrpbovlI5vzNOQS5rpTI', {language : 'en'}); // set the language
     
         Geocoder.from(Latitude, Longitude)
     
         .then(json => {
             //var addressComponent = json.results[0].address_components[0];
             console.log('================',json.results[0].formatted_address);
             setAddress(json.results[0].formatted_address)
             setAddressC(json.results[0].formatted_address)
         })
     
         .catch(error =>
             console.log(error)
         );
       }
    
    const findCity = (query) => {
      if (query) {
        const regex = new RegExp(`${query.trim()}`, 'i');
          setFilteredCity(City.filter((city) => city.CityName.search(regex) >= 0))
      } else {
        setFilteredCity([]);
      }
    };

    const findArea = (query) => {
      if (query) {
        const regex = new RegExp(`${query.trim()}`, 'i');
          setFilteredArea(Area.filter((area) => area.AreaName.search(regex) >= 0))
      } else {
        setFilteredArea([]);
      }
    };

     const ProjectTypeStatus = async() => {
      try {
          const TypeStatus = await AsyncStorage.getItem('ProjectType')
          if(TypeStatus == 'true'){
    setProjectType(null)
    setBlock(null)
    setSize(null)
    setAddress(null)
    setSelectedCity({})
    setSelectedArea({})
    setArea([])
    setSelectedType(null)
    setBlockC(null)
    setSizeC(null)
    setAddressC(null)
    setimages([
      {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    ])
    setimagesC([
      {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    ])
    
    console.log('IN TYPE',TypeStatus)
          }
      } catch (error) {
          console.log(error)
      }
  }

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
            //Alert.alert("","Please check your internet connection!")
          });
     }

     const FetchArea = async(value) => {
        // setSelectedCity(value)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AreaApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
            "cityname": value
        })
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setArea(json)
         })
         .catch((error) => {
           console.error(error);
          // Alert.alert("","Please check your internet connection!")
         });
    }

    const FetchbuildingType = async(value) => {
        console.log('======', value)
        setProjectType(value)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BuildingTypeApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
            "projecttype": value
        })
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setType(json)
         })
         .catch((error) => {
           console.error(error);
          // Alert.alert("","Please check your internet connection!")
         });
    }

    /////////////////////////////////////////////////////
    ////////////////////////////////////////////////////
    
    const chooseFile = () => {
      ImagePicker.openPicker({
        multiple: true,
        isCamera:true,
        multipleShot:true,
        includeBase64: true,
        compressQuality: 10,
        minCompressSize: 5,
        maxSize: 4
      }).then(images => {
        console.log(images[0])
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

   const chooseFileR = () => {
    ImagePicker.openPicker({
      multiple: true,
      isCamera:true,
      multipleShot:true,
      includeBase64: true,
      compressQuality: 10,
      minCompressSize: 5,
      maxSize: 4
    }).then(images => {
      console.log(images[0])
      const SelectedImages = []
      const ConvertImages = []
      for(var i = 0; i < images.length; i++ ){
        console.log(images[i].path)
        SelectedImages.push({id: i, Image: images[i].path})
        ConvertImages.push('data:'+images[i].mime+';base64,'+images[i].data)
      }
      setTimeout(() => {
        setimagesC(SelectedImages)
        console.log(SelectedImages.length)
        console.log(ConvertImages.length)
        setConvertedImgC(ConvertImages)
      }, 100);
    })  
 }; 
  

      

      ////////////////////////////////////////////////
      //////////////////////////////////////////////
     

    if(ProjectType == null){
    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("SCOUTING")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>ADD DETAILS</Text>
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

        <ScrollView style={{height: '100%', width: '100%'}}>
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={ProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        FetchbuildingType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>
        
        </ScrollView>
        
        </View>
    )
   }

   else if(ProjectType == "Residential"){
       return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("SCOUTING")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>ADD DETAILS</Text>
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

        <ScrollView style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator={false}
        >
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={ProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        FetchbuildingType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>

        
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 7}}>
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
          placeholder="Enter City Name *"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.CityId,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                FetchArea(item.CityName)
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

        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedCity}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        FetchArea(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select City" value={null} />
        {myCities}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> City </Text>
        </View> */}

        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredArea}
          defaultValue={
            JSON.stringify(SelectedArea) === '{}' ?
            '' :
            SelectedArea.AreaName
          }
         onChangeText={(text) => findArea(text)}
          placeholder="Enter Area Name *"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.AreaId,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedArea(item);
                setFilteredArea([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.AreaName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />
      </View>



        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedArea}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedArea(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Area" value={null} />
        {myArea}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Area </Text>
        </View> */}

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Block/Phase"
        value={Block}
        onChangeText={text => setBlock(text)}
        />
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedType(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Building Type" value={null} />
        {myType}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Type * </Text>
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Size"
        value={Size}
        onChangeText={text => setSize(text)}
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
        editable={false}
        multiline = {true}
        numberOfLines={3}
        onChangeText={text => setAddress(text)}
        />        
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Pin Location"
        value={Latitude + ", " + Longitude}
        editable={false}
        //onChangeText={text => setAddress(text)}
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
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="number-pad"
        maxLength={11}
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person PhoneNumber"
        value={ContactPersonPhoneNumber}
        onChangeText={text => setContactPersonPhoneNumber(text)}
        />
        </View>
        
        <View style={{borderColor: 'grey', borderWidth: 1, marginTop: 10, height: 90, marginLeft: 10, marginRight: 10, borderRadius: 5}}>
        
        <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
        numColumns={5}
        data={images}
        renderItem={({item})=>{
          return(
            <View style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2}}>
              <Image
              style={{width: 80, height: 80, borderRadius: 10}}
                source={{
           uri: item.Image,
          }}
              />
            </View>
          )
        }}
      />
      </View>

      <View style={{ alignItems: 'center', height: 50, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10}}>
        <TouchableOpacity
          style={{backgroundColor: '#f8ae4e', width: '100%', alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 5}}
          onPress={chooseFile}>
          <Text style={{color: '#fff', fontFamily: 'Karla-Bold' }}>Camera/Gallery</Text>
        </TouchableOpacity>

        </View>

        </ScrollView>
        <Text style={{alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 3, fontFamily: 'Karla-Bold'}}>Step 1/2</Text>
        <TouchableOpacity 
        onPress={()=>{
          if( SelectedCity.CityName == null){
            Alert.alert("","Please Select City")
          }
          else if(SelectedArea.AreaName == null){
            Alert.alert("","Please Select Area")
          }
          else if(SelectedType == null){
            Alert.alert("","Please Select Building Type")
          }
          else{
          navigation.navigate("SCOPEPROJECT",{
          ProjectType: {
                ProjectType: ProjectType,
                City: SelectedCity.CityName,
                Area: SelectedArea.AreaName,
                Block: Block,
                Type: SelectedType,
                Size: Size,
                Address: Address,
                Latitude: Latitude,
                Longitude: Longitude,
                Image: ConvertedImg,
                ContactPersonName: ContactPersonName,
                ContactPersonPhoneNumber: ContactPersonPhoneNumber               
            }
         })
        }
        }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>NEXT</Text>
        </TouchableOpacity>
        
        </View>
       )
   }

   else if(ProjectType == "Commercial"){
       return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("SCOUTING")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>ADD DETAILS</Text>
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

        <ScrollView style={{height: '100%', width: '100%'}}>
        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5 , borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={ProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        FetchbuildingType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedType(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Building Type" value={null} />
        {myType}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Type * </Text>
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Size"
        value={SizeC}
        onChangeText={text => setSizeC(text)}
        />
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
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
          placeholder="Enter City Name *"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.CityId,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                FetchArea(item.CityName)
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
        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedCity}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        FetchArea(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select City" value={null} />
        {myCities}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 45}}> City </Text>
        </View> */}

        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredArea}
          defaultValue={
            JSON.stringify(SelectedArea) === '{}' ?
            '' :
            SelectedArea.AreaName
          }
         onChangeText={(text) => findArea(text)}
          placeholder="Enter Area Name *"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.AreaId,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedArea(item);
                setFilteredArea([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.AreaName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />
      </View>

        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedArea}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedArea(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Area" value={null} />
        {myArea}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Area </Text>
        </View> */}

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Block/Phase"
        value={BlockC}
        onChangeText={text => setBlockC(text)}
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
        value={AddressC}
        editable={false}
        multiline = {true}
        numberOfLines={3}
        onChangeText={text => setAddressC(text)}
        />        
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Pin Location"
        value={Latitude + ", " + Longitude}
        editable={false}
        //onChangeText={text => setAddress(text)}
        />        
        </View>

        <View style={{borderColor: 'grey', borderWidth: 1, marginTop: 10, height: 90, marginLeft: 10, marginRight: 10, borderRadius: 5}}>
        
        <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
        numColumns={5}
        data={imagesC}
        renderItem={({item})=>{
          return(
            <View style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2}}>
              <Image
              style={{width: 80, height: 80, borderRadius: 10}}
                source={{
           uri: item.Image,
          }}
              />
            </View>
          )
        }}
      />
      </View>

      <View style={{ alignItems: 'center', height: 50, marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10}}>
        <TouchableOpacity
          style={{backgroundColor: '#f8ae4e', width: '100%', alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 5}}
          onPress={chooseFileR}>
          <Text style={{color: '#fff', fontFamily: 'Karla-Bold' }}>Camera/Gallery</Text>
        </TouchableOpacity>

        </View>
        
        </ScrollView>
        <Text style={{alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 3, fontFamily: 'Karla-Bold'}}>Step 1/2</Text>
        <TouchableOpacity 
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        onPress={()=>{
          if( SelectedCity.CityName == null){
            Alert.alert("","Please Select City")
          }
          else if(SelectedArea.AreaName == null){
            Alert.alert("","Please Select Area")
          }
          else if(SelectedType == null){
            Alert.alert("","Please Select Building Type")
          }
          else{
          navigation.navigate("SCOPEPROJECT",{
          ProjectType: {
                ProjectType: ProjectType,
                City: SelectedCity.CityName,
                Area: SelectedArea.AreaName,
                Block: BlockC,
                Type: SelectedType,
                Size: SizeC,
                Address: AddressC,
                Latitude: Latitude,
                Longitude: Longitude,
                Image: ConvertedImgC                
            }
         })
        }
        }}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>NEXT</Text>
        </TouchableOpacity>
        
        </View>
       )
   }
}

export default ProjectScreen;