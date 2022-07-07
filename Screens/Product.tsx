import React, { Component } from 'react';
import { SafeAreaView, View, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, Text, TextInput, StatusBar, Pressable, Platform, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';
import CachedImage from 'expo-cached-image';

export default class Product extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      product_id: this.props.navigation.state.params.product_id,      
      info: null,
      qty: 1,
      msg: ''
    }    
  }

  getProductDetail = () => {
    var self = this;
    axios.get(apiserver+'getproduct/'+this.state.product_id)
    .then(res => {
       console.log(res.data);      
      if(res.data.code === 200) {
        self.setState({info: res.data.res[0], isLoading: false});        
        // console.log(this.state);  
      }      
    });
  }

  updateQty = (qty: number) => {
    if(this.state.qty > 0){
      this.setState({qty: this.state.qty+qty});
    }    
  }

  addToCart = () => {
    var self = this;
    axios.post(apiserver+'addtocart', {product_id: this.state.product_id, qty: this.state.qty})
    .then(res => {
       console.log(res.data);      
      if(res.data.code === 200) {            
        // console.log(this.state);  
        Alert.alert('Add To Cart', 'Added. Go to Cart?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel'),
            style: 'cancel',
          },
          { text: 'Go', onPress: () => this.props.navigation.navigate('Cart') },
        ]);
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
          <CachedImage cacheKey={`${this.state.product_id}-thumb`} style={styles.image} source={{uri: imglink+this.state.info.img}} />
          <View style={styles.infoContent}>
            {/* Info */}
            <Text style={styles.title}>{this.state.info.title}</Text>
            <View style={styles.rowStyle}>
              <Text style={styles.title}>HK${this.state.info.min_price}</Text>

              {/* Quantity */}
              <View style={{flex:1, alignItems: 'flex-end'}}>
                <View style={styles.rowStyle}>
                  <AntDesign name="minuscircleo" size={30} color="black" onPress={() => this.state.qty > 1 ? this.setState({qty: this.state.qty-1}) : null} />
                  <TextInput style={styles.qty} value={this.state.qty.toString()} underlineColorAndroid='transparent'/>
                  <AntDesign name="pluscircleo" size={30} color="black" onPress={() => this.setState({qty: this.state.qty+1})} />
                </View>
              </View>
            </View>
            <Text style={styles.title}>Descripton:</Text>
            <ScrollView>
              <Text style={styles.title}>{this.state.info.content}</Text>
            </ScrollView>

            

            {/* Add To Cart Button */}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.addToCart}
            >
              <Text style={styles.buttonTextStyle}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>        
        <MainMenu navigation={this.props.navigation} />
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
  textStyle: {
    fontSize: wWidth*0.05,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20
  },
});