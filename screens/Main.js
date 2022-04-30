import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl, Alert, TouchableOpacity, Button } from 'react-native'
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
    const res = await fetchData(1);
    setdata(res.data);
    setloader(false);
    setLoading(false);
  }


  useEffect(() => {
    getResult();
  }, [])

  const FooterStyle = () =>{
    return(
      <>
      <View style={{margin: 10}}>
      </View>
      </>
    )
  }


  if (loader) return <ActivityIndicator size='large' color="#ffff" style={styles.loader} />;
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => getResult()}
              refreshing={loading}
              title="Pull to refresh"
              tintColor="#fff"
              titleColor="#fff"
            />
          }
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={(element) => {
            return (
              <Coin element={element.item} />
            )
          }}
          ListFooterComponent = {FooterStyle}
        />
      </View>
    </>
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