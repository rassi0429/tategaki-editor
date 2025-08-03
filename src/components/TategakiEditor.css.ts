import { style } from "@vanilla-extract/css"
import { EditorThemeClasses } from "lexical"

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

export const theme: EditorThemeClasses = {
    text: {
        bold: style({ fontWeight: "bold", }),
        italic: style({ fontStyle: "italic", }),
        strikethrough: style({ textDecoration: "line-through", }),
        underline: style({ textDecoration: "underline", }),
    },
    paragraph: style({ margin: 0 }),
    heading: {
        h1: style({ fontSize: "2em", fontWeight: "bold" }),
        h2: style({ fontSize: "1.5em", fontWeight: "bold" }),
        h3: style({ fontSize: "1.17em", fontWeight: "bold" }),
        h4: style({ fontSize: "1em", fontWeight: "bold" }),
        h5: style({ fontSize: "1em", fontWeight: "bold" }),
        h6: style({ fontSize: "1em", fontWeight: "bold" }),
    },
}