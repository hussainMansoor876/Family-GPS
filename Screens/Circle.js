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
      group: false,
      openCircle: '',
      circleData: [],
      data: [],
      inviteList: [],
      invite: false
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

  showMap(value){
    var { data } = this.state
    data = []
    Object.entries(value['users']).forEach(([key,val1]) => {
      console.log('key',key)
      firebase.database().ref('users').child(key).on('value',(value)=>{
        data.push(value.val())
      })
    })
    this.setState({
      data: data,
      openCircle: value['name'],
      group: true
    })
  }

  inviteFriends(){
    const { data, inviteList } = this.state
    const { userList } = this.props
    console.log('user',data)
    console.log('all',userList)
    data.map((v,i) => {
      return userList.map((val,key) => {
        val.uid !== v.uid && inviteList.push(val)
      })
    })
    console.log('inviteList',inviteList)
    this.setState({invite: true})
  }

  inviteUser(v){
    const { openCircle } = this.state
    const { user } = this.props
    var obj
    console.log('v',v)
    firebase.database().ref('circles').child(`${user.uid}/${openCircle}`).on('value',(value) => {
      console.log('console',value.val())
      obj = {
        secretId: value.val(),
        message: `${user.name} invited you to Join circle Group (${openCircle}) and invited code is ${value.val()}`
      }
      firebase.database().ref('users').child(`${v.uid}/notifications`).push(obj)
    })
    Alert.
  }


  render() {
    const { user } = this.props
    const { circleData, create, group, data, openCircle, invite, inviteList } = this.state
    // console.log('circleData',circleData)    
    return (
        <View style={styles.container}>
        {!create ? 
        <View style={styles.container}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: group ? `Circle ${openCircle}` : `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <ScrollView style={{marginTop: 5}}>
        {circleData.length && !group ? circleData.map((v,i) => {
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
        />
        }) : null}
        {!group ? <Button
            icon={<Icon type='font-awesome' name='users' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green', marginTop: 10}}
            onPress={() => this.setState({create: true})}
            title='CREATE CIRCLE' /> : !invite ? <ScrollView style={{flex: 1}}>
              {data.map((v,i) => {
                return <ListItem
                key={i}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['azure', 'aqua'],
                  start: [1, 0],
                  end: [0.2, 0]
                }}
                leftAvatar={{ rounded: true, source: { uri: v.photoURL } }}
                title={v.name}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={v.email ? v.email : null}
                chevronColor="white"
                chevron
                containerStyle={{margin: 1}}
                onPress={() => Alert.alert(`${v.name} Here!!!`)}
              />
              })}
              <Button
            icon={<Icon type='font-awesome' name='user-plus' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green', marginTop: 10}}
            onPress={() => this.inviteFriends()}
            title='Invite friends' />
            <Button
            icon={<Icon type='font-awesome' name='map-marker' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green', marginTop: 10}}
            onPress={() => this.setState({create: true})}
            title='View Circle Map' />
            <Button
            icon={<Icon type='font-awesome' name='users' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green', marginTop: 10}}
            onPress={() => this.setState({group: false})}
            title='View Your Groups' />
            </ScrollView> : <View style={{flex: 1}}>
          {
            inviteList.map((l, i) => (
              <View key={i} style={{flex: 1}}>
              <ListItem
                leftAvatar={{ source: { uri: l.photoURL } }}
                title={l.name}
                subtitle={l.email ? l.email : null}
              />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, margin: 0.5}}>
                <Button
                    icon={<Icon type='font-awesome' name='user-plus' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    onPress={() => this.inviteUser(l)}
                    title={`Invite ${l.name}`} />
                    </View>
                </View>
              </View>
            ))
          }
        </View>}
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
    user: state.authReducer.user,
    userList: state.authReducer.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    allUser: (userList) => dispatch(allUser(userList)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Circle)