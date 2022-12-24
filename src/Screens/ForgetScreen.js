import React , { useEffect, useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, BackHandler} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ForgetScreen = ({ navigation }) => {

    useEffect(() => { 

        navigation.addListener('focus',()=>{
         const backAction = () => {
         navigation.navigate("LOGIN")
         return true;
       };
   
       const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         backAction
       );
   
       return () => backHandler.remove();
   })

   }, []);

    const [Email, setEmail] = useState(null)
    const [Loading, setLoading] = useState(false)
    
    const ForgetPassword = async() => {
        if( Email == null || Email == '' ){
            Alert.alert("","Please enter your registered email")
        }
        else{
            setLoading(true)
        fetch('https://mobileapp.powerhouse.com.pk/Login/forgotApi.php',{
      method: 'POST',
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": Email
    }) 
    })
    .then((response) => response.text()).then((text) => {
        console.log(text)
        const rsp = text.split(" ")
        console.log(rsp[0])
        if(rsp[0] == "No"){
            Alert.alert("","No User Found")
            setLoading(false)
        }
        else{
            Alert.alert("","Reset link has been sent to your registered email")
            navigation.navigate("LOGIN")
            setLoading(false)
        }
    }).catch((error) => {
        console.error(error);
        Alert.alert("","Please check your internet connection!")
        setLoading(false)
    });
  }
}

    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
            
            <TouchableOpacity
            onPress={()=>navigation.navigate("LOGIN")}
            style={{marginTop: 20, marginLeft: 20}}
            >
            <FontAwesome name={"angle-left"} size={35} color={'#000'}/>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center',}}
            showsVerticalScrollIndicator={false}
            >
            <View>
                <Feather name={"lock"} size={130} color={'#f8ae4e'} />
                <View style={{alignSelf: 'center', position: 'absolute', marginTop: 62}}>
                <MaterialCommunityIcons name={"dots-horizontal"} size={60} color={'#f8ae4e'}/>
                </View>
            </View>
            <Text style={{color: 'grey', fontFamily: 'Karla-Bold', fontSize: 35, paddingTop: 20}}>Forgot Your</Text>
            <Text style={{color: 'grey', fontFamily: 'Karla-Bold', fontSize: 35, paddingBottom: 20}}>Password?</Text>

    <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
      <TextInput
      style={{backgroundColor: '#fff' , width: 250, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, marginBottom: 10, color: '#000000', padding: 10, height: 50, elevation: 10}}
        placeholder="Type Your Email"
        placeholderTextColor="grey"
        keyboardType="visible-password"
        onChangeText={text => setEmail(text)}
        value={Email}
      />
      <View style={{backgroundColor: '#fff', height: 50, borderBottomRightRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', elevation: 10}}>
      <Ionicons name={"ios-mail"} size={30} color={'#f8ae4e'} style={{paddingRight: 5}}/>
      </View>
      </View>

            { Loading ? 
                <View style={{height: 50, width: 285, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20}}>
                <ActivityIndicator size="large" color='#f8ae4e'/>
                </View>
            :
            <TouchableOpacity 
            style={{backgroundColor: '#f8ae4e', height: 50, width: 285, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20}}
            onPress={ForgetPassword}
            >
                <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 20}}>Send</Text>
            </TouchableOpacity>}
            
            </ScrollView>
        </View>
    )
}

export default ForgetScreen;