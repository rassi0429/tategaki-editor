import { style } from '@vanilla-extract/css'

export const container = style({
  width: '100%',
  margin: '0 auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: "0.5rem",
  borderBottom: '2px solid #e5e7eb',
})

export const title = style({
  fontSize: '1.25rem',
  color: '#1f2937',
})

export const newButton = style({
  backgroundColor: '#3b82f6',
  color: 'white',
  padding: '0.375rem 0.75rem',
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

export const tableContainer = style({
  width: '100%',
  overflowX: 'auto',
})

export const documentTable = style({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  fontSize: '0.9rem',
})

export const tableHeader = style({
  textAlign: 'left',
  padding: '0.75rem 1rem',
  borderBottom: '2px solid #e5e7eb',
  backgroundColor: '#f9fafb',
  fontWeight: '600',
  color: '#374151',
  whiteSpace: 'nowrap',
})

export const sortableHeader = style({
  textAlign: 'left',
  padding: '0.75rem 1rem',
  borderBottom: '2px solid #e5e7eb',
  backgroundColor: '#f9fafb',
  fontWeight: '600',
  color: '#374151',
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
})

export const documentRow = style({
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#f9fafb',
  },
})

export const titleCell = style({
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e5e7eb',
  fontWeight: '500',
  color: '#1f2937',
  maxWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const previewCell = style({
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e5e7eb',
  color: '#6b7280',
  maxWidth: '400px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const countCell = style({
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e5e7eb',
  color: '#6b7280',
  textAlign: 'right',
  whiteSpace: 'nowrap',
})

export const dateCell = style({
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e5e7eb',
  color: '#6b7280',
  whiteSpace: 'nowrap',
})

export const actionCell = style({
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e5e7eb',
  whiteSpace: 'nowrap',
})

export const editButton = style({
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '0.375rem',
  padding: '0.375rem 0.75rem',
  fontSize: '0.875rem',
  cursor: 'pointer',
  marginRight: '0.5rem',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#2563eb',
  },
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
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '0.375rem',
  padding: '0.375rem 0.75rem',
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: '#dc2626',
  },
})

export const cardDeleteButton = style({
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

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

export const viewToggle = style({
  display: 'flex',
  border: '1px solid #e5e7eb',
  borderRadius: '0.5rem',
  overflow: 'hidden',
})

export const viewButton = style({
  backgroundColor: 'white',
  color: '#6b7280',
  border: 'none',
  padding: '0.25rem 0.5rem',
  fontSize: '1.25rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  ':hover': {
    backgroundColor: '#f3f4f6',
  },
})

export const viewButtonActive = style({
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '0.25rem 0.5rem',
  fontSize: '1.25rem',
  cursor: 'pointer',
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
