import React,{Component} from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import MainScreen from './SignUpScreen'

export default TabNavigator({
    Home: LoginScreen,
    Settings: MainScreen,
});