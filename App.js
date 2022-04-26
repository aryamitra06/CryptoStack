import Welcome from './screens/Welcome';
import Main from './screens/Main'
import { Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name='Main' component={Main} options={{headerRight: (props) => <MaterialCommunityIcons name='refresh' size={28} color= "white"/>,headerBackTitle: "", title: "CryptoStack", headerStyle: {backgroundColor: "#212245"}, headerTintColor: "white", headerTitleStyle: {color: "white"}}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
