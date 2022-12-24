import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, ActivityIndicator, FlatList, ToastAndroid, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Picker} from '@react-native-picker/picker'
import { TextInput, Provider } from 'react-native-paper'
import {launchImageLibrary} from 'react-native-image-picker'
import ImgToBase64 from 'react-native-image-base64'
import BottomTab from '../Components/BottomTab'
import ImagePicker from "react-native-customized-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Autocomplete from 'react-native-autocomplete-input'
import Geocoder from 'react-native-geocoding'

const EditScoutMarketScreen = ({ navigation, route }) => {

    const ProjectData = route.params
    
    const [Loading, setLoading] = useState(false)
    const [MarketType, setMarketType] = useState(null)
    const [ShopName, setShopName] = useState(null)
    const [OwnerDetail, setOwnerDetail] = useState(null)
    const [OwnerPhoneNumber, setOwnerPhoneNumber] = useState(null)

    const [ProductModal, setProductModal] = useState(false)
    const [Products, setProducts] = useState([])
    const [NoProducts, setNoProducts] = useState(null)
    const [ProductCode, setProductCode] = useState(null)
    const [ProductBrandName, setProductBrandName] = useState([])
    const [SelectedProductBrandName, setSelectedProductBrandName] = useState(null)
    const [ProductDepartment, setProductDepartment] = useState([])
    const [SelectedProductDepartment, setSelectedProductDepartment] = useState(null)
    const [LoadProducts, setLoadProducts] = useState(false)
    const [FilteredProduct, setFilteredProduct] = useState([]);
    const [SelectedProduct, setSelectedProduct] = useState({})
    const [FinalProduct, setFinalProduct] = useState([])
    const [FinalProductModal, setFinalProductModal] = useState(false)

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


    const [OurAndCompetitorBrand, setOurAndCompetitorBrand] = useState([])
    const [FilteredOurAndCompetitorBrand, setFilteredOurAndCompetitorBrand] = useState([]);
    const [SelectedOurAndCompetitorBrand, setSelectedOurAndCompetitorBrand] = useState({});
    const [FinalOurAndCompetitorBrand, setFinalOurAndCompetitorBrand] = useState([])
    const [FinalOurAndCompetitorBrandModal, setFinalOurAndCompetitorBrandModal] = useState(false)

    const [ECity, setECity] = useState('')
    const [City, setCity] = useState([])
    const [FilteredCity, setFilteredCity] = useState([]);
    const [SelectedValue, setSelectedValue] = useState({});

    const [EArea, setEArea] = useState('')
    const [Area, setArea] = useState([])
    const [FilteredArea, setFilteredArea] = useState([]);
    const [SelectedArea, setSelectedArea] = useState({})

    const [Address, setAddress] = useState(null)

    const [ConvertedImg, setConvertedImg] = useState([])

    const [ClientType, setClientType] = useState([])
    const [StatusType, setStatusType] = useState(null)
    const [Status, setStatus] = useState(null)
    const [Comment, setComment] = useState(null)

    const myClient = ClientType.map((myValue,myIndex)=>{
      return(
          <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.ClientTypeName} value={myValue.ClientTypeName} key={myValue.ClientTypeId} />
      )
      })

    useEffect(() => {
      console.log(ProjectData.EditData.PinLocation)
        FetchProduct()
        FetchDepartment()
        FetchCompetitor()
        FetchCity()
        getClientType()
        EditImages()
        FetchArea(ProjectData.EditData.City)
        setMarketType(ProjectData.EditData.BuildingType)
        setShopName(ProjectData.EditData.ShopName)
        setOwnerDetail(ProjectData.EditData.OwnerDetail)
        setOwnerPhoneNumber(ProjectData.EditData.OwnerPhoneNumber)
        setECity(ProjectData.EditData.City)
        setEArea(ProjectData.EditData.Area)
        setAddress(ProjectData.EditData.Address)
        setStatusType(ProjectData.EditData.Client)
        setStatus(ProjectData.EditData.Status)
        setComment(ProjectData.EditData.Comment)
        if(ProjectData.EditData.Products == ""){
            setFinalProduct([])
        }
        else{
            setFinalProduct(ProjectData.EditData.Products.split(","))
        }
        if(ProjectData.EditData.OurCompetitorBrands == ""){
            setFinalOurAndCompetitorBrand([])
        }
        else{
            setFinalOurAndCompetitorBrand(ProjectData.EditData.OurCompetitorBrands.split(","))
        }

        navigation.addListener('focus',()=>{
          const backAction = () => {
          navigation.navigate("MYSCOUT")
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    })
    
       }, []);


       const getClientType = async() => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ClientTypeApi.php',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
          }).then((response) => response.json())
          .then((json) => {
            //console.log(json)
            setClientType(json)        
          })
          .catch((error) => {
            console.error(error)
           // Alert.alert("","Please check your internet connection!")
          });
      }

       
       const EditImages = async() =>{
        const img = []
       for ( let i = 0 ; i < ProjectData.EditData.Image.split(",").length ; i++){
           if( i % 2 == 1 ){
           img.push('data:image/jpeg;base64,'+ProjectData.EditData.Image.split(",")[i])
           }
           }
           setConvertedImg(img)
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

    const findCity = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredCity(City.filter((city) => city.CityName.search(regex) >= 0))
        } else {
          setFilteredCity([]);
        }
      };

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
          //Alert.alert("","Please check your internet connection!")
        });
   }

   const findArea = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredArea(Area.filter((area) => area.AreaName.search(regex) >= 0))
    } else {
      setFilteredArea([]);
    }
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
         console.log(json)
         setProductBrandName(json)
       })
       .catch((error) => {
         console.error(error);
         //Alert.alert("","Please check your internet connection!")
       });
    }

       const AddProduct = async() => {
        if(ProductCode == null || ProductCode == ''){
          Alert.alert("","Please enter product code")
        }
        else if(SelectedProductDepartment == null){
          Alert.alert("","Please select department")
        }
        else if(SelectedProductBrandName == null){
          Alert.alert("","Please select brand")
        }
        else if(NoProducts == null || NoProducts == ''){
          Alert.alert("","Please enter product name")
        }
        else{
        setProductModal(false)
         setLoadProducts(false)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ProductAddSubmitApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
            "productid" : ProductCode, 
            "department" : SelectedProductDepartment,
            "brandname" : SelectedProductBrandName,
            "productname" : NoProducts
        })
         }).then((response) => response.text())
         .then((json) => {
           console.log(json)
           setProductBrandName([])
           setSelectedProductBrandName(null)
           setSelectedProductDepartment(null)
           setProductCode(null)
           setNoProducts(null)
           ToastAndroid.show("Product add successfully", ToastAndroid.SHORT)
           FetchProduct()
         })
         .catch((error) => {
           console.error(error);
           //Alert.alert("","Please check your internet connection!")
         });
        }
    }

    const FetchProduct = async() => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ProductApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setProducts(json)
           setLoadProducts(true)
         })
         .catch((error) => {
           console.error(error);
           setLoadProducts(true)
           //Alert.alert("","Please check your internet connection!")
         });
    }

    const findProduct = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');  
          setFilteredProduct(Products.filter((product) => product.ProductName.search(regex) >= 0))
          const lng = (Products.filter((product) => product.ProductName.search(regex) >= 0).length)
          if(lng == 0){
            //console.log('yes')
            setNoProducts(query)
          }
          else{
            setNoProducts(null)
          }
        } else {
          //console.log('IN ELSE')
          setNoProducts(null)
          setFilteredProduct([]);
        }
      };
  
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

    const FetchCompetitor = async() => {
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/CompetitorApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setOurAndCompetitorBrand(json)
         })
         .catch((error) => {
           console.error(error);
           //Alert.alert("","Please check your internet connection!")
         });
      }

      const findCompetitor = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredOurAndCompetitorBrand(OurAndCompetitorBrand.filter((competitor) => competitor.CompetitorName.search(regex) >= 0))
        } else {
          setFilteredOurAndCompetitorBrand([]);
        }
      };

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
          const ConvertImages = []
          for(var i = 0; i < images.length; i++ ){
            console.log(images[i].path)
            ConvertImages.push('data:'+images[i].mime+';base64,'+images[i].data)
          }
          setTimeout(() => {
            setConvertedImg(ConvertImages)
          }, 100);
        })  
     };


     const UpdateMarket = async() =>{
       setLoading(true)
        if(MarketType == null)
        {
            Alert.alert("","Please select market type")
        }
        else{
          fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/UpdateScoutMarketApi.php',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "id": ProjectData.EditData.Id,
              "userid" : ProjectData.EditData.EmployeeID,
              "employeename": ProjectData.EditData.EmployeeName,
              "markettype": MarketType,
              "shopname": ShopName,
              "ownerdetail": OwnerDetail,
              "ownerphonenumber": OwnerPhoneNumber,
              "products": FinalProduct.toString(),
              "ourcompetitorbrands": FinalOurAndCompetitorBrand.toString(),
              "city": ECity,
              "area": EArea,
              "address": Address,
              "pinlocation": ProjectData.EditData.PinLocation,
              "images": ConvertedImg.toString(),
              "clientype": StatusType,
              "status": Status,
              "comment": Comment
         })
          }).then((response) => response.text())
          .then((text) => {
            console.log(text)
            navigation.navigate("THANKYOUUPDATE")
            setLoading(false)
          })
          .catch((error) => {
            console.error(error);
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
        <View style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>

        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("MYSCOUT")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>EDIT DETAILS</Text>
            </View>
            
            <View
              style={{right: 20}}
            />
        </View>

        <ScrollView style={{height: '100%', width: '100%', backgroundColor: '#fff'}}>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={MarketType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setMarketType(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Market Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Distributors" value="Distributors" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Dealers" value="Dealers" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Preferred Partners" value="Preferred Partners" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Market Type * </Text>
        </View>

        <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Shop Name *"
        value={ShopName}
        onChangeText={text => setShopName(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        autoCompleteType="name"
        label="Owner Name *"
        value={OwnerDetail}
        onChangeText={text => setOwnerDetail(text)}
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
        label="Owner Contact Number *"
        value={OwnerPhoneNumber}
        onChangeText={text => setOwnerPhoneNumber(text)}
        />
        </View>

        {LoadProducts ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, width: '85%'}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredProduct}
          defaultValue={
            JSON.stringify(SelectedProduct) === '{}' ?
            '' :
            SelectedProduct.ProductName
          }
         onChangeText={(text) => findProduct(text)}
          placeholder="Enter Product Category"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                FinalProduct.push(item.ProductName)
                ToastAndroid.show(item.ProductName+" add successfully", ToastAndroid.SHORT)
                setSelectedProduct(item);
                setFilteredProduct([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.ProductName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        {NoProducts ? <TouchableOpacity
        onPress={()=>setProductModal(true)}
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, right: 15}}
        >
        <AntDesign name={"pluscircleo"} size={30} color={"#f8ae4e"} style={{elevation: 2, backgroundColor: '#fff', borderRadius: 15}}/>
        </TouchableOpacity> : null
        }

      </View> : 
      
      <View  style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12, height: 55, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 16}}>Loading Products...</Text>
      </View>
      }

      <TouchableOpacity
      onPress={()=>{
        if(FinalProduct.length == 0){
          ToastAndroid.show("Please add product category first", ToastAndroid.SHORT)
        }
        else{
          setFinalProductModal(true)
        }
      }}
      style={{height: 40, backgroundColor: '#f8ae4e', marginLeft: 10, marginRight: 10, borderRadius: 5, elevation: 2, marginTop: 12, alignItems: 'center', justifyContent: 'center'}}
      >
      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Product Category</Text>

      </TouchableOpacity>


      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredOurAndCompetitorBrand}
          defaultValue={
            JSON.stringify(SelectedOurAndCompetitorBrand) === '{}' ?
            '' :
            SelectedOurAndCompetitorBrand.CompetitorName
          }
         onChangeText={(text) => findCompetitor(text)}
          placeholder="Enter Our And Competitor Brand Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                FinalOurAndCompetitorBrand.push(item.CompetitorName)
                ToastAndroid.show(item.CompetitorName+" add successfully", ToastAndroid.SHORT)
                setSelectedOurAndCompetitorBrand(item);
                setFilteredOurAndCompetitorBrand([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.CompetitorName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />
      </View>

      <TouchableOpacity
      onPress={()=>{
        if(FinalOurAndCompetitorBrand.length == 0){
          ToastAndroid.show("Please add our and competitor brand first", ToastAndroid.SHORT)
        }
        else{
          setFinalOurAndCompetitorBrandModal(true)
        }
      }}
      style={{height: 40, backgroundColor: '#f8ae4e', marginLeft: 10, marginRight: 10, borderRadius: 5, elevation: 2, marginTop: 12, alignItems: 'center', justifyContent: 'center'}}
      >
      <Text style={{fontFamily: 'Karla-Bold', color: '#fff'}}>View Our & Competitor Brand</Text>

      </TouchableOpacity>


      <Text style={{top: 12, paddingLeft: 15, color: 'grey'}}>City</Text>
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
            JSON.stringify(SelectedValue) === '{}' ?
            ECity :
            SelectedValue.CityName
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
                setECity(item.CityName)
                setSelectedValue(item);
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


      <Text style={{top: 9, paddingLeft: 15, color: 'grey'}}>Area</Text>
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
            EArea :
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
                setEArea(item.AreaName)
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

      <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, justifyContent: 'center'}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Address"
        value={Address}
        multiline = {true}
        numberOfLines={3}
        onChangeText={text => setAddress(text)}
        />        
        </View>


        <Text style={{top: 10, paddingLeft: 15, color: 'grey'}}>Images</Text>
        <View style={{borderColor: 'grey', borderWidth: 1, marginTop: 10, height: 90, marginLeft: 10, marginRight: 10, borderRadius: 5}}>
        
        <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
        numColumns={5}
        data={ConvertedImg}
        keyExtractor={(ConvertedImg)=>ConvertedImg.item}
        renderItem={({item})=>{
          return(
            <View style={{ height: 80, width: 80, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2}}>
              <Image
              style={{width: 80, height: 80, borderRadius: 10}}
              source={{uri:item}}
              />
            </View>
          )
        }}
      />
      </View>

      <View style={{ alignItems: 'center', height: 50, marginTop: 10, marginLeft: 10, marginRight: 10}}>
        <TouchableOpacity
          style={{backgroundColor: '#f8ae4e', width: '100%', alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 5}}
          onPress={chooseFile}>
          <Text style={{color: '#ededed', fontFamily: 'Karla-Bold' }}>Camera/Gallery</Text>
        </TouchableOpacity>
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5, marginBottom: 3}}>
        <Picker
        selectedValue={StatusType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setStatusType(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Client Type" value={null} />
        {myClient}
        {/* <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="New" value="New" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Existing" value="Existing" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Not Interested" value="Not Interested" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Prospect" value="Prospect" /> */}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 45}}> Client Type </Text>
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 3, borderColor: 'grey', borderWidth: 1, marginTop: 7, borderRadius: 5}}>
        <Picker
        selectedValue={Status}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setStatus(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Status" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Active" value="Active" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Inactive" value="Inctive" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 46}}> Status </Text>
        </View>

        <View style={{marginBottom: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Comment"
        value={Comment}
        onChangeText={text => setComment(text)}
        />
        </View>

        </ScrollView>


        <Modal
        animationType="slide"
        transparent={true}
        visible={ProductModal}
        >
        <ScrollView style={{height: '100%', width: '100%', backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
          <View style={{backgroundColor:'#fff', marginTop: 60, marginLeft: 20, marginRight: 20, marginBottom: 20,  borderRadius: 5, alignItems: 'center', elevation: 10}}>
          
        <TouchableOpacity
        onPress={()=>setProductModal(false)}
        style={{alignSelf: 'flex-start', marginTop: 20, marginLeft: 20}}
        >
        <AntDesign name={"close"} size={20}  />
        </TouchableOpacity>

        <View style={{width: '100%', marginTop: 20}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Product Code *"
        value={ProductCode}
        onChangeText={text => setProductCode(text)}
        />
        </View>

        <View style={{ borderColor: 'grey', borderWidth: 1, marginTop: 18, borderRadius: 5, width: '94%'}}>
        <Picker
        selectedValue={SelectedProductDepartment}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', height: 60}}
        onValueChange={(value) =>{
        FetchBrand(value)
        setSelectedProductDepartment(value)
        }
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Department" value={null} />
        {ProductDpt}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 53}}> Department * </Text>
        </View>

        <View style={{ borderColor: 'grey', borderWidth: 1, marginTop: 18, borderRadius: 5, width: '94%'}}>
        <Picker
        selectedValue={SelectedProductBrandName}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', height: 60}}
        onValueChange={(value) =>
        setSelectedProductBrandName(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Brand" value={null} />
        {ProductBnd}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 53}}> Brand * </Text>
        </View>

        <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Product Category *"
        value={NoProducts}
        onChangeText={text => setNoProducts(text)}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', height: 40, width: '50%', borderRadius: 5, marginBottom: 20, elevation: 5, alignItems: 'center', justifyContent: 'center'}}
        onPress={AddProduct}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 15}}>Add Product</Text>

        </TouchableOpacity>
        

          </View>
        </ScrollView>
        </Modal>

        <Modal 
        animationType="slide"
        visible={FinalProductModal}
        >

        <View style={{backgroundColor: '#fff', height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10}}>
        <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Product Category</Text>
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Product Category</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '30%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', alignSelf: 'center'}}>Action</Text>
        </View>

        </View>

        <FlatList
            data={FinalProduct}
            keyExtractor={(FinalProduct)=>FinalProduct.item}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <TouchableOpacity
            onPress={()=>{
                setFinalProduct((deleteitem)=>{
                    FinalProduct.splice(index, 1)                    
                    ToastAndroid.show("Product category delete successfully", ToastAndroid.SHORT)
                    if(FinalProduct.length == 0){
                        setFinalProductModal(false)
                    }
                    return [...deleteitem]
                })                    
            }}
             style={{position: 'absolute', alignSelf: 'center'}}
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
            setFinalProductModal(false)
            }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>CLOSE</Text>
        </TouchableOpacity>

        </Modal>

        <Modal 
        animationType="slide"
        visible={FinalOurAndCompetitorBrandModal}
        >

        <View style={{backgroundColor: '#fff', height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10}}>
        <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Our And Competitor Brand</Text>
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Our & Competitor Brand</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '30%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', alignSelf: 'center'}}>Action</Text>
        </View>

        </View>

        <FlatList
            data={FinalOurAndCompetitorBrand}
            keyExtractor={(OurAndCompetitorBrand)=>OurAndCompetitorBrand.item}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <TouchableOpacity
            onPress={()=>{
                setFinalOurAndCompetitorBrand((deleteitem)=>{
                    FinalOurAndCompetitorBrand.splice(index, 1)                    
                    ToastAndroid.show("Our and competitor brand delete successfully", ToastAndroid.SHORT)
                    if(FinalOurAndCompetitorBrand.length == 0){
                        setFinalOurAndCompetitorBrandModal(false)
                    }
                    return [...deleteitem]
                })                    
            }}
             style={{position: 'absolute', alignSelf: 'center'}}
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
            setFinalOurAndCompetitorBrandModal(false)
            }}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>CLOSE</Text>
        </TouchableOpacity>

        </Modal>

        <TouchableOpacity 
        onPress={UpdateMarket}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>UPDATE</Text>
        </TouchableOpacity>    

        </View>
    )
  }
}

export default EditScoutMarketScreen;