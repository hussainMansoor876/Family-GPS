import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon, ListItem } from 'react-native-elements';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

class Requests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      received: [],
      send: [],
      type: 'rec'
    }
  }

  componentWillMount(){
    const { user, userList } = this.props
    const { received, send } = this.state
    // console.log('user',user)
    userList.map((v,i) => {
      user['request']['received'] && Object.entries(user['request']['received']).forEach(([key,value])=>{
        key == v.id && received.push(v)
    })
      user['request']['send'] && Object.entries(user['request']['send']).forEach(([key,value])=>{
        key == v.id && send.push(v)
    })
    })
  }

  render() {
    const { type, send, received } = this.state
    const { user } = this.props
    return (
        <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, margin: 0.5}}>
        <Button
            icon={<Icon type='font-awesome' name='comments' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green'}}
            onPress={() => this.setState({type: 'rec'})}
            title='RECEIVED' />
        </View>
        <View style={{flex: 1, margin: 0.5}}>
        <Button
            icon={<Icon type='font-awesome' name='plus' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            onPress={() => this.setState({type: 'send'})}
            title='SEND' />
            </View>
        </View>
        {type == 'rec' ? received.length ? <View style={{flex: 1}}>
          {
            received.map((l, i) => (
              <View key={i} style={{flex: 1}}>
              <ListItem
                leftAvatar={{ source: { uri: l.avator } }}
                title={l.name}
                subtitle={l.email}
              />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, margin: 0.5}}>
                <Button
                    icon={<Icon type='font-awesome' name='check' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green'}}
                    title='ACCEPT' />
                </View>
                <View style={{flex: 1, margin: 0.5}}>
                <Button
                    icon={<Icon type='font-awesome' name='times' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='CANCEL' />
                    </View>
                </View>
              </View>
            ))
          }
        </View> : <View>
          <Text>No Received Request yet...!!</Text>
        </View> :  send.length ? <View style={{flex: 1}}>
          {
            send.map((l, i) => (
              <View key={i} style={{flex: 1}}>
              <ListItem
                leftAvatar={{ source: { uri: l.avator } }}
                title={l.name}
                subtitle={l.subtitle}
              />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, margin: 0.5}}>
                <Button
                    icon={<Icon type='font-awesome' name='times' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                    title='CANCEL Request' />
                    </View>
                </View>
              </View>
            ))
          }
        </View> : <View>
          <Text>No Send Request yet...!!</Text>
        </View>}
        </View>
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


export default connect(mapStateToProps,mapDispatchToProps)(Requests)