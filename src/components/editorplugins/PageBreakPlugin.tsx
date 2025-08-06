import { pageBreakIndicator } from '@/components/editorplugins/PageBreakIndicator.css.ts'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'
import { useCallback, useEffect } from 'react'

interface PageBreakPluginProps {
  maxWidth?: number
  onPageBreak?: (nodeKey: string, pageNumber: number) => void
}

interface NodePosition {
  nodeKey: string
  element: HTMLElement
  left: number
  width: number
  pageNumber: number
  shouldBreak: boolean
}

function PageBreakPlugin({
  maxWidth = 800,
  onPageBreak: _onPageBreak,
}: PageBreakPluginProps) {
  const [editor] = useLexicalComposerContext()
  // const [nodePositions, setNodePositions] = useState<NodePosition[]>([])

  const calculateNodePositions = useCallback(() => {
    editor.getEditorState().read(() => {
      const root = $getRoot()
      const allNodes = root.getAllTextNodes()
      // const positions: NodePosition[] = []

      // Get the editor container for DOM measurements
      const editorContainer = editor.getRootElement()
      if (!editorContainer) return

      let lastWidth = 0

      // 一旦すべてのHTMLからclassを削除
      const allElements = editorContainer.querySelectorAll(
        `.${pageBreakIndicator}`
      )
      for (const el of allElements) {
        el.classList.remove(pageBreakIndicator)
      }

      for (const node of allNodes) {
        const nodeKey = node.getKey()
        const domElement = editor.getElementByKey(nodeKey)

        // console.log(`Calculating position for node: ${nodeKey}`,)
        const viewportWidth = window.innerWidth
        const rect = (
          domElement?.parentNode as HTMLElement
        ).getBoundingClientRect()

        const width = viewportWidth - rect.left - editorContainer.scrollLeft
        // console.log(domElement?.parentNode, width)

        if (width - lastWidth > maxWidth) {
          // console.log(`Page break detected for node: ${nodeKey}, width: ${width}, lastWidth: ${lastWidth}`)
          ;(domElement?.parentNode as HTMLElement)?.classList?.add(
            pageBreakIndicator
          )
          lastWidth = width
        }
      }

      // setNodePositions(positions)
    })
  }, [editor, maxWidth])

  useEffect(() => {
    // Calculate positions on editor state changes
    const removeListener = editor.registerUpdateListener(() => {
      // Use setTimeout to ensure DOM is updated
      setTimeout(calculateNodePositions, 0)
    })

    // Initial calculation
    setTimeout(calculateNodePositions, 100)

    // Recalculate on window resize
    const handleResize = () => {
      setTimeout(calculateNodePositions, 0)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      removeListener()
      window.removeEventListener('resize', handleResize)
    }
  }, [editor, calculateNodePositions])

  // This plugin doesn't render anything itself - it just calculates positions
  // The actual page break indicators would be rendered by another component
  return null
}

export default PageBreakPlugin
export type { NodePosition, PageBreakPluginProps }
