import React,{Component} from 'react';
import {View,Text, Image, Dimensions, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import InputComponent from './../Components/InputComponent'
import firebase from 'react-native-firebase';
import { Item, Label,Input,Icon, Form, ListItem, CheckBox, Body, Textarea } from 'native-base';
const {height, width} = Dimensions.get('window')
const db = firebase.firestore()
export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            password: '',
            email:'',
            phoneNo:'+92',
            message: '',
            confirmResult:null,
            user:null,
            codeInput: '',
            description: '',
            isMechanic: false

        }
        this.SignUpForm = this._SignUpForm.bind(this);
    }
    signIn = () => {
        const {firstName, lastName, email, phoneNo, password } = this.state;
        var numberError = phoneNo.length < 13
        this.setState({numberError});
        if(firstName === ''|| lastName === ''|| email === '' || password === '' || phoneNo === ''){
            alert('Fill all the fields')
        }
        else if (!numberError) {
            this.setState({message: 'Sending code ...'});
            firebase.auth().signInWithPhoneNumber(phoneNo)
                .then(confirmResult => this.setState({
                    confirmResult,
                    message: 'Code has been sent!'}))
                .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}));
        }

    }
    confirmCode = () => {
        const { codeInput, confirmResult, firstName, lastName, email, phoneNo, password, description, isMechanic } = this.state;
        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    db.collection('users').add({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        phoneNo: phoneNo,
                        createdAt: new Date(),
                        description: description,
                        isMechanic: isMechanic,
                        id: user._user.uid
                    })
                    .then((docRef)=> console.log('Add data successfully', docRef.id))
                    .catch((error)=> console.log('Error Adding Data', error))
                    this.setState({ message: 'Code Confirmed!' });
                    console.log(user._user.uid,'user**********************')
                    console.log(user._user.phoneNumber,'user**********************')
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };
    renderVerificationCodeInput(){
        const { codeInput } = this.state;
        return (
            <View style={{width: width, height: height* 0.3, marginTop: height* 0.1}}>
                <Text style={{fontSize:20}}>{this.state.message}</Text>
                <InputComponent
                    labelText = 'Enter verification code below:'
                    labelStyle = {{color:'black'}}
                    placeholder = 'XXXXXX'
                    secureTextEntry = {false}
                    value = {this.state.codeInput}
                    onChangeText={(text)=>this.setState({codeInput:text})}
                    keyboardType="numeric"
                />
                <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
            </View>
        );
    }
    _SignUpForm(){
        const {message, numberError} = this.state
        return(
            <View style={{borderRadius: 20, width:width * 0.8, height:height*0.8, backgroundColor:'#aaaeb5', opacity: 0.9, marginTop: height*0.08, marginLeft: width*0.1}}>
                <View style={{width: width*0.8, height: height*0.71, paddingRight:20}}>
                    <Form>
                        <ScrollView>
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
                                labelText = 'Phone no'
                                placeholder = '+92'
                                secureTextEntry = {false}
                                value = {this.state.phoneNo}
                                onChangeText={(text)=>this.setState({phoneNo:text})}
                                keyboardType = 'numeric'
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
                            <View style={{flexDirection:'row', width: width, height: height* 0.1}}>
                                <View style={{width: width* 0.4}}>
                                    <ListItem>
                                        <CheckBox
                                            onPress = {()=> this.setState({isMechanic: !this.state.isMechanic})}
                                            checked={!this.state.isMechanic}
                                        />
                                        <Body>
                                        <Text>User</Text>
                                        </Body>
                                    </ListItem>
                                </View>
                                <View style={{width: width* 0.4}}>
                                    <ListItem>
                                        <CheckBox
                                            onPress = {()=> this.setState({isMechanic: !this.state.isMechanic})}
                                            checked={this.state.isMechanic}
                                        />
                                        <Body>
                                        <Text>Mechanic</Text>
                                        </Body>
                                    </ListItem>
                                </View>
                            </View>
                            <Textarea
                                rowSpan={3} placeholder="Description"
                                onChangeText={(text)=> this.setState({description: text})}
                            />
                        </ScrollView>
                    </Form>
                </View>
                <TouchableOpacity onPress={this.signIn}>
                <View style={{width:width*0.8, height: height*0.09, backgroundColor:'#5c8ddb',alignItems: 'center',justifyContent:'center', borderBottomLeftRadius:20, borderBottomRightRadius: 20}}>
                    <Text style={{fontSize:20, color:'#636568'}}>SignUp</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        console.log(this.state.description)
        const {user,confirmResult} = this.state;
        return(
            <View style={{width: width, height: height,}}>
                <Image source={require('./../../assets/backgroundImage.jpg')} style={{width: width, height: height, position: 'absolute'}}/>
                {!user && !confirmResult && this.SignUpForm()}
                {!user && confirmResult && this.renderVerificationCodeInput()}
            </View>
        )
    }
}