import { create } from 'zustand'

export interface CreateRoomStore {
  showCreateRoomForm: boolean
  setShowCreateRoomForm: (value: boolean) => void
}

const useCreateRoomStore = create<CreateRoomStore>((set) => ({
  showCreateRoomForm: false,
  setShowCreateRoomForm: (value: boolean): void => set({ showCreateRoomForm: value }),
}))

export default useCreateRoomStore
