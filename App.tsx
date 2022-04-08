import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderBackButton } from '@react-navigation/elements';

// Import Screen files
import Home from './Screens/Home';
import Product from './Screens/Product';
import Account from './Screens/Account';
import UserSignIn from './Screens/UserSignIn';
import Category from './Screens/Category';

// const options = ({{navigation}: {navigation: any}, {route}: {route: any}}) => ({
//   headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />
// });

// Routing paths
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {headerShown: false}
    },
    Product: {
      screen: Product,
      navigationOptions: ({ navigation }:any) => ({
        title: navigation.state.params.title,
      }),
    },
    Category : {
      screen: Category
    },
    Account: {
      screen: Account      
    },
    UserSignIn: {
      screen: UserSignIn,
      navigationOptions: {headerShown: false}
    },
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