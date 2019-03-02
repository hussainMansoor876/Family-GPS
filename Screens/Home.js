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
      allUser: [],
      activeIndex: 0,
      activeValue: 'select category',
      active: 'select category',
      allServices: [
        {
          name: 'electrication',
          type: false
        },
        {
          name: 'mechanic',
          type: false
        },
        {
          name: 'plumber',
          type: false
        },
        {
          name: 'bike mechanic',
          type: false
        },
        {
          name: 'car mechanic',
          type: false
        },
        {
          name: 'motor mechanic',
          type: false
        },
        {
          name: 'machine',
          type: false
        }
      ]
    }
  }

  componentWillMount(){
    const { user } = this.props
    axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
    .then((response) => {
      this.props.updateUser(response.data[0])
    })
    .catch(function (error) {
      console.log('error',error);
    });
    axios.get(`https://final-hackathon.herokuapp.com/user/getAll/${user.id}`)
    .then((response) => {
      this.setState({allUser: response.data})
      this.props.allUser(response.data)
    })
    .catch(function (error) {
      console.log('error',error);
    });
  }

  updatePicker(val,i){
    const { user } = this.props
    this.setState({activeIndex: i, activeValue: val},()=>{
      const { activeValue } = this.state
      if(activeValue === "select category"){
        axios.get(`https://final-hackathon.herokuapp.com/user/getAll/${user.id}`)
        .then((response) => {
          console.log('Rest',response)
          this.setState({allUser: response.data})
          this.props.allUser(response.data)     
        })
        .catch(function (error) {
          console.log('error',error);
        });
      }
      else{
        axios.post(`https://final-hackathon.herokuapp.com/user/service`,{
          name: activeValue
        })
        .then((response) => {
          console.log('Response',response)
          this.setState({allUser: response.data})
          this.props.allUser(response.data)          
        })
        .catch(function (error) {
          console.log('error',error);
        });
      }
    })
  }

  chatStart(users){
    var { user } = this.props
    !user.chat && [user.chat = {}]
    !user.chat[`${users.id}`] && [user.chat[`${users.id}`] = []]
    !users.chat && [users.chat = {}]
    !users.chat[`${user.id}`] && [users.chat[`${user.id}`] = []]
    this.props.chatUser(users)
    this.props.navigation.navigate('Chat')
  }

  hirePerson(users){
    var { user } = this.props
    !user.request && [user.request = {}]
    !user.request['send'] && [user.request['send'] = {}]
    user.request['send'][users.id] = {
      accept: false,
      denied: false
    }
    axios.put(`https://final-hackathon.herokuapp.com/user/request`,{
      id: user._id,
      request: user.request
    })
    !users.request && [users.request = {}]
    !users.request['received'] && [users.request['received'] = {}]
    users.request['received'][user.id] = {
      accept: false,
      denied: false
    }
    axios.put(`https://final-hackathon.herokuapp.com/user/request`,{
      id: users._id,
      request: users.request
    })
    console.log('user',user)
    console.log('users',users)    
  }


  render() {
    const { user } = this.props
    const { allUser, allServices, active, activeIndex } = this.state
    return (
        <View style={styles.container}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
          <View style={{borderColor: 'black', borderStyle: 'solid', borderWidth: 1, marginTop: 5,marginBottom: 5,marginRight: 10,marginLeft: 10, borderRadius: 8}}>
          <Picker 
          style={{height: 50, width: '100%'}}
          onValueChange={(val,i)=> this.updatePicker(val,i)}
          selectedValue={!activeIndex ? active : allServices[activeIndex - 1].name}
          >
          <Picker.Item label={active.toLocaleUpperCase()} value={active}/>
            {allServices.map((u,i) =>{
              return <Picker.Item label={u.name.toLocaleUpperCase()} value={u.name} key={i}/>
            })}
          </Picker>
          </View>
          <ScrollView>

          {allUser.length ? allUser.map((users,i) => {
            return (
              <Card title={users.name} key={i}>
                  <View>
                    <Image
                      style={{height: 300, width: '100%'}}
                      resizeMode="cover"
                      source={{ uri: users.avator }}
                    />
                    <Text style={{margin: 5}}>
                      {users.services.map((u,i) => {
                        return(
                          u.type && `(${u.name.toLocaleUpperCase()}) `
                        )
                      })}
                    </Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, margin: 0.5}}>
                    <Button
                      icon={<Icon type='font-awesome' name='comments' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green'}}
                      onPress={() => this.chatStart(users)}
                      title='CHAT' />
                    </View>
                    <View style={{flex: 1, margin: 0.5}}>
                    <Button
                      icon={<Icon type='font-awesome' name='plus' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='HIRE'
                      onPress={() => this.hirePerson(users)}
                       />
                      </View>
                    </View>
                    <Rating
                    showRating={false}
                    ratingCount={5}
                    readonly
                    startingValue={4.3}
                    fractions={20}
                    onFinishRating={(u,i) => console.log(u)}
                    onStartRating={() => console.log("Bye")}
                    style={{ paddingVertical: 10 }}
                  />
                  </View>
            </Card>
            )
          })
          : 
          <View style={{marginTop: 30, marginRight: 10, marginLeft: 10}}>
          <Text>OOPS!!! NOT Found</Text>
          </View>
          }
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