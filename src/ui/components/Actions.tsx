import { Button } from '@/ui/components/Button.tsx'

export interface ActionsProps {
  isNodesSelected: boolean
  createIcons: () => void
  resetToDefaults: () => void
}

export const Actions = ({
  isNodesSelected,
  createIcons,
  resetToDefaults,
}: ActionsProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full border-t-[1px] border-[var(--figma-color-border)] bg-[var(--figma-color-bg)] px-4 py-3">
      <div className="flex gap-1">
        <Button
          className="w-full"
          disabled={!isNodesSelected}
          onClick={createIcons}
        >
          Create icons
        </Button>
        <Button variant="danger" onClick={resetToDefaults}>
          Reset
        </Button>
      </div>
    </div>
  )
}
