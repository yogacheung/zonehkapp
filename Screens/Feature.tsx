import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import MainMenu from '../components/MainMenu';

export default class Feature extends Component<any, any> {  
  render() {
    // console.log(this.props.navigation);
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>          
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