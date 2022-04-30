import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

export default function Welcome() {
  const navigation = useNavigation(); 
  const click = () => {
    navigation.navigate('Main')
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../assets/Images/mainlogo.png')} style={{ width: 150, height: 150 }}/>
      <Text style={styles.main}>CryptoStack</Text>
      <Text style={styles.submain}>Track crypto in seconds!</Text>
      <TouchableOpacity style={styles.button} onPress={()=> click()}>
          <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.sub}>v1.0.0 Developed by Aryamitra Chaudhuri</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181631',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    marginTop: 20,
    fontSize: 22,
    color: "white",
  },
  submain: {
    marginTop: 10,
    marginBottom: 100,
    fontSize: 15,
    color: "#605F93",
    width: "50%",
    textAlign: "center"
  },
  sub: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    color: "#605F93",
    textAlign: "center",
    marginBottom: 50
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#212245',
    margin: 4,
    width: "40%"
  },
  
  text: {
    fontSize: 20,
    letterSpacing: 0.5,
    color: 'white',
  }
});
