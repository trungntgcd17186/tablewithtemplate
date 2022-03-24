import { DeleteFilled } from '@ant-design/icons'
import Layout from '@components/Layout'
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
import { useEffect, useState } from 'react'
import fetchData, { deleteData, editData } from '../../api/index'
import './index.css'

export default function TableContent() {
  const [datas, setDatas] = useState<IDataType[]>([])
  const [obj, setObj] = useState<IFilter>({
    _page: 1,
  })
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

  const title = (labelHeader: string) => {
    return (
      <div
        style={{
          textAlign: 'center',
          height: '54px',
          display: 'flex',
          flexDirection: 'column',
        }}>
        {labelHeader}
        {labelHeader === quoteId || labelHeader === careRecipientName ? (
          <Input style={{ width: 'auto' }} onChange={e => handleSearch(e)} />
        ) : '' && labelHeader === dOB ? (
          <DatePicker onChange={handleChangeCareRecipientDOB} />
        ) : (
          ''
        )}
      </div>
    )
  }
  //Cái này không dùng tới, xóa thì lỗi rowSelection

  const quoteId = 'Quote ID'
  const careRecipientName = 'Care Recipient Name'
  const rate = 'Hour Rate'
  const dOB = 'Care Recipient DOB'
  const titleShortTerm = 'Short Term'
  const columns = [
    {
      title: title(quoteId),
      dataIndex: 'key',
    },
    {
      title: title(careRecipientName),
      dataIndex: 'care_recipient_name',
    },
    {
      title: title(dOB),
      dataIndex: 'care_recipient_dob',
    },
    {
      title: title(rate),
      dataIndex: 'rate',
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

  const onSelectChange = (
    record: IDataType,
    selected: boolean,
    selectedRows: IDataType[]
  ) => {
    const array: number[] = []
    selectedRows.map((el: { id: number }) => array.push(el.id))
    setArrIds(array)
  }

  const rowSelection = {
    onSelect: onSelectChange,
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
      <Layout>
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
        <Row>
          <Col>
            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              dataSource={datas}
              columns={columns}
              pagination={false}
            />
            <Pagination onChange={handleChangePage} total={100} />
          </Col>
        </Row>
      </Layout>
    </div>
  )
}
