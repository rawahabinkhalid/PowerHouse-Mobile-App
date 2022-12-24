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
import moment from 'moment'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'

const MarketReferralScreen = ({ navigation, route }) => {

  useEffect(() => {
    //console.log(ConvertedImg.length)
   // navigation.addListener('focus',()=>{
      GetUserInfo()
   // })
      FetchCity()
      FetchProduct()
      //FetchDepartment()
      FetchCompetitor()
      getClientType()

      navigation.addListener('focus',()=>{
        const backAction = () => {
        navigation.navigate("DASHBOARD")
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  })
   }, []);

  
    const [Comment, setComment] = useState(null)
    const [Address, setAddress] = useState(null)
    const [MarketType, setMarketType] = useState(null)
    const [ShopName, setShopName] = useState(null)
    const [OwnerDetail, setOwnerDetail] = useState(null)
    const [OwnerPhoneNumber, setOwnerPhoneNumber] = useState(null)
    const [OCBrands, setOCBrands] = useState(null) 
    const [Status, setStatus] = useState(null)    
    const [ClientType, setClientType] = useState([])
    const [Client, setClient] = useState(null)

    const myClient = ClientType.map((myValue,myIndex)=>{
      return(
          <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.ClientTypeName} value={myValue.ClientTypeName} key={myValue.ClientTypeId} />
      )
      })

    const [UserId, setUserId] = useState(null)
    const [UserName, setUserName] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [images, setimages] = useState([
      {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
      {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
    ])
    const [ConvertedImg, setConvertedImg] = useState([])
    
    const [City, setCity] = useState([])
    const [FilteredCity, setFilteredCity] = useState([]);
    const [SelectedValue, setSelectedValue] = useState({});

    const [OurAndCompetitorBrand, setOurAndCompetitorBrand] = useState([])
    const [FilteredOurAndCompetitorBrand, setFilteredOurAndCompetitorBrand] = useState([]);
    const [SelectedOurAndCompetitorBrand, setSelectedOurAndCompetitorBrand] = useState({});
    const [FinalOurAndCompetitorBrand, setFinalOurAndCompetitorBrand] = useState([])
    const [ClickOC, setClickOC] = useState(false)
    //const [FinalOurAndCompetitorBrandModal, setFinalOurAndCompetitorBrandModal] = useState(false)
    

    // const [ProductModal, setProductModal] = useState(false)
    // const [NoProducts, setNoProducts] = useState(null)
    // const [ProductCode, setProductCode] = useState(null)
    // const [ProductBrandName, setProductBrandName] = useState([])
    // const [SelectedProductBrandName, setSelectedProductBrandName] = useState(null)
    // const [ProductDepartment, setProductDepartment] = useState([])
    // const [SelectedProductDepartment, setSelectedProductDepartment] = useState(null)
    // const [LoadProducts, setLoadProducts] = useState(false)
    // const [FilteredProduct, setFilteredProduct] = useState([]);
    // const [SelectedProduct, setSelectedProduct] = useState({})
    // const [FinalProduct, setFinalProduct] = useState([])
    // const [FinalProductModal, setFinalProductModal] = useState(false)

    const [Products, setProducts] = useState([])
    const [click, setClick] = useState(false);
    const [SelectedProducts, setSelectedProducts] = useState([])

  //   const ProductDpt = ProductDepartment.map((myValue,myIndex)=>{
  //     //console.log('myCity: ' + myValue.CityName)
  //     return(
  //         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.DepartmentName} value={myValue.DepartmentName} key={myValue.DepartmentId} />
  //     )
  // })

//   const ProductBnd = ProductBrandName.map((myValue,myIndex)=>{
//     //console.log('myCity: ' + myValue.CityName)
//     return(
//         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BrandName} value={myValue.BrandName} key={myValue.BrandId} />
//     )
// })
    
    
    //const [SelectedCity, setSelectedCity] = useState(null)
    
    const [Area, setArea] = useState([])
    const [FilteredArea, setFilteredArea] = useState([]);
    const [SelectedArea, setSelectedArea] = useState({})

  //   const myProducts = Products.map((myValue,myIndex)=>{
  //     //console.log('myCity: ' + myValue.CityName)
  //     return(
  //         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.ProductName} value={myValue.ProductName} key={myValue.ProductId} />
  //     )
  // })
    
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

    const findCompetitor = (query) => {
      if (query) {
        const regex = new RegExp(`${query.trim()}`, 'i');
          setFilteredOurAndCompetitorBrand(OurAndCompetitorBrand.filter((competitor) => competitor.CompetitorName.search(regex) >= 0))
      } else {
        setFilteredOurAndCompetitorBrand([]);
      }
    };

    // const findProduct = (query) => {
    //   if (query) {
    //     const regex = new RegExp(`${query.trim()}`, 'i');  
    //     setFilteredProduct(Products.filter((product) => product.ProductName.search(regex) >= 0))
    //     const lng = (Products.filter((product) => product.ProductName.search(regex) >= 0).length)
    //     if(lng == 0){
    //       //console.log('yes')
    //       setNoProducts(query)
    //     }
    //     else{
    //       setNoProducts(null)
    //     }
    //   } else {
    //     //console.log('IN ELSE')
    //     setNoProducts(null)
    //     setFilteredProduct([]);
    //   }
    // };

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

     const FetchProduct = async() => {
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ProductApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
       }).then((response) => response.json())
       .then((json) => {
         
        const items = []
           for(let i = 0 ; i < json.length ; i++ ){
               items.push({ ProductName : json[i].ProductName , Id : json[i].Id, Status: 'false' })
           }
           setProducts(items)
        //console.log(json[0].Id)
         //setProducts(json)
         //setLoadProducts(true)
       })
       .catch((error) => {
         console.error(error);
         //setLoadProducts(true)
         //Alert.alert("","Please check your internet connection!")
       });
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
          //Alert.alert("","Please check your internet connection!")
        });
   }

