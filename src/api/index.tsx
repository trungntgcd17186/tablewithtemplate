import axios from 'axios'
import React from 'react'

let Url = 'https://tablemanage.herokuapp.com/table?'

const fetchData = async (obj: object) => {
  const response = await axios.get(Url, { params: obj })
  return response
}

export const deleteData = async (arrIds: React.Key[]) => {
  await Promise.all(
    arrIds.map(async id => {
      await axios.delete(`https://tablemanage.herokuapp.com/table/${id}`)
    })
  )
}

export const editData = async (arrIds: React.Key[], valueOption: string) => {
  await Promise.all(
    arrIds.map(async id => {
      const response = await axios.get(
        `https://tablemanage.herokuapp.com/table/${id}`
      )
      await axios.put(`https://tablemanage.herokuapp.com/table/${id}`, {
        ...response.data,
        status: valueOption,
      })
    })
  )
}

export default fetchData
