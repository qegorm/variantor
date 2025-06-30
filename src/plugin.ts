import { IconConfig, Message, MessageType, WindowSize } from '@/types.ts'
import { CONFIG_STORAGE_KEY, WINDOW_SIZE } from '@/constants.ts'
import { createNewVariantSet, solidPaint } from '@/utils.ts'

const { width, height }: WindowSize = WINDOW_SIZE

const handleSelectionChange = () => {
  const selection = figma.currentPage.selection
  const isValidSelection =
    selection.length > 0 &&
    selection.every((node) => node.type === 'FRAME' || node.type === 'GROUP')

  figma.ui.postMessage({
    type: MessageType.WATCH,
    data: isValidSelection,
  } satisfies Message)
}

figma.ui.onmessage = ({ type, data }: Message) => {
  switch (type) {
    case MessageType.CREATE:
      createIcons(data as IconConfig)
      break
    case MessageType.STORE:
      void storeIcons(data as IconConfig)
      break
    case MessageType.GET:
      void getStoredIcons()
      break
    case MessageType.REMOVE:
      void removeStoredIcons()
      break
  }
}

figma.showUI(__html__, { width, height, themeColors: true })

figma.on('selectionchange', () => handleSelectionChange())

const createIcons = (data: IconConfig) => {
  for (const currentSelection of figma.currentPage.selection) {
    const icon = currentSelection.clone()
    const parent = currentSelection.parent ?? figma.currentPage
    const componentNode: ComponentNode[] = []

    for (const properties of data.iconProperties) {
      if (icon.type === 'FRAME' || icon.type === 'GROUP') {
        icon.children.forEach((child) => {
          if (child.type !== 'VECTOR') return

          child.name = 'Vector'

          if (
            child.constraints.vertical !== 'SCALE' &&
            child.constraints.horizontal !== 'SCALE'
          ) {
            child.constraints = {
              vertical: 'SCALE',
              horizontal: 'SCALE',
            }
          }

          const hasFills = Array.isArray(child.fills) && child.fills.length > 0
          if (data.iconColor && hasFills) {
            child.fills = solidPaint(data.iconColor)
          }

          if (child.strokes.length) {
            child.strokeWeight = properties.stroke

            if (data.iconColor) {
              child.strokes = solidPaint(data.iconColor)
            }
          }
        })

        icon.resize(properties.size, properties.size)
        parent.appendChild(icon)

        const component = figma.createComponentFromNode(icon)
        component.name = `Size=${properties.name}`
        componentNode.push(component)
      }
    }

    createNewVariantSet(
      currentSelection.name,
      parent,
      componentNode,
      data.componentOptions,
    )
    currentSelection.remove()
  }
}

const storeIcons = async (data: IconConfig) => {
  await figma.clientStorage.setAsync(CONFIG_STORAGE_KEY, data)
}

const getStoredIcons = async () => {
  try {
    const data = await figma.clientStorage.getAsync(CONFIG_STORAGE_KEY)
    figma.ui.postMessage({ type: MessageType.GET, data } satisfies Message)
  } catch (error) {
    console.error('Error retrieving stored icons:', error)
    return null
  }
}

const removeStoredIcons = async (): Promise<void> => {
  try {
    await figma.clientStorage.setAsync(CONFIG_STORAGE_KEY, null)
  } catch (error) {
    console.error('Error removing stored icons:', error)
  }
}
