import { create } from 'zustand'

export interface AnimationStore {
  enableBat: boolean
  setEnableBat: (value: boolean) => void
}

const useAnimationStore = create<AnimationStore>((set) => ({
  enableBat: true,
  setEnableBat: (value: boolean): void => set({ enableBat: value }),
}))

export default useAnimationStore
