import axios from "axios";
//Overwriting axios to allow any type of response (because of typescript)
declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> { }
}

//Common axios services through the app
const service_general = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 90000
});

// service_general.interceptors.request.use(
//   (config: any) => {
//     config.headers = {
//       'Authorization': `Bearer ${token}`,
//     }
//     return config
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error)
//   }
// )
const allServices = {
    service_general,
}
export default allServices