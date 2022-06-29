import React, { Component } from 'react';;
import { Platform,  StyleSheet, View, Ionicons, FontAwesome, MaterialCommunityIcons, wWidth, iconPad, btmLocat, iconWidth, Alert } from "../GlobalVar";

export default class MainMenu extends Component<any, any> {
  // Constructor for class
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      err: null,
      user_id: this.props.user_id
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {/* Home button */}
        <MaterialCommunityIcons style={styles.iconBtn}          
          name='home-circle-outline'            
          size={iconWidth}
          color='black'
          onPress={() => this.props.navigation.navigate('Home', {refresh: true})} />

        {/* Extra space for android */}
        {Platform.OS === 'android' ? <View style={{paddingHorizontal: iconPad}}></View> : null}

        {/* Cart button */}
        <Ionicons style={styles.iconBtn}
          name='cart-outline'            
          size={iconWidth}
          color='black'
          onPress={() => this.props.navigation.navigate('Cart', {user_id: this.state.user_id})} />
        
        {/* Extra space for android */}
        {Platform.OS === 'android' ? <View style={{paddingHorizontal: iconPad}}></View> : null}

        {/* Account button */}
        <FontAwesome style={styles.iconBtn}
          name='user-circle'            
          size={iconWidth}
          color='balck'
          onPress={() => this.props.navigation.navigate('Account', {user_id: this.state.user_id})} />

        {/* Extra space for android */}
        {Platform.OS === 'android' ? <View style={{paddingHorizontal: iconPad}}></View> : null}

        {/* Message List button */}
        <MaterialCommunityIcons style={styles.iconBtn}
          name='message-processing-outline'            
          size={iconWidth}
          color='black'
          onPress={() => this.props.navigation.navigate('MessageList', {user_id: this.state.user_id})} />
        
        {/* Extra space for android */}
        {Platform.OS === 'android' ? <View style={{paddingHorizontal: iconPad}}></View> : null}              

        {/* Setting button */}
        <Ionicons style={styles.iconBtn}          
          name='settings-outline'            
          size={iconWidth}
          color='black'
          onPress={() => this.props.navigation.navigate('Setting')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wWidth,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',        
    paddingBottom: 15,
    position: 'absolute',  
    bottom: 0,
    backgroundColor: '#fcfcfc'
  },
  iconBtn: {
    flex : 1,
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: iconPad
  },
});