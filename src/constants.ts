import { IconProperties, WindowSize } from './types.ts'

export const CONFIG_STORAGE_KEY = 'icon-config'
export const MAX_ICON_PROPERTIES = 7
export const MIN_ICON_PROPERTIES = 2

export const WINDOW_SIZE: WindowSize = {
  width: 350,
  height: 520,
}

export const DEFAULT_ICON_COLOR = '#000000'

export const DEFAULT_ICON_PROPERTIES: IconProperties[] = [
  {
    id: 0,
    name: 'Large',
    size: 24,
    stroke: 1.5,
  },
  {
    id: 1,
    name: 'Medium',
    size: 20,
    stroke: 1.5,
  },
  {
    id: 2,
    name: 'Small',
    size: 16,
    stroke: 1.25,
  },
]

export const DEFAULT_COMPONENT_OPTIONS = {
  padding: 8,
  gap: 12,
}
