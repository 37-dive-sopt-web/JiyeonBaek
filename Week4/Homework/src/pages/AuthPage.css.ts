import { style } from "@vanilla-extract/css";
import { themeVars } from "../styles/theme.css";

export const authContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
  minWidth: "300px",
  maxWidth: "400px",
  margin: "0 auto",
  justifyContent: "center",
  height: "100vh",
});

export const authForm = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
});

export const authButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.xs,
  alignItems: "center",
});

export const authLinkContainer = style({
  display: "flex",
  gap: themeVars.space.xs,
});

export const backIcon = style({
  width: 20,
  height: 20,
});