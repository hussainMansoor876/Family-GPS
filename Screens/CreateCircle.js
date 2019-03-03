import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon, ListItem, Input } from 'react-native-elements';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from './../Config/firebase';

class CreateCircle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      circleName: '',
      bool : false
    }
    this.createGroup = this.createGroup.bind(this)
  }

  componentWillMount(){
    this.setState({bool: false})
  }


  changeText(text){
    this.setState({
      circleName: text,
      bool: true
    })
  }

  createGroup(){
    var { user } = this.props
    const { circleName } = this.state
    firebase.database().ref('users').child(`${user.uid}/circle/${user.uid}/${circleName}/${user.uid}`).set('Admin')
    Alert.alert("Created Circle Successfully")
    this.props.create(true)
  }

  render() {
    const { circleName, bool } = this.state
    return (
        <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <Input
        placeholder='INPUT your Circle Name'
        leftIcon={
          <Icon
            type='font-awesome'
            name='users'
            size={24}
            color='black'
          />
        }
        style={{marginTop: 10}}
        value={circleName}
        onChangeText = {(text) => this.changeText(text)}
      />
      {bool && <Button
            icon={<Icon type='font-awesome' name='users' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green', marginTop: 10}}
            onPress={this.createGroup}
            title='CREATE CIRCLE' />}
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