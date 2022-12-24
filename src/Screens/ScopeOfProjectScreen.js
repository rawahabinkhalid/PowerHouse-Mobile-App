import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, ActivityIndicator, Modal, ToastAndroid} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import {Picker} from '@react-native-picker/picker';
import Autocomplete from 'react-native-autocomplete-input'
import { TextInput, Provider } from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';

const ScopeOfProjectScreen = ({ navigation, route }) => {

  useEffect(() => {
    console.log((moment().format('hh:mm:ss A')))
    console.log(moment().format('LL'))
    //navigation.addListener('focus',()=>{
      //console.log('Length',ProjectDetail.ProjectType.Image.length)
      GetUserInfo()
      getArchitects()
      getBuilders()
      getContractors()
      getInteriorDesigner()
      getElectricalConsultant()
      getClientType()
      getBuildingStage()
    //})

      navigation.addListener('focus',()=>{
        const backAction = () => {
        navigation.navigate("PROJECT")
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
    const [ProjectLead, setProjectLead] = useState(null)
    const [toolTipVisible, setToolTipVisible] = useState(false)
    const [Tags, setTags] = useState(null)
    const [BuildingStageType, setBuildingStageType] = useState([])
    const [BuildingStage, setBuildingStage] = useState(null)
    const [ClientType, setClientType] = useState([])
    const [Client, setClient] = useState(null)
    const [UserId, setUserId] = useState(null)
    const [UserName, setUserName] = useState(null)
    const [Loading, setLoading] = useState(false)
    const ProjectDetail = route.params

      const myClient = ClientType.map((myValue,myIndex)=>{
      return(
          <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.ClientTypeName} value={myValue.ClientTypeName} key={myValue.ClientTypeId} />
      )
      })

      const myBuildingStage = BuildingStageType.map((myValue,myIndex)=>{
        return(
            <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BuildingStageName} value={myValue.BuildingStageName} key={myValue.BuildingStageId} />
        )
        })

    const [NoArchitect, setNoArchitect] = useState(null)
    const [LoadArchitect, setLoadArchitect] = useState(false)
    const [ArchitectModal, setArchitectModal] = useState(false)
    const [Architect, setArchitect] = useState([])
    const [ArchitectsPhoneNumber, setArchitectsPhoneNumber] = useState(null)
    const [ArchitectsEmail, setArchitectsEmail] = useState(null)
    const [ArchitectsAddress, setArchitectsAddress] = useState(null)
    const [ArchitectsCompanyName, setArchitectsCompanyName] = useState(null)
    const [ArchitectsContactPersonName, setArchitectsContactPersonName] = useState(null)
    const [ArchitectsDesignation, setArchitectsDesignation] = useState(null)
    const [ArchitectsUAN, setArchitectsUAN] = useState(null)
    const [ArchitectsOffice, setArchitectsOffice] = useState(null)
    const [FilteredArchitect, setFilteredArchitect] = useState([]);
    const [SelectedArchitect, setSelectedArchitect] = useState({})
  

  const [NoBuilder, setNoBuilder] = useState(null)
  const [LoadBuilder, setLoadBuilder] = useState(false)
  const [BuilderModal, setBuilderModal] = useState(false)
  const [Builders, setBuilders] = useState([])
  const [BuilderPhoneNumber, setBuilderPhoneNumber] = useState(null)
  const [BuilderEmail, setBuilderEmail] = useState(null)
  const [BuilderAddress, setBuilderAddress] = useState(null)
  const [BuilderCompanyName, setBuilderCompanyName] = useState(null)
  const [BuilderContactPersonName, setBuilderContactPersonName] = useState(null)
  const [BuilderDesignation, setBuilderDesignation] = useState(null)
  const [BuilderUAN, setBuilderUAN] = useState(null)
  const [BuilderOffice, setBuilderOffice] = useState(null)
  const [FilteredBuilder, setFilteredBuilder] = useState([]);
  const [SelectedBuilder, setSelectedBuilder] = useState({})

  //   const myBuilders = Builders.map((myValue,myIndex)=>{
  //     return(
  //         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BuilderName} value={myValue.BuilderName} key={myValue.BuilderId} />
  //     )
  // })

  const [NoContractor, setNoContractor] = useState(null)
  const [LoadContractor, setLoadContractor] = useState(false)
  const [ContractorModal, setContractorModal] = useState(false)
  const [Contractor, setContractor] = useState([])
  const [ContractorPhoneNumber, setContractorPhoneNumber] = useState(null)
  const [ContractorEmail, setContractorEmail] = useState(null)
  const [ContractorAddress, setContractorAddress] = useState(null)
  const [ContractorCompanyName, setContractorCompanyName] = useState(null)
  const [ContractorContactPersonName, setContractorContactPersonName] = useState(null)
  const [ContractorDesignation, setContractorDesignation] = useState(null)
  const [ContractorUAN, setContractorUAN] = useState(null)
  const [ContractorOffice, setContractorOffice] = useState(null)
  const [FilteredContractor, setFilteredContractor] = useState([]);
  const [SelectedContractor, setSelectedContractor] = useState({})

  //   const myContractors = Contractor.map((myValue,myIndex)=>{
  //     return(
  //         <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.ContractorName} value={myValue.ContractorName} key={myValue.ContractorId} />
  //     )
  // })

  const [NoInteriorDesigner, setNoInteriorDesigner] = useState(null)
  const [LoadInteriorDesigner, setLoadInteriorDesigner] = useState(false)
  const [InteriorDesignerModal, setInteriorDesignerModal] = useState(false)
  const [InteriorDesigner, setInteriorDesigner] = useState([])
  const [InteriorDesignerPhoneNumber, setInteriorDesignerPhoneNumber] = useState(null)
  const [InteriorDesignerEmail, setInteriorDesignerEmail] = useState(null)
  const [InteriorDesignerAddress, setInteriorDesignerAddress] = useState(null)
  const [InteriorDesignerCompanyName, setInteriorDesignerCompanyName] = useState(null)
  const [InteriorDesignerContactPersonName, setInteriorDesignerContactPersonName] = useState(null)
  const [InteriorDesignerDesignation, setInteriorDesignerDesignation] = useState(null)
  const [InteriorDesignerUAN, setInteriorDesignerUAN] = useState(null)
  const [InteriorDesignerOffice, setInteriorDesignerOffice] = useState(null)
  const [FilteredInteriorDesigner, setFilteredInteriorDesigner] = useState([]);
  const [SelectedInteriorDesigner, setSelectedInteriorDesigner] = useState({})

  const [NoElectricalConsultant, setNoElectricalConsultant] = useState(null)
  const [LoadElectricalConsultant, setLoadElectricalConsultant] = useState(false)
  const [ElectricalConsultantModal, setElectricalConsultantModal] = useState(false)
  const [ElectricalConsultant, setElectricalConsultant] = useState([])
  const [ElectricalConsultantPhoneNumber, setElectricalConsultantPhoneNumber] = useState(null)
  const [ElectricalConsultantEmail, setElectricalConsultantEmail] = useState(null)
  const [ElectricalConsultantAddress, setElectricalConsultantAddress] = useState(null)
  const [ElectricalConsultantCompanyName, setElectricalConsultantCompanyName] = useState(null)
  const [ElectricalConsultantContactPersonName, setElectricalConsultantContactPersonName] = useState(null)
  const [ElectricalConsultantDesignation, setElectricalConsultantDesignation] = useState(null)
  const [ElectricalConsultantUAN, setElectricalConsultantUAN] = useState(null)
  const [ElectricalConsultantOffice, setElectricalConsultantOffice] = useState(null)
  const [FilteredElectricalConsultant, setFilteredElectricalConsultant] = useState([]);
  const [SelectedElectricalConsultant, setSelectedElectricalConsultant] = useState({})


  const getBuildingStage = async() => {
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BuildingStageApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
      }).then((response) => response.json())
      .then((json) => {
        //console.log(json)
        setBuildingStageType(json)        
      })
      .catch((error) => {
        console.error(error)
       // Alert.alert("","Please check your internet connection!")
      });
  }

  
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


   const findArchitect = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredArchitect(Architect.filter((architect) => architect.ArchitectName.search(regex) >= 0))
        const lng = (Architect.filter((architect) => architect.ArchitectName.search(regex) >= 0).length)
        if(lng == 0){
          //console.log('yes')
          setNoArchitect(query)
        }
        else{
          setNoArchitect(null)
        }
    } else {
      setNoArchitect(null)
      setFilteredArchitect([]);
    }
  };

  const AddArchitect = async() => {
    if(NoArchitect == null || NoArchitect == ''){
      Alert.alert("","Please enter architect name")
    }
    else if(ArchitectsPhoneNumber == null || ArchitectsPhoneNumber == ''){
      Alert.alert("","Please enter architect phone number")
    }
    else{
      setArchitectModal(false)
      setLoadArchitect(false)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HighestID_ArchitectApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.text())
     .then((Architectid) => {
      // setArchitectModal(false)
      // setLoadArchitect(false)
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ArchitectAddSubmitApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({ 
          "architectid": Architectid,
          "architectname": NoArchitect,
          "companyname":  ArchitectsCompanyName,
          "contactpersonname":  ArchitectsContactPersonName,
          "designation":   ArchitectsDesignation,
          "address":   ArchitectsAddress,
          "UAN":  ArchitectsUAN,
          "office":  ArchitectsOffice,
          "mobile":   ArchitectsPhoneNumber,
          "email": ArchitectsEmail
      })
       }).then((response) => response.text())
       .then((json) => {
         console.log(json)
         setArchitect([])
         setArchitectsPhoneNumber(null)
         setNoArchitect(null)
         setArchitectsEmail(null)
         setArchitectsAddress(null)
         setArchitectsCompanyName(null)
         setArchitectsContactPersonName(null)
         setArchitectsDesignation(null)
         setArchitectsUAN(null)
         setArchitectsOffice(null)
         ToastAndroid.show("Architect add successfully", ToastAndroid.SHORT)
         getArchitects()
       })
       .catch((error) => {
         console.error(error);
         //Alert.alert("","Please check your internet connection!")
       });
     })
     .catch((error) => {
       console.error(error);
       //Alert.alert("","Please check your internet connection!")
     });
    }
}


