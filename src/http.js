import axios from 'axios'

let configuration = {
    serverURL: "http://localhost:8000/api"
}

export default {
    server: {
        /**
         * @param {string} route
         */
        get(route) { 
            return axios.get(configuration.serverURL + route)
        },

        /**
         * @param {string} route
         * @param {any?} data 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        post(route, data, config) {
            return axios.post(configuration.serverURL + route, data, config)
        },

        /**
         * @param {string} route
         * @param {any?} data 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        put(route, data, config) {
            return axios.put(configuration.serverURL + route, data, config)
        },

        /**
         * @param {string} route
         */
        delete(route) {
            return axios.delete(configuration.serverURL + route)
        }
    },

    axios: axios
}