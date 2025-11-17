import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const button = style({
  backgroundColor: themeVars.color.quaternary,

  color: themeVars.color.gray[100],
  height: "3rem",
  width: "100%",
  fontSize: themeVars.font.size.sm,
  fontWeight: "500",
  borderRadius: themeVars.space.sm,

  selectors: {
    "&:hover": {
      backgroundColor: themeVars.color.quinary,
      transition: themeVars.transition.sm,
    },
    "&:disabled": {
      backgroundColor: themeVars.color.gray[200],
      cursor: "not-allowed",
      color: themeVars.color.gray[400],
    },
  },
});
