import React from 'react';
import { StyleSheet, View, Alert, TextInput,Text, Image, Keyboard, Platform } from 'react-native';
import { Facebook, Google, ImagePicker, Constants, Location, Permissions } from 'expo'
import { Button, Header, Input, FormLabel, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateUser, newUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux'
import axios from 'axios';
import Navigator from '../navigation/AppNavigator'

import firebase from '../Config/firebase'

const provider = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const secretId = '--Gtc8Phtm930WPcOKaqcUIY'
const firebaseClientId = '978845703836-lvmi5o7e87jl3dbbknu6dad0vgll6uvi.apps.googleusercontent.com'
const firebaseSecretId = '2eL7fBh-WSRcCBjJPTcnDDz_'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    this.props.newUser(false)
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.setState({
    //     lat : position.coords.latitude,
    //     lng : position.coords.longitude
    //   })
    // })
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    // const check = await Location.getProviderStatusAsync()
    // console.log('check',check.gpsAvailable)
    // if(!check.gpsAvailable){
    //   Alert.alert("Please Enable GPS")
    // }
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log('loc',location)
    this.setState({ lat: location.coords.latitude, lng: location.coords.longitude });
  };

  async logIn(){
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('2293122350709508', {
          permissions: ['public_profile','email'],
        });
        if (type === "success") {
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
          firebase.auth().signInAndRetrieveDataWithCredential(credential)
            .then(userCredential => {
              console.log('user',userCredential.user.toJSON())
              const user = userCredential.user.toJSON()
              var obj = {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
              }
              // setTimeout(() => {
              //   this.props.navigation.navigate("Main");
              //   this.setState({ loader: true });
              // }, 2000);
              // this.setState({ loader: false });
            });
        } else {
          console.log("type === cancel");
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }



  render() {
    const { user } = this.props
    return (
      <View style={styles.container}>
        <View>
        <View style={{marginTop: 5, marginBottom: 70, marginLeft: 1, marginRight: 1}}>
        <Button
          icon={
            <Icon
            name="facebook"
            size={25}
            color="white"
            />
          }
          style={{backgroundColor: "green"}}
          color= '#fff'
          onPress={()=> this.logIn()}
          title="Login with Facebook"
          />
        </View>
          <Text>Wellcome to Mansoor Hussain Service App</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    user: state.authReducer.user,
    new: state.authReducer.new
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    newUser: (bool) => dispatch(newUser(bool))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);