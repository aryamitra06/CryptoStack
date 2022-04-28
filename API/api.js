import axios from "axios";

const apiurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10000&page=1&sparkline=false";
const specificcoin = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true";
const priceapi = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';
export const fetchData = async() =>{
    return axios.get(`${apiurl}`);
}

export const fetchCoinData = async(coinid) =>{
    return axios.get(`${specificcoin}?&ids=${coinid}`);
}

export const fetchPrice = async()=>{
    return axios.get(`${priceapi}`);
}