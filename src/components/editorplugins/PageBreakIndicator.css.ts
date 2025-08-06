import { style } from '@vanilla-extract/css'

export const pageBreakIndicator = style({
  borderRight: "3px solid #ddd",
  position: "relative",

  "::after": {
    content: '"改ページ"',
    position: "absolute",
    right: "-25px",
    top: "0",
    // transform: "translateY(-50%) rotate(90deg)",
    transformOrigin: "center",
    fontSize: "12px",
    color: "#999",
    whiteSpace: "nowrap"
  }
})
