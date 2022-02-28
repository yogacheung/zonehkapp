import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderBackButton } from '@react-navigation/elements';

// Import Screen files
import Home from './Screens/Home';

const options = ({{navigation}: {navigation: any}, {route}: {route: any}}) => ({
  headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />
});

// Routing paths
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {headerShown: false}
    }
  }, {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}