const AddBuilder = async() => {
  if(NoBuilder == null || NoBuilder == ''){
    Alert.alert("","Please enter builder name")
  }
  else if(BuilderPhoneNumber == null || BuilderPhoneNumber == ''){
    Alert.alert("","Please enter builder phone number")
  }
  else{
    setBuilderModal(false)
    setLoadBuilder(false)
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HighestID_BuilderApi.php',{
     method: 'POST',
     headers: {
         "Content-Type": "application/json"
     },
   }).then((response) => response.text())
   .then((Builderid) => {
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BuilderAddSubmitApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({ 
        "builderid": Builderid,
        "buildername": NoBuilder,
        "companyname":  BuilderCompanyName,
        "contactpersonname":  BuilderContactPersonName,
        "designation":   BuilderDesignation,
        "address":   BuilderAddress,
        "UAN":  BuilderUAN,
        "office":  BuilderOffice,
        "mobile":   BuilderPhoneNumber,
        "email": BuilderEmail
    })
     }).then((response) => response.text())
     .then((json) => {
       console.log(json)
       setBuilders([])
       setBuilderPhoneNumber(null)
       setNoBuilder(null)
       setBuilderEmail(null)
       setBuilderAddress(null)
       setBuilderCompanyName(null)
       setBuilderContactPersonName(null)
       setBuilderDesignation(null)
       setBuilderUAN(null)
       setBuilderOffice(null)
       ToastAndroid.show("Builder add successfully", ToastAndroid.SHORT)
       getBuilders()
     })
     .catch((error) => {
       console.error(error);
       //Alert.alert("","Please check your internet connection!")
     });
   })
   .catch((error) => {
     console.error(error);
     //Alert.alert("","Please check your internet connection!")
   });
  }
}

  const findBuilder = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredBuilder(Builders.filter((builder) => builder.BuilderName.search(regex) >= 0))
        const lng = (Builders.filter((builder) => builder.BuilderName.search(regex) >= 0).length)
        if(lng == 0){
          //console.log('yes')
          setNoBuilder(query)
        }
        else{
          setNoBuilder(null)
        }
    } else {
      setNoBuilder(null)
      setFilteredBuilder([]);
    }
  };


  const AddContractor = async() => {
    if(NoContractor == null || NoContractor == ''){
      Alert.alert("","Please enter contractor name")
    }
    else if(ContractorPhoneNumber == null || ContractorPhoneNumber == ''){
      Alert.alert("","Please enter contractor phone number")
    }
    else{
      setContractorModal(false)
      setLoadContractor(false)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HighestID_ContractorApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.text())
     .then((Contractorid) => {
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ContractorAddSubmitApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({ 
          "contractorid": Contractorid,
          "contractorname": NoContractor,
          "companyname":  ContractorCompanyName,
          "contactpersonname":  ContractorContactPersonName,
          "designation":   ContractorDesignation,
          "address":   ContractorAddress,
          "UAN":  ContractorUAN,
          "office":  ContractorOffice,
          "mobile":   ContractorPhoneNumber,
          "email": ContractorEmail
      })
       }).then((response) => response.text())
       .then((json) => {
         console.log(json)
         setContractor([])
         setContractorPhoneNumber(null)
         setNoContractor(null)
         setContractorEmail(null)
         setContractorAddress(null)
         setContractorCompanyName(null)
         setContractorContactPersonName(null)
         setContractorDesignation(null)
         setContractorUAN(null)
         setContractorOffice(null)
         ToastAndroid.show("Contractor add successfully", ToastAndroid.SHORT)
         getContractors()
       })
       .catch((error) => {
         console.error(error);
         //Alert.alert("","Please check your internet connection!")
       });
     })
     .catch((error) => {
       console.error(error);
       //Alert.alert("","Please check your internet connection!")
     });
    }
  }

  const findContractor = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredContractor(Contractor.filter((contractor) => contractor.ContractorName.search(regex) >= 0))
        const lng = (Contractor.filter((contractor) => contractor.ContractorName.search(regex) >= 0).length)
        if(lng == 0){
          //console.log('yes')
          setNoContractor(query)
        }
        else{
          setNoContractor(null)
        }
    } else {
      setNoContractor(null)
      setFilteredContractor([]);
    }
  };


  const AddInteriorDesigner = async() => {
    if(NoInteriorDesigner == null || NoInteriorDesigner == ''){
      Alert.alert("","Please enter interior designer name")
    }
    else if(InteriorDesignerPhoneNumber == null || InteriorDesignerPhoneNumber == ''){
      Alert.alert("","Please enter interior designer phone number")
    }
    else{
      setInteriorDesignerModal(false)
      setLoadInteriorDesigner(false)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HighestID_InteriorDesignerApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.text())
     .then((InteriorDesignerid) => {
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/InteriorDesignerAddSubmitApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({ 
          "interiordesignerid": InteriorDesignerid,
          "interiordesignername": NoInteriorDesigner,
          "companyname":  InteriorDesignerCompanyName,
          "contactpersonname":  InteriorDesignerContactPersonName,
          "designation":   InteriorDesignerDesignation,
          "address":   InteriorDesignerAddress,
          "UAN":  InteriorDesignerUAN,
          "office":  InteriorDesignerOffice,
          "mobile":   InteriorDesignerPhoneNumber,
          "email": InteriorDesignerEmail
      })
       }).then((response) => response.text())
       .then((json) => {
         console.log(json)
         setInteriorDesigner([])
         setInteriorDesignerPhoneNumber(null)
         setNoInteriorDesigner(null)
         setInteriorDesignerEmail(null)
         setInteriorDesignerAddress(null)
         setInteriorDesignerCompanyName(null)
         setInteriorDesignerContactPersonName(null)
         setInteriorDesignerDesignation(null)
         setInteriorDesignerUAN(null)
         setInteriorDesignerOffice(null)
         ToastAndroid.show("Interior designer add successfully", ToastAndroid.SHORT)
         getInteriorDesigner()
       })
       .catch((error) => {
         console.error(error);
         //Alert.alert("","Please check your internet connection!")
       });
     })
     .catch((error) => {
       console.error(error);
       //Alert.alert("","Please check your internet connection!")
     });
    }
  }

  const findInteriorDesigner = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredInteriorDesigner(InteriorDesigner.filter((interiordesigner) => interiordesigner.InteriorDesignerName.search(regex) >= 0))
        const lng = (InteriorDesigner.filter((interiordesigner) => interiordesigner.InteriorDesignerName.search(regex) >= 0).length)
        if(lng == 0){
          //console.log('yes')
          setNoInteriorDesigner(query)
        }
        else{
          setNoInteriorDesigner(null)
        }
    } else {
      setNoInteriorDesigner(null)
      setFilteredInteriorDesigner([]);
    }
  };


  const AddElectricalConsultant = async() => {
    if(NoElectricalConsultant == null || NoElectricalConsultant == ''){
      Alert.alert("","Please enter electrical consultant name")
    }
    else if(ElectricalConsultantPhoneNumber == null || ElectricalConsultantPhoneNumber == ''){
      Alert.alert("","Please enter electrical consultant phone number")
    }
    else{
      setElectricalConsultantModal(false)
      setLoadElectricalConsultant(false)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/HighestID_ConsultantApi.php',{
       method: 'POST',
       headers: {
           "Content-Type": "application/json"
       },
     }).then((response) => response.text())
     .then((ElectricalConsultantid) => {
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ConsultantAddSubmitApi.php',{
         method: 'POST',
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({ 
          "consultantid": ElectricalConsultantid,
          "consultantname": NoElectricalConsultant,
          "companyname":  ElectricalConsultantCompanyName,
          "contactpersonname":  ElectricalConsultantContactPersonName,
          "designation":   ElectricalConsultantDesignation,
          "address":   ElectricalConsultantAddress,
          "UAN":  ElectricalConsultantUAN,
          "office":  ElectricalConsultantOffice,
          "mobile":   ElectricalConsultantPhoneNumber,
          "email": ElectricalConsultantEmail
      })
       }).then((response) => response.text())
       .then((json) => {
         console.log(json)
         setElectricalConsultant([])
         setElectricalConsultantPhoneNumber(null)
         setNoElectricalConsultant(null)
         setElectricalConsultantEmail(null)
         setElectricalConsultantAddress(null)
         setElectricalConsultantCompanyName(null)
         setElectricalConsultantContactPersonName(null)
         setElectricalConsultantDesignation(null)
         setElectricalConsultantUAN(null)
         setElectricalConsultantOffice(null)
         ToastAndroid.show("Electrical consultant add successfully", ToastAndroid.SHORT)
         getElectricalConsultant()
       })
       .catch((error) => {
         console.error(error);
         //Alert.alert("","Please check your internet connection!")
       });
     })
     .catch((error) => {
       console.error(error);
       //Alert.alert("","Please check your internet connection!")
     });
    }
  }


  const findElectricalConsultant = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
        setFilteredElectricalConsultant(ElectricalConsultant.filter((consultant) => consultant.ConsultantName.search(regex) >= 0))
        const lng = (ElectricalConsultant.filter((consultant) => consultant.ConsultantName.search(regex) >= 0).length)
        if(lng == 0){
          //console.log('yes')
          setNoElectricalConsultant(query)
        }
        else{
          setNoElectricalConsultant(null)
        }
    } else {
      setNoElectricalConsultant(null)
      setFilteredElectricalConsultant([]);
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

const getArchitects = async() => {
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ArchitectApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((json) => {
      //console.log(json)
      setArchitect(json)
      setLoadArchitect(true)
    })
    .catch((error) => {
      console.error(error)
      setLoadArchitect(true)
     // Alert.alert("","Please check your internet connection!")
    });
}

const getBuilders = async() => {
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BuilderApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((json) => {
      //console.log(json)
      setBuilders(json)
      setLoadBuilder(true)
    })
    .catch((error) => {
      console.error(error);
      setLoadBuilder(true)
      //Alert.alert("","Please check your internet connection!")
    });
}

const getContractors = async() => {
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ContractorApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((json) => {
      //console.log(json)
      setContractor(json)
      setLoadContractor(true)
    })
    .catch((error) => {
      setLoadContractor(true)
      console.error(error);
      //Alert.alert("","Please check your internet connection!")
    });
}


const getElectricalConsultant = async() => {
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ConsultantApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((json) => {
      //console.log(json)
      setElectricalConsultant(json)
      setLoadElectricalConsultant(true)
    })
    .catch((error) => {
      setLoadElectricalConsultant(true)
      console.error(error);
      //Alert.alert("","Please check your internet connection!")
    });
}


const getInteriorDesigner = async() => {
  fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/InteriorDesignerApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.json())
    .then((json) => {
      //console.log(json)
      setInteriorDesigner(json)
      setLoadInteriorDesigner(true)
    })
    .catch((error) => {
      setLoadInteriorDesigner(true)
      console.error(error);
      //Alert.alert("","Please check your internet connection!")
    });
}
 

   const AddProjectDetail = async() => {
    if( (ProjectLead == '') || (ProjectLead == null) ){
      Alert.alert("","Please enter project name/address")
    }
    else if( BuildingStage == null ){
       Alert.alert("","Please select building stage")
     }
     else{
     if(ProjectDetail.ProjectType.ProjectType == 'Residential'){

      setLoading(true)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/MaxID_ScoutResApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.text())
    .then((text) => {
      console.log('===>',text)
      ///////////////////////////////////////////
      fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ScoutResidentialApi.php',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
      "projectid" : 'SLR-'+text,
      "userid" : UserId,
      "employeename": UserName,
      "projecttype" : ProjectDetail.ProjectType.ProjectType,
      "date" : moment().format('LL'),
      "time" : moment().format('hh:mm:ss A'),
      "city" : ProjectDetail.ProjectType.City,
      "area" : ProjectDetail.ProjectType.Area,
      "blockphase" : ProjectDetail.ProjectType.Block,
      "buildingtype" : ProjectDetail.ProjectType.Type,
      "size" : ProjectDetail.ProjectType.Size,
      "address" : ProjectDetail.ProjectType.Address,
      "pinlocation" : ProjectDetail.ProjectType.Latitude +", "+ ProjectDetail.ProjectType.Longitude,
      "images" : ProjectDetail.ProjectType.Image.toString(),
      "projectlead" : ProjectLead,
      "architect" : SelectedArchitect.ArchitectName,
      "contactpersonname" : ProjectDetail.ProjectType.ContactPersonName,
      "contactphonenumber" : ProjectDetail.ProjectType.ContactPersonPhoneNumber,
      "architectphonenumber":SelectedArchitect.MobileNumber,
      "builder" : SelectedBuilder.BuilderName,
      "interiordesigner" : SelectedInteriorDesigner.InteriorDesignerName,
      "electricalconsultant" : SelectedElectricalConsultant.ConsultantName,
      "civilconstructor" : SelectedContractor.ContractorName,
      "tags" : Tags,
      "buildingstage" : BuildingStage,
      "client" : Client,
      "comment": Comment
      })
      }).then((response) => response.text())
      .then((txt) => {
        console.log('===>',txt)
      var salesperson = [];
        try {
          console.log("in try")
          console.log('----->',JSON.parse(txt).salesperson);
          salesperson = JSON.parse(txt).salesperson;
        } catch (ex) {
          console.log(ex)
          console.log("in catch")
        }
        console.log('===>',salesperson)

        ///////////////////////////////////////////////////
        var users = [];
        if(salesperson.length == 0){
          console.log('no sales person found');
          setProjectLead(null)
                setSelectedArchitect({})
                //setArchitectsPhoneNumber(null)
                setSelectedBuilder({})
                setSelectedInteriorDesigner({})
                setSelectedElectricalConsultant({})
                setSelectedContractor({})
                setTags(null)
                setBuildingStage(null)
                setClient(null)
                setComment(null)
                  navigation.navigate("THANKYOU")
                  setLoading(false)
        }
        else{
          for(let i = 0 ; i < salesperson.length ; i++){
            // comment it
            //salesperson[i] = '4';
            firestore()
            .collection('Users')
            .where('userid', '==', salesperson[i])
            .get()
            .then((querySnapshot) => {
            querySnapshot.forEach(documentSnapshot => {             
            users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            });
            console.log('+=>',users)
            ////////////////////////////////////////////////
            fetch('https://fcm.googleapis.com/fcm/send',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "key=AAAAVSUcVXQ:APA91bH7OYYts_0JMkq7EtGa6kqBdIcUhFjt56A1SRJmKpdJUeWmjPg_kLjAdGCNdkC1EdxE-kOdjiS9958VWsvkUXqVq0BeCHu5iAFtdM7zUF3DqSOjGARirDmmJ0PoCKLVC5AsuTXR"
                },
                body: JSON.stringify({
  
                  "notification": {
                    "title": "New Location Alloted",
                    "body": "A new location alloted to you. Tap to view details"
                },
                "data" : {
                  "userid" : salesperson[i],
                  "status" : "alloted"
                },
                "to": users[i].token
  
              })
              }).then((response) => response.json())
              .then((json) => {
                console.log('===>',json)
                AsyncStorage.setItem('ProjectType', 'true')
                /////////////////////PHP Noti///////////////////////////
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "user_id" : users[i].key,
                "title" : "New Location Alloted",
                "body" : "A new location alloted to you. Tap to view details",
                "status" : "alloted"
              })
              }).then((response) => response.text())
            .then((text) => {
              console.log('+++>',text)
                setProjectLead(null)
                setSelectedArchitect({})
                //setArchitectsPhoneNumber(null)
                setSelectedBuilder({})
                setSelectedInteriorDesigner({})
                setSelectedElectricalConsultant({})
                setSelectedContractor({})
                setTags(null)
                setBuildingStage(null)
                setClient(null)
                setComment(null)
                  navigation.navigate("THANKYOU")
                  setLoading(false)
            })
                .catch((error) => {
                setLoading(false)
                  console.error(error);
            })
                /////////////////////PHP Noti///////////////////////////
              })
              .catch((error) => {
                console.error(error);
                setLoading(false)
              })
            ////////////////////////////////////////////////
            });
            });
            
          }
        }
        //////////////////////////////////////////////////
      
      })
      .catch((error) => {
        console.error(error);
        //Alert.alert("","Please check your internet connection!")
        setLoading(false)
      });
      /////////////////////////////////////////
    })
    .catch((error) => {
      console.error(error);
      //Alert.alert("","Please check your internet connection!")
      setLoading(false)
    });

    }
     else if(ProjectDetail.ProjectType.ProjectType == 'Commercial'){

    setLoading(true)
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/MaxID_ScoutComApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    }).then((response) => response.text())
    .then((text) => {
      console.log('===>',text)
      /////////////////////////////////////////
    fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/ScoutCommercialApi.php',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
    "projectid" : 'SLC-'+text,
    "userid" : UserId,
    "employeename": UserName,
    "projecttype" : ProjectDetail.ProjectType.ProjectType,
    "date" : moment().format('LL'),
    "time" : moment().format('hh:mm:ss A'),
    "city" : ProjectDetail.ProjectType.City,
    "area" : ProjectDetail.ProjectType.Area,
    "blockphase" : ProjectDetail.ProjectType.Block,
    "buildingtype" : ProjectDetail.ProjectType.Type,
    "size" : ProjectDetail.ProjectType.Size,
    "address" : ProjectDetail.ProjectType.Address,
    "pinlocation" : ProjectDetail.ProjectType.Latitude +", "+ ProjectDetail.ProjectType.Longitude,
    "images" : ProjectDetail.ProjectType.Image.toString(),
    "projectlead" : ProjectLead,
    "architect" : SelectedArchitect.ArchitectName,
    "architectphonenumber":SelectedArchitect.MobileNumber,
    "builder" : SelectedBuilder.BuilderName,
    "interiordesigner" : SelectedInteriorDesigner.InteriorDesignerName,
    "electricalconsultant" : SelectedElectricalConsultant.ConsultantName,
    "civilconstructor" : SelectedContractor.ContractorName,
    "tags" : Tags,
    "buildingstage" : BuildingStage,
    "client" : Client,
    "comment": Comment
    })
    }).then((response) => response.text())
    .then((txt) => {
      console.log('===>',txt)
      var salesperson = [];
        try {
          console.log("in try")
          console.log('----->',JSON.parse(txt).salesperson);
          salesperson = JSON.parse(txt).salesperson;
        } catch (ex) {
          console.log(ex)
          console.log("in catch")
        }
        console.log('===>',salesperson)

        ///////////////////////////////////////////////////
        var users = [];
        if(salesperson.length == 0){
          console.log('no sales person found');
          setProjectLead(null)
          setSelectedArchitect({})
          setSelectedBuilder({})
          setSelectedInteriorDesigner({})
          setSelectedElectricalConsultant({})
          setSelectedContractor({})
          setTags(null)
          setBuildingStage(null)
          setClient(null)
          setComment(null)
          navigation.navigate("THANKYOU")
          setLoading(false)
        }
        else{
          for(let i = 0 ; i < salesperson.length ; i++){
            // comment it
            // salesperson[i] = '4';
            firestore()
            .collection('Users')
            .where('userid', '==', salesperson[i])
            .get()
            .then((querySnapshot) => {
            querySnapshot.forEach(documentSnapshot => {             
            users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            });
            console.log('+=>',users)
            ////////////////////////////////////////////////
            fetch('https://fcm.googleapis.com/fcm/send',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "key=AAAAVSUcVXQ:APA91bH7OYYts_0JMkq7EtGa6kqBdIcUhFjt56A1SRJmKpdJUeWmjPg_kLjAdGCNdkC1EdxE-kOdjiS9958VWsvkUXqVq0BeCHu5iAFtdM7zUF3DqSOjGARirDmmJ0PoCKLVC5AsuTXR"
                },
                body: JSON.stringify({
  
                  "notification": {
                    "title": "New Location Alloted",
                    "body": "A new location alloted to you. Tap to view details"
                },
                "data" : {
                  "userid" : salesperson[i],
                  "status" : "alloted"
                },
                "to": users[i].token
  
              })
              }).then((response) => response.json())
              .then((json) => {
                console.log('===>',json)
                AsyncStorage.setItem('ProjectType', 'true')
              /////////////////////PHP Noti///////////////////////////
              fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/NotificationApi.php',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "user_id" : users[i].key,
                  "title" : "New Location Alloted",
                  "body" : "A new location alloted to you. Tap to view details",
                  "status" : "alloted"
                })
                }).then((response) => response.text())
              .then((text) => {
                console.log('+++>',text)
                    setProjectLead(null)
                    setSelectedArchitect({})
                    setSelectedBuilder({})
                    setSelectedInteriorDesigner({})
                    setSelectedElectricalConsultant({})
                    setSelectedContractor({})
                    setTags(null)
                    setBuildingStage(null)
                    setClient(null)
                    setComment(null)
                    navigation.navigate("THANKYOU")
                    setLoading(false)
              })
                  .catch((error) => {
                  setLoading(false)
                    console.error(error);
              })
                  /////////////////////PHP Noti///////////////////////////
              })
              .catch((error) => {
                console.error(error);
                setLoading(false)
              })
            ////////////////////////////////////////////////
            });
            });
            
          }

        }
        
        //////////////////////////////////////////////////
    
    })
    .catch((error) => {
      console.error(error);
     // Alert.alert("","Please check your internet connection!")
      setLoading(false)
    });

    //////////////////////////////////////////
    })
    .catch((error) => {
      console.error(error);
     // Alert.alert("","Please check your internet connection!")
      setLoading(false)
    });

    }
    else{
      Alert.alert("","Please select project type first")
      navigation.navigate("PROJECT")
    }
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
            onPress={()=>{
              navigation.navigate("PROJECT")
              AsyncStorage.setItem('ProjectType', 'false')
              }}
            >
                <FontAwesome name={"angle-left"} size={35} style={{marginLeft: 15}} />
            </TouchableOpacity>
            
            <View>
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', fontSize: 20, paddingTop: 7}}>SCOPE OF PROJECT</Text>
            </View>
            
            <View
              style={{right: 20}}
            />
            {/* <TouchableOpacity
            //onPress={()=>navigation.openDrawer()}
            onPress={()=>Alert.alert("","Under Development")}
            >
            <AntDesign name={"bars"} size={35} style={{marginRight: 10}} />
            </TouchableOpacity>         */}
        </View>

        <ScrollView style={{height: '100%', width: '100%'}}>

        <View style={{marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Project Name/Address *"
        value={ProjectLead}
        onChangeText={text => setProjectLead(text)}
        />        
        </View>

        {LoadArchitect ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, width: '85%'}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredArchitect}
          defaultValue={
            JSON.stringify(SelectedArchitect) === '{}' ?
            '' :
            SelectedArchitect.ArchitectName
          }
         onChangeText={(text) => findArchitect(text)}
          placeholder="Enter Architect Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedArchitect(item);
                setFilteredArchitect([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.ArchitectName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        {NoArchitect ? <TouchableOpacity
        onPress={()=>setArchitectModal(true)}
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, right: 15}}
        >
        <AntDesign name={"pluscircleo"} size={30} color={"#f8ae4e"} style={{elevation: 2, backgroundColor: '#fff', borderRadius: 15}}/>
        </TouchableOpacity> : null
        }

      </View> : 
      
      <View  style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12, height: 55, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 16}}>Loading Architects...</Text>
      </View>
      }

        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedArchitect}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedArchitect(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Architect" value={null} />
        {myArchitects}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Architect * </Text>
        </View> */}

        {/* <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}} //, width: '86%'
        keyboardType="number-pad"
        maxLength={11}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Architect Phone Number *"
        value={ArchitectsPhoneNumber}
        onChangeText={text => setArchitectsPhoneNumber(text)}
        />
        </View> */}

        {LoadBuilder ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, width: '85%'}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredBuilder}
          defaultValue={
            JSON.stringify(SelectedBuilder) === '{}' ?
            '' :
            SelectedBuilder.BuilderName
          }
         onChangeText={(text) => findBuilder(text)}
          placeholder="Enter Builder Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedBuilder(item);
                setFilteredBuilder([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.BuilderName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        {NoBuilder ? <TouchableOpacity
        onPress={()=>setBuilderModal(true)}
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, right: 15}}
        >
        <AntDesign name={"pluscircleo"} size={30} color={"#f8ae4e"} style={{elevation: 2, backgroundColor: '#fff', borderRadius: 15}}/>
        </TouchableOpacity> : null
        }

      </View> : 
      
      <View  style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12, height: 55, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 16}}>Loading Builders...</Text>
      </View>
      }
        
        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedBuilder}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedBuilder(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Builder" value={null} />
        {myBuilders}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Builder </Text>
        </View> */}

