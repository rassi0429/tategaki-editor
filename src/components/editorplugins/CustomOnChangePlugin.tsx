import { useState, useEffect } from 'react'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


function CostomOnChangePlugin({ onChange, initString }: { onChange: (editorStateJSON: string) => void, initString: string }) {
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
        onChange(JSON.stringify(editorState.toJSON()))
      }}
    />
  )
}

export default CostomOnChangePlugin