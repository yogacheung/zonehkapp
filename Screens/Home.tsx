import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import MainMenu from '../components/MainMenu';
import Searching from '../components/Searching';

import Feature from './Feature';

// Home page
export default class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCate: false,
      user_id: this.props.navigation.state.params? this.props.navigation.state.params.user_id : null
    }
  }

  onfresh = (v:any) => {
    console.log('Home', this.state.user_id, this.props.navigation.state.params);
    if(this.props.navigation.state.params && this.state.user_id == null){
      this.setState({user_id: this.props.navigation.state.params.user_id});
      console.log('Home ', this.state.user_id);
    }
  }

  componentDidMount() {
    console.log('Home', this.state.user_id, this.props.navigation.state.params);    
    if(this.props.navigation.state.params && this.state.user_id == null){
      this.setState({user_id: this.props.navigation.state.params.user_id});
      console.log('Home ', this.state.user_id);
    }
  }

  render() {
    // console.log(this.props.navigation);
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>        
        <View style={styles.container}>
          <NavigationEvents onDidFocus={(v) => this.onfresh(v)} />
          {/* Top - searching bar */}
          <Searching navigation={this.props.navigation}/>

          <Feature navigation={this.props.navigation} user_id={this.state.user_id}/>  
          {/* Bottome - menu */}
          <MainMenu navigation={this.props.navigation} user_id={this.state.user_id}/>
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