{/* , flexDirection: 'row', width: '100%', justifyContent: 'space-between'
         <Tooltip
          animated={true}
          arrowSize={{width: 16, height: 8}}
          backgroundColor="rgba(0,0,0,0.5)"
          isVisible={toolTipVisible}
          content={<Text>* Architect Name & Contact Detail</Text>}
          placement="bottom"
          onClose={() => setToolTipVisible(false)}
        >
          <TouchableOpacity
          style={{ top: 17, right: 5}}
            onPress={() => setToolTipVisible(true)}>
            <Foundation name={"info"} size={40} />
          </TouchableOpacity>
        </Tooltip> */}


        {LoadInteriorDesigner ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, width: '85%'}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredInteriorDesigner}
          defaultValue={
            JSON.stringify(SelectedInteriorDesigner) === '{}' ?
            '' :
            SelectedInteriorDesigner.InteriorDesignerName
          }
         onChangeText={(text) => findInteriorDesigner(text)}
          placeholder="Enter Interior Designer Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedInteriorDesigner(item);
                setFilteredInteriorDesigner([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.InteriorDesignerName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        {NoInteriorDesigner ? <TouchableOpacity
        onPress={()=>setInteriorDesignerModal(true)}
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, right: 15}}
        >
        <AntDesign name={"pluscircleo"} size={30} color={"#f8ae4e"} style={{elevation: 2, backgroundColor: '#fff', borderRadius: 15}}/>
        </TouchableOpacity> : null
        }

      </View> : 
      
      <View  style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12, height: 55, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 16}}>Loading Interior Designers...</Text>
      </View>
      }

        {/* <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Interior Designers"
        value={InteriorDesigner}
        onChangeText={text => setInteriorDesigner(text)}
        />        
        </View>      */}

        {LoadElectricalConsultant ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, width: '85%'}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredElectricalConsultant}
          defaultValue={
            JSON.stringify(SelectedElectricalConsultant) === '{}' ?
            '' :
            SelectedElectricalConsultant.ConsultantName
          }
         onChangeText={(text) => findElectricalConsultant(text)}
          placeholder="Enter Electrical Consultant Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedElectricalConsultant(item);
                setFilteredElectricalConsultant([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.ConsultantName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        {NoElectricalConsultant ? <TouchableOpacity
        onPress={()=>setElectricalConsultantModal(true)}
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, right: 15}}
        >
        <AntDesign name={"pluscircleo"} size={30} color={"#f8ae4e"} style={{elevation: 2, backgroundColor: '#fff', borderRadius: 15}}/>
        </TouchableOpacity> : null
        }

      </View> : 
      
      <View  style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12, height: 55, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 16}}>Loading Electrical Consultants...</Text>
      </View>
      }

        {/* <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Electrical Consultants"
        value={ElectricalConsultants}
        onChangeText={text => setElectricalConsultants(text)}
        />        
        </View> */}

        

        {LoadContractor ? <View style={{ marginLeft: 10, marginRight: 10, marginTop: 12}}>
        <Autocomplete
          style={{ color: '#000', height: 55, paddingLeft: 15, fontSize: 16, width: '85%'}}
          inputContainerStyle={{borderColor: 'grey', borderRadius: 5}}
          listContainerStyle={{elevation: 5, backgroundColor: '#fff'}}
          autoCapitalize="none"
          autoCorrect={false}
          hideResults={false}
          keyboardType="visible-password"
          data={FilteredContractor}
          defaultValue={
            JSON.stringify(SelectedContractor) === '{}' ?
            '' :
            SelectedContractor.ContractorName
          }
         onChangeText={(text) => findContractor(text)}
          placeholder="Enter Civil Contractor Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedContractor(item);
                setFilteredContractor([]);
              }}>
              <View style={{backgroundColor: '#fff', height: 50, justifyContent: 'center'}}>
              <Text style={{paddingLeft: 10, fontSize: 15}}>
                  {item.ContractorName}
              </Text>
              </View>
            </TouchableOpacity>
          )
      }}
        />

        {NoContractor ? <TouchableOpacity
        onPress={()=>setContractorModal(true)}
        style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, right: 15}}
        >
        <AntDesign name={"pluscircleo"} size={30} color={"#f8ae4e"} style={{elevation: 2, backgroundColor: '#fff', borderRadius: 15}}/>
        </TouchableOpacity> : null
        }

      </View> : 
      
      <View  style={{ marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 12, height: 55, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#f8ae4e', fontFamily: 'Karla-Bold', fontSize: 16}}>Loading Civil Contractors...</Text>
      </View>
      }

        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 12, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedContractor}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedContractor(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Contractor" value={null} />
        {myContractors}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 47}}> Civil Contractor </Text>
        </View> */}

        {/* <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Civil Contractors"
        value={CivilContractors}
        onChangeText={text => setCivilContractors(text)}
        />        
        </View> */}

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Land Mark"
        value={Tags}
        onChangeText={text => setTags(text)}
        />        
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5}}>
        <Picker
        selectedValue={BuildingStage}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(itemValue, itemIndex) =>
        setBuildingStage(itemValue)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Building Stage" value={null} />
        {myBuildingStage}

        {/* <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Grey Structure" value="Grey Structure" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Finishing" value="Finishing" /> */}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 45}}> Building Stage * </Text>
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
        visible={ArchitectModal}
        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{height: '100%', width: '100%', backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
          <View style={{backgroundColor:'#fff', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20,  borderRadius: 5, alignItems: 'center', elevation: 10}}>
          
        <TouchableOpacity
        onPress={()=>setArchitectModal(false)}
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
        label="Architect Name *"
        value={NoArchitect}
        onChangeText={text => setNoArchitect(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="number-pad"
        maxLength={11}
        selectionColor="#000"
        mode= "outlined"
        label="Architect Phone Number *"
        value={ArchitectsPhoneNumber}
        onChangeText={text => setArchitectsPhoneNumber(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Architect Email"
        value={ArchitectsEmail}
        onChangeText={text => setArchitectsEmail(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={ArchitectsCompanyName}
        onChangeText={text => setArchitectsCompanyName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={ArchitectsContactPersonName}
        onChangeText={text => setArchitectsContactPersonName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={ArchitectsDesignation}
        onChangeText={text => setArchitectsDesignation(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        value={ArchitectsUAN}
        onChangeText={text => setArchitectsUAN(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        value={ArchitectsOffice}
        onChangeText={text => setArchitectsOffice(text)}
        />
        </View>

        <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Architect Address"
        value={ArchitectsAddress}
        onChangeText={text => setArchitectsAddress(text)}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', height: 40, width: '50%', borderRadius: 5, marginBottom: 20, elevation: 5, alignItems: 'center', justifyContent: 'center'}}
        onPress={AddArchitect}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 15}}>Add Architect</Text>

        </TouchableOpacity>
        

          </View>
        </ScrollView>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={BuilderModal}
        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{height: '100%', width: '100%', backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
          <View style={{backgroundColor:'#fff', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20,  borderRadius: 5, alignItems: 'center', elevation: 10}}>
          
        <TouchableOpacity
        onPress={()=>setBuilderModal(false)}
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
        label="Builder Name *"
        value={NoBuilder}
        onChangeText={text => setNoBuilder(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="number-pad"
        maxLength={11}
        selectionColor="#000"
        mode= "outlined"
        label="Builder Phone Number *"
        value={BuilderPhoneNumber}
        onChangeText={text => setBuilderPhoneNumber(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Builder Email"
        value={BuilderEmail}
        onChangeText={text => setBuilderEmail(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={BuilderCompanyName}
        onChangeText={text => setBuilderCompanyName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={BuilderContactPersonName}
        onChangeText={text => setBuilderContactPersonName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={BuilderDesignation}
        onChangeText={text => setBuilderDesignation(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        value={BuilderUAN}
        onChangeText={text => setBuilderUAN(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        value={BuilderOffice}
        onChangeText={text => setBuilderOffice(text)}
        />
        </View>

        <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Builder Address"
        value={BuilderAddress}
        onChangeText={text => setBuilderAddress(text)}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', height: 40, width: '50%', borderRadius: 5, marginBottom: 20, elevation: 5, alignItems: 'center', justifyContent: 'center'}}
        onPress={AddBuilder}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 15}}>Add Builder</Text>

        </TouchableOpacity>
        

          </View>
        </ScrollView>
        </Modal>


        <Modal
        animationType="slide"
        transparent={true}
        visible={ContractorModal}
        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{height: '100%', width: '100%', backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
          <View style={{backgroundColor:'#fff', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20,  borderRadius: 5, alignItems: 'center', elevation: 10}}>
          
        <TouchableOpacity
        onPress={()=>setContractorModal(false)}
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
        label="Contractor Name *"
        value={NoContractor}
        onChangeText={text => setNoContractor(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="number-pad"
        maxLength={11}
        selectionColor="#000"
        mode= "outlined"
        label="Contractor Phone Number *"
        value={ContractorPhoneNumber}
        onChangeText={text => setContractorPhoneNumber(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contractor Email"
        value={ContractorEmail}
        onChangeText={text => setContractorEmail(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={ContractorCompanyName}
        onChangeText={text => setContractorCompanyName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={ContractorContactPersonName}
        onChangeText={text => setContractorContactPersonName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={ContractorDesignation}
        onChangeText={text => setContractorDesignation(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        value={ContractorUAN}
        onChangeText={text => setContractorUAN(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        value={ContractorOffice}
        onChangeText={text => setContractorOffice(text)}
        />
        </View>

        <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contractor Address"
        value={ContractorAddress}
        onChangeText={text => setContractorAddress(text)}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', height: 40, width: '50%', borderRadius: 5, marginBottom: 20, elevation: 5, alignItems: 'center', justifyContent: 'center'}}
        onPress={AddContractor}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 15}}>Add Civil Contractor</Text>

        </TouchableOpacity>
        

          </View>
        </ScrollView>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={InteriorDesignerModal}
        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{height: '100%', width: '100%', backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
          <View style={{backgroundColor:'#fff', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20,  borderRadius: 5, alignItems: 'center', elevation: 10}}>
          
        <TouchableOpacity
        onPress={()=>setInteriorDesignerModal(false)}
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
        label="Interior Designer Name *"
        value={NoInteriorDesigner}
        onChangeText={text => setNoInteriorDesigner(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="number-pad"
        maxLength={11}
        selectionColor="#000"
        mode= "outlined"
        label="Interior Designer Phone Number *"
        value={InteriorDesignerPhoneNumber}
        onChangeText={text => setInteriorDesignerPhoneNumber(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Interior Designer Email"
        value={InteriorDesignerEmail}
        onChangeText={text => setInteriorDesignerEmail(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={InteriorDesignerCompanyName}
        onChangeText={text => setInteriorDesignerCompanyName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={InteriorDesignerContactPersonName}
        onChangeText={text => setInteriorDesignerContactPersonName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={InteriorDesignerDesignation}
        onChangeText={text => setInteriorDesignerDesignation(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        value={InteriorDesignerUAN}
        onChangeText={text => setInteriorDesignerUAN(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        value={InteriorDesignerOffice}
        onChangeText={text => setInteriorDesignerOffice(text)}
        />
        </View>

        <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Interior Designer Address"
        value={InteriorDesignerAddress}
        onChangeText={text => setInteriorDesignerAddress(text)}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', height: 40, width: '50%', borderRadius: 5, marginBottom: 20, elevation: 5, alignItems: 'center', justifyContent: 'center'}}
        onPress={AddInteriorDesigner}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 15}}>Add Interior Designer</Text>

        </TouchableOpacity>
        

          </View>
        </ScrollView>
        </Modal>


        <Modal
        animationType="slide"
        transparent={true}
        visible={ElectricalConsultantModal}
        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{height: '100%', width: '100%', backgroundColor: 'rgba(00, 00, 00, 0.5)'}}>
          <View style={{backgroundColor:'#fff', marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 20,  borderRadius: 5, alignItems: 'center', elevation: 10}}>
          
        <TouchableOpacity
        onPress={()=>setElectricalConsultantModal(false)}
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
        label="Electrical Consultant Name *"
        value={NoElectricalConsultant}
        onChangeText={text => setNoElectricalConsultant(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="number-pad"
        maxLength={11}
        selectionColor="#000"
        mode= "outlined"
        label="Electrical Consultant Phone Number *"
        value={ElectricalConsultantPhoneNumber}
        onChangeText={text => setElectricalConsultantPhoneNumber(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Electrical Consultant Email"
        value={ElectricalConsultantEmail}
        onChangeText={text => setElectricalConsultantEmail(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Company Name"
        value={ElectricalConsultantCompanyName}
        onChangeText={text => setElectricalConsultantCompanyName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Contact Person Name"
        value={ElectricalConsultantContactPersonName}
        onChangeText={text => setElectricalConsultantContactPersonName(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Designation"
        value={ElectricalConsultantDesignation}
        onChangeText={text => setElectricalConsultantDesignation(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="UAN"
        value={ElectricalConsultantUAN}
        onChangeText={text => setElectricalConsultantUAN(text)}
        />
        </View>

        <View style={{width: '100%', marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Office"
        value={ElectricalConsultantOffice}
        onChangeText={text => setElectricalConsultantOffice(text)}
        />
        </View>

        <View style={{width: '100%', marginBottom: 20, marginTop: 10}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Electrical Consultant Address"
        value={ElectricalConsultantAddress}
        onChangeText={text => setElectricalConsultantAddress(text)}
        />
        </View>

        <TouchableOpacity style={{backgroundColor: '#f8ae4e', height: 40, borderRadius: 5, marginBottom: 20, elevation: 5, alignItems: 'center', justifyContent: 'center'}}
        onPress={AddElectricalConsultant}
        >
        <Text style={{fontFamily: 'Karla-Bold', color: '#fff', fontSize: 15, paddingLeft: 10, paddingRight: 10}}>Add Electrical Consultant</Text>

        </TouchableOpacity>
        

          </View>
        </ScrollView>
        </Modal>

        <Text style={{alignSelf: 'flex-end', paddingRight: 10, paddingBottom: 3, fontFamily: 'Karla-Bold'}}>Step 2/2</Text>
        <TouchableOpacity
        onPress={AddProjectDetail}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>SUBMIT</Text>
        </TouchableOpacity>

        </View>
    )
      }
}

export default ScopeOfProjectScreen;