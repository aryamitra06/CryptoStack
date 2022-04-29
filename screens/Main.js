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
  const [page, setpage] = useState(1);

  const getResult = async () => {
    const res = await fetchData(page);
    setdata(res.data);
    setloader(false);
    setLoading(false);
  }

  const handleLoadMore = () => {
    setdata(data.concat(data))
    setpage(page+1)
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
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached = {handleLoadMore}
        onEndReachedThreshold = {0}
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