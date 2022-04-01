import { UseQueryOptions } from '@lib/types'
import useQuery from '@lib/useQuery'
import React from 'react'
import { IDataType } from '@lib/types'
import { useMutation } from 'react-query'
import { request } from '@utils/request'

export const useDatas = (options?: UseQueryOptions) => {
  const { data, ...rest } = useQuery<[]>(
    `https://jsonplaceholder.typicode.com/users`,
    options
  )

  return {
    ...rest,
    data,
  }
}
