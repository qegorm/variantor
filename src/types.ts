export interface IconProperties {
  id: number
  name: string
  size: number
  stroke: number
}

export interface ComponentOptions {
  padding?: number
  gap?: number
}

export interface IconConfig {
  iconProperties: IconProperties[]
  componentOptions: ComponentOptions
  iconColor?: string
  changeSelectionColors?: boolean
}

export interface WindowSize {
  width: number
  height: number
}

export enum MessageType {
  CREATE = 'create',
  STORE = 'store',
  GET = 'get',
  REMOVE = 'remove',
  WATCH = 'watch',
}

export type Message =
  | {
      type: MessageType.WATCH
      data?: boolean
    }
  | {
      type: Exclude<MessageType, MessageType.WATCH>
      data?: IconConfig
    }
