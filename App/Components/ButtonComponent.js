import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'

export default class FullButton extends Component{
    static propTypes = {
        text : PropTypes.string,
        textStyle: PropTypes.object,
        buttonStyle : PropTypes.object,
        onPress : PropTypes.func
    }
    render(){
        return(
            <TouchableOpacity style= {{width:'100%'}} onPress = {()=>{this.props.onPress()}}>
                <View style = {this.props.buttonStyle}>
                    <Text style = {this.props.textStyle}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}