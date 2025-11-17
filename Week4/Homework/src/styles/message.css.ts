import { style } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

export const errorMessage = style({
  color: "red",
  fontSize: themeVars.font.size.sm,
  marginTop: themeVars.space.sm,
});

export const successMessage = style({
  color: "green",
  fontSize: themeVars.font.size.sm,
  marginTop: themeVars.space.sm,
});
