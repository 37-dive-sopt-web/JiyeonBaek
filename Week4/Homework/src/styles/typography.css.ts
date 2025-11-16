import { style } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

export const title = style({
  fontSize: themeVars.font.size.lg,
  fontWeight: "bold",
  color: themeVars.color.text,
});

export const link = style({
  color: themeVars.color.quaternary,
  fontWeight: "bold",
  cursor: "pointer",

  selectors: {
    "&:hover": {
      color: themeVars.color.quinary,
      transition: themeVars.transition.sm,
    },
  },
});
