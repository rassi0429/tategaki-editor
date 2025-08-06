import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, type HeadingTagType } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $wrapNodes } from '@lexical/selection'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'

import { $createRubyNode } from './RubyNode'
import * as styles from './ToolbarPlugin.css'

interface ToolbarState {
  isBold: boolean
  isItalic: boolean
  isStrikethrough: boolean
  isUnderline: boolean
  blockType: string
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    isBold: false,
    isItalic: false,
    isStrikethrough: false,
    isUnderline: false,
    blockType: 'paragraph',
  })

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setToolbarState({
        isBold: selection.hasFormat('bold'),
        isItalic: selection.hasFormat('italic'),
        isStrikethrough: selection.hasFormat('strikethrough'),
        isUnderline: selection.hasFormat('underline'),
        blockType: 'paragraph', // Simplified for now
      })
    }
  }, [])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar()
        return false
      },
      1
    )
  }, [editor, updateToolbar])

  const formatText = (
    format: 'bold' | 'italic' | 'strikethrough' | 'underline'
  ) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize))
      }
    })
  }

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatRuby = () => {
    const rubyText = prompt('ルビのテキストを入力してください:', '')
    if (rubyText === null || rubyText.trim() === '') {
      return
    }

    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createRubyNode(rubyText))
      }
    })
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarSection}>
        <button
          type="button"
          className={styles.toolbarButton}
          aria-pressed={toolbarState.isBold}
          onClick={() => formatText('bold')}
          aria-label="太字"
        >
          <strong>太</strong>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          aria-pressed={toolbarState.isItalic}
          onClick={() => formatText('italic')}
          aria-label="斜体"
        >
          <em>斜</em>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          aria-pressed={toolbarState.isStrikethrough}
          onClick={() => formatText('strikethrough')}
          aria-label="取り消し線"
        >
          <s>消</s>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          aria-pressed={toolbarState.isUnderline}
          onClick={() => formatText('underline')}
          aria-label="下線"
        >
          <u>線</u>
        </button>
      </div>

      <div className={styles.toolbarSection}>
        <span className={styles.toolbarLabel}>見出し:</span>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatParagraph()}
          aria-label="本文"
        >
          本文
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h1')}
          aria-label="見出し1"
        >
          H1
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h2')}
          aria-label="見出し2"
        >
          H2
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h3')}
          aria-label="見出し3"
        >
          H3
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h4')}
          aria-label="見出し4"
        >
          H4
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatRuby()}
          aria-label="ルビ"
        >
          ルビ
        </button>
      </div>
    </div>
  )
}
