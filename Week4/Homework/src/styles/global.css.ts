import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html", {
  fontSize: "62.5%",
});

globalStyle("body", {
  margin: 0,
  padding: 0,
  fontFamily: "Pretendard, sans-serif",
  backgroundColor: themeVars.color.bg,
  color: themeVars.color.text,
});

globalStyle("button", {
  cursor: "pointer",
});
