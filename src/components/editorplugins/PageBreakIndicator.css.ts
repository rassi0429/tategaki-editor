import { style } from '@vanilla-extract/css'

export const pageBreakIndicator = style({
  borderRight: '3px solid #ddd',
  position: 'relative',

  '::after': {
    content: '"改ページ"',
    position: 'absolute',
    right: '-2em',
    top: '-1em',
    // transform: "translateY(-50%) rotate(90deg)",
    transformOrigin: 'center',
    fontSize: '0.5em',
    color: '#999',
    whiteSpace: 'nowrap',
    textOrientation: 'upright',
  },
})
