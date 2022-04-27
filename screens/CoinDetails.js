import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { fetchCoinData } from '../API/api';
const CoinDetails = ({ route }) => {
    const { coinid } = route.params;
    const [data, setdata] = useState({ current_price: 0 });
    const [loader, setloader] = useState(true);

    const getResult = async () => {
        const res = await fetchCoinData(coinid);
        setdata(res.data[0]);
        setloader(false);
    }

    useEffect(() => {
        getResult();
    }, [])
    return (
        <>
            <View style={styles.container}>
            {loader && <ActivityIndicator color="#ffff" style={styles.loader} />}
                <View style={styles.uppar}>
                    <View style={styles.uppar_image_view}>
                        <Image
                            style={styles.uppar_image}
                            source={{ uri: `${data.image}` }}
                        />
                    </View>
                    <View style={styles.uppar_text}>
                        <Text style={styles.uppar_text_1}>{data.name}</Text>
                        <Text style={styles.uppar_text_2}>${data.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181631',
        flex: 1
    },
    uppar: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    uppar_image_view:
    {
        marginLeft: 20,
        marginRight: 10
    },
    uppar_image: {
        height: 70,
        width: 70,
    },
    uppar_text_1: {
        color: "white",
        fontSize: 30,
        fontWeight: 'bold',
    },
    uppar_text_2: {
        color: "#DDDDDD",
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1
    }
}
)

export default CoinDetails