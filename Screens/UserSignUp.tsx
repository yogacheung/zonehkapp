import React, { Component } from 'react';
import axios from 'axios';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { apiserver, wWidth, wHeight } from '../GlobalVar';
import * as Crypto from 'expo-crypto';

export default class UserSignUp extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: 'User Name',
      password: '',
      confPassword: '',
      name: '',
      email: '',
      phone: '',
      user_id: 0,      
      redirect: false,
      msg: ''
    }
  }

  // Sign in
  onSignUp = async () => {      
    if(this.state.email.length < 1) {
      this.setState({msg: 'Please input email.'});
    } else if(this.state.password.length < 1) {
      this.setState({msg: 'Please input password.'});
    } else if(this.state.password !== this.state.confPassword) {
      this.setState({msg: 'Passwords are NOT match.'});      
    } else if(this.state.phone.length < 8) {
      this.setState({msg: 'Phone number is invalid.'});      
    } else {
      // Post to server
      // console.log(this.state);
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        this.state.password        
      );
      // console.log(digest);

      var self = this;
      axios.post(apiserver+'usersignup', 
      {
        username: this.state.username,
        email: this.state.email,
        name: this.state.name,
        phone: this.state.phone,
        password: digest
      })
      .then(function(res) {      
        // console.log(res.data);
        if(res.data.code === 200) {
          self.props.navigation.navigate('UserSignIn');
        } else {
          // alert(res.data.message);
          self.setState({msg: res.data.res[0].msg});
        }   
      });
    } 
  }

  updateName = (name: string) => {
    this.setState({name: name, msg: ''});
  }

  updateEmail = (email:string) => {
    let name = email.substring(0, email.indexOf('@'));
    this.setState({email: email, username: name, msg: ''});
  }

  updatePhone = (phone:string) => {
    this.setState({phone: phone, msg: ''});
  }

  updatePassword = (password:string) => {
    this.setState({password: password, msg: ''});
  }

  updateConfPassword = (confPassword:string) => {
    this.setState({confPassword: confPassword, msg: ''});
  }

  render() {
    return(
      <View style={styles.container}>        
        <View>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            placeholderTextColor='gray'
            onChangeText={this.updateName}
            />

          <TextInput
            style={styles.inputStyle}
            placeholder="Phone"
            placeholderTextColor='gray'
            onChangeText={this.updatePhone}
            />

          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            placeholderTextColor='gray'
            onChangeText={this.updateEmail}
            />   
          {/* <Text style={styles.textStyle}>{this.state.username} </Text> */}

          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor='gray'
            onChangeText={this.updatePassword}
          />
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true}
            placeholder="Confrim Password"
            placeholderTextColor='gray'
            onChangeText={this.updateConfPassword}
          />
          {this.state.msg != '' ? (
            <Text style={styles.errorTextStyle}>
              {this.state.msg}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={this.onSignUp}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>          
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFCFC',
    alignItems: 'center',    
    marginTop: StatusBar.currentHeight,
  },
  inputStyle: {
    fontSize: wWidth*0.05,    
    padding: 15,
    margin: 5,  
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#dadae8',
    width: wWidth*0.8,
  },
  textStyle: {
    color: 'gray',
    fontSize: wWidth*0.05,    
    padding: 15,
    margin: 5,  
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#dadae8',
    width: wWidth*0.8,
  },
  buttonStyle: {
    backgroundColor: '#fcfcfc',    
    color: '#FFFFFF',
    borderWidth: 1,    
    alignItems: 'center',
    borderRadius: 30,    
    marginVertical: 50,
    marginBottom: 30,
  },
  buttonTextStyle: {
    color: '#000000',    
    fontSize: wWidth*0.08, 
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: wWidth*0.06,
  }
});