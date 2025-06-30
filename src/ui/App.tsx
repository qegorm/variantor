import { useEffect, useState } from 'react'

import { Button } from '@/ui/components/Button.tsx'
import { Switch } from '@/ui/components/Switch.tsx'
import { Input } from '@/ui/components/Input.tsx'
import { Actions } from '@/ui/components/Actions.tsx'
import { Icons } from '@/ui/components/Icons.tsx'

import { ComponentOptions, IconProperties, MessageType } from '@/types.ts'
import { getNumericValue, sendPluginMessage } from '@/utils.ts'
import {
  DEFAULT_ICON_PROPERTIES,
  DEFAULT_COMPONENT_OPTIONS,
  DEFAULT_ICON_COLOR,
  MAX_ICON_PROPERTIES,
  MIN_ICON_PROPERTIES,
} from '@/constants.ts'

export default function App() {
  const [iconProperties, setIconProperties] = useState<IconProperties[]>(
    DEFAULT_ICON_PROPERTIES,
  )
  const [componentOptions, setComponentOptions] = useState<ComponentOptions>(
    DEFAULT_COMPONENT_OPTIONS,
  )
  const [iconColor, setIconColor] = useState(DEFAULT_ICON_COLOR)
  const [changeSelectionColors, setChangeSelectionColors] = useState(false)
  const [isNodesSelected, setIsNodesSelected] = useState(false)

  useEffect(() => {
    sendPluginMessage('get')
    onmessage = (event: MessageEvent) => {
      if (event.data?.pluginMessage) {
        const { type, data } = event.data.pluginMessage

        if (type === MessageType.GET) {
          setIconProperties(data.iconProperties)
          setComponentOptions(data.componentOptions)
          setIconColor(data.iconColor || DEFAULT_ICON_COLOR)
          setChangeSelectionColors(data.changeSelectionColors)
        }

        if (type === MessageType.WATCH) {
          setIsNodesSelected(data)
        }
      }
    }
  }, [])

  useEffect(() => {
    sendPluginMessage('store', {
      iconProperties,
      componentOptions,
      iconColor: iconColor && changeSelectionColors ? iconColor : undefined,
      changeSelectionColors,
    })
  }, [iconProperties, componentOptions, iconColor, changeSelectionColors])

  const createIcons = () => {
    sendPluginMessage('create', {
      iconProperties,
      componentOptions,
      iconColor: iconColor && changeSelectionColors ? iconColor : undefined,
    })
  }

  const resetToDefaults = () => {
    sendPluginMessage('remove')
    setIconProperties(DEFAULT_ICON_PROPERTIES)
    setComponentOptions(DEFAULT_COMPONENT_OPTIONS)
    setIconColor(DEFAULT_ICON_COLOR)
    setChangeSelectionColors(false)
  }

  const addIconProperty = () => {
    setIconProperties((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        name: '',
        size: 24,
        stroke: 1,
      },
    ])
  }

  const updateIconProperty = <T extends keyof IconProperties>(
    id: number,
    property: T,
    value: IconProperties[T],
  ) => {
    setIconProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [property]: value } : p)),
    )
  }

  const removeIconProperty = (id: number) => {
    setIconProperties((prev) =>
      prev.length > MIN_ICON_PROPERTIES
        ? prev.filter((p) => p.id !== id)
        : prev,
    )
  }

  const updateComponentOptions = <T extends keyof ComponentOptions>(
    property: T,
    value: ComponentOptions[T],
  ) => {
    setComponentOptions((prev) => ({ ...prev, [property]: value }))
  }

  return (
    <main className="flex h-[calc(100vh-56px)] flex-col overflow-auto p-4">
      <section className="mb-6">
        <h1 className="mb-2 text-xs">Sizes</h1>
        <div className="mr-9 mb-2 flex gap-1">
          <p className="flex-1 text-xxs text-[var(--figma-color-text-secondary)]">
            Name
          </p>
          <p className="w-16 text-xxs text-[var(--figma-color-text-secondary)]">
            Size
          </p>
          <p className="w-16 text-xxs text-[var(--figma-color-text-secondary)]">
            Stroke
          </p>
        </div>
        <ul className="flex flex-col gap-1">
          {iconProperties.map((property) => (
            <li key={property.id} className="flex gap-1">
              <Input
                type="text"
                maxLength={32}
                placeholder="Medium"
                value={property.name}
                onChange={(e) =>
                  updateIconProperty(property.id, 'name', e.target.value)
                }
              />
              <Input
                numeric
                placeholder="0"
                value={property.size}
                className="w-16"
                onChange={(e) =>
                  updateIconProperty(
                    property.id,
                    'size',
                    getNumericValue(e.target.value),
                  )
                }
              />
              <Input
                numeric
                placeholder="0"
                value={property.stroke}
                className="w-16"
                onChange={(e) =>
                  updateIconProperty(
                    property.id,
                    'stroke',
                    getNumericValue(e.target.value),
                  )
                }
              />
              <div>
                <Button
                  variant="danger-secondary"
                  size="icon"
                  disabled={iconProperties.length <= MIN_ICON_PROPERTIES}
                  onClick={() => removeIconProperty(property.id)}
                >
                  <Icons.X />
                </Button>
              </div>
            </li>
          ))}
          <div className="mt-2 flex items-center justify-between gap-1">
            <p className="text-xxs text-[var(--figma-color-text-secondary)]">
              You can add up to 7 icon sizes.
              <br />
              The first two are required, the rest are optional.
            </p>
            <div>
              <Button
                size="icon"
                disabled={iconProperties.length >= MAX_ICON_PROPERTIES}
                onClick={() => addIconProperty()}
              >
                <Icons.Plus />
              </Button>
            </div>
          </div>
        </ul>
      </section>
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between last:mb-0">
          <div>
            <p className="mb-1 text-xs">Change selection colors</p>
            <p className="text-xxs text-[var(--figma-color-text-secondary)]">
              Color will be applied to the icon fills and strokes.
            </p>
          </div>
          <Switch
            checked={changeSelectionColors}
            onChange={(e) => setChangeSelectionColors(e.target.checked)}
          />
        </div>
        {changeSelectionColors && (
          <div>
            <Input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
            />
          </div>
        )}
      </section>
      <section className="mb-4">
        <h1 className="mb-2 text-xs">Component options</h1>
        <div className="flex gap-1">
          <div>
            <p className="mb-2 text-xxs text-[var(--figma-color-text-secondary)]">
              Padding
            </p>
            <Input
              numeric
              value={componentOptions.padding}
              onChange={(e) =>
                updateComponentOptions(
                  'padding',
                  getNumericValue(e.target.value),
                )
              }
            />
          </div>
          <div>
            <p className="mb-2 text-xxs text-[var(--figma-color-text-secondary)]">
              Gap
            </p>
            <Input
              numeric
              value={componentOptions.gap}
              onChange={(e) =>
                updateComponentOptions('gap', getNumericValue(e.target.value))
              }
            />
          </div>
        </div>
      </section>
      <section className="mt-auto">
        <p className="text-xxs text-[var(--figma-color-text-secondary)]">
          This plugin is open source and available on{' '}
          <a
            href="https://github.com/qegorm/variantor"
            className="rounded-xs text-[var(--figma-color-text-brand)] underline outline-none focus:ring-1 focus:ring-[var(--figma-color-text-brand)] focus:ring-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </section>
      <Actions
        isNodesSelected={isNodesSelected}
        createIcons={createIcons}
        resetToDefaults={resetToDefaults}
      />
    </main>
  )
}
