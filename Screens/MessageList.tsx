import React, { Component } from 'react'
import { SafeAreaView, View, Button, ScrollView, TouchableOpacity, StyleSheet, Text, StatusBar } from 'react-native';
import axios from 'axios';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';
import { NavigationEvents } from 'react-navigation';

export default class MessageList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true      
    }
  }

  componentDidMount() {
    if(this.state.isLoading){
      // this.getUserInfo();
    }
  }

  render() {
    return(            
      <SafeAreaView style={styles.container}>        
        <ScrollView>
          {/* Setting information */}
          <View style={styles.infoContent}>
            <Text style={styles.textStyle}>No message</Text>            
          </View>          
        </ScrollView>        
        <MainMenu navigation={this.props.navigation}/>
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
    fontSize: wWidth*0.05, 
  },
});