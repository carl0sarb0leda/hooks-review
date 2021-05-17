import { Dispatch, SetStateAction } from 'react'

export interface ErrorObject {
  field: string
  message: string
}

export type Dispatcher<S> = Dispatch<SetStateAction<S>>

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error'
