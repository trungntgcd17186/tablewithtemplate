import { IDataType } from '@lib/types'
import { Modal, Row } from 'antd'
import { useDeleteDatas } from './queries'

interface IProps {
  getDataSelected: IDataType[]
  mutationOpts: {}
  isModalVisible: boolean
  setIsModalVisible: any
  setGetDataSelected: any
  onOk?: (data: Partial<IDataType>) => void
}

export default function DeleteModal({
  getDataSelected,
  mutationOpts,
  isModalVisible,
  setIsModalVisible,
  setGetDataSelected,
  ...props
}: IProps) {
  const handleDeleteRows = useDeleteDatas(mutationOpts)

  const handleOk = () => {
    getDataSelected.map(el => handleDeleteRows({ ...el }))
    setIsModalVisible(false)
    setGetDataSelected([])
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Row>
      <Modal
        title="Confirm Delete Row"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Do you really want to delete this row?</p>
      </Modal>
    </Row>
  )
}
