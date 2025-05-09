import { create } from 'zustand'

type primaryBackgroundColor = {
    dark: string
    light: string
}

export const usePrimaryBackgroundColor = create<primaryBackgroundColor>((set) => ({
    dark: "#000000",
    light: "#f0f0f0"
}))
