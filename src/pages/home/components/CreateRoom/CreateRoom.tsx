import React, { useState } from 'react'
import {
  Button,
  Form,
  type FormItemRuleWithoutValidator,
  Input,
  Popup,
  Picker,
  PickerOption,
} from '@nutui/nutui-react-taro'
import { navigateTo } from '@tarojs/taro'
import { GAME_VERSIONS, ROUTES } from '@/config/constants.ts'
import useCreateRoomStore from '@/pages/home/stores/useCreateRoomStore.ts'

import styles from './CreateRoom.module.scss'

type GameVersionType = (typeof GAME_VERSIONS)[keyof typeof GAME_VERSIONS]

interface CreateRoomValues {
  roomName: string
  gameVersion: GameVersionType
}

const CreateRoom: React.FC = () => {
  const { showCreateRoomForm, setShowCreateRoomForm } = useCreateRoomStore()
  const [showGameVersionPicker, setShowGameVersionPicker] = useState<boolean>(false)
  const gameVersionOptions = [
    [
      { value: 1, text: GAME_VERSIONS.TroubleBrewing },
      { value: 2, text: GAME_VERSIONS.BadMoonRising },
      { value: 3, text: GAME_VERSIONS.SectsAndViolets },
      { value: 4, text: GAME_VERSIONS.NightmareBlossoms },
      { value: 5, text: GAME_VERSIONS.TempleFair },
      { value: 6, text: GAME_VERSIONS.MountainsWeep },
    ],
  ]
  const [form] = Form.useForm()

  // 创建房间
  const cancelCreatingRoom = (): void => setShowCreateRoomForm(false)
  const confirmCreatingRoom = (values: CreateRoomValues) => {
    //TODO 发送创建房间请求，需要API
    //TODO 加载组件时，获取用户昵称，生成房间名称
    console.log(values)
    setShowCreateRoomForm(false)
    navigateTo({ url: ROUTES.ROOM })
  }

  // 选择器
  const cancelGameVersionPicker = (): void => setShowGameVersionPicker(false)
  const openGameVersionPicker = (): void => setShowGameVersionPicker(true)
  const confirmGameVersionPicker = (
    selectedOptions: PickerOption[],
    selectedValue: (string | number)[],
  ) => {
    setShowGameVersionPicker(false)
    const text = selectedOptions.find((item) => item.value === selectedValue[0])
      ?.text as GameVersionType
    //DECLARE 目前只有暗流涌动
    if (text === GAME_VERSIONS.TroubleBrewing) {
      form.setFieldsValue({ gameVersion: text })
    }
  }

  return (
    <Popup
      className={styles.popup}
      closeable
      visible={showCreateRoomForm}
      title="创建房间"
      position="bottom"
      round
      onClose={cancelCreatingRoom}
    >
      <Form
        className={styles.form}
        form={form}
        divider
        labelPosition="right"
        footer={
          <Button className={styles.submitBtn} nativeType="submit" block type="primary">
            确认
          </Button>
        }
        onFinish={confirmCreatingRoom}
      >
        <Form.Item
          label="房间名称"
          name="roomName"
          rules={[
            { max: 8, message: '房间名称不能超过8个字' },
            { required: true, message: '请输入房间名称' },
            {
              validator: (_rule: FormItemRuleWithoutValidator, value: string) => {
                return value?.length >= 2
              },
              message: '房间名称必须不小于2个字',
            },
          ]}
          initialValue="用户昵称的房间"
        >
          <Input placeholder="请输入房间名称" type="text" />
        </Form.Item>
        <Form.Item
          label="游戏版本"
          name="gameVersion"
          rules={[{ required: true, message: '请选择游戏版本' }]}
          getValueFromEvent={(...args) => args[0]}
          initialValue={GAME_VERSIONS.TroubleBrewing}
        >
          <Input
            placeholder="请选择游戏版本"
            type="text"
            readOnly
            onClick={openGameVersionPicker}
          />
        </Form.Item>
      </Form>
      <Picker
        className={styles.picker}
        title="选择游戏版本"
        visible={showGameVersionPicker}
        options={gameVersionOptions}
        defaultValue={[1]}
        onClose={cancelGameVersionPicker}
        onConfirm={confirmGameVersionPicker}
      />
    </Popup>
  )
}

export default CreateRoom
