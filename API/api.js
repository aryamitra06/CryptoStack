import axios from "axios";

const apiurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
const specificcoin = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&sparkline=true";

export const fetchData = async() =>{
    return axios.get(`${apiurl}`);
}

export const fetchCoinData = async() =>{
    return axios.get(`${specificcoin}`);
}