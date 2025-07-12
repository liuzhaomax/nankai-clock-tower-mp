import { create } from 'zustand'

interface Group {
  id: number
  name: string
  score: number
}

export interface UserStore {
  avatar: string
  setAvatar: (avatar: string) => void

  nickName: string
  setNickName: (value: string) => void

  groups: Group[]
  setGroups: (groups: Group[]) => void
}

const useUserStore = create<UserStore>((set) => ({
  avatar: '',
  setAvatar: (value: string): void => set({ avatar: value }),

  nickName: '',
  setNickName: (value: string): void => set({ nickName: value }),

  groups: [],
  setGroups: (value: Group[]): void => set({ groups: value }),
}))

export default useUserStore
