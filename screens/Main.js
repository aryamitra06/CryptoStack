import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.crypto}></View>
      <View style={styles.crypto}></View>
      <View style={styles.crypto}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181631',
    alignItems: 'center',
  },
  crypto: {
    marginTop: 15,
    backgroundColor: '#212245',
    height: 120,
    width: "92%",
    borderRadius: 13
  }
}
)
export default Main