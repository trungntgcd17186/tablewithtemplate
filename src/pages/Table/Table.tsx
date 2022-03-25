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
  Tag,
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

  const { Option } = Select
  const handleChange = (value: string) => setValueOption(value)

  const title = (labelHeader: string, key: string) => (
    <div className="center">
      {labelHeader}
      {labelHeader === quoteId || labelHeader === careRecipientName ? (
        <div className="title-input-search">
          <Input style={{ width: 'auto' }} onChange={e => handleSearch(e)} />
        </div>
      ) : (
        <div className="title-input-search dob">
          <DatePicker
            onChange={(date: moment.Moment | null, dateString: string) =>
              handleChangeDate(date, dateString, key)
            }
          />
        </div>
      )}
    </div>
  )

  const selectOptions = (labelHeader: string, key: string) => (
    <div className="select-option">
      {labelHeader}
      {labelHeader === 'Status' ? (
        <Select
          defaultValue="clear"
          onChange={e => handleChangeOptions(e, key)}>
          <Option value="new">new</Option>
          <Option value="approved">approved</Option>
          <Option value="rejected">rejected</Option>
          <Option value="closed">closed</Option>
          <Option value="clear">--</Option>
        </Select>
      ) : (
        <Select
          defaultValue="clear"
          onChange={e => handleChangeOptions(e, key)}>
          <Option value="true">YES</Option>
          <Option value="false">NO</Option>
          <Option value="clear">--</Option>
        </Select>
      )}
    </div>
  )

  const OptionValue = (value: boolean) => (
    <div className="center">
      {value === true ? (
        <span style={{ color: '#008DFF' }}>YES</span>
      ) : (
        <span style={{ color: '#FF0000' }}>NO</span>
      )}
    </div>
  )

  //Xử lý thay đổi select options
  const handleChangeOptions = async (e: boolean | string, key: string) => {
    e === 'clear'
      ? setObj({ ...obj, [key]: undefined })
      : setObj({ ...obj, [key]: e })
  }

  const quoteId = 'Quote ID'
  const careRecipientName = 'Care Recipient Name'
  const columns = [
    {
      title: title(quoteId, ''),
      dataIndex: 'key',
      render: (id: string) => <div style={{ textAlign: 'left' }}>{id}</div>,
    },
    {
      title: title(careRecipientName, ''),
      dataIndex: 'care_recipient_name',
    },
    {
      title: title('Care Recipient DOB', 'care_recipient_dob'),
      dataIndex: 'care_recipient_dob',
    },
    {
      title: () => <div className="title-rate">Hour Rate</div>,
      dataIndex: 'rate',
      render: (rate: number) => <div className="center">{rate}</div>,
    },
    {
      title: selectOptions('Short Term', 'short_temp'),
      dataIndex: 'short_temp',
      render: OptionValue,
    },
    {
      title: selectOptions('Contagion', 'contagion'),
      dataIndex: 'contagion',
      render: OptionValue,
    },
    {
      title: selectOptions('Emergency', 'emergency'),
      dataIndex: 'emergency',
      render: OptionValue,
    },
    {
      title: selectOptions('Mileage Surcharge', 'mileage_surcharge'),
      dataIndex: 'mileage_surcharge',
      render: OptionValue,
    },
    {
      title: selectOptions('Primary Quote', 'primary_quote'),
      dataIndex: 'primary_quote',
      render: OptionValue,
    },
    {
      title: title('Start Date', 'start_date'),
      dataIndex: 'start_date',
    },
    {
      title: () => <div className="title-created">Created Date</div>,
      dataIndex: 'created_date',
      sorter: (a: IDataType, b: IDataType) =>
        new Date(a.created_date).getTime() - new Date(b.created_date).getTime(),
      render: (text: IDataType) => <span>{text}</span>,
    },
    {
      title: () => <div className="title-created">Created By</div>,
      dataIndex: 'created_by',
      sorter: (a: IDataType, b: IDataType) =>
        a.created_by.length - b.created_by.length,
    },
    {
      title: () => <div className="title-created">Updated Date</div>,
      dataIndex: 'updated_date',
      sorter: (a: IDataType, b: IDataType) =>
        new Date(a.updated_date).getTime() - new Date(b.updated_date).getTime(),
    },
    {
      title: selectOptions('Status', 'status'),
      dataIndex: 'status',
      render: (text: string) => (
        <div className="status-container">
          <Tag className="status">{text}</Tag>
        </div>
      ),
    },
    {
      title: '...',
      render: () => <DeleteFilled style={{ color: 'orange' }} />,
    },
  ]

  //Truyền id checkbox vào array để cung cấp id cho việc edit hoặc xóa nhiều rows.
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

  const handleChangeDate = async (
    date: moment.Moment | null,
    dateString: string,
    key: string
  ) => {
    setObj({
      ...obj,
      [key]: dateString,
    })
  }

  //Xử lý change page
  const handleChangePage = async (page: number) => {
    setObj({
      ...obj,
      _page: page,
    })
  }

  //Xử lý search theo cột Care Recipient Name, Quote ID
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setObj({
      ...obj,
      q: e.target.value,
    })
  }

  return (
    <Layout>
      <Row>
        <Col span="8">
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
  )
}