//    const FetchDepartment = async() => {
//     fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DepartmentApi.php',{
//        method: 'POST',
//        headers: {
//            "Content-Type": "application/json"
//        },
//      }).then((response) => response.json())
//      .then((json) => {
//        //console.log(json)
//        setProductDepartment(json)
//      })
//      .catch((error) => {
//        console.error(error);
//        //Alert.alert("","Please check your internet connection!")
//      });
// }

// const FetchBrand = async(value) => {
//   // setSelectedCity(value)
//   fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BrandNameInDeptApi.php',{
//      method: 'POST',
//      headers: {
//          "Content-Type": "application/json"
//      },
//      body: JSON.stringify({
//       "deptname": value
//   })
//    }).then((response) => response.json())
//    .then((json) => {
//      console.log(json)
//      setProductBrandName(json)
//    })
//    .catch((error) => {
//      console.error(error);
//      //Alert.alert("","Please check your internet connection!")
//    });
// }

//    const AddProduct = async() => {
//     if(ProductCode == null || ProductCode == ''){
//       Alert.alert("","Please enter product code")
//     }
//     else if(SelectedProductDepartment == null){
//       Alert.alert("","Please select department")
//     }
//     else if(SelectedProductBrandName == null){
//       Alert.alert("","Please select brand")
//     }
//     else if(NoProducts == null || NoProducts == ''){
//       Alert.alert("","Please enter product name")
//     }
//     else{
//     setProductModal(false)
//      setLoadProducts(false)
//     fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ProductAddSubmitApi.php',{
//        method: 'POST',
//        headers: {
//            "Content-Type": "application/json"
//        },
//        body: JSON.stringify({
//         "productid" : ProductCode, 
//         "department" : SelectedProductDepartment,
//         "brandname" : SelectedProductBrandName,
//         "productname" : NoProducts
//     })
//      }).then((response) => response.text())
//      .then((json) => {
//        console.log(json)
//        setProductBrandName([])
//        setSelectedProductBrandName(null)
//        setSelectedProductDepartment(null)
//        setProductCode(null)
//        setNoProducts(null)
//        ToastAndroid.show("Product add successfully", ToastAndroid.SHORT)
//        FetchProduct()
//      })
//      .catch((error) => {
//        console.error(error);
//        //Alert.alert("","Please check your internet connection!")
//      });
//     }
// }


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

   const AddMarketDetail = async() => {
    if (MarketType == null){
      Alert.alert("","Please select market type")
    }
    else if(SelectedValue.CityName == null){
      Alert.alert("","Please Select City")
    }
    else{
    setLoading(true)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ReferralMarketApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
    "userid" : UserId,
    "employeename": UserName,
    "markettype": MarketType,
    "shopname": ShopName,
    "ownerdetail": OwnerDetail,
    "ownerphonenumber": OwnerPhoneNumber,
    "products": SelectedProducts.toString(),
    "ourcompetitorbrands": FinalOurAndCompetitorBrand.toString(),
    "city": SelectedValue.CityName,
    "area": SelectedArea.AreaName,
    "address": Address,
    "images": ConvertedImg.toString(),
    "clientype": Client,
    "status": Status,
    "comment": Comment,
    "date" : moment().format('LL'),
    "time" : moment().format('hh:mm:ss A'),
    })
    }).then((response) => response.text())
    .then((text) => {
      console.log('=======',text)
          setMarketType(null)
          setShopName(null)
          setOwnerDetail(null)
          setOwnerPhoneNumber(null)
          setSelectedProducts([])
          setSelectedOurAndCompetitorBrand({})
          setSelectedValue({})
          setSelectedArea({})
          setArea([])
          setAddress(null)
          setClient(null)
          setStatus(null)
          //setFinalProduct([])
          setFinalOurAndCompetitorBrand([])
          setComment(null)
          setimages([
            {id: '1', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
            {id: '2', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
            {id: '3', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
            {id: '4', Image: 'https://image.flaticon.com/icons/png/512/3515/3515349.png'},
          ])
     navigation.navigate("THANKYOU")
     setLoading(false)
    })
    .catch((error) => {
      console.error(error);
      Alert.alert("","Please check your internet connection!")
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
            onPress={()=>navigation.navigate("DASHBOARD")}
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

        {/* <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedProduct}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedProduct(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Product" value={null} />
        {myProducts}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Product </Text>
        </View> */}

      <View style={{marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: 'grey', borderRadius: 5, marginTop: 12}}>

      {(Products.length != 0) ?
      <Text style={{color: 'grey', paddingLeft: 10, paddingTop: 5, fontSize: 16}}>Select Product Category</Text>
      : <Text style={{color: 'grey', paddingTop: 5, marginBottom: 5, fontSize: 16, alignSelf: 'center'}}>Loading Product Category...</Text>}

      {(Products.length != 0) ? <FlatList
        extraData={click}
        scrollEnabled={true}
        numColumns={3}
        data={Products}
        keyExtractor={id=>id.Id}
        renderItem={({ item, index })=>{
          return(
            <TouchableOpacity 
            onPress={()=>{
              if(Products[index].Status === 'false'){
                Products[index].Status = 'true'
                setClick(!click)
                SelectedProducts.push(item.ProductName)
                ToastAndroid.show(item.ProductName+" add successfully", ToastAndroid.SHORT)
              }
              else if(Products[index].Status === 'true'){
                Products[index].Status = 'false'
                setClick(!click)
                for( let i = 0 ; i < SelectedProducts.length ; i++ ){
                  if( SelectedProducts[i] === item.ProductName ){
                    SelectedProducts.splice(i , 1)
                    ToastAndroid.show(item.ProductName+" delete successfully", ToastAndroid.SHORT)
                  }
                }
              }
            }}
            style={{backgroundColor : (item.Status === 'true') ? '#f8ae4e' : '#fff', borderColor: (item.Status === 'true') ? '#fff' : 'grey', borderWidth: 1, width: '30%', marginLeft: 8, alignItems: 'center', justifyContent: 'center', marginTop: 5, marginBottom: 5, borderRadius: 5}}>
              <Text style={{color: (item.Status === 'true') ? '#fff' : '#000', fontFamily: 'Karla-Bold', textAlign: 'center', padding: 5, fontSize: 11}}>{item.ProductName}</Text>
            </TouchableOpacity>
          )
        }}
        /> : null}

      </View>
        

        {/* <TouchableOpacity
                    onPress={() => {
                        setisShownPicker(!isShownPicker)
                    }}
                    style={{ height: 55, width: '95%', justifyContent: 'center', backgroundColor: '#fff', alignSelf: 'center', backgroundColor: '#fff', marginTop: 12, borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}
                >
                    <Text style={{paddingLeft: 10, color: 'grey', fontSize: 16}}>Select Product Category</Text>
                    
                </TouchableOpacity>
                {isShownPicker ? <MultipleSelectPicker
                    items={Products}
                    onSelectionsChange={(ele) => {setSelectedProducts(ele)}}
                    selectedItems={SelectedProducts}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                    : null
                } */}

        {/* {LoadProducts ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
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
      } */}

      {/* <TouchableOpacity
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

      </TouchableOpacity> */}
        

        {/* <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Our & Competitor's Brand"
        value={OCBrands}
        onChangeText={text => setOCBrands(text)}
        />
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
          data={FilteredOurAndCompetitorBrand}
          defaultValue={
            JSON.stringify(SelectedOurAndCompetitorBrand) === '{}' ?
            '' : SelectedOurAndCompetitorBrand.CompetitorName
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

      {(FinalOurAndCompetitorBrand != 0) ? <View style={{marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: 'grey', borderRadius: 5, marginTop: 12}}>

        <Text style={{color: 'grey', paddingLeft: 10, paddingTop: 5, fontSize: 16}}>Our And Competitor Brand</Text>

        <FlatList
        extraData={ClickOC}
        scrollEnabled={true}
        numColumns={3}
        data={FinalOurAndCompetitorBrand}
        keyExtractor={id=>id.Id}
        renderItem={({ item, index })=>{
          return(
            <TouchableOpacity 
            onPress={()=>{
              FinalOurAndCompetitorBrand.splice(index, 1)
              setClickOC(!ClickOC)
            }}
            style={{backgroundColor : '#f8ae4e', borderColor: '#fff', borderWidth: 1, width: '30%', marginLeft: 8, alignItems: 'center', justifyContent: 'center', marginTop: 5, marginBottom: 5, borderRadius: 5}}>
              <Text style={{color: '#fff', fontFamily: 'Karla-Bold', textAlign: 'center', padding: 5, fontSize: 11}}>{item}</Text>
            </TouchableOpacity>
          )
        }}
        /> 

      </View> : null}

      {/* <TouchableOpacity
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

      </TouchableOpacity> */}
      
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
            '' :
            SelectedValue.CityName
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

      <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10, justifyContent: 'center'}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Address"
        value={Address}
        onChangeText={text => setAddress(text)}
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
        {/* <Text style={{backgroundColor: '#fff', marginLeft: 20, color: 'grey', fontSize: 13, position: 'absolute', top: 554}}> Add Images </Text> */}

        <View style={{ alignItems: 'center', height: 50, marginTop: 10, marginLeft: 10, marginRight: 10}}>
        <TouchableOpacity
          style={{backgroundColor: '#f8ae4e', width: '100%', alignItems: 'center', height: 50, justifyContent: 'center', borderRadius: 5}}
          onPress={chooseFile}>
          <Text style={{color: '#fff', fontFamily: 'Karla-Bold' }}>Camera/Gallery</Text>
        </TouchableOpacity>

        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5, marginBottom: 3}}>
        <Picker
        selectedValue={Client}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setClient(itemValue)
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

        {/* <Modal
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

        {/* <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Department *"
        value={ProductDepartment}
        onChangeText={text => setProductDepartment(text)}
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

        {/* <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Brand Name *"
        value={ProductBrandName}
        onChangeText={text => setProductBrandName(text)}
        />
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
        </Modal> */}

        {/* <Modal 
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

        </Modal> */}


        {/* <Modal 
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

        </Modal> */}

        <TouchableOpacity
        onPress={AddMarketDetail}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>SUBMIT</Text>
        </TouchableOpacity>
        

        </View>
    )
      }
}

export default MarketReferralScreen;