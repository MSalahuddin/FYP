import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {StackNavigator} from 'react-navigation'
import LoginScreen from './App/Containers/LoginScreen';
import MechanicLogin from './App/Containers/MechanicLoginScreen';
import MainScreen from './App/Containers/SignUpScreen'
export default class App extends Component{

    render() {
        return (
            <View>
                <LoginScreen/>

            </View>


  );
  }
}