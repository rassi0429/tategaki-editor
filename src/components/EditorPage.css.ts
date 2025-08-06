import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100dvh',
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '0.5rem',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: 'white',
})

export const backButton = style({
  flexShrink: 0,
  padding: '0.5rem 1rem',
  backgroundColor: '#f3f4f6',
  border: 'none',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#e5e7eb',
  },
})

export const titleInput = style({
  minWidth: '200px',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  fontWeight: '500',
  border: '1px solid #e5e7eb',
  borderRadius: '0.375rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  ':focus': {
    borderColor: '#3b82f6',
  },
})

export const toolbarContainer = style({
  flexShrink: 0,
})
