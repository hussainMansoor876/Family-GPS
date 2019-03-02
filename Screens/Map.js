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
        },
        third: {
          lat: props.locationsList[2].location['lat'],
          lng: props.locationsList[2].location['lng'],
          title: props.locationsList[2].name,
          description: props.locationsList[2].location['address']
        },
        fourth: {
          lat: props.locationsList[3].location['lat'],
          lng: props.locationsList[3].location['lng'],
          title: props.locationsList[3].name,
          description: props.locationsList[3].location['address']
        },
        fifth: {
          lat: props.locationsList[4].location['lat'],
          lng: props.locationsList[4].location['lng'],
          title: props.locationsList[4].name,
          description: props.locationsList[4].location['address']
        },
        sixth: {
          lat: props.locationsList[5].location['lat'],
          lng: props.locationsList[5].location['lng'],
          title: props.locationsList[5].name,
          description: props.locationsList[5].location['address']
        },
      }
    }
  }
  


  render() {
    const { locationsList,marker } = this.state
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row',marginTop: 22}}>
        <View style={{flex: 1}}>
        <MapView
        style={{ flex: 9 }}
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
        <View style={{backgroundColor: 'blue', flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
        <MapView
        style={{ flex: 1 }}
        region={{
          latitude: locationsList[2].location['lat'],
          longitude: locationsList[2].location['lng'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: marker.third.lat,longitude: marker.third.lng}}
      title={marker.third.title}
      description= {marker.third.description}
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
          latitude: locationsList[3].location['lat'],
          longitude: locationsList[3].location['lng'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: marker.fourth.lat,longitude: marker.fourth.lng}}
      title={marker.fourth.title}
      description= {marker.fourth.description}
    />
      </MapView>
      <Button
      title="Select"
       />
      </View>
        </View>
        <View style={{backgroundColor: 'gray', flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
        <MapView
        style={{ flex: 1 }}
        region={{
          latitude: locationsList[4].location['lat'],
          longitude: locationsList[4].location['lng'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: marker.fifth.lat,longitude: marker.fifth.lng}}
      title={marker.fifth.title}
      description= {marker.fifth.description}
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
          latitude: locationsList[5].location['lat'],
          longitude: locationsList[5].location['lng'],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      <Marker
      coordinate={{latitude: marker.sixth.lat,longitude: marker.sixth.lng}}
      title={marker.sixth.title}
      description= {marker.sixth.description}
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
