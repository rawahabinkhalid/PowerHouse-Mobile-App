import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import MyDrawer from './MyDrawer';
import ScoutingScreen from '../Screens/ScoutingScreen';
import ProjectScreen from '../Screens/ProjectScreen';
import ScopeOfProjectScreen from '../Screens/ScopeOfProjectScreen';
import ThankYouScreen from '../Screens/ThankYouScreen';
import ForgetScreen from '../Screens/ForgetScreen';
import StartMeeting from '../Screens/StartMeetingScreen';
import MeetingCatalogue from '../Screens/MeetingCatalogScreen';
import MeetingOrder from '../Screens/MeetingOrderScreen';
import MeetingDetailScreen from '../Screens/MeetingDetailScreen';
import CatalogScreen from '../Screens/CatalogScreen';
import MeetingPHCatalog from '../Screens/MeetingPHCatalogsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import StatsScreen from '../Screens/StatisticScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import MyScoutScreen from '../Screens/MyScoutScreen';
import MyMeetingScreen from '../Screens/MyMeetingScreen';
import MyOrderScreen from '../Screens/MyOrderScreen';
import AllReportsScreen from '../Screens/AllReportsScreen';
import AllScoutedLocationsScreen from '../Screens/AllScoutedLocationsScreen';
import MarketScreen from '../Screens/MarketScreen';
import EditScoutProjectScreen from '../Screens/EditScoutProjectScreen';
import ThankYouUpdateScreen from '../Screens/ThankYouUpdateScreen';
import EditScoutMarketScreen from '../Screens/EditScoutMarketScreen';
import ProjectReferralScreen from '../Screens/ProjectReferralScreen';
import ScopeOfReferralProjectScreen from '../Screens/ScopeOfReferralProjectScreen';
import MarketReferralScreen from '../Screens/MarketReferralScreen';
import AdminScreen from '../Screens/AdminScreen';
import AdminUserRegScreen from '../Screens/AdminUserRegScreen';
import AdminAllSetupForms from '../Screens/AdminAllSetupForms';
import AddCityScreen from '../Screens/AdminAllSetupForm/AddCityScreen';
import AddAreaScreen from '../Screens/AdminAllSetupForm/AddAreaScreen';
import AddCompanyScreen from '../Screens/AdminAllSetupForm/AddCompanyScreen';
import AddBranchScreen from '../Screens/AdminAllSetupForm/AddBranchScreen';
import AddDepartmentScreen from '../Screens/AdminAllSetupForm/AddDepartmentScreen';
import AddProductScreen from '../Screens/AdminAllSetupForm/AddProductScreen';
import AddBuildingTypeScreen from '../Screens/AdminAllSetupForm/AddBuildingTypeScreen';
import AddBuildingStageScreen from '../Screens/AdminAllSetupForm/AddBuildingStage';
import AddClientTypeScreen from '../Screens/AdminAllSetupForm/AddClientTypeScreen';
import AddDistributorScreen from '../Screens/AdminAllSetupForm/AddDistributorScreen';
import AddDealerScreen from '../Screens/AdminAllSetupForm/AddDealerScreen';
import AddArchitectScreen from '../Screens/AdminAllSetupForm/AddArchitectScreen';
import AddBuilderScreen from '../Screens/AdminAllSetupForm/AddBuilderScreen';
import AddContractorScreen from '../Screens/AdminAllSetupForm/AddContractorScreen';
import AddConsultantScreen from '../Screens/AdminAllSetupForm/AddConsultantScreen';
import AddCompetitorScreen from '../Screens/AdminAllSetupForm/AddCompetitorScreen';
import AddInteriorDesignerScreen from '../Screens/AdminAllSetupForm/AddInteriorDesignerScreen';
import AddBrandScreen from '../Screens/AdminAllSetupForm/AddBrandScreen';
import AdminEditProjectScreen from '../Screens/AdminEditProject';
import AdminEditMarketScreen from '../Screens/AdminEditMarket';
import AllMeetingScreen from '../Screens/AllMeetingScreen';
import AllOrderScreen from '../Screens/AllOrderScreen';
import AllotedLocationsScreen from '../Screens/AdminAllotedLocation';
import ServiceCallScreen from '../Screens/ServiceCallScreen';
import AdminUserReportsScreen from '../Screens/AdminUserReportScreen';
import AdminUserDPTScreen from '../Screens/AdminUserDPTScreen';
import AdminUserBrandScreen from '../Screens/AdminUserBrandScreen';
import HandShakeScreen from '../Screens/HandShakeScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import EditAllotedLocationScreen from '../Screens/EditAllotedLocationScreen';
import AdminUserTrackScreen from '../Screens/AdminUserTrackScreen';
import EditAllotedMarketScreen from '../Screens/EditAllotedMarketScreen';
import MeetingScreen from '../Screens/MeetingScreen';
import MeetingRecurringScreen from '../Screens/MeetingRecurringScreen';
import AllAllotedReportScreen from '../Screens/AllAllotedLocationReportScreen';
import MyTopTab from './MyTab';
import PHCatalog from '../Screens/PHCatalogsScreen';
import PriceListCatalogScreen from '../Screens/PriceListCatalogScreen';
import PriceListScreen from '../Screens/PriceListScreen';
import OrderScreen from '../Screens/OrderScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode= {false} >
        <Stack.Screen name="SPLASH" component={SplashScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        {/* <Drawer.Screen name="DASHBOARD" component={DashboardScreen} /> */}
        <Stack.Screen name="DASHBOARD" component={DashboardScreen} />
        {/* <Drawer.Screen name="TOPTAB" component={MyTopTab} /> */}
        <Stack.Screen name="TOPTAB" component={MyTopTab} />
        {/* <Stack.Screen name="DHOME" component={MyDrawer} /> */}
        {/* <Drawer.Screen name="CATALOG" component={CatalogScreen} /> */}
        <Stack.Screen name="CATALOG" component={CatalogScreen} />
        {/* <Drawer.Screen name="PHCATALOG" component={PHCatalog} /> */}
        <Stack.Screen name="PHCATALOG" component={PHCatalog} />
        {/* <Drawer.Screen name="PLCATALOG" component={PriceListCatalogScreen} /> */}
        <Stack.Screen name="PLCATALOG" component={PriceListCatalogScreen} />
        {/* <Drawer.Screen name="PRICELIST" component={PriceListScreen} /> */}
        <Stack.Screen name="PRICELIST" component={PriceListScreen} />
        {/* <Drawer.Screen name="ORDER" component={OrderScreen} /> */}
        <Stack.Screen name="ORDER" component={OrderScreen} />
        <Stack.Screen name="NOTIFICATION" component={NotificationScreen} />
        <Stack.Screen name="SCOUTING" component={ScoutingScreen}/>
        <Stack.Screen name="HANDSHAKE" component={HandShakeScreen} />
        <Stack.Screen name="PROJECT" component={ProjectScreen} />
        <Stack.Screen name="REFERRAL" component={ProjectReferralScreen} />
        <Stack.Screen name="MEETING" component={MeetingScreen} />
        <Stack.Screen name="RECURRINGMEETING" component={MeetingRecurringScreen} />
        <Stack.Screen name="SERVICE" component={ServiceCallScreen} />
        <Stack.Screen name="SCOPEPROJECT" component={ScopeOfProjectScreen} />
        <Stack.Screen name="SCOPEREFERRAL" component={ScopeOfReferralProjectScreen} />
        <Stack.Screen name="MARKET" component={MarketScreen} />
        <Stack.Screen name="MARKETREFERRAL" component={MarketReferralScreen} />
        <Stack.Screen name="THANKYOU" component={ThankYouScreen}  />
        <Stack.Screen name="FORGET" component={ForgetScreen} />
        <Stack.Screen name="MEETINGDETAIL" component={MeetingDetailScreen} />
        <Stack.Screen name="STARTMEETING" component={StartMeeting} />
        <Stack.Screen name="MEETINGCATALOGUE" component={MeetingCatalogue} />
        <Stack.Screen name="MEETINGPHCATALOGUE" component={MeetingPHCatalog} />
        <Stack.Screen name="MEETINGORDER" component={MeetingOrder} />
        <Stack.Screen name="PROFILE" component={ProfileScreen} />
        <Stack.Screen name="STATS" component={StatsScreen} />
        <Stack.Screen name="HISTORY" component={HistoryScreen} />
        <Stack.Screen name="MYSCOUT" component={MyScoutScreen}/>
        <Stack.Screen name="MYMEETING" component={MyMeetingScreen} />
        <Stack.Screen name="MYORDER" component={MyOrderScreen} />
        <Stack.Screen name="ALLREPORTS" component={AllReportsScreen} />
        <Stack.Screen name="ALLSCOUTED" component={AllScoutedLocationsScreen} />
        <Stack.Screen name="ALLALLOTEDREP" component={AllAllotedReportScreen} />
        <Stack.Screen name="ALLMEETING" component={AllMeetingScreen} />
        <Stack.Screen name="ALLORDER" component={AllOrderScreen} />
        <Stack.Screen name="USERDPT" component={AdminUserDPTScreen} />
        <Stack.Screen name="USERBRAND" component={AdminUserBrandScreen} />
        <Stack.Screen name="ALLUSER" component={AdminUserReportsScreen} />
        <Stack.Screen name="ALLALLOTED" component={AllotedLocationsScreen} />
        <Stack.Screen name="ADMINEDITPROJECT" component={AdminEditProjectScreen} />
        <Stack.Screen name="ADMINEDITMARKET" component={AdminEditMarketScreen} />
        <Stack.Screen name="EDITPROJECT" component={EditScoutProjectScreen} />
        <Stack.Screen name="EDITMARKET" component={EditScoutMarketScreen} />
        <Stack.Screen name="THANKYOUUPDATE" component={ThankYouUpdateScreen} />
        <Stack.Screen name="ADMIN" component={AdminScreen} />
        <Stack.Screen name="USERREG" component={AdminUserRegScreen} />
        <Stack.Screen name="ALLFORMS" component={AdminAllSetupForms} />
        <Stack.Screen name="ADDCITY" component={AddCityScreen} />
        <Stack.Screen name="ADDAREA" component={AddAreaScreen} />
        <Stack.Screen name="ADDCOMPANY" component={AddCompanyScreen} />
        <Stack.Screen name="ADDBRANCH" component={AddBranchScreen} />
        <Stack.Screen name="ADDDEPARTMENT" component={AddDepartmentScreen} />
        <Stack.Screen name="ADDBRAND" component={AddBrandScreen} />
        <Stack.Screen name="ADDPRODUCT" component={AddProductScreen} />
        <Stack.Screen name="ADDBUILDINGTYPE" component={AddBuildingTypeScreen} />
        <Stack.Screen name="ADDBUILDINGSTAGE" component={AddBuildingStageScreen} />
        <Stack.Screen name="ADDCLIENTTYPE" component={AddClientTypeScreen} />
        <Stack.Screen name="ADDDISTRIBUTOR" component={AddDistributorScreen} />
        <Stack.Screen name="ADDDEALER" component={AddDealerScreen} />
        <Stack.Screen name="ADDARCHITECT" component={AddArchitectScreen} />
        <Stack.Screen name="ADDBUILDER" component={AddBuilderScreen} />
        <Stack.Screen name="ADDCONTRACTOR" component={AddContractorScreen} />
        <Stack.Screen name="ADDCONSULTANT" component={AddConsultantScreen} />
        <Stack.Screen name="ADDCOMPETITOR" component={AddCompetitorScreen} />
        <Stack.Screen name="ADDINTERIORDESIGNER" component={AddInteriorDesignerScreen} />
        <Stack.Screen name="EDITALLOTED" component={EditAllotedLocationScreen} />
        <Stack.Screen name="EDITALLOTEDMARKET" component={EditAllotedMarketScreen} />
        <Stack.Screen name="USERTRACK" component={AdminUserTrackScreen}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;