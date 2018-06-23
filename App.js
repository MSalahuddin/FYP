import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import LoginScreen from './App/Containers/LoginScreen';
import MechanicLogin from './App/Containers/MechanicLoginScreen';
import SignUpScreen from './App/Containers/SignUpScreen';
import MapScreen from './App/Containers/MapScreen'
import Registration from './App/Containers/MainScreen'
const App = StackNavigator({
    MapScreen: {screen: MapScreen},
    Registration: { screen: Registration },
    LoginScreen: { screen: LoginScreen},
    SignUpScreen: {screen: SignUpScreen}
})
export default App;