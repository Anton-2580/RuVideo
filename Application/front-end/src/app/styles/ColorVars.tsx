export const ColorVars = {
    selected: "--selected-block",
    defaultImageFilter: "--default-image-filter",
    currentColor: "--current-color",
    videoHoverColor: "--video-hover-color",
} as const
export type ColorVars = (typeof ColorVars)[keyof typeof ColorVars]

export const ColorClassNames = {
    defaultImage: "default-image",
} as const
export type ColorClassNames = (typeof ColorClassNames)[keyof typeof ColorClassNames]
