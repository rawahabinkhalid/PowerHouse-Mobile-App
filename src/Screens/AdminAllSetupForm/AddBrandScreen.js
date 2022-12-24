import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, FlatList, ActivityIndicator, ToastAndroid} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AddBrandScreen = ({ navigation }) => {


    useEffect(() => {
        FetchDepartment()
        FetchBrand()

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

    const [Brand, setBrand] = useState(null)
    const [Department, setDepartment] = useState([])
    const [SelectedDepartment, setSelectedDepartment] = useState([])
    const [isShownPicker, setisShownPicker] = useState(false)
    const [Total, setTotal] = useState('Select Department')
    const [Loading , setLoading] = useState(false)
    const [BrandList, setBrandList] = useState([])
    const [AllBrandList, setAllBrandList] = useState([])
    const [Search, setSearch] = useState(null)

    const FetchDepartment = async() => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DepartmentApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           const items = []
           for(let i = 0 ; i < json.length ; i++ ){
               items.push({ label : json[i].DepartmentName , value : json[i].DepartmentId })
           }
           setDepartment(items)
         })
         .catch((error) => {
           console.error(error);
           //Alert.alert("","Please check your internet connection!")
         });
    }

    const FetchBrand = async() => {
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/GetBrandApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.json())
       .then((json) => {
         setBrandList(json)
         setAllBrandList(json)
         setLoading(false)
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
        // Alert.alert("","Please check your internet connection!")
       });
  }


  const findBrand = (text) => {
      if (text) {
        const regex = new RegExp(`${text.trim()}`, 'i');
          if(BrandList.filter((brandname) => brandname.BrandName.search(regex) >= 0).length != 0){
            setBrandList(BrandList.filter((brandname) => brandname.BrandName.search(regex) >= 0))
            setSearch(text)
          }
          else{
            setBrandList(AllBrandList)
            //setSearch('')
            ToastAndroid.show("No Brand found", ToastAndroid.SHORT)
            //Alert.alert("","No meeting Found")
          }          
      } else {
        setBrandList(AllBrandList)
        setSearch(text)
      }
    };

    
    
    const AddBrand = async() => {
        if(SelectedDepartment.length == 0){
            Alert.alert("","Please select department name")
        }
        else if(Brand == null){
            Alert.alert("","Please enter brand name")
          }
        else{
        setLoading(true)
           fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BrandIdApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.text())
       .then((textid) => {
         ////////////////////////////////////////////////////

         fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AddBrandApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({

            "brandid" : textid,
            "brandname" : Brand
       })
       }).then((response) => response.text())
       .then((text) => {

        /////////////////////////////////////////////////////

        for( let i = 0 ; i < SelectedDepartment.length ; i++ ){
          fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AddBrandinDepartmentApi.php',{
               method: 'POST',
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({
      
                "brandID" : textid,
                "department" : SelectedDepartment[i].label
      
             })
             }).then((response) => response.text())
             .then((text) => {
               console.log('==>',text)
             })
             .catch((error) => {
               console.error(error);
               setLoading(false)
             })
          }
          Alert.alert("","Brand Add Successfully")
          FetchBrand()
               setBrand(null)
               setTotal('Select Department')
               setisShownPicker(false)
               setSelectedDepartment([])
               setLoading(false)
        ////////////////////////////////////////////////////
         
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
       })
    //////////////////////////////////////////    
       })
       .catch((error) => {
         console.error(error);
         setLoading(false)
       })
      }
    }


    const DeleteBrand = async(value) => {
      console.log('==>',value)
      setLoading(true)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DeleteBrandApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({

          "brandid" : value,

       })
       }).then((response) => response.text())
       .then((txt) => {
         console.log('==>',txt)
         FetchBrand()
        Alert.alert("","Brand Delete Successfully")
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
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ALLFORMS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Add Brand</Text>
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


                <TouchableOpacity
                    onPress={() => {
                        setisShownPicker(!isShownPicker)
                    }}
                    style={{ height: 60, width: '95%', justifyContent: 'center', backgroundColor: '#fff', alignSelf: 'center', backgroundColor: '#fff', marginTop: 20, borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}
                >
                    <Text style={{paddingLeft: 10, color: 'grey', fontSize: 16}}>{Total}</Text>
                    
                </TouchableOpacity>
                {isShownPicker ? <MultipleSelectPicker
                    items={Department}
                    onSelectionsChange={(ele) => {
                        setSelectedDepartment(ele)
                        if(ele.length == 0){
                            setTotal('Select Department')
                        }
                        else{
                            setTotal(ele.length+' Department Selected')
                        }
                        }}
                    selectedItems={SelectedDepartment}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                    : null
                }
 
                {/* {(SelectedDepartment || []).map((item ,  index) => {
                    return <Text 
                    style={{backgroundColor: 'red', color: '#000'}}
                    key={index}>
                        {item.label}
                    </Text>
                })} */}



        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Brand Name"
        value={Brand}
        onChangeText={text => setBrand(text)}
        />
        </View>

        <TouchableOpacity
        onPress={()=>AddBrand()}
        style={{height: 50, backgroundColor: '#f8ae4e', marginLeft: 10, marginRight: 10, marginTop: 15, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 10,}}
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
        onChangeText={text => findBrand(text)}
        />
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10, marginTop: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Brand Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Action</Text>
        </View>

        </View>


        <FlatList
            data={BrandList}
            keyExtractor={(BrandList)=>BrandList.Id}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.BrandName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
            
          {/* <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"square-edit-outline"} color="skyblue" />
          <Text style={{color: "skyblue", fontFamily: 'Karla-Bold'}}>Edit</Text>
          </TouchableOpacity> */}

          <TouchableOpacity 
          onPress={()=>{
            Alert.alert("","Are you sure you want to delete "+item.BrandName+"?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      DeleteBrand(item.Id)
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
        </View>
    )
  }
}

export default AddBrandScreen;