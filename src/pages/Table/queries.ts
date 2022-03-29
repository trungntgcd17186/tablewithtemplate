import { UseQueryOptions } from '@lib/types'
import useQuery from '@lib/useQuery'
import React from 'react'
import { IDataType } from '@lib/types'
import { useMutation } from 'react-query'
import { request } from '@utils/request'

export const useDatas = (options?: UseQueryOptions) => {
  const { data, ...rest } = useQuery<IDataType[]>(
    `https://tablemanage.herokuapp.com/table`,
    options
  )

  return {
    ...rest,
    data,
  }
}

export const useUpdateDatas = (options: any) => {
  const { mutate } = useMutation(
    (data: Partial<IDataType | undefined>) =>
      request('https://tablemanage.herokuapp.com/table/{id}', {
        method: 'PUT',
        body: data,
      }),
    {
      ...options,
    }
  )

  return mutate
}

export const useDeleteDatas = (options: any) => {
  const { mutate } = useMutation(
    (data: Partial<IDataType | undefined>) =>
      request('https://tablemanage.herokuapp.com/table/{id}', {
        method: 'DELETE',
        body: data,
      }),
    {
      ...options,
    }
  )

  return mutate
}
