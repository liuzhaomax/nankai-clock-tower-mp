import { create } from 'zustand'
import { MODULES } from '@/config/constants'

export interface NavStore {
  currentModule: string
  setCurrentModule: (value: string) => void
}

const useNavStore = create<NavStore>((set) => ({
  currentModule: MODULES.HOME,
  setCurrentModule: (value: string): void => set({ currentModule: value }),
}))

export default useNavStore
