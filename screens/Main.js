import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl,Alert,TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';

//axios
import { fetchData } from '../API/api';
import Coin from './Coin';



const Main = () => {
  
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);
  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    const res = await fetchData();
    setdata(res.data);
    setloader(false);
    setLoading(false);
  }

  useEffect(() => {
    getResult();
  }, [])

  if(loader) return <ActivityIndicator size='large' color="#ffff" style={styles.loader} />;
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        style={{marginBottom: 20}}
        refreshControl={
        <RefreshControl
        onRefresh={()=> getResult()}
        refreshing={loading}
         title="Pull to refresh"
         tintColor="#fff"
         titleColor="#fff"
      />
      }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(element) => {
          return (
              <Coin element={element.item}/>
          )
        }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181631',
  },
  loader: {
    marginTop: 40
}
}
)
export default Main