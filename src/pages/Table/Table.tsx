import { DeleteFilled } from '@ant-design/icons'
import Layout from '@components/Layout'
import { IDataType, IOptionDefault, objType } from '@lib/types'
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
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import DeleteModal from '../Table/DeleteModal'
import './index.css'
import { useDatas, useDeleteDatas, useUpdateDatas } from './queries'

const { Option } = Select

export default function TableContent() {
  const [valueOption, setValueOption] = useState<string>('')
  const [getDataSelected, setGetDataSelected] = useState<IDataType[]>([])
  const [filter, setFilter] = useState<objType>({ _page: 1 })

  const [select, setSelect] = useState({
    selectedRowKeys: [],
  })

  let history = useHistory()
  let location = useLocation()
  const dateFormat = 'YYYY-MM-DD'

  const [isModalVisible, setIsModalVisible] = useState(false)

  //Xử lý show modal
  const showModal = () => {
    if (getDataSelected.length >= 1) {
      setIsModalVisible(true)
    } else {
      openNotification('Please select row before taking action')
    }
  }

  //Xử lý f5 không mất filter khi luôn chạy hàm handleUrl để get param url cho filter. Xử lý đổi page xóa checkbox.
  useEffect(() => {
    handleUrl()
    setGetDataSelected([])
    setSelect({ selectedRowKeys: [] })
  }, [filter._page])

  //Xử lý filter
  const { data, isFetching, refetch } = useDatas({
    variables: filter,
  })

  const handleFilter = (object: objType) => {
    //gán object chứa filter cho myObject
    const myObject = { ...filter, ...object }
    let url = '?'
    //Chạy vòng for of để convert từ key: value sang key=value&
    for (const [key, value] of Object.entries(myObject)) {
      if (value !== undefined) {
        url = url + `${key}=${value}&`
      }
    }
    //Đưa param lên url tạm thời, chưa f5 trang.
    history.push(url)
    //Set filter state để filter khi chưa f5 lại trang.
    setFilter(myObject)
  }

  //Convert sang Url đúng cú pháp hỗ trợ.
  let queryString = new URLSearchParams(location.search)
  //Tạo 2 object để chứa key và value sau khi get key value từ param.
  let element: { [key: string]: string } = {}
  let obj = { _page: 1 }

  const handleUrl = () => {
    //Chạy vòng for of để add cặp key + value vào element
    for (let pair of queryString.entries()) {
      element[pair[0]] = pair[1]
      //Lưu lại các cặp key value trước đó, add các cặp key value tiếp theo từ param url còn lại khi chạy vòng for of.
      obj = { ...obj, ...element }
    }
    //Set filter state lúc vừa mới reload trang xong.
    setFilter(obj)
  }

  //Xử lý set default value cho tất cả các cột filter.
  const handleDefault = (key: string) => {
    let optionDefault: IOptionDefault = {}

    for (let pair of queryString.entries()) {
      element[pair[0]] = pair[1]
      //Lưu lại các cặp key value trước đó, add các cặp key value tiếp theo từ param url còn lại khi chạy vòng for of.
      optionDefault = { ...optionDefault, ...element }
    }

    //Trả về cho default value bằng value có key = key
    return optionDefault[key]
  }

  const OptionValue = (value: boolean) => (
    <div className="center">
      <span style={value ? { color: '#008DFF' } : { color: '#FF0000' }}>
        {value ? 'YES' : 'NO'}
      </span>
    </div>
  )

  const quoteId = 'Quote ID'
  const careRecipientName = 'Care Recipient Name'
  //In ra title cho từng cột của table bằng cách gọi hàm title, selectOptions truyền vào label và key để handle onChange

  const { selectedRowKeys } = select

  //Truyền id checkbox vào array để cung cấp id cho việc edit hoặc xóa nhiều rows.
  const onSelectChange = (
    record: IDataType,
    selected: boolean,
    selectedRows: IDataType[]
  ) => {
    setGetDataSelected(selectedRows)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelect({
        ...select,
        selectedRowKeys: selectedRowKeys,
      })
    },
    onSelect: onSelectChange,
  }

  const handleChange = (value: string) => setValueOption(value)

  const mutationOpts = {
    onSuccess: () => {
      refetch()
    },
  }

  const handleUpdateStatus = useUpdateDatas(mutationOpts)
  const handleDeleteRows = useDeleteDatas(mutationOpts)
  //Xử lý action change data theo checkbox và checkbox all
  const handleCheckboxChangeData = () => {
    if (getDataSelected.length >= 1) {
      if (valueOption === 'delete' && getDataSelected.length >= 1) {
        getDataSelected.map(el =>
          //checkID khác undefined thì mới action tránh lỗi undefined request.
          el !== undefined ? handleDeleteRows({ ...el }) : ''
        )
      }
      if (valueOption !== 'delete' && getDataSelected.length >= 1) {
        getDataSelected.map(el =>
          el !== undefined
            ? handleUpdateStatus({ ...el, status: valueOption })
            : ''
        )
      }
    } else {
      openNotification('Please select row before taking action')
    }
    setGetDataSelected([])
  }

  //Xuat hien thong bao
  const openNotification = (des: string) => {
    notification.info({
      message: `Notification`,
      description: des,
      placement: 'top',
    })
  }

  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number = 1000
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout
    return (...args: Params) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, timeout)
    }
  }

  const title = (label: string, key: string) => (
    <div className="center">
      {label}
      {label === quoteId || label === careRecipientName ? (
        <div className="title-input-search">
          <Input
            // value={handleDefault(key)}
            style={{ width: 'auto' }}
            onChange={debounce(e =>
              handleFilter({ [key]: e.target.value.trim() })
            )}
          />
        </div>
      ) : (
        <div className="title-input-search dob">
          <DatePicker
            defaultValue={moment(handleDefault(key))}
            format={dateFormat}
            onChange={(date: moment.Moment | null, dateString: string) =>
              handleFilter({ [key]: dateString })
            }
          />
        </div>
      )}
    </div>
  )

  const selectOptions = (label: string, key: string) => (
    <div className="select-option">
      {label}
      {label === 'Status' ? (
        <Select
          defaultValue={handleDefault(key)}
          allowClear
          onChange={e => handleFilter({ [key]: e })}>
          <Option value="new">new</Option>
          <Option value="approved">approved</Option>
          <Option value="rejected">rejected</Option>
          <Option value="closed">closed</Option>
        </Select>
      ) : (
        <Select
          defaultValue={handleDefault(key)}
          allowClear
          onChange={e => handleFilter({ [key]: e })}>
          <Option value="true">YES</Option>
          <Option value="false">NO</Option>
        </Select>
      )}
    </div>
  )

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
      render: () => (
        <DeleteFilled onClick={showModal} style={{ color: 'orange' }} />
      ),
    },
  ]
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
      <DeleteModal
        getDataSelected={getDataSelected}
        mutationOpts={mutationOpts}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setGetDataSelected={setGetDataSelected}
      />
    </Layout>
  )
}
