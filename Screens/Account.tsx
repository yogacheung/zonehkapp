import React, { Component } from 'react'
import { SafeAreaView, View, Button, ScrollView, TouchableOpacity, StyleSheet, Text, StatusBar } from 'react-native';
import axios from 'axios';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';
import { NavigationEvents } from 'react-navigation';

export default class Account extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      signIn: false,
      userInfo: null
    }
  }

  onfresh = (v:any) => {
    // console.log('refresh', v);    
    // this.getUserInfo();
  }

  // Sign out
  onSignOut = () => {
    console.log('sign out');
    axios.get(apiserver+'usersignout', {withCredentials: true})
    .then(res => {
       console.log(res.data);
      if(res.data.code === 200) {        
        this.setState({signIn: false, userInfo: null});
      }      
    });
    
  }

  // Fetch user account information
  getUserInfo = () => {    
    axios.get(apiserver+'getuseraccount', {withCredentials: true})
    .then(res => {
       console.log(res.data);
      if(res.data.code === 200) {
        this.setState({userInfo: res.data.res[0], signIn: true, isLoading: false});
      } else if(res.data.code === 300) {
        this.setState({signIn: false, isLoading: false});
      }
    });
  }

  componentDidMount() {    
    if(this.state.isLoading){
      this.getUserInfo();
    } 
  }

  render() {
    if(this.state.isLoading) {
      return(
        <Loader />
      );
    }

    return(            
      <SafeAreaView style={styles.container}>   
        <NavigationEvents onDidFocus={(v) => this.onfresh(v)} />   
        <ScrollView>
          {/* Welcome and Sign In */}
          <View style={styles.infoContent}>
            <Text style={styles.textStyle}>Welcome, {this.state.signIn ? this.state.userInfo.name: ''}</Text>
            {
              this.state.signIn ?
              <Button title="Sign Out?" onPress={this.onSignOut} /> :
              <Button title="Please sign in." onPress={() => this.props.navigation.navigate('UserSignIn')} /> 
            }            
          </View>
          
          {/* User information */}                    
          <View style={styles.infoContent}>
            <Text style={styles.textStyle}>Email: {this.state.signIn ? this.state.userInfo.email: ''}</Text>
            <Text style={styles.textStyle}>Name: {this.state.signIn ? this.state.userInfo.name: ''}</Text>
            <Text style={styles.textStyle}>Phone: {this.state.signIn ? this.state.userInfo.phone: ''}</Text>
          </View>
            
          {/* Edit button if signed in */}
          {
            this.state.signIn ?
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('EditAccount', {userName: this.state.userName})}>
              <Text style={styles.buttonTextStyle}>Edit</Text>
            </TouchableOpacity> : null
          }

          {/* User information */}
          <View style={styles.infoContent}>
            <Text style={styles.textStyle}>Order History</Text>            
          </View>      
        </ScrollView>        
        <MainMenu navigation={this.props.navigation} />
      </SafeAreaView>           
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },  
  infoContent: {
    backgroundColor: '#fcfcfc',
    padding: 10,
    margin: 10,    
  },
  textStyle: {
    fontSize: wWidth*0.06,
    padding: 5,
  },
  buttonStyle: {    
    backgroundColor: '#fcfcfc',
    borderWidth: 0,
    color: '#FFFFFF',        
    alignItems: 'center',
    borderRadius: 30,    
    marginVertical: 10,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    color: '#000000',    
    fontSize: wWidth*0.08, 
  },
});