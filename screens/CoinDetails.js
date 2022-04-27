import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CoinDetails = ({route, navigation}) => {

    const { coinid } = route.params; 
  return (
    <View style={styles.container}> 
      <View>
          
      </View>
      <Text>{coinid}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#181631',
      flex: 1
    },
  }
  )

export default CoinDetails