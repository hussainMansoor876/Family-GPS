import React from 'react';
import { StyleSheet, Text, View, Platform, Alert, ScrollView, Picker } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Header, Button, Input, Card, Image, Icon, Overlay, Rating, AirbnbRating } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { updateUser, removeUser, allUser, chatUser, gpsChcek } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  async componentWillMount(){
    const { user } = this.props
    const check = await Location.getProviderStatusAsync()
    console.log('check',check.gpsAvailable)
    if(!check.gpsAvailable){
      this.props.gpsChcek(false)
    }else{
      this.props.gpsChcek(check.gpsAvailable)
    }
  }

  render() {
    const { user, enable } = this.props
    console.log('en',enable)
    const { allServices, active, activeIndex } = this.state
    return (
        <View style={styles.container}>
        {enable && <View style={{flex: 1}}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
          </View>}
          {!enable && <View style={{flex: 1}}>
            <View style={{flex: 1}}>
            <Header
                placement="left"
                leftComponent={{ icon: 'sync', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
                centerComponent={{ text: `Reload`, style: { color: '#fff' } }}
                rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
              />
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Please Enable GPS Location and Reload</Text>
            </View>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
  });







  const mapStateToProps = (state) => {
    console.log("mapToState",state.authReducer)
    return {
      user: state.authReducer.user,
      userList: state.authReducer.userList,
      chats: state.authReducer.chats,
      enable: state.authReducer.enable
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateUser: (user) => dispatch(updateUser(user)),
      allUser: (userList) => dispatch(allUser(userList)),
      removeUser: () => dispatch(removeUser()),
      chatUser: (chats) => dispatch(chatUser(chats)),
      gpsChcek: (enable) => dispatch(gpsChcek(enable))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);