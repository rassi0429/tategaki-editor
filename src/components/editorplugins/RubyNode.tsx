import {
  $applyNodeReplacement,
  $getSelection,
  $isRangeSelection,
  DecoratorNode,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical'
import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

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

// ルビタグをレンダリングするためのReactコンポーネント
function RubyComponent({
  baseText,
  rubyText,
  nodeKey,
}: {
  baseText: string
  rubyText: string
  nodeKey: NodeKey
}) {
  return (
    <ruby data-lexical-decorator="true" data-lexical-node-key={nodeKey}>
      {baseText}
      <rt>{rubyText}</rt>
    </ruby>
  )
}

// RubyNode クラス
export class RubyNode extends DecoratorNode<React.ReactNode> {
  __baseText: string
  __rubyText: string

  static getType(): string {
    return 'ruby'
  }

  static clone(node: RubyNode): RubyNode {
    return new RubyNode(node.__baseText, node.__rubyText, node.__key)
  }

  static importJSON(serializedNode: SerializedRubyNode): RubyNode {
    const node = $createRubyNode(
      serializedNode.baseText,
      serializedNode.rubyText
    )
    return node
  }

  constructor(baseText: string, rubyText: string, key?: NodeKey) {
    super(key)
    this.__baseText = baseText
    this.__rubyText = rubyText
  }

  exportJSON(): SerializedRubyNode {
    return {
      baseText: this.__baseText,
      rubyText: this.__rubyText,
      type: 'ruby',
      version: 1,
    }
  }

  createDOM(_config: EditorConfig): HTMLElement {
    // DecoratorNodeの場合、これはプレースホルダーです
    return document.createElement('span')
  }

  getTextContent(): string {
    return this.__baseText
  }

  isInline(): boolean {
    return true
  }

  decorate(): React.ReactNode {
    return (
      <RubyComponent
        baseText={this.__baseText}
        rubyText={this.__rubyText}
        nodeKey={this.getKey()}
      />
    )
  }
}

// RubyNode作成ヘルパー関数
export function $createRubyNode(baseText: string, rubyText: string): RubyNode {
  return $applyNodeReplacement(new RubyNode(baseText, rubyText))
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
  React.useEffect(() => {
    if (!editor.hasNode(RubyNode)) {
      throw new Error('RubyPlugin: RubyNode not registered on editor')
    }
  }, [editor])
  return null
}

// 使用例：ルビ挿入コマンド
export function insertRuby(
  editor: LexicalEditor,
  baseText: string,
  rubyText: string
): void {
  editor.update(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const rubyNode = $createRubyNode(baseText, rubyText)
      selection.insertNodes([rubyNode])
    }
  })
}
