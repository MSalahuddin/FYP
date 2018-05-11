import React,{Component} from 'react';
import {View,Text, Image, Dimensions} from 'react-native';
import InputComponent from './../Components/InputComponent'
import { Item, Label,Input,Icon, Form } from 'native-base';
const {height, width} = Dimensions.get('window')
export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            password: '',
            email:''
        }
    }
    render(){
        return(
            <View style={{width: width, height: height,}}>
                <Image source={require('./../../assets/mainScreen.jpg')} style={{width: width, height: height, position: 'absolute'}}/>
                <View style={{borderRadius: 20, width:width * 0.8, height:height*0.8, backgroundColor:'#aaaeb5', opacity: 0.9, marginTop: height*0.08, marginLeft: width*0.1}}>
                    <View style={{width:width* 0.8, height: height*0.08, backgroundColor:'red', borderTopLeftRadius:20, borderTopRightRadius: 20}}>

                    </View>
                    <View style={{width: width*0.8, height: height*0.63, alignItems: 'center'}}>
                        <Form style={{marginRight:10, backgroundColor:'blue'}}>
                            <InputComponent
                                labelText = 'FirstName'
                                placeholder = 'Enter First Name'
                                secureTextEntry = {false}
                                value = {this.state.firstName}
                                onChangeText={(text)=>this.setState({firstName:text})}
                            />
                            <InputComponent
                                labelText = 'LastName'
                                placeholder = 'Enter Last Name'
                                secureTextEntry = {false}
                                value = {this.state.lastName}
                                onChangeText={(text)=>this.setState({lastName:text})}
                            />
                            <InputComponent
                                labelText = 'Email'
                                placeholder = 'abc@gmail.com'
                                secureTextEntry = {false}
                                value = {this.state.email}
                                onChangeText={(text)=>this.setState({email:text})}
                                keyboardType="email-address"
                            />
                            <InputComponent
                                labelText = 'Password'
                                placeholder = 'Enter Password'
                                secureTextEntry = {true}
                                value = {this.state.password}
                                onChangeText={(text)=>this.setState({password:text})}
                            />
                        </Form>
                    </View>
                    <View style={{width:width*0.8, height: height*0.09, backgroundColor:'red', borderBottomLeftRadius:20, borderBottomRightRadius: 20}}></View>
                </View>
            </View>
        )
    }
}