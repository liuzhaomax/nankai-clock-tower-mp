import { create } from 'zustand'

export interface JoinRoomStore {
  showJoinRoomForm: boolean
  setShowJoinRoomForm: (value: boolean) => void
}

const useJoinRoomStore = create<JoinRoomStore>((set) => ({
  showJoinRoomForm: false,
  setShowJoinRoomForm: (value: boolean): void => set({ showJoinRoomForm: value }),
}))

export default useJoinRoomStore
