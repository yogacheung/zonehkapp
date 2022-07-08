import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HeaderBackButton } from '@react-navigation/elements';

// Import Screen files
import Home from './Screens/Home';
import Product from './Screens/Product';
import Account from './Screens/Account';
import UserSignIn from './Screens/UserSignIn';
import UserSignUp from './Screens/UserSignUp';
import Category from './Screens/Category';
import Cart from './Screens/Cart';
import Setting from './Screens/Setting';
import Message from './Screens/Message';
import MessageList from './Screens/MessageList';

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
    Category: {
      screen: Category,
      navigationOptions: {headerLeft: ()=> null}
    },
    Account: {
      screen: Account,
      navigationOptions: {headerLeft: ()=> null}
    },
    Cart: {
      screen: Cart,
      navigationOptions: {headerLeft: ()=> null}
    },
    UserSignIn: {
      screen: UserSignIn,
      navigationOptions: {
        title: 'Sign In',
      }
    },
    UserSignUp: {
      screen: UserSignUp,
      navigationOptions: {
        title: 'Sign Up',
      }
    },
    Message: {
      screen: Message
    },
    MessageList: {
      screen: MessageList,
      navigationOptions: {
        title: 'Message List',
        headerLeft: ()=> null
      }
    },
    Setting: {
      screen: Setting
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