import { style } from "@vanilla-extract/css"
import type { EditorThemeClasses } from "lexical"

const charInLine = 40;
const editorPading = "2rem";

/* Tategaki Editor styles */
export const container = style({
    flex:1,
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
})

export const editor = style({
    width: "100%",
    height: "100%",
    position: "relative",
    containerType: "size",
})

export const input = style({
    padding: editorPading,
    // FIXME: 文字数合わせに入ってる1emは何由来？
    fontSize: `max(1rem, calc((100cqh - ${editorPading} * 2 - 1em) / ${charInLine}))`,

    width: "100%",
    height: "100%",
    outline: "none",
    lineHeight: "2",

    /* Vertical writing mode */
    writingMode: "vertical-rl",
    textOrientation: "upright",

    /* Japanese text styling */
    fontFamily: "'Noto Serif JP', sans-serif",
    fontFeatureSettings: '"vert" 1',

    /* Text flow */
    overflowX: "scroll",
    overflowY: "hidden",
})


export const placeholder = style({
    position: "absolute",
    top: editorPading,
    right: editorPading,
    color: "#999",
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
