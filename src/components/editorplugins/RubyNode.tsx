import {
  $applyNodeReplacement,
  $getSelection,
  $isRangeSelection,
  ElementNode,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical'

// RubyNodeのシリアライズ形式
export type SerializedRubyNode = Spread<
  {
    baseText: string
    rubyText: string
    type: 'ruby'
    version: 1
  },
  SerializedLexicalNode
>

// RubyNode クラス
export class RubyNode extends ElementNode {
  __baseText: string
  __rubyText: string

  static getType(): string {
    return 'ruby'
  }

  static clone(node: RubyNode): RubyNode {
    return new RubyNode(node.__baseText, node.__rubyText, node.__key)
  }

  constructor(baseText: string, rubyText: string, key?: NodeKey) {
    super(key)
    this.__baseText = baseText
    this.__rubyText = rubyText
  }

  createDOM(): HTMLElement {
    const ruby = document.createElement('ruby')
    const base = document.createElement('span')
    const rt = document.createElement('rt')

    base.textContent = this.__baseText
    rt.textContent = this.__rubyText

    ruby.appendChild(base)
    ruby.appendChild(rt)

    return ruby
  }

  updateDOM(prevNode: RubyNode, dom: HTMLElement): boolean {
    const baseSpan = dom.querySelector('span')
    const rtElement = dom.querySelector('rt')

    if (baseSpan && rtElement) {
      if (prevNode.__baseText !== this.__baseText) {
        baseSpan.textContent = this.__baseText
      }
      if (prevNode.__rubyText !== this.__rubyText) {
        rtElement.textContent = this.__rubyText
      }
    }

    return false
  }

  setBaseText(baseText: string): void {
    const writable = this.getWritable()
    writable.__baseText = baseText
  }

  setRubyText(rubyText: string): void {
    const writable = this.getWritable()
    writable.__rubyText = rubyText
  }

  getBaseText(): string {
    return this.__baseText
  }

  getRubyText(): string {
    return this.__rubyText
  }

  getTextContent(): string {
    return this.__baseText
  }

  // Lexical内部での処理に必要
  isInline(): boolean {
    return true
  }

  isKeyboardSelectable(): boolean {
    return true
  }

  canInsertTextBefore(): boolean {
    return false
  }

  canInsertTextAfter(): boolean {
    return false
  }

  canBeEmpty(): boolean {
    return false
  }

  static importJSON(serializedNode: SerializedRubyNode): RubyNode {
    const { baseText, rubyText } = serializedNode
    const node = $createRubyNode(baseText, rubyText)
    return node
  }

  exportJSON(): SerializedRubyNode {
    return {
      baseText: this.__baseText,
      rubyText: this.__rubyText,
      type: 'ruby',
      version: 1,
    }
  }

  // 検索やコピー用にプレーンテキストを返す
  getTextContentForSearch(): string {
    return this.__baseText
  }
}

// RubyNode作成ヘルパー関数
export function $createRubyNode(baseText: string, rubyText: string): RubyNode {
  const rubyNode = new RubyNode(baseText, rubyText)
  return $applyNodeReplacement(rubyNode)
}

// RubyNode判定関数
export function $isRubyNode(
  node: LexicalNode | null | undefined
): node is RubyNode {
  return node instanceof RubyNode
}

// プラグイン用の設定
export const RubyPlugin = () => {
  return null // プラグイン自体は何もしない
}

// 使用例：エディタ設定
export const editorConfig = {
  namespace: 'ruby-editor',
  nodes: [RubyNode],
  onError: (error: Error) => {
    console.error(error)
  },
}

// 使用例：ルビ挿入コマンド
export function insertRuby(
  editor: LexicalEditor,
  baseText: string,
  rubyText: string
): void {
  editor.update(() => {
    const rubyNode = $createRubyNode(baseText, rubyText)
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      selection.insertNodes([rubyNode])
    }
  })
}
