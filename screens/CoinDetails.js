import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity, Share, Button,Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState, useEffect } from 'react'
import { fetchCoinData, fetchPrice } from '../API/api';
import { LineChart } from 'react-native-wagmi-charts';

const CoinDetails = ({ route }) => {
    const { coinid } = route.params;
    const [data, setdata] = useState([]);
    const [loader, setloader] = useState(true);
    const [graphloader, setgraphloader] = useState(true);
    const [price, setPrice] = useState([]);
    const [current, setCurrent] = useState("24h");

    const find24h = async () => {
        const prices = await fetchPrice(1);
        setPrice(prices.data.prices);
        setCurrent("24h")
        setgraphloader(false)
    }
    const find10d = async () => {
        const prices = await fetchPrice(10);
        setPrice(prices.data.prices);
        setCurrent("10d")
        setgraphloader(false)
    }
    const find1m = async () => {
        const prices = await fetchPrice(30);
        setPrice(prices.data.prices);
        setCurrent("1m")
        setgraphloader(false)
    }
    const find1y = async () => {
        const prices = await fetchPrice(365);
        setPrice(prices.data.prices);
        setCurrent("1y")
        setgraphloader(false)
    }

    const getResult = async () => {
        const res = await fetchCoinData(coinid);
        const prices = await fetchPrice(1);
        setdata(res.data[0]);
        setPrice(prices.data.prices);
        setCurrent("24h")
        setloader(false);
        setgraphloader(false)
    }

    useEffect(() => {
        getResult();
        find24h();
        find10d();
        find1m();
        find1y();
    }, [])

    if (loader) return <ActivityIndicator size='large' color="#ffff" style={styles.loader} />;




    const pricefinal = price.map(([timestamp, value]) => ({ timestamp, value }))

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Hey!👋 I found the status for 🤑 ${data.name} (Mkt cap rank: ${data.market_cap_rank}) from CryptoStack. Current price is $${data.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}, Mkt cap is $${data.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} and price change percentage in last 24h is ${data.price_change_percentage_24h}%. ⬇️📲 Download CryptoStack for more!`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

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
                    {   graphloader === true ? (
                        <ActivityIndicator size='small' color="#ffff"/>
                    ) : (
                        <>
                    <Text style={styles.text_24h}>{current}</Text>
                    <LineChart.Provider data={pricefinal}>
                        <LineChart width={Dimensions.get('window').width / 1.05} height={130}>
                            <LineChart.Path color="#2FA4FF" width={1}>
                            </LineChart.Path>
                        </LineChart>
                    </LineChart.Provider>
                        </>
                    )}
                </View>
                <View style={styles.timechanger}>
                            <TouchableOpacity style={styles.timechanger_touchable} onPress={find24h}>
                                <Text style={styles.timechanger_text}>24h</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timechanger_touchable} onPress={find10d}>
                                <Text style={styles.timechanger_text}>10d</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timechanger_touchable} onPress={find1m}>
                                <Text style={styles.timechanger_text}>1m</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.timechanger_touchable} onPress={find1y}>
                                <Text style={styles.timechanger_text}>1y</Text>
                            </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.title}>
                            Market Rank
                        </Text>
                        <Text style={styles.description}>
                            {data.market_cap_rank}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'column'}}>
                        <Text style={styles.title}>
                            24h Low
                        </Text>
                        <Text style={styles.description}>
                            ${data.low_24h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'column'}}>
                        <Text style={styles.title}>
                            24h High
                        </Text>
                        <Text style={styles.description}>
                            ${data.high_24h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                    </View>

                </View>
                <View style={styles.more}>
                    
                </View>
                <Button onPress={onShare} title="Share"></Button>
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
        height: Dimensions.get('window').height / 9,
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
        height: Dimensions.get('window').height / 5,
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timechanger:{
        width: '95%',
        height: Dimensions.get('window').height / 20,
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    timechanger_touchable: {
        backgroundColor: '#333C83',
        padding: 3,
        borderRadius: 5,
        width: '22%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timechanger_text:{
        color: 'white'
    },
    text_24h: {
        color: 'white',
        alignSelf: 'flex-end',
        marginRight: 13,
        fontSize: 13,
    },
    bottom: {
        width: '95%',
        height: Dimensions.get('window').height * (10 / 100),
        backgroundColor: '#212245',
        borderRadius: 12,
        marginTop: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#4F4E7E',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    description: {
        marginTop: 6,
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center'
    }

}
)

export default CoinDetails