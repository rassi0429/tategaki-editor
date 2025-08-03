import { style, styleVariants } from "@vanilla-extract/css"

/* Tategaki Editor styles */
export const container = style({
    width: "100%",
    height: "100vh",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
})

export const editor = style({
    width: "100%",
    height: "100%",
    position: "relative",
})

export const input = style({
    width: "100%",
    height: "400px",
    outline: "none",
    border: "none",
    fontSize: "calc(400px / 40)",
    lineHeight: "2",
    resize: "none",

    /* Vertical writing mode */
    writingMode: "vertical-rl",
    textOrientation: "upright",

    /* Japanese text styling */
    fontFamily: "'Noto Serif JP', sans-serif",
    fontFeatureSettings: '"vert" 1',

    /* Text flow */
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap"
})


export const placeholder = style({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#999",
    fontSize: "calc(400px / 40)",
    pointerEvents: "none",
    writingMode: "vertical-rl",
    textOrientation: "upright",
})

