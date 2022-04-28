import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState, useEffect } from 'react'
import { fetchCoinData, fetchPrice } from '../API/api';
import { ChartDot, ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';
import { LineChart } from 'react-native-wagmi-charts';
const CoinDetails = ({ route }) => {
    const { coinid } = route.params;
    const [data, setdata] = useState([]);
    //current_price: 0, price_change_percentage_24h: 0
    const [loader, setloader] = useState(true);
    const [price, setPrice] = useState([]);


    const getResult = async () => {
        const res = await fetchCoinData(coinid);
        const priceres = await fetchPrice();
        setdata(res.data[0]);
        setPrice(priceres.data.prices);
        setloader(false);
    }

    useEffect(() => {
        getResult();
    }, [])

    if (loader) return <ActivityIndicator size='large' color="#ffff" style={styles.loader} />;




    const { width: SIZE } = Dimensions.get('window');

    const pricefinal = price.map(([timestamp,value]) => ({timestamp,value}))
    console.log(pricefinal);
    return (
        <>
            <View style={styles.container}>
                <View style={styles.uppar}>
                    <View style={styles.uppar_image_view}>
                        <Image
                            style={styles.uppar_image}
                            source={{ uri: `${data.image}` }}
                        />
                    </View>
                    <View style={styles.uppar_text}>
                        <Text style={styles.uppar_text_1}>{data.name}</Text>
                        <Text style={styles.uppar_text_2}>Current: ${data.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                    <View style={styles.upper_status}>
                        <View style={styles.upper_status_1}>
                            {data.price_change_percentage_24h < 0 ? (
                                <MaterialCommunityIcons name='arrow-down' size={20} color="red" />
                            ) : (
                                <MaterialCommunityIcons name='arrow-up' size={20} color="#B4FF9F" />
                            )}
                        </View>

                        {data.price_change_percentage_24h < 0 ? (
                            <Text style={styles.upper_status_2_red}>{data.price_change_percentage_24h.toFixed(2)}%</Text>
                        ) : (
                            <Text style={styles.upper_status_2_green}>{data.price_change_percentage_24h.toFixed(2)}%</Text>
                        )}

                    </View>
                </View>
                <View style={styles.mid}>
                    <LineChart.Provider data={pricefinal}>
                        <LineChart>
                            <LineChart.Path />
                        </LineChart>
                    </LineChart.Provider>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181631',
        flex: 1,
        alignItems: 'center',
    },
    uppar: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#212245',
        width: '95%',
        borderRadius: 12,
        marginTop: 2,
        marginBottom: 5,
        height: 100

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
    },
    upper_status: {
        alignItems: 'center',
        flex: 1,
    },
    upper_status_2_green: {
        color: "#B4FF9F",
        fontSize: 20,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    upper_status_2_red: {
        color: "red",
        fontSize: 20,
        alignSelf: 'flex-end',
        marginRight: 20
    },
    upper_status_1: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    loader: {
        marginTop: 40
    },
    mid: {
        width: '95%',
        height: 180,
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chart: {

    }
}
)

export default CoinDetails