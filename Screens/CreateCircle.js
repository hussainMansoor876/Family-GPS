import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon, ListItem, Input } from 'react-native-elements';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateCircle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
    console.log('props',props)
  }

  componentWillMount(){
  }

  render() {
    return (
        <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <Input
          placeholder='BASIC INPUT'
        />

        <Input
          placeholder='INPUT WITH ICON'
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />

        <Input
          placeholder='INPUT WITH CUSTOM ICON'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />

        <Input
          placeholder='INPUT WITH SHAKING EFFECT'
          shake={true}
        />

        <Input
          placeholder='INPUT WITH ERROR MESSAGE'
          errorStyle={{ color: 'red' }}
          errorMessage='ENTER A VALID ERROR HERE'
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