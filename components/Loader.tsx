import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MainMenu from './MainMenu';

export default class Loader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});