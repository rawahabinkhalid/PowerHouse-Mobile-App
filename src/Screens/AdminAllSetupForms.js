import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, Button} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

const AdminAllSetupForms = ({ navigation }) => {

    useEffect(() => {
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

    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#ededed'}}>
        
        <View style={{ elevation: 10, flexDirection: 'row', height: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
            style={{left: 20}}
            onPress={()=>navigation.navigate("ADMIN")}
            >
                <FontAwesome name={"angle-left"} size={35} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>Setup Forms</Text>
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


        <View style={{ width: '95%', alignSelf: 'center', marginTop: 15, justifyContent: 'space-between', flexDirection: 'row'}}>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDCITY")}
                >
                <MaterialCommunityIcons name={"home-city-outline"} size={35} />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>City</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDAREA")}
                >
                <Entypo name={"address"} size={35} />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Area</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDCOMPANY")}
                >
                <Image
                    source={require('../Images/company.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Company</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDBRANCH")}
                >
                <Image
                    source={require('../Images/branch.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Branch</Text>
            </View>

        </View>



        <View style={{ width: '95%', alignSelf: 'center', marginTop: 20, justifyContent: 'space-between', flexDirection: 'row'}}>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDDEPARTMENT")}
                >
                <Image
                    source={require('../Images/department.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Department</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDBRAND")}
                >
                <Image
                    source={require('../Images/brand.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Brand</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDPRODUCT")}
                >
                <Image
                    source={require('../Images/product.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Product</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDBUILDINGTYPE")}
                >
                <Image
                    source={require('../Images/buildingtype.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Building</Text>
                <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Type</Text>
            </View>

        </View>



        <View style={{ width: '95%', alignSelf: 'center', marginTop: 20, justifyContent: 'space-between', flexDirection: 'row'}}>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDBUILDINGSTAGE")}
                >
                <Image
                    source={require('../Images/buildingstage.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Building</Text>
                <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Stage</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDCLIENTTYPE")}
                >
                <Image
                    source={require('../Images/clienttype.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Client</Text>
                <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Type</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDDISTRIBUTOR")}
                >
                <Image
                    source={require('../Images/distributor.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Distributor</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDDEALER")}
                >
                <Image
                    source={require('../Images/dealer.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Dealer</Text>
            </View>

        </View>



        <View style={{ width: '95%', alignSelf: 'center', marginTop: 20, justifyContent: 'space-between', flexDirection: 'row'}}>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDARCHITECT")}
                >
                <Image
                    source={require('../Images/architect.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Architect</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDBUILDER")}
                >
                <Image
                    source={require('../Images/builder.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Builder</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDCONTRACTOR")}
                >
                <Image
                    source={require('../Images/contractor.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Contractor</Text>
            </View>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDCONSULTANT")}
                >
                <Image
                    source={require('../Images/consultant.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Consultant</Text>
            </View>

        </View>



        <View style={{ width: '95%', alignSelf: 'center', marginTop: 20, justifyContent: 'space-between', flexDirection: 'row'}}>

            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDINTERIORDESIGNER")}
                >
                <Image
                    source={require('../Images/interiordesign.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Interior</Text>
                <Text style={{alignSelf: 'center', fontFamily: 'Karla-Bold'}}>Designer</Text>
            </View>
            
            <View>
                <TouchableOpacity
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center'}}
                onPress={()=>navigation.navigate("ADDCOMPETITOR")}
                >
                <Image
                    source={require('../Images/competitor.png')}
                />
                </TouchableOpacity>
                <Text style={{alignSelf: 'center', paddingTop: 5, fontFamily: 'Karla-Bold'}}>Competitor</Text>
            </View>     

            <View>
                <View
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center', borderColor: '#ededed'}}
                >
                </View>
            </View>

            <View>
                <View
                style={{height: 80 ,width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'center', borderColor: '#ededed'}}
                >
                </View>
            </View>

        </View>    

        </ScrollView>
        </View>
    )
}

export default AdminAllSetupForms