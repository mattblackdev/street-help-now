import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { ctl } from '../utilities/ctl'

const AccordionContext = createContext<[string, (key: string) => void]>([
  '',
  () => {},
])

type AccordionProps = {
  children: ReactNode
}
export function Accordion({ children }: AccordionProps) {
  const [openPanelKey, setOpenPanel] = useState('')
  const togglePanel = useCallback(
    (key: string) =>
      setOpenPanel((curKey) => {
        if (key === curKey) {
          return ''
        } else {
          return key
        }
      }),
    [setOpenPanel]
  )

  return (
    <AccordionContext.Provider value={[openPanelKey, togglePanel]}>
      {children}
    </AccordionContext.Provider>
  )
}

type PanelProps = {
  panelKey: string
  title: string
  children: ReactNode
}
export function Panel({ panelKey, title, children }: PanelProps) {
  const [openPanelKey, togglePanel] = useContext(AccordionContext)
  const isOpen = openPanelKey === panelKey

  return (
    <>
      <div
        data-indicator={isOpen ? '-' : '+'}
        onClick={() => togglePanel(panelKey)}
        className={ctl(
          `px-2 py-4 bg-stone-400 ${
            isOpen ? 'bg-opacity-70' : 'bg-opacity-40'
          } hover:bg-opacity-70 after:float-right after:pr-4 transition-all text-stone-700 after:content-[attr(data-indicator)]`
        )}
      >
        {title}
      </div>
      <div
        className={ctl(
          `${isOpen ? 'max-h-fit' : 'max-h-0'} overflow-hidden transition-all`
        )}
      >
        {children}
      </div>
    </>
  )
}
