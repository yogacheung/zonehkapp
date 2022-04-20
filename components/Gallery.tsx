import React, { Component } from 'react';;
import { Platform,  StyleSheet, View, Ionicons, FontAwesome, MaterialCommunityIcons, wWidth, iconPad, btmLocat, iconWidth } from "../GlobalVar";

export default class Gallery extends Component<any, any> {
  // Constructor for class
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      imagesUrl: [],
      err: null
    }
  }

  render() {
    return(
      <View style={styles.container}>
        
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
  image: {
    flex : 1,
    color: '#000',
    textAlign: 'center',
    justifyContent: 'center',    
  },
});