import { Platform, StatusBar, Dimensions } from 'react-native';

const apiserver = 'https://www.bakermode.com:4422/api/';
const imgurl = 'https://bakermode.com:4422/images/';

const wWidth = Platform.OS === 'ios' ? Dimensions.get('window').width : Dimensions.get('screen').width;
const wHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('screen').height - 20; //StatusBar.currentHeight;

export { apiserver };
export { imgurl };
export { wWidth };
export { wHeight };