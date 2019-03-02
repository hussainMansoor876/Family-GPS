import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
// import { MapView,Marker } from 'expo';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
// import { Provider } from 'react-redux'
// import store from './Redux/store'

export default class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locationsList: props.locationsList,
      marker: {
        first: {
          lat: props.locationsList[0].location['lat'],
          lng: props.locationsList[0].location['lng'],
          title: props.locationsList[0].name,
          description: props.locationsList[0].location['address']
        },
        second: {
          lat: props.locationsList[1].location['lat'],
          lng: props.locationsList[1].location['lng'],
          title: props.locationsList[1].name,
          description: props.locationsList[1].location['address']
        }
      }
    }
  }
  


  render() {
    const { locationsList,marker } = this.state
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'gray', flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
        <MapView
        style={{ flex: 1 }}
        region={{
          latitude: locationsList[0].location['lat'],
          longitude: locationsList[0].location['lng'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: marker.first.lat,longitude: marker.first.lng}}
      title={marker.first.title}
      description= {marker.first.description}
    />
      </MapView>
      <Button
      title="Select"
       />
      </View>
      <View style={{flex: 1}}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: locationsList[1].location['lat'],
          longitude: locationsList[1].location['lng'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: marker.second.lat,longitude: marker.second.lng}}
      title={marker.second.title}
      description= {marker.second.description}
    />
      </MapView>
      <Button
      title="Select"
       />
      </View>
        </View>
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
