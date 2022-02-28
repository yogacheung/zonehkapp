import { Platform, StatusBar, Dimensions, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const apiserver = 'https://www.bakermode.com:4422/api/';
const imgurl = 'https://bakermode.com:4422/images/';
const ipstack = 'http://api.ipstack.com/';

const wWidth = Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('screen').width;
const wHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height - 20; //StatusBar.currentHeight;
const barTop = Platform.OS === 'ios' ? 40 : 0;

const iconWidth = Platform.OS === 'ios' ? wWidth/8 : wWidth/8;
const iconPad = Platform.OS === 'ios' ? wWidth/30 : wWidth/30;
const btmLocat = Platform.OS === 'ios' ? 5 : 0;

// Refer
export { Platform };
export { StyleSheet };
export { StatusBar };
export { View };
export { Ionicons };
export { FontAwesome };
export { MaterialCommunityIcons };

// Server url
export { apiserver };
export { imgurl };
export { ipstack };

// Screen size
export { wWidth };
export { wHeight };
export { barTop };

// Button
export { iconWidth };
export { iconPad };
export { btmLocat };