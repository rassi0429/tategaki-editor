import { globalStyle, style } from "@vanilla-extract/css"

/* Base styles */

globalStyle("*", {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
})

globalStyle("body", {
    fontFamily: "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic Medium', 'Meiryo', sans-serif",
    backgroundColor: "#f5f5f5",
    color: "#333"
})

export const app = style({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"

})

export const appMain = style({
    // flex: 1,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "flex-start",
})
