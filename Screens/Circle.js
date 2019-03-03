import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from './../Config/firebase';
import CreateCircle from './CreateCircle';

class Circle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      create: false
    }
    this.createCircle = this.createCircle.bind(this)
  }

  componentWillMount(){
    let { user } = this.props
    firebase.database().ref('users').child(user.uid).on('value',(value)=>{
      console.log('value',value.val())
      user = value.val()
    })
  }

  createCircle(){
    this.setState({create: true})
  }


  render() {
    const { user } = this.props
    const { create } = this.state
    return (
        <View style={styles.container}>
        {!create ? 
        <View style={styles.container}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <ScrollView style={{marginTop: 5}}>
        {user['circle'] && console.log(user['circle'])}
        <Button
            icon={<Icon type='font-awesome' name='comments' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green', marginTop: 10}}
            onPress={() => this.setState({create: true})}
            title='CREATE CIRCLE' />
        </ScrollView>
        </View>
         : <CreateCircle create={this.createCircle} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });


const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Circle)