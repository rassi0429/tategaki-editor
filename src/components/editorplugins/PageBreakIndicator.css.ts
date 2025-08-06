import { style } from '@vanilla-extract/css'

export const pageBreakIndicator = style({
  borderRight: '3px solid #ddd',
  position: 'relative',

  '::after': {
    content: '"改ページ"',
    position: 'absolute',
    right: '-20px',
    top: '-15px',
    // transform: "translateY(-50%) rotate(90deg)",
    transformOrigin: 'center',
    fontSize: '10px',
    color: '#999',
    whiteSpace: 'nowrap',
  },
})
