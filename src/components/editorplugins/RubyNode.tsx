import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createTextNode,
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

  _updateRtElement(dom: HTMLElement): Element {
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

    return rtElement
  }

  createDOM(_config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const element = document.createElement('ruby')

    element.addEventListener('click', (event) => {
      if (!(event.target instanceof Node && event.target.nodeName === 'RT')) {
        return
      }
      event.preventDefault()
      editor.update(() => {
        const node = this.getLatest()
        const newRubyText = prompt('ルビを編集:', node.getRubyText())
        if (newRubyText !== null && newRubyText !== node.getRubyText()) {
          this.getWritable().setRubyText(newRubyText)
        }
      })
    })

    // MutationObserverで子要素の追加・削除を監視
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // 子要素が削除された場合、テキストコンテンツをチェック
          if (mutation.removedNodes.length > 0) {
            editor.update(() => {
              const node = this.getLatest()
              if (node instanceof RubyNode) {
                node._checkAndReplaceWithTextNode()
              }
            })
          }
        }
      }
    })

    observer.observe(element, { childList: true, subtree: true })

    // 要素が削除される時にオブザーバーを解除
    const originalRemove = element.remove
    element.remove = function () {
      observer.disconnect()
      originalRemove.call(this)
    }

    this._updateRtElement(element)

    // __lexicalLineBreakプロパティに入れておくとその前に子要素が入るようだが詳細は未確認
    ;(
      element as unknown as { __lexicalLineBreak: Element }
    ).__lexicalLineBreak = this._updateRtElement(element)

    return element
  }

  updateDOM(_prevNode: RubyNode, dom: HTMLElement): boolean {
    this._updateRtElement(dom)
    return false
  }

  setRubyText(newRubyText: string) {
    const writable = this.getWritable()
    writable.__rubyText = newRubyText
    this._checkAndReplaceWithTextNode()
  }

  _checkAndReplaceWithTextNode() {
    const rubyText = this.getRubyText()
    const textContent = this.getTextContent()

    if (textContent.trim() === '') {
      this.remove()
      return
    }

    if (rubyText.trim() === '') {
      const textNode = $createTextNode(textContent)
      this.replace(textNode)
    }
  }

  getRubyText(): string {
    return this.getLatest().__rubyText
  }

  isInline(): boolean {
    return true
  }

  insertAfter(nodeToInsert: LexicalNode): LexicalNode {
    const result = super.insertAfter(nodeToInsert)
    this._checkAndReplaceWithTextNode()
    return result
  }

  insertBefore(nodeToInsert: LexicalNode): LexicalNode {
    const result = super.insertBefore(nodeToInsert)
    this._checkAndReplaceWithTextNode()
    return result
  }

  clear(): this {
    const result = super.clear()
    this._checkAndReplaceWithTextNode()
    return result
  }

  splice(
    start: number,
    deleteCount: number,
    nodesToInsert: LexicalNode[]
  ): this {
    super.splice(start, deleteCount, nodesToInsert)
    this._checkAndReplaceWithTextNode()
    return this
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
