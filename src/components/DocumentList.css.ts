import { style } from '@vanilla-extract/css'

export const container = style({
  width: '100%',
  margin: '0 auto',
  padding: '1rem',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #e5e7eb',
})

export const title = style({
  fontSize: '1.5rem',
  color: '#1f2937',
})

export const newButton = style({
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#2563eb',
  },
})

export const documentGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1.5rem',
})

export const summaryText = style({
  fontSize: '0.75rem',
})

export const documentCard = style({
  backgroundColor: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  position: 'relative',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
})

export const documentTitle = style({
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '0.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const documentMeta = style({
  fontSize: '0.875rem',
  color: '#6b7280',
  marginBottom: '0.25rem',
})

export const deleteButton = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '0.375rem',
  padding: '0.25rem 0.5rem',
  fontSize: '0.75rem',
  cursor: 'pointer',
  opacity: 0,
  transition: 'opacity 0.2s',
  ':hover': {
    backgroundColor: '#dc2626',
  },
  selectors: {
    [`${documentCard}:hover &`]: {
      opacity: 1,
    },
  },
})

export const emptyState = style({
  textAlign: 'center',
  padding: '4rem 2rem',
  color: '#6b7280',
})

export const emptyStateTitle = style({
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '0.5rem',
})

export const emptyStateText = style({
  fontSize: '1rem',
  marginBottom: '2rem',
})
