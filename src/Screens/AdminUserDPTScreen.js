import React, {useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, ScrollView, BackHandler, ActivityIndicator, FlatList, Alert } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Picker} from '@react-native-picker/picker'

const AdminUserDPTScreen = ({ navigation }) => {


    useEffect(() => {
        FetchDepartment()

        navigation.addListener('focus',()=>{
            const backAction = () => {
            navigation.navigate("ALLUSER")
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
      })
      
       }, []);

    const [ProductDepartment, setProductDepartment] = useState([])
    const [SelectedProductDepartment, setSelectedProductDepartment] = useState(null)
    const [Users, setUser] = useState([])
    const [Loading, setLoading] = useState(false)

    const ProductDpt = ProductDepartment.map((myValue,myIndex)=>{
        //console.log('myCity: ' + myValue.CityName)
        return(
            <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label={myValue.DepartmentName} value={myValue.DepartmentName} key={myValue.DepartmentId} />
        )
    })


    const FetchDepartment = async() => {
        setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DepartmentApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setProductDepartment(json)
           setLoading(false)
         })
         .catch((error) => {
           console.error(error);
           //Alert.alert("","Please check your internet connection!")
           setLoading(false)
         });
    }

            const GetUserByDpt = async(value) => {
                if(value == null){
                    Alert.alert("","Please select a department.")
                    setSelectedProductDepartment(value)
                }
                else{
                setSelectedProductDepartment(value)
                setLoading(true)
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DepartmentWiseReportApi.php',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            "deptname" : value,
            })
            }).then((response) => response.json())
            .then((josn) => {
            //console.log(josn[0])
            setUser(josn)
            setLoading(false)
            })
            .catch((error) => {
            console.error(error);
            // Alert.alert("","Please check your internet connection!")
            setLoading(false)
            });
        }
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
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>

        <View style={{height : 60, width: '100%', elevation: 10, backgroundColor: '#fff', justifyContent: 'center'}}>

        <TouchableOpacity
        style={{position: 'absolute', left: 20}}
            onPress={()=>navigation.navigate("ALLUSER")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>

        <Text style={{alignSelf: 'center', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: 14, color: '#000'}}>Department User</Text>

        </View>

        <ScrollView
        style={{height: '100%', width: '100%'}}
        showsVerticalScrollIndicator= {false}
        >

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedProductDepartment}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
            GetUserByDpt(value)
        }
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#ededed'}} label="Select Department" value={null} />
        {ProductDpt}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#ededed', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Department </Text>
        </View>

        <FlatList
            style={{marginTop: 10, width: '95%', alignSelf: 'center'}}
            data={Users}            
            keyExtractor={item => item.Id}
            renderItem={({ item }) =>{
            return(
                <View 
                //style={{backgroundColor: '#fff', marginTop: 10, height: 80, borderRadius: 20, flexDirection: 'row', elevation: 5, marginLeft: 5, marginRight: 5, marginBottom: 5}}
                style={{backgroundColor: '#fff', marginBottom: 10, elevation: 5, marginLeft: 5, marginRight: 5, borderRadius: 5 }}
                >
                <View style={{backgroundColor: '#fff', flexDirection: 'row', borderRadius: 5}}>
                  
                <View style={{justifyContent: 'center', backgroundColor: '#fff', width: 20, alignItems: 'center', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                  {/* <Fontisto name={"flash"} color= {"#f9bf08"} size= {70} /> */}
                  </View>

                  <View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"account-outline"}  size={20} style={{alignSelf: 'center'}}/>
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Firstname} {item.Lastname}</Text>
                  </View>
                  
                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"at"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Email}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"phone-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.PhoneNo}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"home-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Address}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                  <MaterialCommunityIcons name={"account-tie-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.Designation}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                  <MaterialCommunityIcons name={"card-account-details-outline"}  size={20} style={{alignSelf: 'center'}} />
                  <Text style={{fontFamily: 'Karla-Bold', alignSelf: 'center', paddingLeft: 5, paddingRight: 5, width: '80%'}}>{item.UserRoles}</Text>
                  </View>


                  </View>

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

export default AdminUserDPTScreen;