import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon, ListItem } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from './../Config/firebase';
import CreateCircle from './CreateCircle';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

class Circle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      create: false,
      circleData: []
    }
    this.createCircle = this.createCircle.bind(this)
  }

  componentWillMount(){
    let { user } = this.props
    const { circleData } = this.state
    firebase.database().ref('users').child(user.uid).on('value',(value)=>{
      user = value.val()
      this.props.updateUser(user)
    })
    user['circle'] && Object.entries(user['circle']).forEach(([key,val]) => {
      Object.entries(val).forEach(([k,v]) => {
        circleData.push({id: key, users: v, name: k})
      })
    })
    this.setState({circleData: circleData})
  }

  createCircle(){
    var { circleData } = this.state
    circleData = []
    this.setState({create: false})
    let { user } = this.props
    firebase.database().ref('users').child(user.uid).on('value',(value)=>{
      user = value.val()
      this.props.updateUser(user)
    })
    user['circle'] && Object.entries(user['circle']).forEach(([key,val]) => {
      Object.entries(val).forEach(([k,v]) => {
        circleData.push({id: key, users: v, name: k})
      })
    })
    this.setState({circleData: circleData})
  }

  showMap(data){
    console.log('data',data)
  }


  render() {
    const { user } = this.props
    const { circleData } = this.state
    const { create } = this.state
    // console.log('circleData',circleData)    
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
        {circleData.length && circleData.map((v,i) => {
          return <ListItem
          key={i}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          linearGradientProps={{
            colors: ['azure', 'aqua'],
            start: [1, 0],
            end: [0.2, 0],
          }}
          // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
          title={v.name}
          titleStyle={{ color: 'white', fontWeight: 'bold' }}
          subtitleStyle={{ color: 'white' }}
          subtitle={v.users[user.uid] == 'Admin' ? 'You are Admin' : 'You are User'}
          chevronColor="white"
          chevron
          containerStyle={{margin: 1}}
          onPress={() => this.showMap(v)}
        />;
        })}
        <Button
            icon={<Icon type='font-awesome' name='users' color='#ffffff' />}
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