import * as Screen from '../Screens'
import { createDrawerNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    'Create Circle': {
        screen: Screen.CreateCircle
    },
    Circle: {
        screen: Screen.Circle
    }
},{
    drawerWidth: 230,
    drawerType: 'back'
})






const DrawerNavigatorApp = createAppContainer(DrawerNavigator)


export default DrawerNavigatorApp;