const handleCodeError = (code: number) => {
    switch (code) {
        case 400:
            return `400 | Bad Request`
        case 401:
            return `401 | Unauthorized`
        case 403:
            return `403 | Forbidden`
        case 404:
            return `404 | Not Found`
        case 405:
            return `405 | Method Not Allowed`
        case 500:
            return `500 | Internal Server Error`
        case 501:
            return `501 | Not Implemented`
        case 502:
            return `502 | Bad Gateway`
        case 503:
            return `503 | Service Unavailable`
        case 504:
            return `504 | Gateway Timeout`
        default:
            return `${code} | Temporary server error. Please contact support team.`
    }
}
export const apiErrorHandler = (errResponse: any) => {
    if (errResponse.response) {
        //Request completed and server responded
        if (errResponse.response.data) {
            if (Array.isArray(errResponse.response.data.messages)) {
                return errResponse.response.data.messages[0].message
            } else if (Array.isArray(errResponse.response.data.error)) {
                return errResponse.response.data.error[0].message
            } else
                return handleCodeError(errResponse.response.status)
        } else
            return handleCodeError(errResponse.response.status)
    } else if (errResponse.request) {
        //Request completed and server didn't respond
        return `Server error. Please contact support team.`
    } else
        //Untraced error
        return `Unexpected error. Please contact support team.`
}