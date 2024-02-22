import axios from 'axios';



// @ts-ignore
axios.defaults.baseURL = {
  BASE_URL: 'BackEnd URL',
};
const initHeader: Function = (headers: any) => {
  axios.defaults.headers = headers;
  axios.defaults.timeout = 10000;
};

const API_PROVIDER_1 = `https://api.ridecheck.app/gbfs/v3/rotterdam/vehicle_status.json`;
const API_PROVIDER_2 = `https://www.cykl.nl/gbfs/en/free_bike_status.json`;
const API_PROVIDER_3 = `https://stables.donkey.bike/api/public/gbfs/2/donkey_rt/nl/free_bike_status.json`;


export {
  initHeader,
  API_PROVIDER_1,
  API_PROVIDER_2,
  API_PROVIDER_3,

};
