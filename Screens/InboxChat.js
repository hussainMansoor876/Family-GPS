import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, ListItem } from 'react-native-elements';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

class InboxChat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inbox: []
    }
    console.log(props)
  }

  componentWillMount(){
    const { user, userList } = this.props
    const { inbox } = this.state
    userList.map((l,i) => {
      user['chat'] && Object.entries(user['chat']).forEach(([key,value])=>{
        key == l.id && inbox.push(l)
    })
    })
  }

  chatStart(users){
    this.props.chatUser(users)
    this.props.navigation.navigate('Chat')
  }


  render() {
    const { user, userList } = this.props
    const { inbox } = this.state
    return (
        <View style={styles.container}>
        {!inbox.length ? <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <Text style={{margin: 10}}>Empty Inbox</Text>
        </ScrollView> : <View style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <ScrollView style={{flex: 1}}>
        {inbox.map((l, i) => {
          return  (
            <ListItem
              key={i}
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95} //
              linearGradientProps={{
                colors: ['azure', 'aqua'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              // badge={{ value: 1, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
              leftAvatar={{ rounded: true, source: { uri: l.avator } }}
              title={l.name}
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'white' }}
              subtitle={l.email ? l.email : null}
              containerStyle={{borderColor: 'white', borderWidth: 0.5, borderStyle: 'solid', marginLeft: 5, marginRight: 5, borderRadius: 5}}
              onPress={() => this.chatStart(l)}
            />
          )
        })
          }
        </ScrollView>
        </View>}
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


export default connect(mapStateToProps,mapDispatchToProps)(InboxChat)