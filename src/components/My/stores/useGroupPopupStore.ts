import { create } from 'zustand'

export interface GroupPopupStore {
  showGroupPopupForm: boolean
  setShowGroupPopupForm: (value: boolean) => void
}

const useGroupPopupStore = create<GroupPopupStore>((set) => ({
  showGroupPopupForm: false,
  setShowGroupPopupForm: (value: boolean): void => set({ showGroupPopupForm: value }),
}))

export default useGroupPopupStore
