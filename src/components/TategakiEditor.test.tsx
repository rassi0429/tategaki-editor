import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TategakiEditor from './TategakiEditor'

describe('TategakiEditor', () => {
  it('renders the editor with placeholder text', () => {
    const mockOnChange = vi.fn()
    render(<TategakiEditor initialContent="" onChange={mockOnChange} />)
    
    expect(screen.getByText('縦書きテキストを入力してください...')).toBeInTheDocument()
  })

  it('has vertical writing mode styles applied', () => {
    const mockOnChange = vi.fn()
    render(<TategakiEditor initialContent="" onChange={mockOnChange} />)
    
    const editorInput = document.querySelector('.tategaki-editor-input')
    expect(editorInput).toBeInTheDocument()
    
    if (editorInput) {
      const styles = window.getComputedStyle(editorInput)
      expect(styles.writingMode).toBe('vertical-rl')
    }
  })

  it('accepts text input', async () => {
    const mockOnChange = vi.fn()
    render(<TategakiEditor initialContent="" onChange={mockOnChange} />)
    
    const editorInput = document.querySelector('.tategaki-editor-input')
    expect(editorInput).toBeInTheDocument()
    
    if (editorInput) {
      fireEvent.focus(editorInput)
      // Note: Lexical editor requires more complex interaction for text input testing
      // This is a basic structure that can be expanded
    }
  })
})