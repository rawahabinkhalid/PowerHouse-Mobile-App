import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, ScrollView, BackHandler, Alert, Image, FlatList, Modal, ActivityIndicator, ToastAndroid} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Picker} from '@react-native-picker/picker'
import { TextInput } from 'react-native-paper'
import BottomTab from '../Components/BottomTab'
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePicker from "react-native-customized-image-picker"
import Autocomplete from 'react-native-autocomplete-input'
import Geocoder from 'react-native-geocoding';

const AdminEditProjectScreen = ({ navigation, route }) => {

    const [Loading, setaLoading] = useState(false)
    
    const [ProjectType, setProjectType] = useState(null)
    
    const ProjectData = route.params
    
    const [Ecity, setEcity] = useState('')
    const [City, setCity] = useState([])
    const [FilteredCity, setFilteredCity] = useState([]);
    const [SelectedCity, setSelectedCity] = useState({})
    
    const [Earea, setEarea] = useState('')
    const [Area, setArea] = useState([])
    const [FilteredArea, setFilteredArea] = useState([]);
    const [SelectedArea, setSelectedArea] = useState({})

    const [Type, setType] = useState([])
    const [SelectedType, setSelectedType] = useState(null)
    const [Block, setBlock] = useState(null)
    const [Size, setSize] = useState(null)
    const [Address, setAddress] = useState(null)

    const [ConvertedImg, setConvertedImg] = useState([])

    const [ProjectLead, setProjectLead] = useState(null)

    const [Earchitect, setEarchitect] = useState('')
    const [EarchitectPhoneNumber, setEarchitectPhoneNumber] = useState(null)
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

    const [EBuilder, setEBuilder] = useState('')
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


    const [EContractor, setEContractor] = useState('')
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

    const [EInteriorDesigner, setEInteriorDesigner] = useState('')
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

    const [EElectricalConsultant, setEElectricalConsultant] = useState('')
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

    const [Tags, setTags] = useState(null)
    const [BuildingStage, setBuildingStage] = useState(null)
    const [Client, setClient] = useState(null)
    const [Comment, setComment] = useState(null)

    useEffect(() => {
        console.log(ProjectData.EditData.EmployeeID)
        console.log(ProjectData.EditData.EmployeeName)
        EditImages()
        FetchCity()
        FetchbuildingType(ProjectData.EditData.ProjectType)
        getArchitects()
        getBuilders()
        getContractors()
        getInteriorDesigner()
        getElectricalConsultant()
        FetchArea(ProjectData.EditData.City)
        setProjectType(ProjectData.EditData.ProjectType)
        setSelectedType(ProjectData.EditData.BuildingType)
        setEcity(ProjectData.EditData.City)
        setEarea(ProjectData.EditData.Area)
        setBlock(ProjectData.EditData.BlockPhase)
        setSize(ProjectData.EditData.Size)
        setAddress(ProjectData.EditData.Address)
        setProjectLead(ProjectData.EditData.ProjectLead)
        setEarchitect(ProjectData.EditData.Architect)
        setEarchitectPhoneNumber(ProjectData.EditData.ArchitectPhoneNumber)
        setEBuilder(ProjectData.EditData.Builder)
        setEContractor(ProjectData.EditData.CivilConstructor)
        setEInteriorDesigner(ProjectData.EditData.InteriorDesigner)
        setEElectricalConsultant(ProjectData.EditData.ElectricalConsultant)
        setTags(ProjectData.EditData.Tags)
        setBuildingStage(ProjectData.EditData.BuildingStage)
        setClient(ProjectData.EditData.Client)
        setComment(ProjectData.EditData.Comment)
     }, []);

     const EditImages = async() =>{
         const img = []
        for ( let i = 0 ; i < ProjectData.EditData.Image.split(",").length ; i++){
            if( i % 2 == 1 ){
            img.push('data:image/jpeg;base64,'+ProjectData.EditData.Image.split(",")[i])
            }
            }
            setConvertedImg(img)
     }

     const myType = Type.map((myValue,myIndex)=>{
        return(
            <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label={myValue.BuildingTypeName} value={myValue.BuildingTypeName} key={myValue.BuildingTypeId} />
        )
    })

     const FetchbuildingType = async(value) => {
        console.log('======', value)
        //setProjectType(value)
        fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/BuildingTypeApi.php',{
           method: 'POST',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
            "projecttype": value
        })
         }).then((response) => response.json())
         .then((json) => {
           //console.log(json)
           setType(json)
         })
         .catch((error) => {
           console.error(error);
          // Alert.alert("","Please check your internet connection!")
         });
    }

     const findCity = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredCity(City.filter((city) => city.CityName.search(regex) >= 0))
        }
        else {
          setFilteredCity([]);
        }
      };

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

    const findArea = (query) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
            setFilteredArea(Area.filter((area) => area.AreaName.search(regex) >= 0))
        } else {
          setFilteredArea([]);
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
          // Alert.alert("","Please check your internet connection!")
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


          const UpdateProject = async() =>{
            setaLoading(true)
              if(ProjectType == 'Residential')
              {
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/UpdateScoutResidentialApi.php',{
                  method: 'POST',
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    "id": ProjectData.EditData.Id,
                    "userid" : ProjectData.EditData.EmployeeID,
                    "employeename": ProjectData.EditData.EmployeeName,
                    "projecttype" : ProjectType,
                    "city" : Ecity,
                    "area" : Earea,
                    "blockphase" : Block,
                    "buildingtype" : SelectedType,
                    "size" : Size,
                    "address" : Address,
                    "pinlocation" : ProjectData.EditData.PinLocation,
                    "images" : ConvertedImg.toString(),
                    "projectlead" : ProjectLead,
                    "architect" : Earchitect,
                    "architectphonenumber":EarchitectPhoneNumber,
                    "builder" : EBuilder,
                    "interiordesigner" : EInteriorDesigner,
                    "electricalconsultant" : EElectricalConsultant,
                    "civilconstructor" : EContractor,
                    "tags" : Tags,
                    "buildingstage" : BuildingStage,
                    "client" : Client,
                    "comment": Comment
               })
                }).then((response) => response.text())
                .then((text) => {
                  console.log(text)
                  navigation.navigate("THANKYOUUPDATE")
                  setaLoading(false)
                })
                .catch((error) => {
                  console.error(error);
                  setaLoading(false)
                });
              }
              else if(ProjectType == 'Commercial'){
                fetch('https://mobileapp.powerhouse.com.pk/AdminPortal/Api/UpdateScoutCommercialApi.php',{
                  method: 'POST',
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    "id": ProjectData.EditData.Id,
                    "userid" : ProjectData.EditData.EmployeeID,
                    "employeename": ProjectData.EditData.EmployeeName,
                    "projecttype" : ProjectType,
                    "city" : Ecity,
                    "area" : Earea,
                    "blockphase" : Block,
                    "buildingtype" : SelectedType,
                    "size" : Size,
                    "address" : Address,
                    "pinlocation" : ProjectData.EditData.PinLocation,
                    "images" : ConvertedImg.toString(),
                    "projectlead" : ProjectLead,
                    "architect" : Earchitect,
                    "architectphonenumber":EarchitectPhoneNumber,
                    "builder" : EBuilder,
                    "interiordesigner" : EInteriorDesigner,
                    "electricalconsultant" : EElectricalConsultant,
                    "civilconstructor" : EContractor,
                    "tags" : Tags,
                    "buildingstage" : BuildingStage,
                    "client" : Client,
                    "comment": Comment
               })
                }).then((response) => response.text())
                .then((text) => {
                  console.log(text)
                  navigation.navigate("THANKYOUUPDATE")
                  setaLoading(false)
                })
                .catch((error) => {
                  console.error(error);
                  setaLoading(false)
                });
              }
              else{
                Alert.alert("","Please select project type")
                setaLoading(false)
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
            onPress={()=>navigation.navigate("ALLSCOUTED")}
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

        {/* <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 20, borderRadius: 5}}>
        <Picker
        selectedValue={ProjectType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>{
        FetchbuildingType(value)}
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Project Type" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Residential" value="Residential" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Commercial" value="Commercial" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 46.5}}> Project Type </Text>
        </View> */}

        <View style={{marginTop: 20}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        keyboardType="visible-password"
        selectionColor="#000"
        mode= "outlined"
        label="Project Type"
        value={ProjectType}
        editable={false}
        onChangeText={text => setProjectType(text)}
        />
        </View>

        <View style={{ marginLeft: 10, marginRight: 10, borderColor: 'grey', borderWidth: 1, marginTop: 10, borderRadius: 5}}>
        <Picker
        selectedValue={SelectedType}
        mode="dropdown"
        dropdownIconColor="#000000"
        style={{color: 'grey', marginLeft: 6}}
        onValueChange={(value) =>
        setSelectedType(value)
        }>
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Building Type" value={null} />
        {myType}
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 46.5}}> Type </Text>
        </View>

        <Text style={{top: 10, paddingLeft: 15, color: 'grey'}}>City</Text>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10}}>
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
            JSON.stringify(SelectedCity) === '{}' ?
            Ecity :
            SelectedCity.CityName
          }
         onChangeText={(text) => findCity(text)}
          placeholder="Enter City Name"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.CityId,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setEcity(item.CityName)
                FetchArea(item.CityName)
                setSelectedCity(item);
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

      <Text style={{top: 12, paddingLeft: 15, color: 'grey'}}>Area</Text>
      <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10}}>
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
            Earea :
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
                setEarea(item.AreaName)
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

      <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Block/Phase"
        value={Block}
        onChangeText={text => setBlock(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Size"
        value={Size}
        onChangeText={text => setSize(text)}
        />
        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
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
          <Text style={{color: '#fff', fontFamily: 'Karla-Bold' }}>Camera/Gallery</Text>
        </TouchableOpacity>

        </View>

        <View style={{marginTop: 5}}>
        <TextInput
        style={{backgroundColor: '#fff', marginLeft: 10, marginRight: 10}}
        keyboardType="visible-password"
        theme={{colors: {primary: '#f8ae4e', placeholder: 'grey', text: '#000'}}}
        selectionColor="#000"
        mode= "outlined"
        label="Owner Name *"
        value={ProjectLead}
        onChangeText={text => setProjectLead(text)}
        />        
        </View>

        <Text style={{top: 13, paddingLeft: 15, color: 'grey'}}>Architect</Text>

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
            Earchitect :
            SelectedArchitect.ArchitectName
          }
         onChangeText={(text) => findArchitect(text)}
          placeholder="Enter Architect Name *"
          placeholderTextColor="grey"
          flatListProps={{
        keyExtractor: (item) => item.Id,
        renderItem: ({item}) => (
            <TouchableOpacity
              onPress={() => {
                setEarchitect(item.ArchitectName)
                setEarchitectPhoneNumber(item.MobileNumber)
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

      <Text style={{top: 13, paddingLeft: 15, color: 'grey'}}>Builder</Text>
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
            EBuilder :
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
                setEBuilder(item.BuilderName)
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


      <Text style={{top: 13, paddingLeft: 15, color: 'grey'}}>Civil Contractor</Text>
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
            EContractor :
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
                setEContractor(item.ContractorName)
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

      <Text style={{top: 13, paddingLeft: 15, color: 'grey'}}>Interior Designer</Text>
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
            EInteriorDesigner :
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
                  setEInteriorDesigner(item.InteriorDesignerName)
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

      <Text style={{top: 13, paddingLeft: 15, color: 'grey'}}>Electrical Consultant</Text>
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
            EElectricalConsultant :
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
                setEElectricalConsultant(item.ConsultantName)
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
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Grey Structure" value="Grey Structure" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Finishing" value="Finishing" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 45}}> Building Stage </Text>
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
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Select Client" value={null} />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="New" value="New" />
        <Picker.Item style={{color: '#000', backgroundColor: '#fff'}} label="Existing" value="Existing" />
        </Picker>
        <Text style={{position: 'absolute', backgroundColor: '#fff', marginLeft: 9, color: 'grey', fontSize: 13, bottom: 45}}> Client </Text>
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

        <TouchableOpacity 
        onPress={UpdateProject}
        style={{backgroundColor: '#f8ae4e', height: 50, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold', fontSize: 23, elevation: 10}}>UPDATE</Text>
        </TouchableOpacity>
        
        </View>
    )
    }
}

export default AdminEditProjectScreen;