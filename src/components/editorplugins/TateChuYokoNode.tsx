import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  ElementNode,
  type LexicalNode,
  type SerializedElementNode,
  type Spread,
} from 'lexical'
import * as styles from './TateChuYokoNode.css.ts'

// TateChuYokoNodeのシリアライズ形式
export type SerializedTateChuYokoNode = Spread<
  {
    type: 'tate-chu-yoko'
    version: 1
  },
  SerializedElementNode
>

// TateChuYokoNode クラス
export class TateChuYokoNode extends ElementNode {
  static getType(): string {
    return 'tate-chu-yoko'
  }

  static importJSON(
    serializedNode: SerializedTateChuYokoNode
  ): TateChuYokoNode {
    const node = $createTateChuYokoNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  exportJSON(): SerializedTateChuYokoNode {
    return {
      ...super.exportJSON(),
      type: 'tate-chu-yoko',
      version: 1,
    }
  }

  createDOM(): HTMLElement {
    const element = document.createElement('span')
    element.className = styles.tateChuYoko
    return element
  }

  updateDOM(_prevNode: TateChuYokoNode, _dom: HTMLElement): boolean {
    return false
  }

  isInline(): boolean {
    return true
  }
}

// TateChuYokoNode作成ヘルパー関数
export function $createTateChuYokoNode(): TateChuYokoNode {
  return new TateChuYokoNode()
}

// TateChuYokoNode判定関数
export function $isTateChuYokoNode(
  node: LexicalNode | null | undefined
): node is TateChuYokoNode {
  return node instanceof TateChuYokoNode
}

// プラグイン用の設定
export const TateChuYokoPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    if (!editor.hasNode(TateChuYokoNode)) {
      throw new Error(
        'TateChuYokoPlugin: TateChuYokoNode not registered on editor'
      )
    }
  }, [editor])
  return null
}
