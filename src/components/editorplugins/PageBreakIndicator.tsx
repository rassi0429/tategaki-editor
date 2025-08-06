import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useState } from 'react'
import PageBreakPlugin, { type NodePosition } from './PageBreakPlugin'
import * as styles from './PageBreakIndicator.css'

interface PageBreakIndicatorProps {
  maxWidth?: number
  showPageNumbers?: boolean
}

interface PageBreak {
  position: number
  pageNumber: number
}

function PageBreakIndicator({ 
  maxWidth = 800, 
  showPageNumbers = true 
}: PageBreakIndicatorProps) {
  const [editor] = useLexicalComposerContext()
  const [pageBreaks, setPageBreaks] = useState<PageBreak[]>([])

  const handlePageBreak = (nodeKey: string, pageNumber: number) => {
    const element = editor.getElementByKey(nodeKey)
    if (!element) return

    const editorContainer = editor.getRootElement()
    if (!editorContainer) return

    const rect = element.getBoundingClientRect()
    const containerRect = editorContainer.getBoundingClientRect()
    
    // For vertical-rl, calculate position from the right edge of the container
    const position = containerRect.right - rect.right

    setPageBreaks(prev => {
      // Avoid duplicate page breaks at the same position
      const exists = prev.some(pb => Math.abs(pb.position - position) < 5)
      if (exists) return prev

      const newBreaks = [...prev, { position, pageNumber }]
      // Sort by position (right to left for vertical-rl)
      return newBreaks.sort((a, b) => a.position - b.position)
    })
  }

  // Clear page breaks when editor content changes significantly
  useEffect(() => {
    const removeListener = editor.registerUpdateListener(() => {
      // Clear existing breaks to recalculate
      setPageBreaks([])
    })

    return removeListener
  }, [editor])

  return (
    <>
      <PageBreakPlugin 
        maxWidth={maxWidth} 
        onPageBreak={handlePageBreak}
      />
      
      {/* Render page break indicators */}
      {pageBreaks.map((pageBreak, index) => (
        <div
          key={`${pageBreak.position}-${pageBreak.pageNumber}`}
          className={styles.pageBreakIndicator}
          style={{ 
            right: pageBreak.position
          }}
        >
          {showPageNumbers && (
            <div className={styles.pageNumber}>
              {pageBreak.pageNumber}ページ
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default PageBreakIndicator