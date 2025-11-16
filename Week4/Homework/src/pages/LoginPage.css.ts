import { style } from "@vanilla-extract/css";
import { themeVars } from "../styles/theme.css";

export const loginContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
  minWidth: "300px",
  maxWidth: "400px",
  margin: "0 auto",
  justifyContent: "center",
  height: "100vh",
});

export const loginForm = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
});

export const loginButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.xs,
  alignItems: "center",
});
