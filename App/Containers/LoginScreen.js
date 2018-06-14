import React,{Component} from 'react';
import {View,Text, Image, Dimensions, TouchableOpacity, TextInput, Button} from 'react-native';
import InputComponent from './../Components/InputComponent'
import firebase from 'react-native-firebase';
import { Item, Label,Input,Icon, Form } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import MainScreen from './SignUpScreen';
import MapScreen from './MapScreen';
const {height, width} = Dimensions.get('window')
const db = firebase.firestore()
export default class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            password: '',
            email:'',
            phoneNo:'',
            message: '',
            confirmResult:null,
            user:null,
            codeInput: '',
            dataExist: false,
            toggle: false,
            codeConfirmed: false

        }
    }
    componentWillMount(){


    }
     signIn = () => {
        let ph = ""
         let dataEx  = false
         const { phoneNo } = this.state;
         var numberError = phoneNo.length < 13
         this.setState({numberError});
        db.collection("users").where("phoneNo", "==", this.state.phoneNo)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if (doc.exists) {
                        dataEx=true
                        console.log(doc.data(),'lllllllllllllls')
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
            })
         setTimeout(()=>{
             this.setState({dataExist: dataEx})
             if(this.state.dataExist){
                 if (!numberError) {
                     this.setState({message: 'Sending code ...'});
                     firebase.auth().signInWithPhoneNumber(phoneNo)
                         .then(confirmResult => this.setState({
                             confirmResult,
                             message: 'Code has been sent!'}))
                         .catch(error => this.setState({message: `Sign In With Phone Number Error: ${error.message}`}));
                 }
             }
             else{
                 alert("please create an account")
             }

         },5000)

    }
    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;
        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({ message: 'Code Confirmed!', codeConfirmed: true });

                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };
    renderVerificationCodeInput(){
        const { codeInput } = this.state;
        return (
            <View style={{width: width, height: height* 0.3, marginTop: height* 0.3}}>
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
    login(){
        const {message, numberError} = this.state
        return(
            <View>
                <View style={{width:width,height:height*0.2,alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{fontWeight:'bold',fontSize:24,color:'#7085a5'}}>Online Mechanic</Text>
                </View>
                <View style={{borderRadius: 20, width:width * 0.8, height:height*0.25, backgroundColor:'#aaaeb5', opacity: 0.9, marginTop: height*0.08, marginLeft: width*0.1}}>
                    <View style={{width: width*0.8, height: height*0.16, paddingRight:20}}>
                        <Form style={{marginTop: 10, marginLeft:10}}>
                            <PhoneInput
                                ref={ref => {
                            this.phone = ref;
                             }}
                                initialCountry={'pk'}
                                flagStyle={{width: 40, height: 30, borderWidth:0}}
                                textStyle={{fontSize:20}}
                                textProps={{placeholder: 'Telephone number'}}
                                onChangePhoneNumber={(text)=> this.setState({ phoneNo: text}) }
                            />
                        </Form>
                    </View>
                    <TouchableOpacity onPress={this.signIn}>
                        <View style={{width:width*0.8, height: height*0.09, backgroundColor:'#5c8ddb',alignItems: 'center',justifyContent:'center', borderBottomLeftRadius:20, borderBottomRightRadius: 20}}>
                            <Text style={{fontSize:20, color:'#636568'}}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {numberError && <Text style={{color: 'red', paddingLeft:width* 0.17}}>Number must be atleast 10 characters</Text>}

                <View style={{width: width*0.4, height: height*0.07, flexDirection:'row', marginTop: height * 0.3, alignItems:'center', justifyContent:'center', marginLeft: width* 0.6}}>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress= {()=> this.setState({toggle:true})}>
                        <Text style={{fontSize:17}}>SignUP Here</Text>
                        <View style={{width: width *0.1, height:height* 0.04}}>
                            <Image source={require('./../../assets/rightArrow.png')} style={{width: width *0.1, height:height* 0.04}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    render(){
        const {user,confirmResult} = this.state;
        return(
            <View style={{width: width, height: height,}}>
                {this.state.codeConfirmed ? <MapScreen/>: this.state.toggle ? <MainScreen/> :
                    <View>
                        <Image source={require('./../../assets/backgroundImage.jpg')} style={{width: width, height: height, position: 'absolute'}}/>
                        {!user && !confirmResult && this.login()}
                        {!user && confirmResult && this.renderVerificationCodeInput()}
                    </View>

                }

            </View>
        )
    }
}