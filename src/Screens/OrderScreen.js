import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, ActivityIndicator, FlatList, ToastAndroid, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Picker} from '@react-native-picker/picker'
import { TextInput, Provider } from 'react-native-paper'
import BottomTab from '../Components/BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Autocomplete from 'react-native-autocomplete-input'

const OrderScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.addListener('focus',()=>{
            GetUserInfo()
            FetchCity()
        })
        
        //FetchCity()
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
     }, []);

     const [CustomerName, setCustomerName] = useState(null)
     const [Address, setAddress] = useState(null)
     const [ClientType, setClientType] = useState(null)
     const [ProjectType, setProjectType] = useState(null)
     const [Item, setItem] = useState(null)
     const [Quantity, setQuantity] = useState(0)
     const [FinalOrder, setFinalOrder] = useState([])
     const [modalVisible, setModalVisible] = useState(false);
     const [ItemId, setItemId] = useState(1)
     const [UserId, setUserId] = useState(null)
     const [UserName, setUserName] = useState(null)
     const [Loading, setLoading] = useState(false)
     

    const [City, setCity] = useState([])
    const [FilteredCity, setFilteredCity] = useState([]);
    const [SelectedCity, setSelectedCity] = useState({});
    
    const [Area, setArea] = useState([])
    const [FilteredArea, setFilteredArea] = useState([]);
    const [SelectedArea, setSelectedArea] = useState({})

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

    const findCity = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredCity(City.filter((city) => city.CityName.search(regex) >= 0))
        } else {
          setFilteredCity([]);
        }
      };
    
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

    const PostOrder = async()=>{
        setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/OrderApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({

        
            "userid": UserId,
            "employeename": UserName,
            "customername" : CustomerName,
            "city": SelectedCity.CityName,
            "area": SelectedArea.AreaName,
            "address": Address,
            "clienttype": ClientType,
            "projecttype": ProjectType,
            "items": JSON.stringify(FinalOrder).toString()
            //"items": FinalOrder[0].ItemName.toString() + " "+ FinalOrder[0].Quantity.toString()
           
               
    })
    }).then((response) => response.text())
    .then((text) => {
      console.log(text)
      setCustomerName(null)
      setSelectedCity({})
      setArea([])
      setSelectedArea({})
      setAddress(null)
      setClientType(null)
      setProjectType(null)
      setItem(null)
      setFinalOrder([])
      setQuantity(0)
      setItemId(1)
      navigation.navigate("THANKYOU")
      setLoading(false)
    })
    .catch((error) => {
      console.error(error);
     // Alert.alert("","Please check your internet connection!")
      setLoading(false)
    });
    }

    const GetUserInfo = async() => {
        try {
            const UserInfo = await AsyncStorage.getItem('UserInfo')
            console.log(UserInfo)
            setUserName(JSON.parse(UserInfo).userfullname)
            setUserId(JSON.parse(UserInfo).userid)
        } catch (error) {
            console.log(error)
        }
    }

    
    const findArea = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredArea(Area.filter((area) => area.AreaName.search(regex) >= 0))
        } else {
          setFilteredArea([]);
        }
      };
    
    const FetchArea = async(value) => {
        setSelectedCity(value)
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

   const AddItem = () => {
    if(Item == null || Item == ''){
        ToastAndroid.show("Please enter item name", ToastAndroid.SHORT)
    }
    else if(Quantity == 0){
        ToastAndroid.show("Please add item quantity", ToastAndroid.SHORT)
    }
    else{
        FinalOrder.push({ ItemName: Item, Quantity: Quantity})
        ToastAndroid.show("Item add successfully", ToastAndroid.SHORT)
        setItemId(ItemId + 1)
        setQuantity(0)
        setItem(null)
    }
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

           <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("DASHBOARD")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 20}}>ADD DETAILS</Text>
            </View>
            
            <TouchableOpacity
            style={{right: 20}}
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} />
            </TouchableOpacity>        
        </View>

        {/* <View style={{backgroundColor: '#fff',height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Image
            style={{height: 300, width: 300}}
                source={require('../Images/UnderDev.png')}
            />
        </View> */}
        <ScrollView style={{height: '100%', width: '100%'}}>

        

         <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, marginTop: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Customer Name"
        value={CustomerName}
        onChangeText={text => setCustomerName(text)}
        />
        </View>


        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12}}>
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
          placeholder="Enter City Name"
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

        {/* <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
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

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 7}}>
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
          placeholder="Enter Area Name"
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

        {/* <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 7, borderRadius: 5}}>
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

        <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Address"
        value={Address}
        onChangeText={text => setAddress(text)}
        />
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={ClientType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setClientType(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Client Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="New" value="New" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Existing" value="Existing" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Client Type </Text>
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 7, borderRadius: 5}}>
        <Picker
        selectedValue={ProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        setProjectType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Market" value="Market" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Project Type </Text>
        </View>

        <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Enter Item"
        value={Item}
        onChangeText={text => setItem(text)}
        />
        </View>

        <View style={{flexDirection: 'row', marginTop: 10, width: '100%', justifyContent: 'space-evenly'}}>
            
        <TouchableOpacity
        onPress={AddItem}
        style={{backgroundColor: '#fff', height: 40, width: '55%', borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderColor: '#f8ae4e', borderWidth: 2}}
        >
                <Text style={{color: '#000',fontFamily: 'Karla-Bold'}}>ADD ITEM</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
            style={{backgroundColor: '#fff', height: 40, width: '10%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#f8ae4e'}}
            onPress={()=>{{
                if(Quantity >= 1){
                    setQuantity(Quantity - 1)
                }
            }}}
            >
                <AntDesign name={'minus'} size={25} color={'#000'}/>
            </TouchableOpacity>

            <View style={{height: 40, width: '10%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#000',fontFamily: 'Karla-Bold', fontSize: 20}}>{Quantity}</Text>
            </View>

            <TouchableOpacity
            style={{backgroundColor: '#fff', height: 40, width: '10%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#f8ae4e'}}
            onPress={()=>{
            setQuantity(Quantity + 1)
        }}
            >
                <AntDesign name={'plus'} size={25} color={'#000'}/>
            </TouchableOpacity>
        </View>

        <View style={{margin: 10}}>
            <TouchableOpacity
            onPress={()=>{
                if(FinalOrder.length == 0){
                    ToastAndroid.show("Please add item first", ToastAndroid.SHORT)
                }
                else{
                setModalVisible(true)
                }
                }}
            style={{backgroundColor: '#f8ae4e', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
            >
                <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>VIEW ORDER</Text>
            </TouchableOpacity>
        </View>

        <View>
            <Modal
        animationType="slide"
        visible={modalVisible}  
        >
        
        <View style={{backgroundColor: '#fff', height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10}}>
        <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>ORDER DETAIL</Text>
        </View>
        
        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Item Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Quantity</Text>
        </View>

        </View>
        
        <FlatList
            data={FinalOrder}
            keyExtractor={(FinalOrder)=>FinalOrder.ItemName}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.ItemName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.Quantity}</Text>
            <TouchableOpacity
            onPress={()=>{
                setFinalOrder((deleteitem)=>{
                    FinalOrder.splice(index, 1)                    
                    ToastAndroid.show("Item delete successfully", ToastAndroid.SHORT)
                    if(FinalOrder.length == 0){
                        setModalVisible(false)
                    }
                    return [...deleteitem]
                })                    
            }}
             style={{position: 'absolute', alignSelf: 'flex-end',right: 20}}
            >
            <MaterialCommunityIcons name= {"delete"} color={'#f8ae4e'} size= {30} />
            </TouchableOpacity>
        </View>

        </View>
                )
            }}
        />
        <TouchableOpacity
        onPress={()=>{
            ToastAndroid.show("Order save successfully", ToastAndroid.SHORT)
            setModalVisible(false)
            }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>SAVE ORDER</Text>
        </TouchableOpacity>
            </Modal>
        </View> 

        </ScrollView>

        <TouchableOpacity
        onPress={PostOrder}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>SUBMIT</Text>
        </TouchableOpacity>

        </View>
    )
}
}

export default OrderScreen;