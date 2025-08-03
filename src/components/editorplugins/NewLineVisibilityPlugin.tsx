// デフォルトでは、縦書きてエディタの場合、改行してもviewに収まるように改行されない。
// そのため、カスタムの改行ロジックを書いた

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isRangeSelection } from 'lexical'
import { useEffect } from 'react'

const NewLineVisibilityPlugin = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerUpdateListener((state) => {
      const currentEditorState = state.editorState
      const selection = currentEditorState._selection
      if (!selection || !selection.isCollapsed || !$isRangeSelection(selection))
        return
      const anchorKey = selection.anchor.key
      const elem = editor.getElementByKey(anchorKey)
      // elem.textContentは空である場合、改行されたとみなす
      if (elem && !elem.textContent) {
        // 画面からはみ出している時だけ、映るようにスクロール
        // @ts-ignore
        elem.scrollIntoViewIfNeeded(false)
      }
    })
  }, [editor])
  return null
}

export default NewLineVisibilityPlugin
