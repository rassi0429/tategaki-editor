import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot } from 'lexical'
import { useEffect, useState } from 'react'
import { countCharacter } from '../../utils/documentManager'

import * as styles from './CurrentInfo.css'

function CurrentInfo() {
  const [editor] = useLexicalComposerContext()
  const [characterCount, setCharacterCount] = useState(0)
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const root = $getRoot()
        const textContent = root.getTextContent()
        setCharacterCount(countCharacter(textContent))
        setLineCount(textContent.split('\n').length)
      })
    })

    editor.getEditorState().read(() => {
      const root = $getRoot()
      const textContent = root.getTextContent()
      const _lineCount = textContent.split('\n').length
      setCharacterCount(countCharacter(textContent))
      setLineCount(_lineCount)
    })

    return () => {
      removeUpdateListener()
    }
  }, [editor])

  return (
    <div className={styles.container}>
      文字数: {characterCount} 行数: {lineCount}
    </div>
  )
}

export default CurrentInfo
