import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState, useEffect } from 'react'
import { fetchCoinData, fetchPrice } from '../API/api';
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




    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const pricefinal = price.map(([timestamp, value]) => ({ timestamp, value }))

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
                            <Text style={styles.upper_status_2_red}>{data.price_change_percentage_24h.toFixed(2)}% Today</Text>
                        ) : (
                            <Text style={styles.upper_status_2_green}>{data.price_change_percentage_24h.toFixed(2)}% Today</Text>
                        )}

                    </View>
                </View>
                <View style={styles.mid}>
                    <Text style={styles.graphdetails_1}>
                    24h High: ${data.high_24h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                    <Text style={styles.graphdetails_2}>
                    24h Low: ${data.low_24h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                    <LineChart.Provider data={pricefinal}>
                        <LineChart width={width/1.05} height={130}>
                            <LineChart.Path color="#2FA4FF" width={1}>
                            </LineChart.Path>
                        </LineChart>
                    </LineChart.Provider>
                </View>
                <View style={styles.bottom}>

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
        height: Dimensions.get('window').height/9,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#212245',
        width: '95%',
        borderRadius: 12,
        marginTop: 2,
        marginBottom: 5,

    },
    uppar_image_view:
    {
        marginLeft: 20,
        marginRight: 10
    },
    uppar_image: {
        height: 50,
        width: 50,
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
        height: Dimensions.get('window').height/4.5,
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    graphdetails_1: {
        color: '#B6FFCE',
        alignSelf: 'flex-end',
        marginRight: 13,
        fontSize: 13,
    },
    graphdetails_2: {
        color: 'yellow',
        alignSelf: 'flex-end',
        marginRight: 13,
        fontSize: 13,
        marginTop: 2
    },
    bottom: {
        width: '95%',
        height: Dimensions.get('window').height*(40/100),
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
}
)

export default CoinDetails