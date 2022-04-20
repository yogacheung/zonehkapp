import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet, Text, TouchableHighlightBase } from 'react-native';
import axios from 'axios';
import { apiserver, wWidth, wHeight } from '../GlobalVar';
import Checkbox from 'expo-checkbox';

export default class Category extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,      
      catelist: [],
      checkedList: [],
    }
  }

  updateCheckedList = () => {
    this.setState({checkedList: []});
  }

  updateIsChecked = (i: number, v: any) => {
    // console.log(i, v);
    let cate = this.state.catelist[i];    
    cate.checked = v;
    // console.log(cate);
    this.state.catelist[i] = cate;
    // console.log(this.state.catelist[i]);
    // this.categoryList();
    // console.log(this.state.catelist);
  }

  categoryList = () => {
    if(this.state.catelist) {
      return this.state.catelist.map((cate: any, i: number) => {                  
        return (
          <View style={styles.section} key={i}>
            <Checkbox               
              style={styles.checkbox}
              value={Boolean(cate.checked)}
              onValueChange={(v) => this.updateIsChecked(i,v)}              
            />           
            <Text style={styles.textStyle}>{cate.name}</Text>
          </View>
        );
      });
    }
  }

  getCategoryList = () => {
    axios.get(apiserver+'getcategory')
    .then(res => {
      // console.log(res);
      if(res.data.code === 200) {
        console.log(res.data.list);
        this.setState({catelist: res.data.list});
      }
    });
  }

  componentDidMount = () => {
    // console.log(this.props);
    if(this.state.isLoading) {
      this.getCategoryList();  
    }
  }

  render() {  
    return(      
      <View style={styles.container}>                          
        <ScrollView>
          {this.categoryList()}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.buttonTextStyle}>Filter</Text>
          </TouchableOpacity>
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {    
    fontSize: wWidth*0.05,
    padding: 5,
  },
  textStyle: {
    fontSize: wWidth*0.05,    
    textAlign: "center",
    padding: 5
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
    width: wWidth*0.25,
  },
  checkbox: {
    margin: 8,
  },
  buttonStyle: {    
    backgroundColor: '#fcfcfc',
    borderWidth: 1,
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