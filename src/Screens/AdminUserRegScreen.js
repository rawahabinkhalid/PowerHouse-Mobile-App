import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, Button, ActivityIndicator} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-paper'
import ImagePicker from "react-native-customized-image-picker"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from 'moment'

const AdminUserRegScreen = ({ navigation }) => {

    const [Loading, setLoading] = useState(false)
    const [UserImage, setUserImage] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg')
    const [ConvertedImage, setConvertedImage] = useState(null)
    const [FName, setFName] = useState(null)
    const [LName, setLName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Password, setPassword] = useState(null)
    const [CPassword, setCPassword] = useState(null)
    const [PhoneNumber, setPhoneNumber] = useState(null)
    const [Address, setAddress] = useState(null)
    const [Designation, setDesignation] = useState(null)
    const [CNIC, setCNIC] = useState(null)
    const [UserRole, setUserRole] = useState(null)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [SelectedDate, setSelectedDate] = useState('DD-MM-YYYY')

    const [ProductDepartment, setProductDepartment] = useState([])
    const [SelectedProductDepartment, setSelectedProductDepartment] = useState(null)

    const [ProductBrandName, setProductBrandName] = useState([])
    const [SelectedProductBrandName, setSelectedProductBrandName] = useState(null)

    const ProductDpt = ProductDepartment.map((myValue,myIndex)=>{
        //console.log('myCity: ' + myValue.CityName)
        return(
            <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.DepartmentName} value={myValue.DepartmentName} key={myValue.DepartmentId} />
        )
    })
  
    const ProductBnd = ProductBrandName.map((myValue,myIndex)=>{
      //console.log('myCity: ' + myValue.CityName)
      return(
          <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BrandName} value={myValue.BrandName} key={myValue.BrandId} />
      )
  })

    useEffect(() => {
        FetchDepartment()

          navigation.addListener('focus',()=>{
              const backAction = () => {
              navigation.navigate("ADMIN")
              return true;
            };
        
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
        
            return () => backHandler.remove();
        })

       }, []);

       const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        console.log("A date has been picked: ", moment(date).format('DD-MM-YYYY'));
        setSelectedDate(moment(date).format('DD-MM-YYYY'))
        hideDatePicker();
      };

       const FetchDepartment = async() => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DepartmentApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setProductDepartment(json)
         })
         .catch((error) => {
           console.error(error);
           //Alert.alert("","Please check your internet connection!")
         });
    }
    
    const FetchBrand = async(value) => {
      // setSelectedCity(value)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BrandNameInDeptApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
          "deptname": value
      })
       }).then((response) => response.json())
       .then((json) => {
         //console.log(json)
         setProductBrandName(json)
       })
       .catch((error) => {
         console.error(error);
         //Alert.alert("","Please check your internet connection!")
       });
    }


       const chooseFile = () => {
        ImagePicker.openPicker({
          multiple: true,
          isCamera:true,
          includeBase64: true,
          maxSize: 1
        }).then(images => {
           console.log(images[0].data)
           setUserImage(images[0].path)
           setConvertedImage('data:'+images[0].mime+';base64,'+images[0].data)   
        })
     };

     const UserReg = async() => {
      setLoading(true)
         fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/UserEmployeeidApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.text())
     .then((text) => {
       console.log('==>', text)
  //////////////////////////////////////////
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/UserRegistrationApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify({

        "employeeid" : text,
        "firstname" : FName,
        "lastname" : LName,
        "email" : Email,
        "password" : Password,
        "cpassword" : CPassword,
        "phoneno" : PhoneNumber,
        "address" : Address,
        "designation" : Designation,
        "department" : SelectedProductDepartment,
        "brand" : SelectedProductBrandName,
        "cnic" : CNIC,
        "dob" : SelectedDate,
        "userrole" : UserRole,
        "images" : ConvertedImage
  
     })
     }).then((response) => response.text())
     .then((text) => {
       Alert.alert("","User Add Successfully")
       setFName(null),
       setLName(null)
       setEmail(null)
       setPassword(null)
       setCPassword(null)
       setPhoneNumber(null)
       setAddress(null)
       setDesignation(null)
       setSelectedProductDepartment(null)
       setSelectedProductBrandName(null)
       setCNIC(null)
       setSelectedDate('DD-MM-YYYY')
       setUserRole(null)
       setConvertedImage(null)
       setUserImage('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg')
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
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>User Registration</Text>
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

        {/* <View style={{height: 120, width: 120, alignSelf: 'center', marginTop: 50, borderRadius: 60}}>
        <Image
        style={{height: 120, width: 120, borderRadius: 60}}
            source={{uri: UserImage}}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', alignSelf: 'center', marginTop: 20, height: 35, borderRadius: 5, alignItems: 'center', justifyContent: 'center', elevation: 5}}
        onPress={chooseFile}
        >
        <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10, paddingRight: 10}}>Upload Image</Text>
        </TouchableOpacity> */}

        <View style={{marginTop: 20}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="First Name *"
        value={FName}
        onChangeText={text => setFName(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Last Name *"
        value={LName}
        onChangeText={text => setLName(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="email-address"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Email *"
        value={Email}
        onChangeText={text => setEmail(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Password *"
        value={Password}
        onChangeText={text => setPassword(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Confirm Password *"
        value={CPassword}
        onChangeText={text => setCPassword(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="number-pad"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        placeholder="e.g 0300-0000000"
        mode= "outlined"
        maxLength={12}
        label="Phone Number *"
        value={PhoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Address *"
        value={Address}
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
        label="Designation *"
        value={Designation}
        onChangeText={text => setDesignation(text)}
        />
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedProductDepartment}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        FetchBrand(value)
        setSelectedProductDepartment(value)
        }
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Department" value={null} />
        {ProductDpt}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Department * </Text>
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedProductBrandName}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        setSelectedProductBrandName(value)
        }
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Brand" value={null} />
        {ProductBnd}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Brand * </Text>
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="number-pad"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        placeholder="e.g 41111-1111111-1"
        mode= "outlined"
        maxLength={15}
        label="CNIC *"
        value={CNIC}
        onChangeText={text => setCNIC(text)}
        />
        </View>
    
       <View style={{marginTop: 11}}>
        <TouchableOpacity
        onPress={showDatePicker}
        style={{height: 55, width: '95%', borderWidth: 1, marginLeft: 10, marginRight: 10, borderRadius: 5, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: 'grey'}}>{SelectedDate}</Text>
        </TouchableOpacity>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 20, color: 'grey', fontSize: 13, bottom: 47}}> Date Of Birth * </Text>
       </View>
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
       />

       <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5, marginBottom: 20}}>
        <Picker
        selectedValue={UserRole}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setUserRole(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select User Role" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Admin" value="Admin" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Manager" value="Manager" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Scout" value="Scout" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Sales" value="Sales" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 46}}> User Role * </Text>
        </View>

        </ScrollView>

        <TouchableOpacity
        onPress={()=>UserReg()}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>SUBMIT</Text>
        </TouchableOpacity>

        </View>
    )
  }
}

export default AdminUserRegScreen;