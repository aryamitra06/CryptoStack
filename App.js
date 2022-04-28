import Welcome from './screens/Welcome';
import Main from './screens/Main'
import Coin from './screens/Coin';
import CoinDetails from './screens/CoinDetails';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {

  const Stack = createNativeStackNavigator();

  const MyTheme = {
    colors: {
      primary: '#181631',
    },
  };

  return (
    <>
    <SafeAreaProvider style={{ backgroundColor: "#181631" }}>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name='Main' component={Main} options={{headerRight: (props) => <MaterialCommunityIcons name='magnify' size={28} color= "white"/>,headerBackTitle: "", title: "CryptoStack", headerStyle: {backgroundColor: "#181631"}, headerTintColor: "white", headerTitleStyle: {color: "white"}, headerShadowVisible: false}}/>
        <Stack.Screen name='Coin' component={Coin} options={{headerShown: false}}/>
        <Stack.Screen name='CoinDetails' component={CoinDetails} options={{ headerBackTitle: "", title: "", headerStyle: {backgroundColor: "#181631"}, headerTintColor: "white", headerTitleStyle: {color: "white"}, headerShadowVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </>
  );
}
