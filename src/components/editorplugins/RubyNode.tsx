import { type ReactNode, useEffect, useRef, useState } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import {
  $getNodeByKey,
  ElementNode,
  type EditorConfig,
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

// ルビタグをレンダリングするためのReactコンポーネント
function RubyComponent({
  rubyText: initialRubyText,
  nodeKey,
  children,
}: {
  rubyText: string
  nodeKey: NodeKey
  children: ReactNode
}) {
  const [editor] = useLexicalComposerContext()
  const [isSelected] = useLexicalNodeSelection(nodeKey)
  const [isEditing, setIsEditing] = useState(false)
  const [rubyText, setRubyText] = useState(initialRubyText)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isRubyNode(node)) {
        node.setRubyText(rubyText)
      }
    })
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave()
    } else if (event.key === 'Escape') {
      setIsEditing(false)
      setRubyText(initialRubyText)
    }
  }

  return (
    <ruby className={isSelected ? 'selected' : ''}>
      {children}
      <rt>
        {isEditing ? (
          <input
            ref={inputRef}
            value={rubyText}
            onChange={(e) => setRubyText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            style={{ width: '5em' }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            {initialRubyText}
          </button>
        )}
      </rt>
    </ruby>
  )
}

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

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement('ruby')
    const rubyTextElement = document.createElement('rt')
    rubyTextElement.innerText = this.__rubyText
    element.appendChild(rubyTextElement)
    return element
  }

  updateDOM(prevNode: RubyNode, dom: HTMLElement): boolean {
    const rtElement = dom.querySelector('rt')
    if (rtElement && prevNode.__rubyText !== this.__rubyText) {
      rtElement.innerText = this.__rubyText
    }
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

  // ElementNodeはdecorateを直接使わないが、
  // Reactコンポーネントでレンダリングを制御したい場合に備えておく
  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    return (
      <RubyComponent rubyText={this.getRubyText()} nodeKey={this.getKey()}>
        {this.getChildren().map((child) => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          if (typeof (child as any).decorate === 'function') {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            return (child as any).decorate(editor, config)
          }
          return null // または適切なデフォルトのレンダリング
        })}
      </RubyComponent>
    )
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