import { UseQueryOptions } from '@lib/types'
import useQuery from '@lib/useQuery'
import React from 'react'
import { IDataType } from '@lib/types'

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

export const useQueryDatas = ({
  variables,
  ...options
}: UseQueryOptions = {}) => {
  const [query, setQuery] = React.useState<{ [key: string]: any }>()
  const { data, ...rest } = useQuery<IDataType>(
    `https://tablemanage.herokuapp.com/table/{id}`,
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
