import { globalStyle } from "@vanilla-extract/css";
import { themeClass, themeVars } from "./theme.css";

globalStyle("html", {
  fontSize: "62.5%",
});

globalStyle("body", {
  margin: 0,
});

globalStyle(`.${themeClass}`, {
  minHeight: "100vh",
  fontFamily: "Pretendard, sans-serif",
  backgroundColor: themeVars.color.bg,
  color: themeVars.color.text,
});
