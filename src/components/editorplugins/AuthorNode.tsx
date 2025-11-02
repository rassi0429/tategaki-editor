import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
    ElementNode,
    type LexicalNode,
    type NodeKey,
    type SerializedElementNode,
    type Spread,
} from 'lexical'

import * as styles from './AuthorNode.css'

export type SerializedAuthorNode = Spread<
    {
        authorText: string
        type: 'author'
        version: 1
    },
    SerializedElementNode
>

export class AuthorNode extends ElementNode {
    __authorText: string

    static getType(): string {
        return 'author'
    }

    static clone(node: AuthorNode): AuthorNode {
        return new AuthorNode(node.__authorText, node.__key)
    }

    static importJSON(serializedNode: SerializedAuthorNode): AuthorNode {
        const node = $createAuthorNode(serializedNode.authorText)
        node.setFormat(serializedNode.format)
        node.setIndent(serializedNode.indent)
        node.setDirection(serializedNode.direction)
        return node
    }

    constructor(authorText: string, key?: NodeKey) {
        super(key)
        this.__authorText = authorText
    }

    exportJSON(): SerializedAuthorNode {
        return {
            ...super.exportJSON(),
            authorText: this.__authorText,
            type: 'author',
            version: 1,
        }
    }

    createDOM(): HTMLElement {
        const element = document.createElement('div')
        element.className = styles.authorName
        element.textContent = this.__authorText
        return element
    }

    updateDOM(_prevNode: AuthorNode, _dom: HTMLElement): boolean {
        return false
    }

    isInline(): boolean {
        return false
    }

}

export function $createAuthorNode(authorText: string): AuthorNode {
    return new AuthorNode(authorText)
}

export const $isAuthorNode = (
    node: LexicalNode | null,
): node is AuthorNode => {
    return node instanceof AuthorNode
}

export const AuthorPlugin = () => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        if (!editor.hasNode(AuthorNode)) {
            throw new Error(
                'TateChuYokoPlugin: AuthorNode not registered on editor'
            )
        }
    }, [editor])
    return null
}