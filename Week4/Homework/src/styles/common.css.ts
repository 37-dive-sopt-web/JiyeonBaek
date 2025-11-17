import { style } from "@vanilla-extract/css";
import { themeVars } from "./theme.css";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
  margin: "70px auto 0 auto",
  maxWidth: "400px",
});

export const pageTitle = style({
  fontSize: themeVars.font.size.lg,
  fontWeight: 600,
  color: themeVars.color.text,
});

export const infoLabel = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: "500",
  color: themeVars.color.gray[400],
});

export const infoValue = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: 700,
  color: themeVars.color.text,
});

export const infoRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
