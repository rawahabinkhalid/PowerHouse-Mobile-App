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

const MyOrderScreen = ({ navigation }) => {

    useEffect(() => {
        GetOrderHistory()
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
     }, []);

    const [Loading, setLoading] = useState(true)
    const [Search, setSearch] = useState('')
    const [Order, setOrder] = useState([])
    const [SearchOrder, setSearchOrder] = useState([])
    const [modalVisible, setmodalVisible] = useState(false)
    const [Items, setItems] = useState([])
    const [CustomerName, setCustomerName] = useState(null)

    const GetOrderHistory = async() => {
       try {
           const UserInfo = await AsyncStorage.getItem('UserInfo')
           console.log(UserInfo)
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/OrderHistoryApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
       "employeeid" : JSON.parse(UserInfo).userid,
       })
       }).then((response) => response.json())
       .then((josn) => {
         setOrder(josn)
         setSearchOrder(josn)
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

   const findOrder = (text) => {
    if (text) {
      const regex = new RegExp(`${text.trim()}`, 'i');
        if(Order.filter((architect) => architect.CustomerName.search(regex) >= 0).length != 0){
          setOrder(Order.filter((architect) => architect.CustomerName.search(regex) >= 0))
          setSearch(text)
        }
        else if(Order.filter((architect) => architect.City.search(regex) >= 0).length != 0){
          setOrder(Order.filter((architect) => architect.City.search(regex) >= 0))
          setSearch(text)
        }
        else if(Order.filter((architect) => architect.Area.search(regex) >= 0).length != 0){
          setOrder(Order.filter((architect) => architect.Area.search(regex) >= 0))
          setSearch(text)
        }
        else if(Order.filter((architect) => architect.ProjectType.search(regex) >= 0).length != 0){
          setOrder(Order.filter((architect) => architect.ProjectType.search(regex) >= 0))
          setSearch(text)
        }
        else{
          setOrder(SearchOrder)
          //setSearch('')
          ToastAndroid.show("No order found", ToastAndroid.SHORT)
          //Alert.alert("","No order Found")
        }          
    } else {
      setOrder(SearchOrder)
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

      else if (Order.length == 0){
        return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
          
          <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("HISTORY")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Order History</Text>
            </View>
            
            <View style={{marginRight: 10}}/>
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

            <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            
            <Image
            style={{height: 300, width: 300}}
              source={require('../Images/NoOrderHistory.png')}
            />
            </ScrollView>    
            
            <BottomTab 
            colorm = "#f8ae4e"
                pathh = {()=>navigation.navigate("DASHBOARD")}
                
                paths = {()=>navigation.navigate("STATS")}
                
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
        )
      }
      
    else{
    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
          
          <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("HISTORY")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7, paddingLeft: 15}}>Order History</Text>
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
        
        <View style={{marginLeft: 15, marginRight: 15, borderRadius: 30, backgroundColor: '#fff', elevation: 10, marginTop: 20, borderRadius: 5}}>
               <TextInput
               style={{ width: '80%', alignSelf: 'center', marginRight: 20, color: '#000', paddingRight: 10}}
                placeholder="Search..." 
                placeholderTextColor={"grey"}
                value={Search}
                onChangeText={text=>findOrder(text)}
                keyboardType="visible-password"   
               /> 
            <AntDesign name={"search1"} size={30} color={'#000'} style={{position: 'absolute', alignSelf: 'flex-end', top: 10, right: 15 }}/>    
            </View>

        <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={Order}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View 
                //style={{backgroundColor: '#fff', marginTop: 10, height: 80, borderRadius: 20, flexDirection: 'row', elevation: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                style={{backgroundColor: '#fff', marginBottom: 10, elevation: 5, marginLeft: 5, marginRight: 5, borderRadius: 5 }}
                >
                <View style={{backgroundColor: '#fff', flexDirection: 'row', borderRadius: 5}}>
                  
                <View style={{justifyContent: 'center', backgroundColor: '#fff', width: 23, alignItems: 'center', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                  {/* <Fontisto name={"flash"} color= {"#f9bf08"} size= {70} /> */}
                  </View>

                  <View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <Ionicons name={"person"}  size={20} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, color: '#f8ae4e', fontSize: 20, width: '80%'}}>{item.CustomerName}</Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialIcons name={"location-pin"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Area} {item.City}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                  <MaterialCommunityIcons name={"home-city"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.ProjectType}</Text>
                  </View>

                  <View style={{ marginBottom: 20, marginTop: 10, width: '90%', alignItems: 'center', alignSelf:'center'}}>
                  <TouchableOpacity
                  onPress={()=>{
                const itm = item.Items
                const sub = itm.substring(3,itm.length-2)
                const split1 = sub.split('"')
                const split2 = split1.join(" ")
                const split3 = split2.split('}')
                const split4 = split3.join(" ")
                const split5 = split4.split(',{')
                setItems(split5)
                setCustomerName(item.CustomerName)
                setmodalVisible(true)
                    }}
                  style={{height: 30, backgroundColor: '#f8ae4e', width: 100, alignItems: 'center', justifyContent: 'center', elevation: 2, borderRadius: 5}}
                  >
                  <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Order</Text>
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
        visible={modalVisible}
        >           
        
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20}}>
        <TouchableOpacity
        onPress={()=>{
          setItems([])
          setCustomerName(null)
          setmodalVisible(false)
          }}
        style={{alignSelf: 'flex-start', left: 20}}
        >
        <Ionicons name={"close"} size={35} />
        </TouchableOpacity>
        <Text style={{color: '#f8ae4e', fontFamily: 'Poppins-Bold', fontSize: 20}}>Customer Name</Text>
          <Text style={{backgroundColor: '#fff', fontFamily: 'Karla-Bold', fontSize: 17 }}>{CustomerName}</Text>
        </View>

        <FlatList
        style={{backgroundColor: '#fff', marginTop: 10}}
          data={Items}
          renderItem={({item})=>{
            if(item == '[]'){
              return(
              <View style={{backgroundColor: '#fff', elevation: 5, margin: 5, alignItems: 'center', height: 30, justifyContent: 'center', borderRadius: 5}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>No Order Found</Text>
              </View>
            )

            }
            else{
              return(
              <View style={{backgroundColor: '#fff', elevation: 5, margin: 5, alignItems: 'center', height: 30, justifyContent: 'center', borderRadius: 5}}>
                <Text style={{fontFamily: 'Karla-Bold'}}>{item}</Text>
              </View>
            )
            }
            
          }}
        />

        <TouchableOpacity
        onPress={()=>{
          setItems([])
          setCustomerName(null)
          setmodalVisible(false)
          }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>CLOSE</Text>
        </TouchableOpacity>

        </Modal>
            
            <BottomTab 
            colorm = "#f8ae4e"
                pathh = {()=>navigation.navigate("DASHBOARD")}
                
                paths = {()=>navigation.navigate("STATS")}
                
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
    )
}
}

export default MyOrderScreen;