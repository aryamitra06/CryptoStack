import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { fetchCoinData } from '../API/api';
const CoinDetails = ({ route }) => {
    const { coinid } = route.params;
    const [data, setdata] = useState([]);

    const getResult = async () => {
        const res = await fetchCoinData(coinid);
        setdata(res.data[0]);
    }

    useEffect(() => {
        getResult();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.uppart}>
            <Text>{data.total_volume}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181631',
        flex: 1
    },
    uppart: {
        width: '100%',
        height: 80,
        backgroundColor: "white"
    }
}
)

export default CoinDetails