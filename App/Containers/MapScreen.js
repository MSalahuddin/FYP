import React,{Component} from 'react';
import {View,Text, Image, Dimensions, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import InputComponent from './../Components/InputComponent'
import firebase from 'react-native-firebase';
import { Item, Label,Input,Icon, Form, ListItem, CheckBox, Body, Textarea } from 'native-base';
import MapView from 'react-native-maps';
const {height, width} = Dimensions.get('window')

export default class MapScreen extends Component{
    render(){
        return(
            <View style={{width: width, height: height, backgroundColor:'red'}}>

            </View>
        )
    }
}