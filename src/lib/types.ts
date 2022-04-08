import type {
  UseQueryOptions as ReactUseQueryOptions,
  UseMutateFunction,
} from 'react-query'

export interface UseQueryOptions extends ReactUseQueryOptions {
  variables?: {
    [key: string]: any
    current?: number
    size?: number
    id?: React.Key
  }
}

export type MutationResult<TData = any, TVariables = any> = [
  boolean,
  UseMutateFunction<TData, Error | undefined, TVariables, unknown>
]

export interface MutationOptions<T = any>
  extends Omit<ReactUseQueryOptions<T>, 'onSuccess'> {
  onSuccess?: (response: any) => any
  successText?: string
  displayMessage?: boolean
  displayError?: boolean
}

export interface IDataType {
  key: React.Key
  id: number
  care_recipient_name: string
  care_recipient_dob: string
  rate: number
  short_temp: boolean
  contagion: boolean
  emergency: boolean
  mileage_surcharge?: boolean
  primary_quote: boolean
  start_date: string
  created_date: string
  created_by: string
  updated_date: string
  status: string
}

export interface IFilter {
  care_recipient_name?: string
  care_recipient_dob?: string
  short_temp?: boolean
  contagion?: boolean
  emergency?: boolean
  mileage_surcharge?: boolean
  primary_quote?: boolean
  start_date?: string
  status?: string
  _page?: number
  q?: string
}

export interface IOptionDefault {
  [key: string]: string
}

export interface objType {
  [key: string]:
    | string
    | number
    | boolean
    | React.ChangeEvent<HTMLElement>
    | void
}

export interface IUsers {
  id: string
  name: string
  username: string
  email: string
  address: string
  phoneNumber: string
  website: string
  company: string
  role: string
  avatar: string
}
