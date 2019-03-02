import React from 'react';
import { StyleSheet, View, Alert, TextInput,Text } from 'react-native';
import { Facebook, Google } from 'expo'
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '../Config/firebase'

const provider = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const secretId = '--Gtc8Phtm930WPcOKaqcUIY'
const firebaseClientId = '978845703836-lvmi5o7e87jl3dbbknu6dad0vgll6uvi.apps.googleusercontent.com'
const firebaseSecretId = '2eL7fBh-WSRcCBjJPTcnDDz_'

class Login1 extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("props***",this.props)
    // this.props.updateUser({name: 'mansoor'})
    // console.log("props***",this.props)    
  }

  async logIn() {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('787190688316212', {
          permissions: ['groups_access_member_info'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const data = await response.json()
          Alert.alert('Logged in!', `Hi ${data.name}!`);
          console.log('data***',data)
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

      loginFirebase(){
        firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log('user***'+user)
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      }

      async googleLogin(){
        const clientId  = '777635686273-80tsm7h4k70oue449p34ontp0o86q1e5.apps.googleusercontent.com'
        const { type, accessToken, user } = await Google.logInAsync({ clientId })
        console.log('user***',user);        
        if (type === 'success') {
          /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
          console.log('user***',user);
          // Alert.alert('Logged in!', `Hi ${user.email}!`);
          // this.props.updateUser(user)
        }
      }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 150, marginBottom: 2, marginLeft: 1, marginRight: 1}}>
        <Button
          icon={
            <Icon
            name="google"
            size={25}
            color="white"
            />
          }
          onPress = {() => this.googleLogin()}
          title="Login with Google"
          />
        </View>
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
          <Text>Wellcome to Mansoor Hussain Hospital Token App</Text>
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
  }
});


export default Login1;