import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ComponentOptions } from '@/types.ts'

// Figma utility functions
export const solidPaint = (color: string) => [figma.util.solidPaint(color)]

export const createNewVariantSet = (
  name: string,
  nodes: ComponentNode[],
  options: ComponentOptions,
) => {
  const variantSet = figma.combineAsVariants(nodes, figma.currentPage)
  variantSet.name = name
  variantSet.layoutMode = 'VERTICAL'
  variantSet.layoutSizingHorizontal = 'HUG'
  variantSet.strokes = solidPaint('#8A38F5')
  if (options.gap) variantSet.itemSpacing = options.gap
  if (options.padding) {
    variantSet.paddingLeft = options.padding
    variantSet.paddingRight = options.padding
    variantSet.paddingTop = options.padding
    variantSet.paddingBottom = options.padding
  }
}

// UI utility functions
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const sendPluginMessage = (
  type: string,
  data: Record<string, unknown> = {},
) => {
  parent.postMessage(
    {
      pluginMessage: {
        type,
        data,
      },
    },
    '*',
  )
}

export const getNumericValue = (value: string) => {
  const num = parseFloat(value)
  return isNaN(num) ? 0 : num
}
