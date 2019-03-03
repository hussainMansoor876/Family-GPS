import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
// import { Provider } from 'react-redux'
// import store from './Redux/store'
import { updateUser, removeUser, allUser, chatUser, gpsChcek, updateLocation } from '../Redux/actions/authActions'
import { connect } from 'react-redux';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lat: '',
      lng: ''
    }
  }

  async componentWillMount(){
    const { user } = this.props
    const check = await Location.getProviderStatusAsync()
    console.log('check',check.gpsAvailable)
    if(!check.gpsAvailable){
      this.props.gpsChcek(false)
    }else{
      this.props.gpsChcek(check.gpsAvailable)
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ lat: location.coords.latitude, lng: location.coords.longitude });
      this.props.updateLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
      user['lat'] = location.coords.latitude
      user['lng'] = location.coords.longitude
    }
  }
  


  render() {
    const { user } = this.props
    const { lat, lng} = this.state
    return (
      <View style={styles.container}>
        <MapView
        style={{ flex: 1 }}
        region={{
          latitude: parseFloat(lat),
          longitude:  parseFloat(lng),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: parseFloat(lat),longitude:  parseFloat(lng)}}
      title='{marker.first.title}'
      description= '{marker.first.description}'
    />
      </MapView>
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
    chats: state.authReducer.chats,
    enable: state.authReducer.enable,
    location: state.authReducer.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    allUser: (userList) => dispatch(allUser(userList)),
    removeUser: () => dispatch(removeUser()),
    chatUser: (chats) => dispatch(chatUser(chats)),
    gpsChcek: (enable) => dispatch(gpsChcek(enable)),
    updateLocation: (location) => dispatch(updateLocation(location))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Map);