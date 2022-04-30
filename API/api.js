import axios from "axios";

const apiurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false";
const specificcoin = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true";
const priceapi = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd';

export const fetchData = async(pageno) =>{
    try{
        return await axios.get(`${apiurl}&page=${pageno}`);
    }
    catch(error){
        console.log(error);
    }
}

export const fetchCoinData = async(coinid) =>{

    try {   
        return await axios.get(`${specificcoin}&ids=${coinid}`);
    } catch (error) {
        console.log(error);
    }
}
export const fetchPrice = async(number)=>{
    try {
        return await axios.get(`${priceapi}&days=${number}`);
    } catch (error) {
        console.log(error);
    }
}