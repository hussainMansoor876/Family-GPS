import * as Screen from '../Screens'
import { createDrawerNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Services: {
        screen: Screen.Services
    },
    Requests: {
        screen: Screen.Requests
    },
    Chat: {
        screen: Screen.currentChat
    }
},{
    drawerWidth: 230,
    drawerType: 'back'
})

const DrawerNavigatorApp = createAppContainer(DrawerNavigator)


export default DrawerNavigatorApp;