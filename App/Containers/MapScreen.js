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
    static navigationOptions = {
        header : null
    };
    constructor(props){
        super(props);
        this.state = {
            longitude: null,
            latitude: null,
            getPosition: false
        }

    }
    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
               this.setState({
                   longitude: position.coords.longitude,
                   latitude: position.coords.latitude,
                   getPosition: true
               })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
        );
    }
    render(){
        const { region } = this.props;
        console.log(region);
        return(
            <View style={{width: width, height: height, backgroundColor:'red'}}>
                <View style ={styles.container}>
                    {this.state.getPosition ?
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                        </MapView> :
                        <View style={{backgroundColor:'blue'}}>

                        </View>
                    }

                </View>
            </View>
        )
    }
}