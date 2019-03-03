import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { Location, Permissions, TaskManager  } from 'expo';
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
      user: props.user,
      locations: [
        {
          coords: { latitude: 24.841446769954754, longitude: 67.04334240211087 }
        }
      ],
      userLocation: null
    }
    this.getLocation();
  }

  componentWillMount(){
    this.getLocation();
  }

  // async componentWillMount(){
  //   const { user } = this.props
  //   const BACKGROUND_LOCATION_UPDATES_TASK = "background-location-updates";
  //   const check = await Location.getProviderStatusAsync()
  //   console.log('check',check.gpsAvailable)
  //   if(!check.gpsAvailable){
  //     this.props.gpsChcek(false)
  //   }else{
  //     this.props.gpsChcek(check.gpsAvailable)
  //     let location = await Location.getCurrentPositionAsync({});
  //     this.setState({ lat: location.coords.latitude, lng: location.coords.longitude });
  //     this.props.updateLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
  //     user['lat'] = location.coords.latitude
  //     user['lng'] = location.coords.longitude
  //     TaskManager.defineTask(YOUR_TASK_NAME, ({ data: { locations }, error }) => {
  //       if (error) {
  //         // check `error.message` for more details.
  //         console.log('error',error)
  //         return;
  //       }
  //       console.log('Received new locations', locations);
  //     });
  //   }
  // }

  getLocation = async () => {
    let that = this;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }
    var userLocation = await Location.getCurrentPositionAsync({});
    // console.log("userLocation", userLocation);

    this.setState({ userLocation });

    const BACKGROUND_LOCATION_UPDATES_TASK = "background-location-updates";
    TaskManager.defineTask(
      BACKGROUND_LOCATION_UPDATES_TASK,
      async function handleLocationUpdate({ data, error }) {
        if (error) {
          return;
        }
        if (data) {
          try {
            locations = data.locations;
            // console.log("locations", locations);
            that.setState({ locations });
          } catch (error) {
            console.log("the error", error);
          }
        }
      }
    );

    let isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_LOCATION_UPDATES_TASK
    );
    if (!isRegistered)
      await Location.startLocationUpdatesAsync(
        BACKGROUND_LOCATION_UPDATES_TASK,
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10,
          distanceInterval: 1
        }
      );
  };
  


  render() {
    let { locations, userLocation } = this.state;
    console.log("locations", locations);
    console.log("userLocation", userLocation);
    var latitude;
    var longitude;

    if (locations) {
      latitude = locations[0].coords.latitude;
      longitude = locations[0].coords.longitude;
    } else {
      latitude = userLocation.coords.latitude;
      longitude = userLocation.coords.longitude;
    }

    console.log("****** LAT", latitude);
    console.log("****** LNG", longitude);
    const { user } = this.props
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
            title="My Marker"
            description="Some description"
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