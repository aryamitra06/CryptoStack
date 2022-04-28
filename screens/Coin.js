import { TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

const Coin = (props) => {
    const navigation = useNavigation(); 
    const hello = (id)=>{
        navigation.navigate('CoinDetails', { coinid: `${id}` })
    }
    
    return (
        <TouchableOpacity style={styles.crypto} onPress={()=> hello(props.element.id)}>
            <View style={styles.cryptochild1}>
                <Image
                    style={styles.cryptochild1_image}
                    source={{ uri: `${props.element.image}` }}
                />
                <View style={styles.cryptochild1_names}>
                    <Text style={styles.coinname}>{props.element.name}</Text>
                    <Text style={styles.coinsymbol}>{props.element.symbol.toUpperCase()}</Text>
                </View>
            </View>

            <View style={styles.cryptochild2}>
                <View>
                    <Text style={styles.coinprice}>${props.element.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    {props.element.price_change_percentage_24h < 0 ? (
                        <Text style={styles.pricechangered}><MaterialCommunityIcons name='arrow-down' size={16} color= "red"/> {props.element.price_change_percentage_24h.toFixed(2)}%</Text>
                    ) : (
                        <Text style={styles.pricechangegreen}><MaterialCommunityIcons name='arrow-up' size={16} color= "#B4FF9F"/> {props.element.price_change_percentage_24h.toFixed(2)}%</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    crypto: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: '#212245',
        height: 120,
        width: "92%",
        borderRadius: 13,
        alignSelf: 'center',
    },
    cryptochild1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    coinname: {
        color: "white",
        marginLeft: 8,
        fontSize: 20,
        fontWeight: 'bold'
    },
    coinsymbol: {
        color: "white",
        marginLeft: 8
    },
    cryptochild2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10
    },
    coinprice: {
        color: '#40DFEF',
        fontSize: 20,
        alignSelf: 'flex-end',
        marginBottom: 4
    },
    pricechangered: {
        color: 'red',
        fontSize: 14,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pricechangegreen: {
        color: '#B4FF9F',
        fontSize: 14,
        alignSelf: 'flex-end',
    },
    cryptochild1_image: {
        marginLeft: 10,
        height: 50,
        width: 50
    },
    cryptochild1_names: {
        flex: 1,
    }
}
)


export default Coin