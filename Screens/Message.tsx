import React, { Component } from 'react'
import { SafeAreaView, View, Button, TextInput, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import axios from 'axios';
import { apiserver, wWidth, wHeight } from '../GlobalVar';
import Loader from '../components/Loader';
import MainMenu from '../components/MainMenu';
import { NavigationEvents } from 'react-navigation';
import { Feather } from '@expo/vector-icons';

// Message in line
const Item = ({ msg }:any) => {
  if(msg.sender_id == 1) {
    return (
      <View style={{padding: 5}}>
        <Text style={styles.time}>{msg.sent_time}</Text>
        <View style={styles.item}>
          <Text style={styles.subtitile}>{msg.msgchat}</Text>          
        </View>
        <View style={styles.senderStyle}>            
          <Text style={styles.sendertitle}>From: You</Text>
          {/* <Icon style={styles.iconBtn}
                  name='check-square'
                  type='font-awesome'
                  size={wWidth/20}/> */}
        </View> 
      </View>
    );    
  } else {
    return (
      <View style={{padding: 5}}>
        <Text style={styles.time}>{msg.sent_time}</Text>
        <View style={styles.item}>
          <Text style={styles.subtitile}>{msg.msgchat}</Text>          
        </View>
        <View style={styles.rowStyle}>            
          <Text style={styles.subtitile}>From: CS</Text>
          {/* <Icon style={styles.iconBtn}
                  name='check-square'
                  type='font-awesome'
                  size={wWidth/20}/> */}
        </View>
      </View>
    );
  }  
}

export default class Message extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      receiver_id: this.props.navigation.state.params.receiver_id,
      sender_id: this.props.navigation.state.params==null? this.props.navigation.state.params.user_id : 1,
      msglist: null,
      msgchat: ''  
    }
  }

  // Fetch message content
  getMessage = () => {
    var self = this;
    axios.get(apiserver+'getmessages/'+this.state.receiver_id+'/'+this.state.sender_id)
    .then(function(res) {
       console.log(res.data);
      if(res.data.code === 200) {
        self.setState({msglist: res.data.res, isLoading: false});
      }
    });
  }

  updateInputMsg = (msg:any) => {
    this.setState({msgchat: msg});
  }

  // Send message
  postMeassage = () => {
    console.log(this.state);
    var self = this;
    axios.post(apiserver+'sendmessage', {receiver_id: this.state.receiver_id, sender_id: this.state.sender_id, msgchat: this.state.msgchat})
    .then(function(res) {      
      console.log(res.data);
      if(res.data.code === 200) {
        self.getMessage();
      } else {
        console.log(res.data);
      }
    });  
  }

  componentDidMount() {
    console.log('Message ', this.state.sender_id, this.state.receiver_id);
    if(this.state.isLoading){
      this.getMessage();
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
        <View style={styles.chatbg}>
          <FlatList 
            data = {this.state.msglist} 
            renderItem = { ({ item }) => <Item msg={item} />}
            keyExtractor={item => item.msg_id.toString()}         
          />
        </View>
          <View style={styles.msgStyle}>
            <TextInput style={styles.msgbar} placeholder="" value={this.state.msgchat} underlineColorAndroid='transparent' onChangeText={this.updateInputMsg}/>
            <Feather name="send" size={wWidth/15}
              onPress={() => this.postMeassage()} style={styles.sendicon} color="black" />

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
  chatbg: {    
    margin: 10,
    flex: 0.95
  },
  item: {
    backgroundColor: '#fcfcfc',
    padding: 5,
    margin: 5,    
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
  iconBtn: {
    flexGrow: 1,    
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  rowStyle: {    
    flexDirection: 'row',
  },
  senderStyle: {        
    flexDirection: 'row',
    justifyContent: 'flex-end'  
  },
  title: {
    fontSize: wWidth*0.05,
  },
  sendertitle: {
    textAlign: 'right',
    fontSize: wWidth*0.04,
  },
  subtitile: {
    fontSize: wWidth*0.04,
  },
  time: {
    fontSize: wWidth*0.04,
    textAlign: 'center'
  },
  msgStyle: {    
    flexDirection: 'row',    
  },
  msgbar: {    
    width: wWidth*0.85,
    height: wHeight*0.05,
    color: '#000',    
    textAlign: 'left',    
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    margin: 5,
  },
  sendicon: {
    width: wWidth*0.1,
    height: wWidth*0.1,
    flexGrow: 1,
    textAlign: 'center',    
    justifyContent: 'center',
  }
});