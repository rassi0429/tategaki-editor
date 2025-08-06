import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
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
  baseText: initialBaseText,
  rubyText: initialRubyText,
  nodeKey,
}: {
  baseText: string
  rubyText: string
  nodeKey: NodeKey
}) {
  const [editor] = useLexicalComposerContext()
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)
  const [isEditing, setIsEditing] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const baseInputRef = useRef<HTMLInputElement>(null)
  const rubyInputRef = useRef<HTMLInputElement>(null)

  const [baseText, setBaseText] = useState(initialBaseText)
  const [rubyText, setRubyText] = useState(initialRubyText)

  useEffect(() => {
    if (!isEditing) {
      setBaseText(initialBaseText)
      setRubyText(initialRubyText)
    }
  }, [initialBaseText, initialRubyText, isEditing])

  const handleSave = useCallback(() => {
    if (!isEditing) return
    setIsEditing(false)

    if (baseText === initialBaseText && rubyText === initialRubyText) {
      return
    }

    editor.update(() => {
      const node = editor.getEditorState()._nodeMap.get(nodeKey)
      if ($isRubyNode(node)) {
        node.setBaseText(baseText)
        node.setRubyText(rubyText)
      }
    })
  }, [editor, isEditing, baseText, rubyText, initialBaseText, initialRubyText, nodeKey])

  useEffect(() => {
    if (isEditing) {
      baseInputRef.current?.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (!isEditing) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleSave()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, handleSave])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSave()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <span
        ref={wrapperRef}
        style={{ display: 'inline-block', verticalAlign: 'text-top' }}
        aria-label="ルビ編集フォーム"
      >
        <ruby
          className={isSelected ? 'selected editing' : 'editing'}
          data-lexical-decorator="true"
        >
          <input
            ref={baseInputRef}
            value={baseText}
            onChange={(e) => setBaseText(e.target.value)}
            onKeyDown={handleKeyDown}
            size={baseText.length > 1 ? baseText.length : 1}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              font: 'inherit',
              color: 'inherit',
              textAlign: 'center',
            }}
          />
          <rt>
            <input
              ref={rubyInputRef}
              value={rubyText}
              onChange={(e) => setRubyText(e.target.value)}
              onKeyDown={handleKeyDown}
              size={rubyText.length > 1 ? rubyText.length : 1}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                font: 'inherit',
                color: 'inherit',
                fontSize: '0.5em',
                textAlign: 'center',
              }}
            />
          </rt>
        </ruby>
      </span>
    )
  }

  return (
    <ruby
      data-lexical-decorator="true"
      data-lexical-node-key={nodeKey}
      className={isSelected ? 'selected' : ''}
      onClick={() => {
        clearSelection()
        setSelected(true)
        setIsEditing(true)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          clearSelection()
          setSelected(true)
          setIsEditing(true)
        }
      }}
    >
      {initialBaseText}
      <rt>{initialRubyText}</rt>
    </ruby>
  )
}

// RubyNode クラス
export class RubyNode extends DecoratorNode<ReactNode> {
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

  setBaseText(newBaseText: string) {
    const writable = this.getWritable()
    writable.__baseText = newBaseText
  }

  setRubyText(newRubyText: string) {
    const writable = this.getWritable()
    writable.__rubyText = newRubyText
  }

  decorate(): ReactNode {
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
  useEffect(() => {
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