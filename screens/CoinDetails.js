import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState, useEffect } from 'react'
import { fetchCoinData } from '../API/api';


const CoinDetails = ({ route }) => {
    const { coinid } = route.params;
    const [data, setdata] = useState({ current_price: 0, price_change_percentage_24h: 0});
    const [loader, setloader] = useState(true);


    const getResult = async () => {
        const res = await fetchCoinData(coinid);
        setdata(res.data[0]);

        setloader(false);
    }

    useEffect(() => {
        getResult();
    }, [])

    if (loader) return <ActivityIndicator size='large' color="#ffff" style={styles.loader} />;

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
                        <Text style={styles.uppar_text_2}>${data.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181631',
        flex: 1,
        alignItems: 'center'
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
        height: 200,
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 5
    }
}
)

export default CoinDetails