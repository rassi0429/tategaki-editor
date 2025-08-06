import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  type EditorConfig,
  ElementNode,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
  type Spread,
} from 'lexical'

// RubyNodeのシリアライズ形式
export type SerializedRubyNode = Spread<
  {
    rubyText: string
    type: 'ruby'
    version: 1
  },
  SerializedElementNode
>

// RubyNode クラス
export class RubyNode extends ElementNode {
  __rubyText: string

  static getType(): string {
    return 'ruby'
  }

  static clone(node: RubyNode): RubyNode {
    return new RubyNode(node.__rubyText, node.__key)
  }

  static importJSON(serializedNode: SerializedRubyNode): RubyNode {
    const node = $createRubyNode(serializedNode.rubyText)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  constructor(rubyText: string, key?: NodeKey) {
    super(key)
    this.__rubyText = rubyText
  }

  exportJSON(): SerializedRubyNode {
    return {
      ...super.exportJSON(),
      rubyText: this.__rubyText,
      type: 'ruby',
      version: 1,
    }
  }

  _updateRtElement(dom: HTMLElement): void {
    const newRubyText = this.getRubyText()
    let rtElement = dom.querySelector('rt')

    if (rtElement === null) {
      rtElement = document.createElement('rt')
      rtElement.style.cursor = 'pointer'
      rtElement.contentEditable = 'false'
      dom.appendChild(rtElement)
    }

    if (rtElement.innerText !== newRubyText) {
      rtElement.innerText = newRubyText
    }
  }

  createDOM(_config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const element = document.createElement('ruby')

    element.addEventListener('click', (event) => {
      event.preventDefault()
      editor.update(() => {
        const node = this.getLatest()
        const newRubyText = prompt('ルビを編集:', node.getRubyText())
        if (newRubyText !== null && newRubyText !== node.getRubyText()) {
          this.getWritable().setRubyText(newRubyText)
        }
      })
    })

    setTimeout(() => (
      editor.update(() => {
        this._updateRtElement(element)
      })))

    return element
  }

  updateDOM(_prevNode: RubyNode, dom: HTMLElement): boolean {
    this._updateRtElement(dom)
    return false
  }

  setRubyText(newRubyText: string) {
    const writable = this.getWritable()
    writable.__rubyText = newRubyText
  }

  getRubyText(): string {
    return this.getLatest().__rubyText
  }

  isInline(): boolean {
    return true
  }
}

// RubyNode作成ヘルパー関数
export function $createRubyNode(rubyText: string): RubyNode {
  return new RubyNode(rubyText)
}

// RubyNode判定関数
export function $isRubyNode(
  node: LexicalNode | null | undefined
): node is RubyNode {
  return node instanceof RubyNode
}

// プラグイン用の設定
export const RubyPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    if (!editor.hasNode(RubyNode)) {
      throw new Error('RubyPlugin: RubyNode not registered on editor')
    }
  }, [editor])
  return null
}
