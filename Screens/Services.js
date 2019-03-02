import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

class Services extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true,
      checked: true,
      services: props.user.services,
      checkBool: false
    }
  }

  changeService(key,val){
    let servicesCopy = this.state.services
    console.log(servicesCopy[key])
    servicesCopy[key].type = !servicesCopy[key].type
    this.setState({services: servicesCopy, checkBool: true})
  }

  changeVisibility(){
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  updateServices(){
    const { services } = this.state
    const { user } = this.props
    axios.put(`https://final-hackathon.herokuapp.com/user/updateService`,{
      services: services,
      id: user._id
    })
    .then((response) => {
      Alert.alert(response.data.message)
      this.setState({checkBool: false})
      axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
      .then((response) => {
        this.props.updateUser(response.data[0])
        this.props.navigation.navigate('Home')
      })
      .catch(function (error) {
        console.log('error',error);
      });
    })
    .catch(function (error) {
      console.log('error',error);
    });
  }

  render() {
    const { visible, services, checkBool } = this.state
    const { user } = this.props
    console.log('props')
    return (
        <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <View style={styles.container}>
        {services.map((val,key)=>{
          return <CheckBox
          key={key}
          title={val.name.toLocaleUpperCase()}
          checked={val.type}
          onPress={()=> this.changeService(key,val)}
        />
        })}
        {checkBool && <Button
            title="UPDATE SERVICES  "
            onPress={() => this.updateServices()}
          />}
        </View>
      </ScrollView>
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
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Services)