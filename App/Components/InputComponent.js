import React,{Component} from 'react';
import {View,Text} from 'react-native'
//import styles from './InputComponentStyle';
import { Item, Label,Input,Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class InputComponent extends Component{
    static propTypes = {
        labelText: PropTypes.string,
        placeholder: PropTypes.string,
        inputRef: PropTypes.string,
        onChangeText: PropTypes.func,
        value: PropTypes.string,
        secureTextEntry: PropTypes.bool
    }

    render(){
        return(
            <Item stackedLabel>
                <Label style={this.props.labelStyle}>{this.props.labelText}</Label>
                <Input
                    placeholder= {this.props.placeholder}
                    ref= {this.props.refName}
                    autofocus= {false}
                    autoCapitalize="none"
                    autoCorrect = {false}
                    secureTextEntry= {this.props.secureTextEntry}
                    style= {{fontWeight:'bold', fontSize:15,}}
                    value= {this.props.value}
                    onChangeText={this.props.onChangeText}
                    keyboardType= {this.props.keyboardType}

                />
            </Item>
        )
    }
}