import { useState, useCallback } from 'react';
import { AsyncStatus } from 'types/general';
import { apiErrorHandler } from 'utils/apiErrors';

export const useAsync = (
    asyncFunction: (params: any) => Promise<any>,
) => {
    const [status, setStatus] = useState<AsyncStatus>('idle')
    const [value, setValue] = useState<any>([])
    const [msg, setMsg] = useState('')
    const [error, setError] = useState<any>(null)

    const execute = useCallback(async (params?: any) => {
        setStatus('pending')
        setValue([])
        setError(null)
        return asyncFunction(params)
            .then((response: any) => {
                if (response.status === 200) {
                    if (response.data.result) {
                        setValue(response.data.result)
                    } else setValue(response.data)
                } else
                    if (response.status === 201) {
                        setValue(response.headers['location'])
                    }
                if (response.data.messages) {
                    setMsg(response.data.messages[0])
                }
                setStatus('success')
                return {
                    success: true,
                    error: null,
                    location: response.headers.location || null,
                    data: response.data.result || null,
                    rootResponse: response,
                }
            })
            .catch((error: any) => {
                setError(apiErrorHandler(error))
                setStatus('error')
                return {
                    success: false,
                    error: apiErrorHandler(error),
                    location: null,
                    data: null,
                    rootResponse: null
                }
            })
    }, [asyncFunction])

    return { execute, status, value, msg, error, setError, setValue, setStatus }
}