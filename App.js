import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/AppNavigator'
import { LoginScreen } from './Screens'
import User from './Screens/User'
import { Provider } from 'react-redux'
import { store, persistor }  from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <View style={styles.container}>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <Navigator /> */}
        <LoginScreen />
        {/* <User /> */}
        </PersistGate>
      </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 23.5
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
