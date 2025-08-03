import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useEffect, useState } from 'react'

function CostomOnChangePlugin({
  onChange,
  initString,
}: { onChange?: (content: string) => void; initString?: string }) {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)

      if (initString) {
        const initialEditorState = editor.parseEditorState(initString)
        editor.setEditorState(initialEditorState)
      }
    }
  }, [isFirstRender, initString, editor])

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        onChange?.(JSON.stringify(editorState.toJSON()))
      }}
    />
  )
}

export default CostomOnChangePlugin
