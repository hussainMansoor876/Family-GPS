import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { ImagePicker, Notifications } from 'expo';

export default class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: 10,
      getData: false,
      image: '',
      imageName: null
    }
    console.log('props***',props)
  }

  async componentWillMount(){
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    getiOSNotificationPermission();
    this.listenForNotifications();
  }

  handleButtonPress = () => {
    const localnotification = {
      title: 'Example Title!',
      body: 'This is the body',
      badge: 1,
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 5000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  };
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

  updateToken(){
    var { token } = this.state
    token >= 1 ? this.setState({
        token: token - 1
    }) : Alert.alert("Sorry Token End")
  }

  async pickImage(){
    let result1 = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log('Result***',result1)

    if (!result1.cancelled) {
      this.uploadImage(result1.uri,"mansoor")
        .then((res) => {
          console.log("Success***")
          console.log("Res***",res)
          this.setState({ image: res, imageName: result1.uri });
          
        })
        .catch(error => {
          console.log("Error==>",error)
        })
    }
  };

  uploadImage = async (uri,imageName) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    })
    return await blob;
  }

  render() {
      const { token, getData, imageName } = this.state
    return (
        <View style={styles.container}>
        {!getData ? <View>
        <Text style={{fontSize: 20}}>User Profile</Text>
        <Text style={{fontSize: 20}}>Today Token {token}</Text>
        <Button 
        title = "Get Token"
        onPress = {() => this.setState({getData: true})}
        />
        </View> : <View>
        <Text>Name</Text>
          <TextInput
          style={{width: 320,height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 10 }}
          placeholder="Your Name Here...!" />
          <Text>Email</Text>
          <TextInput
          style={{width: 320,height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 10 }}
          placeholder="Your Email...!" />
          <Text>Picture</Text>
          <Button
            title={!imageName ? "Upload Image" : imageName.slice(imageName.length - 20,imageName.length)}
            onPress={() => this.pickImage()}
          />
          <Button
            title="Submit"
            onPress={this.handleButtonPress}
          />
        </View>}
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
    },
  });

