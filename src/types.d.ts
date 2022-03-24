interface IDataType {
  key: React.Key
  id: number
  care_recipient_name: string
  care_recipient_dob: dateTime
  rate: number
  short_temp: boolean
  contagion: boolean
  emergency: boolean
  mileage_surcharge?: boolean
  primary_quote: boolean
  start_date: dateTime
  created_date: dateTime
  created_by: string
  updated_date: dateTime
  status: string
}

interface IFilter {
  care_recipient_name?: string
  care_recipient_dob?: dateTime
  short_temp?: boolean
  contagion?: boolean
  emergency?: boolean
  mileage_surcharge?: boolean
  primary_quote?: boolean
  start_date?: dateTime
  status?: string
  _page?: number
  q?: string
}
