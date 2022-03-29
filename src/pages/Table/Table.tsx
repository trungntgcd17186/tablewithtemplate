import { DeleteFilled } from '@ant-design/icons'
import Layout from '@components/Layout'
import { IDataType } from '@lib/types'
import {
  Button,
  Col,
  DatePicker,
  Input,
  notification,
  Pagination,
  Row,
  Select,
  Table,
  Tag,
} from 'antd'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import './index.css'
import { useDatas, useUpdateDatas, useDeleteDatas } from './queries'

const { Option } = Select
interface objType {
  [key: string]: string | number | boolean | React.ChangeEvent<HTMLElement>
}

export default function TableContent() {
  const [valueOption, setValueOption] = useState<string>('')
  const [getDataSelected, setGetDataSelected] = useState<IDataType[]>([])

  const [filter, setFilter] = useState<{ [key: string]: any }>({ _page: 1 })

  const { data, isFetching, refetch } = useDatas({
    variables: filter,
  })

  //Xử lý f5 không mất filter khi luôn chạy hàm handleUrl để get param url cho filter.
  useEffect(() => {
    handleUrl()
  }, [])

  const title = (labelHeader: string, key: string) => (
    <div className="center">
      {labelHeader}
      {labelHeader === quoteId || labelHeader === careRecipientName ? (
        <div className="title-input-search">
          <Input
            style={{ width: 'auto' }}
            onChange={e => handleFilter({ [key]: e.target.value.trim() })}
          />
        </div>
      ) : (
        <div className="title-input-search dob">
          <DatePicker
            onChange={(date: moment.Moment | null, dateString: string) =>
              handleFilter({ [key]: dateString })
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
        <Select allowClear onChange={e => handleFilter({ [key]: e })}>
          <Option value="new">new</Option>
          <Option value="approved">approved</Option>
          <Option value="rejected">rejected</Option>
          <Option value="closed">closed</Option>
        </Select>
      ) : (
        <Select
          defaultValue={'true'}
          allowClear
          onChange={e => handleFilter({ [key]: e })}>
          <Option value="true">YES</Option>
          <Option value="false">NO</Option>
        </Select>
      )}
    </div>
  )

  const OptionValue = (value: boolean) => (
    <div className="center">
      <span style={value ? { color: '#008DFF' } : { color: '#FF0000' }}>
        {value ? 'YES' : 'NO'}
      </span>
    </div>
  )

  const quoteId = 'Quote ID'
  const careRecipientName = 'Care Recipient Name'
  const columns = [
    {
      title: title(quoteId, 'q'),
      dataIndex: 'key',
      render: (id: string) => <div style={{ textAlign: 'left' }}>{id}</div>,
    },
    {
      title: title(careRecipientName, 'q'),
      dataIndex: 'careRecipientName',
    },
    {
      title: title('Care Recipient DOB', 'care_recipient_dob'),
      dataIndex: 'careRecipientDob',
    },
    {
      title: () => <div className="title-rate">Hour Rate</div>,
      dataIndex: 'rate',
      render: (rate: number) => <div className="center">{rate}</div>,
    },
    {
      title: selectOptions('Short Term', 'short_temp'),
      dataIndex: 'shortTemp',
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
      dataIndex: 'mileageSurcharge',
      render: OptionValue,
    },
    {
      title: selectOptions('Primary Quote', 'primary_quote'),
      dataIndex: 'primaryQuote',
      render: OptionValue,
    },
    {
      title: title('Start Date', 'start_date'),
      dataIndex: 'startDate',
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
      dataIndex: 'createdBy',
      sorter: (a: IDataType, b: IDataType) =>
        a.created_by.length - b.created_by.length,
    },
    {
      title: () => <div className="title-created">Updated Date</div>,
      dataIndex: 'updatedDate',
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
    setGetDataSelected(selectedRows)
  }

  const rowSelection = {
    onSelect: onSelectChange,
  }

  const handleChange = (value: string) => setValueOption(value)
  //Xử lý action change data theo checkbox và checkbox all
  const mutationOpts = {
    onSuccess: () => {
      refetch()
      openNotification('Change Success')
    },
  }

  const handleUpdateStatus = useUpdateDatas(mutationOpts)
  const handleDeleteRows = useDeleteDatas(mutationOpts)

  const handleCheckboxChangeData = () => {
    if (valueOption === 'delete') {
      getDataSelected.map(el => handleDeleteRows({ ...el }))
    } else {
      getDataSelected.map(el =>
        handleUpdateStatus({ ...el, status: valueOption })
      )
    }
  }

  //Xử lý filter
  var url = '?'
  const handleFilter = (object: objType) => {
    //gán object chứa filter cho myObject
    const myObject = { ...filter, ...object }

    //Chạy vòng for of để convert từ key: value sang key=value&
    for (const [key, value] of Object.entries(myObject)) {
      if (value !== undefined) {
        url = url + `${key}=${value}&`
      }
    }
    //Set filter state để filter khi chưa f5 lại trang.
    setFilter(myObject)
    //Đưa param lên url tạm thời, chưa f5 trang.
    window.history.replaceState(null, document.title, url)
  }

  //Tạo 2 object để chứa key và value sau khi get key value từ param.
  let obj = { _page: 1 }
  let element: any = {}

  const handleUrl = () => {
    //Loại bỏ dấu ?
    let paramString = window.location.href.split('?')[1]
    //Convert sang Url đúng cú pháp hỗ trợ.
    let queryString = new URLSearchParams(paramString)

    //Chạy vòng for of để add cặp key + value vào element

    for (let pair of queryString.entries()) {
      element[pair[0]] = pair[1]
      //Lưu lại các cặp key value trước đó, add các cặp key value tiếp theo từ param url còn lại khi chạy vòng for of.
      obj = { ...obj, ...element }
    }

    setFilter(obj)
  }

  //Xuat hien thong bao
  const openNotification = (des: any) => {
    notification.info({
      message: `Notification`,
      description: `${des} Success`,
      placement: 'top',
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
            dataSource={data}
            columns={columns}
            loading={isFetching}
            pagination={false}
          />
          <Pagination
            onChange={page => handleFilter({ _page: page })}
            total={100}
          />
        </Col>
      </Row>
    </Layout>
  )
}
