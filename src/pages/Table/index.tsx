import { DeleteFilled } from '@ant-design/icons'
import {
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Row,
  Select,
  Table,
} from 'antd'
import 'antd/dist/antd.css'

import { useEffect, useRef, useState } from 'react'
import fetchData, { deleteData, editData } from '../../api/index'
import './index.css'

export default function TableContent() {
  const [datas, setDatas] = useState<any[]>([])
  const [obj, setObj] = useState<object>({ _page: 1 })
  const [reRender, setReRender] = useState<boolean>(false)

  const [valueOption, setValueOption] = useState<string>('')

  const [arrIds, setArrIds] = useState<React.Key[]>([])
  //Call lại Api sau khi obj thay đổi.
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetchData(obj)
      setDatas(response.data)
    }
    fetchMyAPI()
  }, [obj, reRender])

  const selectionType = 'checkbox'

  const SelectRef = useRef<HTMLDivElement>(null)

  const columns = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center', height: '54px' }}>
            Quote ID
            <Input onChange={e => handleSearch(e)} />
          </div>
        )
      },
      dataIndex: 'key',
      key: 'key',
      render(text: string) {
        return {
          props: {
            style: { color: '#008DFF' },
          },
          children: <span>{text}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              width: '150px',
              textAlign: 'center',
              height: '54px',
            }}>
            Care Recipient Name
            <Input onChange={e => handleSearch(e)} />
          </div>
        )
      },
      dataIndex: 'care_recipient_name',
      key: 'care_recipient_name',

      //Cái này không dùng tới, xóa thì lỗi rowSelection :))
      onFilter: (value: any, record: any) => {
        return record.care_recipient_name
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              width: '150px',
              textAlign: 'center',
            }}>
            Care Recipient DOB
            <DatePicker onChange={handleChangeCareRecipientDOB} />
          </div>
        )
      },
      dataIndex: 'care_recipient_dob',
      key: 'care_recipient_dob',
      render(text: IDataType) {
        return {
          props: {
            style: { textAlign: 'right' },
          },
          children: <span>{text}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              width: '80px',
              textAlign: 'center',
              height: '54px',
            }}>
            Hour Rate
          </div>
        )
      },
      dataIndex: 'rate',
      key: 'rate',
      render(text: number) {
        return {
          props: {
            style: { textAlign: 'right' },
          },
          children: <span>{text}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '80px',
              textAlign: 'center',
            }}
            ref={SelectRef}>
            Short Term
            <Select defaultValue="clear" onChange={handleChangeShortTerm}>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
              <Option value="clear">--</Option>
            </Select>
          </div>
        )
      },
      dataIndex: 'short_temp',
      key: 'short_temp',
      render(text: boolean) {
        return {
          props: {
            style: {
              color: text === true ? '#008DFF' : 'red',
              textAlign: 'center',
            },
          },
          children: <span>{text === true ? 'YES' : 'NO'}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '80px',
              textAlign: 'center',
            }}>
            Contagion
            <Select defaultValue="clear" onChange={handleChangeContagion}>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
              <Option value="clear">--</Option>
            </Select>
          </div>
        )
      },
      dataIndex: 'contagion',
      key: 'contagion',
      render(text: boolean) {
        return {
          props: {
            style: {
              color: text === true ? '#008DFF' : 'red',
              textAlign: 'center',
            },
          },
          children: <span>{text === true ? 'YES' : 'NO'}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '80px',
              textAlign: 'center',
            }}>
            Emergency
            <Select defaultValue="clear" onChange={handleChangeEmergency}>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
              <Option value="clear">--</Option>
            </Select>
          </div>
        )
      },
      dataIndex: 'emergency',
      key: 'emergency',
      render(text: boolean) {
        return {
          props: {
            style: {
              color: text === true ? '#008DFF' : 'red',
              textAlign: 'center',
            },
          },
          children: <span>{text === true ? 'YES' : 'NO'}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '130px',
              textAlign: 'center',
            }}>
            Mileage Surcharge
            <Select
              defaultValue="clear"
              onChange={handleChangeMileageSurcharge}>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
              <Option value="clear">--</Option>
            </Select>
          </div>
        )
      },
      dataIndex: 'mileage_surcharge',
      key: 'mileage_surcharge',
      render(text: boolean) {
        return {
          props: {
            style: {
              color: text === true ? '#008DFF' : 'red',
              textAlign: 'center',
            },
          },
          children: <span>{text === true ? 'YES' : 'NO'}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '105px',
              textAlign: 'center',
            }}>
            Primary Quote
            <Select defaultValue="clear" onChange={handleChangePrimaryQuote}>
              <Option value="yes">YES</Option>
              <Option value="no">NO</Option>
              <Option value="clear">--</Option>
            </Select>
          </div>
        )
      },
      dataIndex: 'primary_quote',
      key: 'primary_quote',
      render(text: boolean) {
        return {
          props: {
            style: {
              color: text === true ? '#008DFF' : 'red',
              textAlign: 'center',
            },
          },
          children: <span>{text === true ? 'YES' : 'NO'}</span>,
        }
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              width: '150px',
              textAlign: 'center',
            }}>
            Start Date
            <DatePicker onChange={handleChangeStartDate} />
          </div>
        )
      },
      dataIndex: 'start_date',
      key: 'start_date',
      render(text: IDataType) {
        return {
          props: {
            style: { textAlign: 'right' },
          },
          children: <span>{text}</span>,
        }
      },
    },
    {
      title: () => {
        return <div className="title-created">Created Date</div>
      },
      dataIndex: 'created_date',
      key: 'created_date',
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.created_date).getTime() -
          new Date(b.created_date).getTime()
        )
      },
      render(text: IDataType) {
        return {
          props: {
            style: { textAlign: 'right' },
          },
          children: <span>{text}</span>,
        }
      },
    },
    {
      title: () => {
        return <div className="title-created">Created By</div>
      },
      dataIndex: 'created_by',
      key: 'created_by',
      sorter: (a: IDataType, b: IDataType) => {
        return a.created_by.length - b.created_by.length
      },
    },
    {
      title: () => {
        return <div className="title-created">Updated Date</div>
      },
      dataIndex: 'updated_date',
      key: 'updated_date',
      sorter: (a: IDataType, b: IDataType) => {
        return (
          new Date(a.updated_date).getTime() -
          new Date(b.updated_date).getTime()
        )
      },
    },
    {
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '105px',
              textAlign: 'center',
            }}>
            Status
            <Select
              defaultValue="clear"
              showSearch
              onChange={handleChangeStatus}>
              <Option value="new">new</Option>
              <Option value="approved">approved</Option>
              <Option value="rejected">rejected</Option>
              <Option value="closed">closed</Option>
              <Option value="clear">--</Option>
            </Select>
          </div>
        )
      },
      dataIndex: 'status',
      key: 'status',
      render(text: string) {
        return {
          props: {
            style: { textAlign: 'center' },
          },
          children: <div className="status">{text}</div>,
        }
      },
    },
    {
      title: '...',
      render: () => <DeleteFilled style={{ color: 'orange' }} />,
    },
  ]

  //Xử lý thay đổi select cột short term
  const handleChangeShortTerm = async (e: string) => {
    if (e === 'yes') {
      setObj({
        ...obj,
        short_temp: true,
      })
    } else if (e === 'no') {
      setObj({
        ...obj,
        short_temp: false,
      })
    } else if (e === 'clear') {
      setObj({
        ...obj,
        short_temp: undefined,
      })
    }
  }

  //Xử lý thay đổi select cột Contagion
  const handleChangeContagion = async (e: string) => {
    if (e === 'yes') {
      setObj({
        ...obj,
        contagion: true,
      })
    } else if (e === 'no') {
      setObj({
        ...obj,
        contagion: false,
      })
    } else if (e === 'clear') {
      setObj({
        ...obj,
        contagion: undefined,
      })
    }
  }

  //Xử lý thay đổi select cột Emergency
  const handleChangeEmergency = async (e: string) => {
    if (e === 'yes') {
      setObj({
        ...obj,
        emergency: true,
      })
    } else if (e === 'no') {
      setObj({
        ...obj,
        emergency: false,
      })
    } else if (e === 'clear') {
      setObj({
        ...obj,
        emergency: undefined,
      })
    }
  }

  //Xử lý thay đổi select cột Mileage Surcharge
  const handleChangeMileageSurcharge = async (e: string) => {
    if (e === 'yes') {
      setObj({
        ...obj,
        mileage_surcharge: true,
      })
    } else if (e === 'no') {
      setObj({
        ...obj,
        mileage_surcharge: false,
      })
    } else if (e === 'clear') {
      setObj({
        ...obj,
        mileage_surcharge: undefined,
      })
    }
  }

  //Xử lý thay đổi select cột Primary Quote
  const handleChangePrimaryQuote = async (e: string) => {
    if (e === 'yes') {
      setObj({
        ...obj,
        primary_quote: true,
      })
    } else if (e === 'no') {
      setObj({
        ...obj,
        primary_quote: false,
      })
    } else if (e === 'clear') {
      setObj({
        ...obj,
        primary_quote: undefined,
      })
    }
  }

  //Xử lý thay đổi select cột Status
  const handleChangeStatus = async (e: string) => {
    setObj({
      ...obj,
      status: e,
    })

    if (e === 'clear') {
      setObj({
        ...obj,
        status: undefined,
      })
    }
  }

  const { Option } = Select
  function handleChange(value: string) {
    setValueOption(value)
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: React.Key[]) => {
      //Map field id từ selectedRows sau đó push id vào mảng array, set mảng vào state để cung cấp array id cho action.
      const array: number[] = []
      selectedRows.map((el: any) => array.push(el.id))
      setArrIds(array)
    },
  }

  //Xử lý action change data theo checkbox và checkbox all
  const handleCheckboxChangeData = async () => {
    if (valueOption === 'delete') {
      await deleteData(arrIds)
      setReRender(!reRender)
      alert('successful delete')
    } else {
      await editData(arrIds, valueOption)
      setReRender(!reRender)
      alert('successful change status')
    }
  }

  const handleChangeCareRecipientDOB = async (
    date: moment.Moment | null,
    dateString: string
  ) => {
    setObj({
      ...obj,
      care_recipient_dob: dateString,
    })
  }

  const handleChangeStartDate = async (
    date: moment.Moment | null,
    dateString: string
  ) => {
    setObj({
      ...obj,
      start_date: dateString,
    })
  }

  //Xử lý search theo cột QuoteID
  const handleChangePage = async (page: number) => {
    setObj({
      ...obj,
      _page: page,
    })
  }

  //Xử lý search theo cột Care Recipient Name
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setObj({
      ...obj,
      q: e.target.value,
    })
  }

  return (
    <div>
      <Row>
        <Col span="8">
          {' '}
          <Select
            defaultValue="Change Status"
            style={{ width: '68%', textAlign: 'left' }}
            onChange={handleChange}>
            <Option value="delete">Delete</Option>
            <Option value="new">new</Option>
            <Option value="approved">approved</Option>
            <Option value="rejected">rejected</Option>
            <Option value="closed">closed</Option>
          </Select>
          <Button onClick={handleCheckboxChangeData}>Apply</Button>
        </Col>
      </Row>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={datas}
        columns={columns}
        pagination={false}
      />
      <Pagination onChange={handleChangePage} total={100} />
    </div>
  )
}
