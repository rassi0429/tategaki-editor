import { style } from '@vanilla-extract/css'

/*右揃え*/
export const authorName = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0.5em',
  fontSize: '1.5em',
  color: '#555',
})