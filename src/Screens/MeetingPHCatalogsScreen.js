import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, ActivityIndicator, FlatList, Linking, TextInput, Share} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import BottomTab from '../Components/BottomTab'
import Pdf from 'react-native-pdf'


const MeetingPHCatalog = ({ navigation, route }) => {

    useEffect(() => {
        //navigation.addListener('focus',()=>{
            console.log('=========',source.uri)
         // })

         navigation.addListener('focus',()=>{
            const backAction = () => {
                navigation.navigate("MEETINGCATALOGUE")
            return true;
                };
      
                const backHandler = BackHandler.addEventListener(
                  "hardwareBackPress",
                  backAction
                );
      
                return () => backHandler.remove();
            })

     }, []);

     const [CurrentPages, setCurrentPages] = useState(1)
     const [TotalPages, setTotalPages] = useState('')
     const [SearchPage, setSearchPage] = useState(null)
     const source = route.params
     const src = {uri:'https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/PHCatalogue.pdf',cache:true}
     const [Catalogue, setCatalogue] = useState('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/PDF/PHCatalogue.pdf');

     const ShareCatalogue = async() => {
        try {
            const result = await Share.share({
              message:
                source.uri,
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                console.log('shared with activity type of', result.activityType)
              } else {
                 console.log('shared')
              }
            } else if (result.action === Share.dismissedAction) {
              console.log('dismissed')
            }
          } catch (error) {
            alert(error.message);
          }
      };
      
    return(
        <View style={{height: '100%', width: '100%', backgroundColor: '#282828'}}>

        <View>

        <Pdf
        style={{width:'100%',height:'100%', backgroundColor: '#282828', marginLeft: 3}}
            source={{uri:source.uri,cache:true}}
            activityIndicatorProps={{color:'#f8ae4e', progressTintColor:'lightgrey'}}
            page={CurrentPages}
            spacing={10}
            horizontal={true}
            fitWidth={true}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log('current page:',page);
                        console.log('Total page:',numberOfPages);
                        setCurrentPages(page)
                    }}
                    onLoadComplete={(numberOfPages)=>{
                        console.log('Total page not done:',numberOfPages);
                        setTotalPages(numberOfPages)
                    }}
        />            

        </View>

        <TouchableOpacity 
        onPress={()=>{
            setSearchPage(null)
            setCurrentPages(1)
            setTotalPages('')
            navigation.navigate("MEETINGCATALOGUE")}}
        style={{position: 'absolute', backgroundColor: '#fff', elevation: 10, marginLeft: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 10}}>
        <FontAwesome name={"angle-left"} size={35} color={'#000'} style={{marginRight: 4, marginBottom: 2.5}}/>
        </TouchableOpacity>

        <View style={{flexDirection: 'row',position: 'absolute', alignSelf: 'center', marginTop: 20, borderWidth: 1, borderColor: '#fff', borderRadius: 5, backgroundColor: '#282828' }}>
            <TextInput                
                style={{backgroundColor: '#282828',color: '#f8ae4e',marginLeft: 20, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, fontSize: 13, height: 40, fontFamily: 'Kalra-Bold', textAlign: 'center',}}
                placeholderTextColor="grey"
                placeholder="Find Page"
                keyboardType="numeric"
                maxLength={TotalPages.toString().length}
                onChangeText={text =>{ setSearchPage(text)}}
                value={SearchPage}
            />
            <TouchableOpacity 
            onPress={()=>{
                var n = SearchPage;
                var digits = (""+n).split("");
                console.log(digits)
                if (n == null)
                {
                    Alert.alert("","Please enter page number")
                }
                else if (n == '')
                {
                    Alert.alert("","Please enter page number")
                }
                else if(digits[0] == 0){
                    Alert.alert("","Please enter number between 1 to " + TotalPages)
                }
                else if(n > TotalPages){
                    Alert.alert("","Please enter number between 1 to " + TotalPages)
                }
                else{
                    console.log('Found')
                    setCurrentPages(parseInt(SearchPage))
                }
            }}
            style={{backgroundColor: '#282828', justifyContent: 'center', borderTopRightRadius: 5, borderBottomRightRadius: 5}}
            >
                <Text style={{color: '#f8ae4e', paddingRight: 10, paddingLeft: 10}}>GO</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity 
        //onPress={()=>navigation.openDrawer()}
        onPress={ShareCatalogue}
        style={{position: 'absolute', backgroundColor: '#fff', elevation: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 10, alignSelf: 'flex-end', right: 20}}>
        <Entypo name={"share"} size={30} color={"#000"} />
        </TouchableOpacity>
        
        <View style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end', bottom: 20}}>
            <TouchableOpacity
            style={{left: 20, backgroundColor: '#282828', alignItems: 'center', padding: 5, borderRadius: 5}}
            onPress={()=>{{
                if(CurrentPages >= 2){
                setCurrentPages(CurrentPages - 1)
                }
            }}}
            >
                <Text style={{color: '#f8ae4e', fontFamily: 'Karla-SemiBold'}}>Previous</Text>
            </TouchableOpacity
            
            >
            
            { TotalPages ? <Text style={{color: '#f8ae4e', fontFamily: 'Karla-SemiBold', backgroundColor: '#282828', alignItems: 'center', padding: 5, borderRadius: 5}}>Page {CurrentPages}/{TotalPages}</Text> :
            <Text style={{color: '#f8ae4e', fontFamily: 'Karla-SemiBold', backgroundColor: '#282828', alignItems: 'center', padding: 5, borderRadius: 5}}>Page {CurrentPages}/Loading...</Text>
            }
            
            <TouchableOpacity
            style={{right: 20, backgroundColor: '#282828', alignItems: 'center', padding: 5, borderRadius: 5}}
            onPress={()=>{{
                if(CurrentPages <= (TotalPages - 1)){
                setCurrentPages(CurrentPages + 1)
                }
            }}}
            >
                <Text style={{color: '#f8ae4e', fontFamily: 'Karla-SemiBold'}}>Next</Text>
            </TouchableOpacity>
        </View>

        {/* <View style={{position: 'absolute',height: '100%', width: '100%', justifyContent: 'flex-end'}}>
        </View> */}
        
        
        </View>
    )
}

export default MeetingPHCatalog;