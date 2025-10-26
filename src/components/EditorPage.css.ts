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

export const settingsContainer = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.25rem 0.75rem',
  backgroundColor: '#f9fafb',
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
})

export const settingsLabel = style({
  color: '#6b7280',
  fontWeight: '500',
  userSelect: 'none',
  cursor: 'pointer',
})

export const toggleSwitch = style({
  position: 'relative',
  display: 'inline-block',
  width: '44px',
  height: '24px',
})

export const toggleInput = style({
  opacity: 0,
  width: 0,
  height: 0,
})

export const toggleSlider = style({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#cbd5e1',
  transition: '0.3s',
  borderRadius: '24px',

  '::before': {
    position: 'absolute',
    content: '""',
    height: '18px',
    width: '18px',
    left: '3px',
    bottom: '3px',
    backgroundColor: 'white',
    transition: '0.3s',
    borderRadius: '50%',
  },
})

export const toggleInputChecked = style({
  selectors: {
    'input:checked + &': {
      backgroundColor: '#3b82f6',
    },
    'input:checked + &::before': {
      transform: 'translateX(20px)',
    },
  },
})
