import React, { Component } from 'react'
import { SafeAreaView, View, Button, FlatList, TouchableOpacity, StyleSheet, Text, StatusBar, Alert } from 'react-native';
import axios from 'axios';
import { apiserver, imglink, wWidth, wHeight } from '../GlobalVar';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';
import { NavigationEvents } from 'react-navigation';

const Item = ({ recevier }:any) => (
  <View style={styles.item}>        
    <View style={styles.itemDetail}>    
    <Text style={styles.title}>{recevier.name}</Text>    
    </View>    
  </View>
);

export default class MessageList extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      recevierList: [],
      user_id: this.props.navigation.state.params==null? this.props.navigation.state.params.user_id : 1,
    }
  }

  requireSignIn = () => {
    Alert.alert(
      "Not Yet Sign In",
      "Required to sign in to receive or send messages.",
      [
        {
          text: "Sign In",
          onPress: () => this.props.navigation.navigate('UserSignIn')
        },
        {
          text: "Cancel",
          onPress: () => this.props.navigation.navigate('Home'),
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  }

  // Fetch message list
  getMessageList = () => {
    axios.get(apiserver+'getreceiver/'+this.state.user_id)
    .then(res => {
      console.log(res.data);
      if(res.data.code === 200){
        this.setState({recevierList: res.data.res, isLoading: false});
      }     
    });
  }

  componentDidMount() {
    console.log('MessageList ', this.state.user_id);
    if(this.state.isLoading) {
      if(this.state.user_id != null) {
        this.getMessageList();
      } else {
        this.requireSignIn();
      }        
    }    
  }

  render() {
    if(this.state.isLoading) {
      return(
        <Loader />
      );
    }

    return(
      <SafeAreaView style={styles.container}>        
        <View>          
          <FlatList 
            data = {this.state.recevierList} 
            renderItem = { ({ item }) =>
              <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('Message', {receiver_id: item.receiver_id, sender_id: this.state.user_id})}
              >
                <Item recevier={item} />
              </TouchableOpacity>
            }
            keyExtractor={item => item.receiver_id.toString()}         
          />
          
          {/* No record */}
          {this.state.recevierList?
            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate('Message', {receiver_id: 2, sender_id: this.state.user_id})}
            >
              <View style={styles.item}>        
                <View style={styles.itemDetail}>    
                <Text style={styles.title}>Customer Service</Text>
                </View>    
              </View> 
            </TouchableOpacity>
            : null
          }
        </View>
        <MainMenu navigation={this.props.navigation} user_id={this.state.user_id}/>
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
    fontSize: wWidth*0.05,
  },
  subtitile: {
    fontSize: wWidth*0.04,
  }
});