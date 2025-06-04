import { create } from 'zustand'

type themeColors = {
    light_colors: {
        bg_color: string
        ph_color: string
        b_color: string
        s_color: string
    }
    dark_colors: {
        bg_color: string
        ph_color: string
        b_color: string
        s_color: string
    }
}

export const useThemeColors = create<themeColors>((set) => ({
    light_colors: {
        bg_color: "#ffffff",
        ph_color: "#000000",
        b_color: 'rgba(0,0,0, 0.5)',
        s_color: "#ffffff"
    },
    dark_colors: {
        bg_color: "#000000",
        ph_color: "#ffffff",
        b_color: 'rgba(255,255,255, 0.5)',
        s_color: 'rgb(30, 30, 30)'
    }
}))
