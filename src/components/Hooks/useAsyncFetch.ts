import { useEffect, useReducer } from 'react';
import { AsyncStatus } from 'types/general';
import { apiErrorHandler } from 'utils/apiErrors';

type Action =
    { type: 'started' } |
    { type: 'resolved', value: any } |
    { type: 'rejected', error: string }

type State = {
    status: AsyncStatus,
    value: any,
    error: string | null,
}

export const useAsyncFetch = (
    asyncFunction: (params: any) => Promise<any>,
) => {
    function asyncReducer(state: State, action: Action): State {
        switch (action.type) {
            case 'started': {
                return {
                    ...state,
                    status: 'pending',
                }
            }
            case 'resolved': {
                return {
                    ...state,
                    status: 'success',
                    value: action.value
                }
            }
            case 'rejected': {
                return {
                    ...state,
                    status: 'error',
                    error: action.error
                }
            }
            default: {
                throw new Error(`Unhandled action type: ${action}`)
            }
        }
    }
    const [state, dispatch] = useReducer(asyncReducer, {
        status: 'idle',
        value: null,
        error: null,
    })

    useEffect(() => {
        const execute = async (params?: any) => {
            dispatch({ type: 'started' })
            return asyncFunction(params)
                .then((response: any) => {
                    console.log(`🦊`, response);
                    if (response.status === 200) {
                        dispatch({
                            type: 'resolved',
                            value: response.data
                        })
                    }
                    return {
                        success: true,
                        error: null,
                        location: response.headers.location || null,
                        data: response.data.result || null,
                        rootResponse: response,
                    }
                })
                .catch((error: any) => {
                    dispatch({
                        type: 'rejected',
                        error: apiErrorHandler(error),
                    })
                    return {
                        success: false,
                        error: apiErrorHandler(error),
                        location: null,
                        data: null,
                        rootResponse: null
                    }
                })
        }
        execute()
    }, [asyncFunction])

    const isLoading = state.status === 'idle' || state.status === 'pending'
    const isResolved = state.status === 'success'
    const isRejected = state.status === 'error'

    return { isLoading, isResolved, isRejected, ...state }
}