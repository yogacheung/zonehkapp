import React, { Component } from 'react';
import { SafeAreaView, View, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, Text, TextInput, StatusBar, Pressable, Modal, Platform, Alert, TouchableHighlightBase } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';

export default class Category extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCate: this.props.showCate,   
      catelist: []
    }
  }

  updateCateStatus = (s: Boolean) => {
    this.setState({showCate: s});
  }

  categoryList = () => {
    return (
      <Text>List testing</Text>
    );
  }

  getCategoryList = () => {
    axios.get(apiserver+'getCategory')
    .then(res => {
      // console.log(res);
      if(res.data.code === 200) {
        this.setState({resList: res.data.list});
      }
    });
  }

  componentDidMount = () => {
    console.log(this.props);
  }

  render() {  
    return(
      <View style={styles.container}>                
          <Text style={styles.title}>List: </Text>
          
          {this.categoryList()}
          <Pressable onPress={() => this.updateCateStatus(!this.state.showCate)} >
            <Text style={styles.textStyle}>Go</Text>
          </Pressable>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99
  },
  title: {    
    fontSize: wWidth*0.05,
    padding: 5,
  },
  textStyle: {
    fontSize: wWidth*0.05,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20
  }  
});