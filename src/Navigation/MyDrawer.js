import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomAdminDrawerContent from './Custom/CustomDrawerComponent'
import DashboardScreen from '../Screens/DashboardScreen';
import OrderScreen from '../Screens/OrderScreen';
import CatalogScreen from '../Screens/CatalogScreen';
import PHCatalog from '../Screens/PHCatalogsScreen';
import MyTopTab from './MyTab';
import PriceListScreen from '../Screens/PriceListScreen';
import PriceListCatalogScreen from '../Screens/PriceListCatalogScreen';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
      <Drawer.Navigator 
      drawerPosition={'right'}
      drawerContent={props => <CustomAdminDrawerContent{...props} />}
      >
        {/* <Drawer.Screen name="DASHBOARD" component={DashboardScreen} /> */}
        {/* <Drawer.Screen name="TOPTAB" component={MyTopTab} /> */}
        {/* <Drawer.Screen name="CATALOG" component={CatalogScreen} /> */}
        {/* <Drawer.Screen name="PHCATALOG" component={PHCatalog} /> */}
        {/* <Drawer.Screen name="PLCATALOG" component={PriceListCatalogScreen} /> */}
        {/* <Drawer.Screen name="PRICELIST" component={PriceListScreen} /> */}
        {/* <Drawer.Screen name="ORDER" component={OrderScreen} /> */}
      </Drawer.Navigator>
  );
}

export default MyDrawer;