import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon, ListItem } from 'react-native-elements';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateCircle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
  }

  render() {
    return (
        <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
      </ScrollView>
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


export default connect(mapStateToProps,mapDispatchToProps)(CreateCircle)