import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';

export default function Welcome({navigation}) {

  const click = () => {
    navigation.navigate('Main')
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../assets/Images/mainlogo.png')} style={{ width: 150, height: 150 }}/>
      <Text style={styles.main}>CryptoStack</Text>
      <Text style={styles.submain}>Track crypto in seconds!</Text>
      <Pressable style={styles.button} onPress={()=> click()}>
          <Text style={styles.text}>Continue</Text>
      </Pressable>
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
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#212245',
    margin: 4,
    width: "50%"
  },
  
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
