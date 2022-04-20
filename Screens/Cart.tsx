import React, { Component } from 'react'
import { StyleSheet, View, Platform, FlatList, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, TextInput, Text, Image, StatusBar } from 'react-native';
import axios from 'axios';
import { NavigationEvents } from 'react-navigation';
import { apiserver, imglink, wWidth } from '../GlobalVar';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';

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

// Flatlist content
const Item = ({ item }: any) => (  
  <View style={styles.item}>    
    <Image
      style={styles.tinyLogo}
      source={{ uri: imglink+item.img }}
    />
    <View style={styles.itemDetail}>    
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitile}>Price: HK${item.min_price} x1</Text>      
      {/* Quantity */}
      {/* <View style={{flex:1, alignItems: 'flex-end'}}>
        <View style={styles.rowStyle}>
          <AntDesign name="minuscircleo" size={30} color="black" onPress={() => item.qty > 1 ? item.qty-1 : null} />
          <TextInput style={styles.qty} value={item.qty.toString()} underlineColorAndroid='transparent'/>
          <AntDesign name="pluscircleo" size={30} color="black" onPress={() => item.qty+1} />
        </View>
      </View> */}
    </View>    
  </View>
);

export default class Cart extends Component<any, any> { 
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      resList: []
    }
  } 

  onfresh = (v:any) => {
    this.getFeature();
  }

  getFeature = () => {
    axios.get(apiserver+'getfeature')
    .then(res => {
      // console.log(res);
      if(res.data.code === 200) {
        this.setState({resList: res.data.list, isLoading: false});
      }
    });
  }
  
  componentDidMount() {
    if(this.state.isLoading) {
      this.getFeature();
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
                onPress = {() => this.props.navigation.navigate('Product', {id: item.id, title: item.title})}
              >
                <Item item={item} />
              </TouchableOpacity>
            }
            keyExtractor={item => item.id.toString()}         
          />
          : null}
          {Platform.OS === 'android' ? <View style={{paddingVertical: wWidth/25}}></View> : null}

          <View style={styles.infoContent}>
            <Text>Total: </Text>
            <Text>Checkout</Text>
          </View>
          
          <MainMenu navigation={this.props.navigation}/>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    marginTop: StatusBar.currentHeight,
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