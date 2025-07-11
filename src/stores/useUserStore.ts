import { create } from 'zustand'

export interface UserStore {
  avatar: string
  setAvatar: (avatar: string) => void

  nickName: string
  setNickName: (value: string) => void
}

const useUserStore = create<UserStore>((set) => ({
  avatar: '',
  setAvatar: (value: string): void => set({ avatar: value }),

  nickName: '',
  setNickName: (value: string): void => set({ nickName: value }),
}))

export default useUserStore
