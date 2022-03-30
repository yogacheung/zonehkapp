import React, { Component } from 'react';
import { SafeAreaView, View, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, Text, TextInput, StatusBar, Pressable, Modal, Platform, Alert } from 'react-native';
import axios from 'axios';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';

export default class Product extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.navigation.state.params.id,
      info: null,
    }    
  }

  getProductDetail = () => {
    var self = this;
    axios.get(apiserver+'getproduct/'+this.state.id)
    .then(res => {
      // console.log(res.data);      
      if(res.data.code === 200) {
        self.setState({info: res.data.res[0], isLoading: false});        
        // console.log(this.state);  
      }      
    });
  }

  componentDidMount() {
    if(this.state.isLoading){
      this.getProductDetail();      
    }    
  }

  render(){
    if(this.state.isLoading) {
      return(
        <Loader />
      );
    }

    return(
      <SafeAreaView style={styles.container}>        
        <ScrollView>
          <Image style={styles.image} source={{uri: imglink+this.state.info.img}} />
          <View style={styles.infoContent}>
            <Text style={styles.title}>{this.state.info.title}</Text>
            <Text style={styles.title}>Price: HK${this.state.info.min_price}</Text>
            <Text style={styles.title}>Descripton:</Text>
            <ScrollView>
              <Text style={styles.title}>{this.state.info.content}</Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
            >
              <Text style={styles.buttonTextStyle}>Add To Cart</Text>
            </TouchableOpacity>
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
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  image: {
    width: wWidth-15,
    height: wHeight*0.4,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fcfcfc',
    resizeMode: 'contain',
    margin: 8,
    backgroundColor: '#fcfcfc',
  },
  infoContent: {
    backgroundColor: '#fcfcfc',
    padding: 10,
    margin: 10,    
    borderRadius: 10,  
  },
  title: {    
    fontSize: wWidth*0.05,
    padding: 5,
  },
  qtystyle: {
    flexDirection: 'row',
    padding: 5,
  },
  qty: {     
    width: wWidth*0.2,
    color: '#000000',    
    textAlign: 'center',
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: wWidth*0.05   
  },
  iconBtn: {
    flex: 1,
    // flexGrow: 1,
    textAlign: 'center',    
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'android' ? 50 : 5,    
  },
  message: {
    fontSize: wWidth*0.05,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10
  },
  buttonStyle: {    
    backgroundColor: '#fcfcfc',
    borderWidth: 1,
    color: '#FFFFFF',    
    alignItems: 'center',
    borderRadius: 15,    
    marginVertical: 10,
    marginBottom: 50,
  },
  buttonTextStyle: {
    color: '#000000',    
    fontSize: wWidth*0.08, 
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  datePicker: {
    flex: 1
  },
  modalView: {    
    marginHorizontal: 20,
    marginVertical: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    fontSize: wWidth*0.05,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20
  },
});