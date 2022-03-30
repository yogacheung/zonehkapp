import { Platform, StatusBar, Dimensions, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const apiserver = 'https://api.z-onehk.com/';
const imglink = 'https://www.z-onehk.com/wp-content/uploads/';
const imgurl = 'https://images.z-onhk.com/';

const wWidth = Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('screen').width;
const wHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height - 20; //StatusBar.currentHeight;
const barTop = Platform.OS === 'ios' ? 5 : 0;

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
export { imglink };
export { imgurl };

// Screen size
export { wWidth };
export { wHeight };
export { barTop };

// Button
export { iconWidth };
export { iconPad };
export { btmLocat };