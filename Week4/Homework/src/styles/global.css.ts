import { globalStyle } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

globalStyle("html", {
  fontSize: "62.5%",
});

globalStyle("body", {
  fontFamily: "Pretendard, sans-serif",
  backgroundColor: themeVars.color.bg,
  color: themeVars.color.text,
});

globalStyle("button", {
  cursor: "pointer",
});
