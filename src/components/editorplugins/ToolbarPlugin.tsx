import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, type HeadingTagType } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  type LexicalNode,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'

import { $createRubyNode } from './RubyNode'
import { $createTateChuYokoNode, $isTateChuYokoNode } from './TateChuYokoNode'
import * as styles from './ToolbarPlugin.css'
import {$createAuthorNode} from "@/components/editorplugins/AuthorNode.tsx";

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

  const replaceSelectionWithNode = (
    nodeCreator: (text: string) => LexicalNode
  ) => {
    const selection = $getSelection()
    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
      const selectedText = selection.getTextContent()
      const newNode = nodeCreator(selectedText)
      if ($isElementNode(newNode)) {
        const textNode = $createTextNode(selectedText)
        newNode.append(textNode)
      }
      selection.insertNodes([newNode])
    }
  }

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
      replaceSelectionWithNode(() => $createRubyNode(rubyText))
    })
  }

  const formatTateChuYoko = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        // 現在の選択が縦中横ノード内にあるかチェック
        const nodes = selection.getNodes()
        let tateChuYokoNode = null

        for (const node of nodes) {
          const parent = node.getParent()
          if ($isTateChuYokoNode(parent)) {
            tateChuYokoNode = parent
            break
          }
        }

        if (tateChuYokoNode) {
          // 縦中横ノードをTextNodeに戻す
          const textContent = tateChuYokoNode.getTextContent()
          const newTextNode = $createTextNode(textContent)
          tateChuYokoNode.replace(newTextNode)
          // 新しいノードに選択を移動
          newTextNode.select()
        } else {
          // 通常の縦中横作成処理
          replaceSelectionWithNode(() => $createTateChuYokoNode())
        }
      }
    })
  }

  //次の行に著者名を挿入する
  const formatAuthorName = () => {
    editor.update(() => {
        const authorText = prompt('著者名を入力してください:', '')
        if (authorText === null || authorText.trim() === '') {
            return
        }
        const authorNode = $createAuthorNode(authorText)
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            // 現在の選択位置に著者名ノードを挿入
            selection.insertNodes([authorNode])
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
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatRuby()}
          aria-label="ルビ"
        >
          ルビ
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatTateChuYoko()}
          aria-label="縦中横"
        >
          縦中横
        </button>
      </div>

      <div className={styles.toolbarSection}>
        <span className={styles.toolbarLabel}>見出し:</span>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h1')}
          aria-label="見出し大"
        >
          見出し大
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h2')}
          aria-label="見出し小"
        >
          見出し小
        </button>
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
          onClick={() => formatHeading('h3')}
          aria-label="本文大"
        >
          本文大
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatHeading('h4')}
          aria-label="本文小"
        >
          本文小
        </button>
        <button
          type="button"
            className={styles.toolbarButton}
            onClick={() => formatAuthorName()}
            aria-label="著者名"
        >
          著者名
        </button>
      </div>
    </div>
  )
}
