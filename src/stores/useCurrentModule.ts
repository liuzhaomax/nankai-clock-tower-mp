import { create } from 'zustand'
import { MODULES } from '@/config/constants'

export interface CurrentModuleStore {
  currentModule: string
  setCurrentModule: (value: string) => void
}

const useCurrentModuleStore = create<CurrentModuleStore>((set) => ({
  currentModule: MODULES.HOME,
  setCurrentModule: (value: string): void => set({ currentModule: value }),
}))

export default useCurrentModuleStore
