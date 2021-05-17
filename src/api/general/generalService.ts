import http from "../axios-config";

const getCharacters = () => {
    return http.service_general({
        url: '/character',
        method: 'get'
    })
}

const methods = {
    getCharacters
}

export default methods
