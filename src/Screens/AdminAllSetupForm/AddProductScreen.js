import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, FlatList, ToastAndroid, ActivityIndicator, Modal} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Picker} from '@react-native-picker/picker'

const AddProductScreen = ({ navigation }) => {


    useEffect(() => {
        FetchDepartment()
        FetchProduct()

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

            const [Loading, setLoading] = useState(false)     
            const [Product, setProduct] = useState(null)
            const [ProductId, setProductId] = useState(null)
            const [EditProduct, setEditProduct] = useState(null)
            const [ProductCode, setProductCode] = useState(null)
            const [EditProductCode, setEditProductCode] = useState(null)
            const [ProductList, setProductList] = useState([])
            const [AllProductList, setAllProductList] = useState([])
            const [Search, setSearch] = useState(null)
            const [ProductModal, setProductModal] = useState(false)
            const [opacity, setopacity] = useState(1)

            const [ProductDepartment, setProductDepartment] = useState([])
            const [SelectedProductDepartment, setSelectedProductDepartment] = useState(null)
            const [EditSelectedProductDepartment, setEditSelectedProductDepartment] = useState(null)

            const [ProductBrandName, setProductBrandName] = useState([])
            const [SelectedProductBrandName, setSelectedProductBrandName] = useState(null)
            const [EditSelectedProductBrandName, setEditSelectedProductBrandName] = useState(null)

            const ProductDpt = ProductDepartment.map((myValue,myIndex)=>{
                //console.log('myProduct: ' + myValue.ProductName)
                return(
                    <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.DepartmentName} value={myValue.DepartmentName} key={myValue.DepartmentId} />
                )
            })
        
            const ProductBnd = ProductBrandName.map((myValue,myIndex)=>{
            //console.log('myProduct: ' + myValue.ProductName)
            return(
                <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BrandName} value={myValue.BrandName} key={myValue.BrandId} />
            )
        })

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
        // setSelectedProduct(value)
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


        const FetchProduct = async() => {
            setLoading(true)
            fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ProductApi.php',{
               method: 'POST',
               headers: {
                   "Content-Type": "application/json"
               },
             }).then((response) => response.json())
             .then((json) => {
               setProductList(json)
               setAllProductList(json)
               setLoading(false)
             })
             .catch((error) => {
               console.error(error);
               setLoading(false)
              // Alert.alert("","Please check your internet connection!")
             });
        }
    
    
        const findProduct = (text) => {
            if (text) {
              const regex = new RegExp(`${text.trim()}`, 'i');
                if(ProductList.filter((cityname) => cityname.ProductName.search(regex) >= 0).length != 0){
                  setProductList(ProductList.filter((cityname) => cityname.ProductName.search(regex) >= 0))
                  setSearch(text)
                }
                else{
                  setProductList(AllProductList)
                  //setSearch('')
                  ToastAndroid.show("No Product found", ToastAndroid.SHORT)
                  //Alert.alert("","No meeting Found")
                }          
            } else {
              setProductList(AllProductList)
              setSearch(text)
            }
          };

        const AddProduct = async() => {
        if(ProductCode == null){
            Alert.alert("","Please enter product code")
        }
        else if(SelectedProductDepartment == null){
            Alert.alert("","Please select department name")
        }
        else if(SelectedProductBrandName == null){
            Alert.alert("","Please select brand name")
        }
        else if(Product == null){
            Alert.alert("","Please enter product name")
        }
        else{
        setLoading(true)    
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/AddProductApi.php',{
             method: 'POST',
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
    
                "productid" : ProductCode,
                "departmentname" : SelectedProductDepartment,
                "brandname" : SelectedProductBrandName,
                "productname" : Product
    
           })
           }).then((response) => response.text())
           .then((text) => {
             Alert.alert("","Product Add Successfully")
             setProductCode(null)
             setSelectedProductDepartment(null)
             setSelectedProductBrandName(null)
             setProduct(null)
             FetchProduct()
             setLoading(false)
           })
           .catch((error) => {
             console.error(error);
             setLoading(false)
           })
        }
        }


        const EditProductt = async() => {
            setLoading(true)
            fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/EditProductApi.php',{
               method: 'POST',
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
      
                "productid" : ProductId, 
                "departmentname" : EditSelectedProductDepartment,
                "brandname" : EditSelectedProductBrandName,
                "productname" : EditProduct
      
             })
             }).then((response) => response.text())
             .then((txt) => {
               console.log('===>',txt)
              Alert.alert("","Product Update Successfully")
              setopacity(1)
              setProductId(null)
              setEditProductCode(null)
              setEditSelectedProductDepartment(null)
              setEditSelectedProductBrandName(null)
              setEditProduct(null)
              setProductModal(false)
              FetchProduct()
              setLoading(false)
             })
             .catch((error) => {
               console.error(error);
               setLoading(false)
              // Alert.alert("","Please check your internet connection!")
             });
          }


          const DeleteProduct = async(value) => {
            console.log('===>',value)
            setLoading(true)
            fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/DeleteProductApi.php',{
               method: 'POST',
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
      
                "productid" : value,
      
             })
             }).then((response) => response.text())
             .then((txt) => {
              console.log('====>',txt)
              Alert.alert("","Product Delete Successfully")
              FetchProduct()
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
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', opacity : opacity}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ALLFORMS")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Add Product</Text>
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

        <View style={{marginTop: 20}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Product Code"
        value={ProductCode}
        onChangeText={text => setProductCode(text)}
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
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Product Name"
        value={Product}
        onChangeText={text => setProduct(text)}
        />
        </View>

        <TouchableOpacity
        onPress={()=>AddProduct()}
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
        onChangeText={text => findProduct(text)}
        />
        </View>

        <View style={{flexDirection: 'row', height: 50, alignItems: 'center', elevation: 5, marginBottom: 10, marginTop: 10}}>
        
        <View style={{backgroundColor: '#f8ae4e', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold'}}>S: No</Text>
        </View>

        <View style={{backgroundColor: '#f8ae4e', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Product Name</Text>
        </View>

        <View  style={{backgroundColor: '#f8ae4e', width: '40%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#fff'}}>
            <Text style={{color: '#fff', fontFamily: 'Karla-Bold', paddingLeft: 10}}>Action</Text>
        </View>

        </View>


        <FlatList
            data={ProductList}
            keyExtractor={(ProductList)=>ProductList.Id}
            renderItem={({item, index})=>{
                return(
                    <View style={{flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 10}}>
        
        <View style={{backgroundColor: '#fff', width: '20%', height: 50, justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold'}}>{index+1}</Text>
        </View>

        <View style={{backgroundColor: '#fff', width: '50%', height: 50, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10}}>
            <Text style={{color: '#000', fontFamily: 'Karla-Bold', paddingLeft: 10}}>{item.ProductName}</Text>
        </View>

        <View  style={{backgroundColor: '#fff', width: '30%', height: 50, borderLeftWidth: 1, borderLeftColor: '#f8ae4e', elevation: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
            
          <TouchableOpacity 
          onPress={()=>{
            console.log('==>',item.BrandName)
              setopacity(0.4)
              setProductId(item.Id)
              setEditProductCode(item.ProductId)
              setEditSelectedProductDepartment(item.DepartmentName)
              FetchBrand(item.DepartmentName)
              setEditSelectedProductBrandName(item.BrandName)
              setEditProduct(item.ProductName)
              setProductModal(true)
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons  name={"square-edit-outline"} color="skyblue" />
          <Text style={{color: "skyblue", fontFamily: 'Karla-Bold'}}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{
            Alert.alert("","Are you sure you want to delete "+item.ProductName+"?",[
                    { text: "Cancel", onPress: () => null},
                    { text: "Yes", onPress: () => {
                      DeleteProduct(item.Id)
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
        visible={ProductModal}
        >
        <View style={{marginTop: 'auto',backgroundColor:'#fff', elevation: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
          <View style={{ alignItems: 'center', marginTop: 'auto'}}>
          <Text style={{fontFamily: 'Karla-Bold', fontSize: 18, alignSelf: 'center', color: '#000', paddingTop: 10}}>Edit Product</Text>
          
          <View style={{justifyContent: 'space-evenly', width: '100%', marginTop: 15, marginBottom: 20}}>

          <View>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Product Code"
        value={EditProductCode}
        onChangeText={text => setEditProductCode(text)}
        />
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={EditSelectedProductDepartment}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        FetchBrand(value)
        setEditSelectedProductDepartment(value)
        }
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Department" value={null} />
        {ProductDpt}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Department * </Text>
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={EditSelectedProductBrandName}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        setEditSelectedProductBrandName(value)
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
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Product Name"
        value={EditProduct}
        onChangeText={text => setEditProduct(text)}
        />
        </View>

          </View>
          </View>
        
          <View style={{flexDirection: 'row'}}>
            
            <TouchableOpacity
            onPress={()=>{
                setopacity(1)
              setProductId(null)
              setEditProductCode(null)
              setEditSelectedProductDepartment(null)
              setEditSelectedProductBrandName(null)
              setEditProduct(null)
              setProductModal(false)
            }}
            style={{width: '50%', backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center', borderRightColor: '#fff', borderRightWidth: 0.5}}
            >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23,}}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>EditProductt()}
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

export default AddProductScreen;