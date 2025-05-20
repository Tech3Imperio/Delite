import { create } from 'zustand'

type themeColors = {
    light_colors: {
        bg_color: string
        ph_color: string
    }
    dark_colors: {
        bg_color: string
        ph_color: string
    }
}

export const useThemeColors = create<themeColors>((set) => ({
    light_colors: {
        bg_color: "#ffffff",
        ph_color: "#000000"
    },
    dark_colors: {
        bg_color: "#000000",
        ph_color: "#ffffff"
    }
}))
