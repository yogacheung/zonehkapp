import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, TextInput, Text, Alert, StatusBar } from 'react-native';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';
import { apiserver, imglink, wWidth } from '../GlobalVar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';
import CachedImage from 'expo-cached-image';

interface product {
  item: {
    id: number;
    title: string;
    price: number;
    img: string;
    min_price: number;
    max_price: number;
    rating_count: number;
    qty: number;
  }
}

export default class Cart extends Component<any, any> { 
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,      
      resList: [],
      total: 0.0,
      localcart: []
    }
  } 

  onfresh = (v:any) => {
    this.getCart();
  }

  calTotal = () => {
    const totalPrice = this.state.resList.reduce((total: number, item:any) => 
      total += item.min_price * item.qty
    , 0.0);  
    this.setState({total: totalPrice});
  }

  getCart = () => {
    let self = this;
    axios.get(apiserver+'getcart')
    .then(res => {
      // console.log(res.data);
      if(res.data.code === 200) {        
        self.setState({resList: res.data.res, isLoading: false});
        self.calTotal();
      }
    });
  }

  removeCart = (cart_id: number) => {
    let self = this;
    Alert.alert('Remove Product', 'Confirm to remove?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      { text: 'Confrim', onPress: () => {
          axios.get(apiserver+'removecart/'+cart_id)
          .then(res => {
            // console.log(res.data);
            if(res.data.code === 200) {        
              self.setState({resList: res.data.res, isLoading: false});
              self.calTotal();
            }
          });
      } },
    ]);
  }
  
  componentDidMount() { 
    if(this.state.isLoading) {
      this.getCart();
    }
  }

  render() {
    // console.log(this.props.navigation);
    if(this.state.isLoading) {
      return(
        <Loader />
      );
    }

    return(      
      <SafeAreaView style={styles.container}>
        <NavigationEvents onDidFocus={(v) => this.onfresh(v)} />              
          {/* List all products in cart */}
          {this.state.resList ?          
          <FlatList
            showsVerticalScrollIndicator  = {false}
            data = {this.state.resList}          
            renderItem = { ({ item }) =>
              <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('Product', {product_id: item.product_id, title: item.title}) }
              >
                <View style={styles.item}>    
                  <CachedImage
                    cacheKey={`${item.product_id}-thumb`}
                    style={styles.tinyLogo}
                    source={{ uri: imglink+item.img }}
                  />
                  <View style={styles.itemDetail}>    
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitile}>Price: HK${item.min_price} x {item.qty}</Text>      
                    {/* Quantity */}
                    {/* <View style={{flex:1, alignItems: 'flex-end'}}>
                      <View style={styles.rowStyle}>
                        <AntDesign name="minuscircleo" size={30} color="black" onPress={() => item.qty > 1 ? item.qty-1 : null} />
                        <TextInput style={styles.qty} value={item.qty.toString()} underlineColorAndroid='transparent'/>
                        <AntDesign name="pluscircleo" size={30} color="black" onPress={() => item.qty+1} />
                      </View>
                    </View> */}
                    <MaterialCommunityIcons name="delete-circle-outline" size={28} color="black" onPress={() => this.removeCart(item.id)}></MaterialCommunityIcons>
                  </View>    
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.id.toString()}         
          />          
          : 
          <View style={styles.item}>
            <Text style={styles.title}>No prodcut.</Text>
          </View>
          }

          {Platform.OS === 'android' ? <View style={{paddingVertical: wWidth/25}}></View> : null}
          <View style={styles.totalContent}>            
            <Text style={styles.totalStyle}>Total: ${this.state.total}</Text>
            <Text style={styles.totalStyle}>Checkout</Text>            
          </View>
            
          <MainMenu navigation={this.props.navigation} />
      </SafeAreaView>                  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  infoContent: {
    backgroundColor: '#fcfcfc',
    padding: 10,
    margin: 10,    
    borderRadius: 10,  
  },
  totalContent: {
    backgroundColor: '#fcfcfc',
    padding: 10,
    paddingBottom: 30,
    marginBottom: 50,   
    borderRadius: 10,  
  },
  totalStyle: {
    fontSize: wWidth*0.06,
    color: 'black'
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
  tinyLogo: {
    width: wWidth*0.25,
    height: wWidth*0.25,
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
  title: {
    fontSize: wWidth*0.03,
    width: wWidth*0.65,
    fontWeight: 'bold',
  },
  subtitile: {
    fontSize: wWidth*0.04,
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
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
});