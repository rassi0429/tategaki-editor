import { style, styleVariants } from '@vanilla-extract/css'

/* Tategaki Editor styles */
export const tategakiEditorContainer = style({
  width: '100%',
  height: '100vh',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export const tategakiEditor = style({
  width: '100%',
  height: '100%',
  position: 'relative',
})

export const tategakiEditorInput = style({
  width: '100%',
  height: '100%',
  outline: 'none',
  border: 'none',
  fontSize: 'calc(400px / 40)',
  lineHeight: '2',
  resize: 'none',

  /* Vertical writing mode */
  writingMode: 'vertical-rl',
  textOrientation: 'upright',

  /* Japanese text styling */
  fontFamily: "'Noto Serif JP', sans-serif",
  fontFeatureSettings: '"vert" 1',

  /* Text flow */
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
})

export const tategakiEditorPlaceholder = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '#999',
  fontSize: 'calc(400px / 40)',
  pointerEvents: 'none',
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
})

/* Text formatting styles */

export const editorText = styleVariants({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  strikethrough: { textDecoration: 'line-through' },
  underline: { textDecoration: 'underline' },
  paragraph: { margin: 0 },
  headingH1: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' },
  headingH2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
  },
  headingH3: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  headingH4: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
})

/* Toolbar styles */

export const toolbar = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  padding: '0.5rem',
  borderBottom: '1px solid #e9ecef',
  alignItems: 'center',
})

export const toolbarSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
})

export const toolbarLabel = style({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#495057',
  marginRight: '0.5rem',
})

export const toolbarButton = style({
  padding: '0.5rem 0.75rem',
  border: '1px solid #dee2e6',
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  minWidth: '2.5rem',
  height: '2.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: '#f8f9fa',
    borderColor: '#ced4da',
  },
  ':active': {
    backgroundColor: '#e9ecef',
    borderColor: '#adb5bd',
  },
  ':focus': {
    outline: '2px solid #007bff',
    outlineOffset: '2px',
  },
})
