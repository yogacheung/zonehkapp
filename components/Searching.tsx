import React, { Component } from 'react';
import axios from 'axios';
import { Platform, StyleSheet, View, Ionicons, FontAwesome, MaterialCommunityIcons, wWidth, wHeight, barTop, iconPad, btmLocat, iconWidth } from "../GlobalVar";
import { TextInput, StatusBar, Dimensions } from 'react-native';
import Category from '../Screens/Category';

// Searching Component
export default class Searching extends Component<any, any> {
  constructor(props: any) {
    super(props);    
    this.state = { 
      isLoading: true,      
      searchText: '',      
      err: null
    };
  }

  updateSearcKey = (searchText: string) => {    
    this.setState({searchText: searchText });
  };

  handleKeyDown = () => {    
    // console.log('search');
    this.props.navigation.navigate('SearchResult', {searchKey: this.state.searchKey, searchZip: this.state.searchZip})
  }

  updateShowCate = (s: boolean) => {
    this.setState({showCate: s})
    console.log(this.state.showCate);    
  }

  componentDidMount() {
    // console.log(this.state.showCate);
  }

  render() {
    const search = this.state;
    // console.log(this.props.navigation);
    return(
      <View style={styles.container}>        
        <TextInput style={styles.search} placeholder=" Search" value={search.searchKey} underlineColorAndroid='transparent' onChangeText={this.updateSearcKey} returnKeyType="search" onSubmitEditing={this.handleKeyDown}/>  
        {/* Searching Icon - Hide */}
        {/* <Icon style={styles.searchicon}          
          name='search'
          type='font-awesome'
          size={wWidth/15}      
          onPress={() => this.props.navigation.navigate('SearchResult', {searchKey: search.searchKey, searchZip: search.searchZip})} /> */}
                
        {/* Category Filter */}
        <Ionicons style={styles.iconBtn}
            name='options-outline'            
            size={iconWidth}
            color='black'
            onPress={() => this.props.navigation.navigate('Category')} />
                      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {    
    marginTop: barTop,
    marginBottom: Platform.OS === 'ios' ? 10 : -20,
    height: wHeight*0.05,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  search: {    
    width: wWidth*0.7,
    color: 'black',    
    textAlign: 'left',
    paddingLeft: 10,
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  searchicon: {
    flex: 1,    
    textAlign: 'center',    
    justifyContent: 'center',
  },
  iconBtn: {
    flex : 1,
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: iconPad
  },
});