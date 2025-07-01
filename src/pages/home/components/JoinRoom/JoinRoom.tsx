import React from 'react'
import styles from './JoinRoom.module.scss'
import {
  Button,
  Form,
  type FormItemRuleWithoutValidator,
  Input,
  Popup,
} from '@nutui/nutui-react-taro'
import useJoinRoomStore from '@/pages/home/stores/useJoinRoomStore'
import { redirectTo } from '@tarojs/taro'
import { ROUTES } from '@/config/constants'

interface JoinRoomValues {
  roomId: string
}

const JoinRoom: React.FC = () => {
  const { showJoinRoomForm, setShowJoinRoomForm } = useJoinRoomStore()

  // 加入房间
  const cancelJoiningRoom = (): void => setShowJoinRoomForm(false)
  const confirmJoiningRoom = (values: JoinRoomValues) => {
    //TODO 发送加入房间请求，需要API
    console.log(values)
    setShowJoinRoomForm(false)
    redirectTo({ url: ROUTES.ROOM })
  }

  return (
    <Popup
      className={styles.popup}
      closeable
      visible={showJoinRoomForm}
      title="加入房间"
      position="bottom"
      round
      onClose={cancelJoiningRoom}
    >
      <Form
        className={styles.form}
        divider
        labelPosition="right"
        footer={
          <Button className={styles.submitBtn} nativeType="submit" block type="primary">
            确认
          </Button>
        }
        onFinish={confirmJoiningRoom}
      >
        <Form.Item
          label="房间ID"
          name="roomId"
          rules={[
            { required: true, message: '请输入房间ID' },
            {
              validator: (_rule: FormItemRuleWithoutValidator, value: string) => {
                return value?.length == 8
              },
              message: '房间ID必须等于8个字',
            },
          ]}
        >
          <Input placeholder="请输入房间ID" type="text" />
        </Form.Item>
      </Form>
      {/* DECLARE 以后增加房间列表 */}
    </Popup>
  )
}

export default JoinRoom
