import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import MainMenu from '../components/MainMenu';
import Searching from '../components/Searching';

import Feature from './Feature';

// Home page
export default class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCate: false,
    }
  }


  render() {
    // console.log(this.props.navigation);
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* Top - searching bar */}
          <Searching navigation={this.props.navigation}/>

          <Feature navigation={this.props.navigation}/>  
          {/* Bottome - menu */}
          <MainMenu navigation={this.props.navigation}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    justifyContent: 'center',    
  },
}); 