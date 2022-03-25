import React from 'react'

import { UseQueryOptions } from '@lib/types'

import useQuery from '@lib/useQuery'

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: number
      lng: number
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const useUsers = (options?: UseQueryOptions) => {
  const { data, ...rest } = useQuery<User[]>(
    `https://jsonplaceholder.typicode.com/users`,
    options
  )

  return {
    ...rest,
    data,
  }
}

export const useQueryUser = ({
  variables,
  ...options
}: UseQueryOptions = {}) => {
  const [query, setQuery] = React.useState<{ [key: string]: any }>()
  const { data, ...rest } = useQuery<User>(
    `https://jsonplaceholder.typicode.com/users/{id}`,
    {
      ...options,
      variables: { ...variables, ...query },
      enabled: !!variables?.id || !!query?.id,
    }
  )

  const refetch = (values: { [key: string]: any }) => {
    setQuery(values)
  }

  return {
    ...rest,
    data,
    refetch,
  }
}
