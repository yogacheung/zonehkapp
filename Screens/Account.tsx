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
      user_id: this.props.navigation.state.params==null? this.props.navigation.state.params.user_id : 1,      
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
    this.setState({user_id: 0, userInfo: null});
  }

  // Fetch user account information
  getUserInfo = () => {    
    axios.get(apiserver+'getuseraccount/'+this.state.user_id)
    .then(res => {
       console.log(res.data);
      if(res.data.code === 200) {        
        this.setState({userInfo: res.data.res[0], isLoading: false});
      }      
    });
  }

  componentDidMount() {
    console.log('Account ', this.state.user_id);
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
            <Text style={styles.textStyle}>Welcome, {this.state.userInfo != null? this.state.userInfo.name: ''}</Text>
            {
              this.state.user_id == 0 ?
              <Button title="Please sign in." onPress={() => this.props.navigation.navigate('UserSignIn')} /> 
              : <Button title="Sign Out?" onPress={this.onSignOut} />
            }            
          </View>
          
          {/* User information */}                    
          <View style={styles.infoContent}>
            <Text style={styles.textStyle}>Email: {this.state.userInfo != null? this.state.userInfo.email: ''}</Text>
            <Text style={styles.textStyle}>Name: {this.state.userInfo != null? this.state.userInfo.name: ''}</Text>
            <Text style={styles.textStyle}>Phone: {this.state.userInfo != null? this.state.userInfo.phone: ''}</Text>
          </View>
            
          {/* Edit button if signed in */}
          {
            this.state.user_id != 0 ?
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
        <MainMenu navigation={this.props.navigation} user_id={this.state.user_id}/>
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