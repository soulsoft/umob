import axios from 'axios';



// @ts-ignore
axios.defaults.baseURL = {
  BASE_URL: API_URL,
};
const initHeader: Function = (headers: any) => {
  axios.defaults.headers = headers;
  axios.defaults.timeout = 10000;
};

const API_PROVIDER_1 = `/clients/t3rixgsh`;
const API_PROVIDER_2 = `/mobile_verifications`;
const API_PROVIDER_3 = `sessions/login`;


export {
  initHeader,
  API_PROVIDER_1,
  API_PROVIDER_2,
  API_PROVIDER_3,

};
