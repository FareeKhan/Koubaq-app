import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ShopDetail from '../screens/ShopDetail';
import ProductDetail from '../screens/ProductDetail';
import BasketScreen from '../screens/BasketScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import GiftScreen from '../screens/GiftScreen';
import GiftFilterScreen from '../screens/GiftFilterScreen';
import AccountSetting from '../screens/AccountSetting';
import WalletScreen from '../screens/WalletScreen';
import TopUpWalletScreen from '../screens/TopUpWalletScreen';
import SendBalanceScreen from '../screens/SendBalanceScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import OrderScreens from '../screens/OrderScreens';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SuccessfulScreen from '../screens/SuccessfulScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen name="BasketScreen" component={BasketScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="GiftScreen" component={GiftScreen} />
      <Stack.Screen name="GiftFilterScreen" component={GiftFilterScreen} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="TopUpWalletScreen" component={TopUpWalletScreen} />
      <Stack.Screen name="SendBalanceScreen" component={SendBalanceScreen} />
      <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
      <Stack.Screen name="OrderScreens" component={OrderScreens} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="SuccessfulScreen" component={SuccessfulScreen} />
    </Stack.Navigator>
  );
};



export const giftStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GiftScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen name="BasketScreen" component={BasketScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="GiftScreen" component={GiftScreen} />
      <Stack.Screen name="GiftFilterScreen" component={GiftFilterScreen} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="TopUpWalletScreen" component={TopUpWalletScreen} />
      <Stack.Screen name="SendBalanceScreen" component={SendBalanceScreen} />
      <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
      <Stack.Screen name="OrderScreens" component={OrderScreens} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="SuccessfulScreen" component={SuccessfulScreen} />

    </Stack.Navigator>
  );
};



export const WalletStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WalletScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen name="BasketScreen" component={BasketScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="GiftScreen" component={GiftScreen} />
      <Stack.Screen name="GiftFilterScreen" component={GiftFilterScreen} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="TopUpWalletScreen" component={TopUpWalletScreen} />
      <Stack.Screen name="SendBalanceScreen" component={SendBalanceScreen} />
      <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
      <Stack.Screen name="OrderScreens" component={OrderScreens} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="SuccessfulScreen" component={SuccessfulScreen} />

    </Stack.Navigator>
  );
};

export const AccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountSetting"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen name="BasketScreen" component={BasketScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="GiftScreen" component={GiftScreen} />
      <Stack.Screen name="GiftFilterScreen" component={GiftFilterScreen} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="TopUpWalletScreen" component={TopUpWalletScreen} />
      <Stack.Screen name="SendBalanceScreen" component={SendBalanceScreen} />
      <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
      <Stack.Screen name="OrderScreens" component={OrderScreens} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};


