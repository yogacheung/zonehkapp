import React, { Component } from 'react';
import axios from 'axios';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class SignIn extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      password: '',      
      msg: '',
      expoPushToken: null,
      notification: {},
    }
  }

  // Push Notification
  registerForPushNotificationsAsync = async () => {
    if(Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({expoPushToken: token});
      // this.postUserToken(); 
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  // postUserToken = () => {
  //   var self = this;
  //   axios.post(apitokenurl, {token: this.state.expoPushToken}, {withCredentials: true})
  //   .then(function(res) {      
  //     // console.log(res.data);
  //     if(res.data.code === 200) {
  //       // console.log(res.data.code);
  //       self.props.navigation.navigate('Home', {connectsid: res.data.id});
  //     }   
  //   });
  // }

  _handleNotification = (notification:any) => {
    this.setState({notification: notification});
  };

  _handleNotificationResponse = (response: any) => {
    console.log(response);
  };

  // Sign in
  onSignIn = () => {      
    if(this.state.email.length < 1) {      
      this.setState({msg: "Please input email."});
    } else if(this.state.password.length < 1) {      
      this.setState({msg: "Please input password."});
    } else {       
      // Post to server
      // console.log(this.state);
      var self = this;
      axios.post(apiserver+ 'usersignin', {username: this.state.email, password: this.state.password})
      .then(function(res) {      
        // console.log(res.data);
        if(res.data.code === 200){          
          // console.log(self, 'login');          
          let name = res.data.username.substring(0, res.data.username.indexOf('@'));   
          self.registerForPushNotificationsAsync();
          Notifications.addNotificationReceivedListener(self._handleNotification);
          Notifications.addNotificationResponseReceivedListener(self._handleNotificationResponse);

          // console.log(self.state.expoPushToken);
        } else {
          // alert(res.data.message);
          self.setState({msg: res.data.message});
        }        
      });  
    }  
  }

  updateEmail = (name: string) => {
    this.setState({email: name, msg: ''});
  }

  updatePassword = (password: string) => {
    this.setState({password: password, msg: ''});
  }

  render() {
    // console.log(this.props);
    return(
      <View style={styles.container}>        
        <View>
          <TextInput style={styles.inputStyle} placeholder="Name"  onChangeText={this.updateEmail}/>
          <TextInput style={styles.inputStyle}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={this.updatePassword}
          />          
          {this.state.msg != '' ? (
            <Text style={styles.errorTextStyle}>
              {this.state.msg}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={this.onSignIn}>
            <Text style={styles.buttonTextStyle}>Sign In</Text>
          </TouchableOpacity>
          <Text>If you want to create an account, Please </Text>
          <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')}/>
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
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
  },
  inputStyle: {
    fontSize: wWidth*0.05,
    padding: 15,
    margin: 5,  
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#dadae8',
  },
  buttonStyle: {    
    backgroundColor: '#fcfcfc',    
    color: '#FFFFFF',
    borderWidth: 1,    
    alignItems: 'center',
    borderRadius: 30,    
    marginVertical: 10,
    marginBottom: 30,
  },
  buttonTextStyle: {
    color: '#000000',    
    fontSize: wWidth*0.08, 
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: wWidth*0.035,
  }
});