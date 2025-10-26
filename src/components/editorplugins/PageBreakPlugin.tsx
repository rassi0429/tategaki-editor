import { pageBreakIndicator } from '@/components/editorplugins/PageBreakIndicator.css.ts'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'
import { useCallback, useEffect } from 'react'

interface PageBreakPluginProps {
  maxWidth?: number
  onPageBreak?: (nodeKey: string, pageNumber: number) => void
}

function PageBreakPlugin({
  maxWidth = 800,
  onPageBreak,
}: PageBreakPluginProps) {
  const [editor] = useLexicalComposerContext()

  const calculateNodePositions = useCallback(() => {
    editor.getEditorState().read(() => {
      const root = $getRoot()
      const allNodes = root.getAllTextNodes()
      const editorContainer = editor.getRootElement()
      if (!editorContainer) return

      const scaleWidth = (editorContainer.clientHeight / 400) * maxWidth

      let lastWidth = 0

      const elements = editorContainer.querySelectorAll(
        `.${pageBreakIndicator}`
      )
      for (const el of elements) {
        el.classList.remove(pageBreakIndicator)
      }

      const viewportWidth = window.innerWidth
      const scrollLeft = editorContainer.scrollLeft
      let pageNumber = 1

      for (const node of allNodes) {
        const nodeKey = node.getKey()
        const domElement = editor.getElementByKey(nodeKey)
        const parentElement = domElement?.parentNode as HTMLElement
        if (!parentElement) continue

        const rect = parentElement.getBoundingClientRect()
        const width = viewportWidth - rect.left - scrollLeft

        if (width - lastWidth > scaleWidth) {
          parentElement.classList.add(pageBreakIndicator)
          onPageBreak?.(nodeKey, pageNumber)
          pageNumber++
          lastWidth = width
        }
      }
    })
  }, [editor, maxWidth, onPageBreak])

  useEffect(() => {
    const removeListener = editor.registerUpdateListener(() => {
      setTimeout(calculateNodePositions, 0)
    })

    calculateNodePositions()

    const handleResize = () => calculateNodePositions()
    window.addEventListener('resize', handleResize)

    return () => {
      removeListener()
      window.removeEventListener('resize', handleResize)

      // Cleanup: Remove all page break indicators when plugin unmounts
      const editorContainer = editor.getRootElement()
      if (editorContainer) {
        const elements = editorContainer.querySelectorAll(
          `.${pageBreakIndicator}`
        )
        for (const el of elements) {
          el.classList.remove(pageBreakIndicator)
        }
      }
    }
  }, [editor, calculateNodePositions])

  return null
}

export default PageBreakPlugin
