import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity, StyleSheet, Text, TouchableHighlightBase } from 'react-native';
import axios from 'axios';
import { apiserver, wWidth, wHeight } from '../GlobalVar';
import MainMenu from '../components/MainMenu';

const Item = ({ cate }:any) => (
  <View style={styles.item}>        
    <View style={styles.itemDetail}>    
    <Text style={styles.title}>{cate.name}</Text>    
    </View>    
  </View>
);

export default class Category extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,      
      catelist: []      
    }
  }

  getCategoryList = () => {
    axios.get(apiserver+'getcategory')
    .then(res => {
      // console.log(res);
      if(res.data.code === 200) {
        // console.log(res.data);
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
      <SafeAreaView style={styles.container}>
        <FlatList 
          data = {this.state.catelist} 
          renderItem = { ({ item }) =>
            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate('Home')}
            >
              <Item cate={item} />
            </TouchableOpacity>
          }
          keyExtractor={item => item.category_id.toString()}         
        />

        <View style={{paddingVertical: wWidth/25}}></View>
        <MainMenu navigation={this.props.navigation} />          
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContent: {
    backgroundColor: '#fcfcfc',
    padding: 10,
    margin: 10,    
    borderRadius: 10,  
  },
  item: {
    backgroundColor: '#fcfcfc',
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    borderColor: 'gray',    
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  itemDetail: {    
    padding: 5,
    margin: 5,  
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