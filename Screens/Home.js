import React from 'react';
import { StyleSheet, Text, View, Platform, Alert, ScrollView, Picker } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Header, Button, Input, Card, Image, Icon, Overlay, Rating, AirbnbRating } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    const { user } = this.props
  }

  render() {
    const { user } = this.props
    const { allServices, active, activeIndex } = this.state
    return (
        <View style={styles.container}>
        <View style={{flex: 1}}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
          </View>
          <ScrollView>

          
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });







  const mapStateToProps = (state) => {
    console.log("mapToState",state.authReducer)
    return {
      user: state.authReducer.user,
      userList: state.authReducer.userList,
      chats: state.authReducer.chats
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateUser: (user) => dispatch(updateUser(user)),
      allUser: (userList) => dispatch(allUser(userList)),
      removeUser: () => dispatch(removeUser()),
      chatUser: (chats) => dispatch(chatUser(chats))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);