import React,{Component} from 'react';
import {View,Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import InputComponent from './../Components/InputComponent'
import firebase from 'react-native-firebase';
import { Item, Label,Input,Icon, Form, ListItem, CheckBox, Body, Textarea } from 'native-base';
import MapView from 'react-native-maps';
const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default class MapScreen extends Component{
    render(){
        const { region } = this.props;
        console.log(region);
        return(
            <View style={{width: width, height: height, backgroundColor:'red'}}>
                <View style ={styles.container}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                    </MapView>
                </View>
            </View>
        )
    }
}