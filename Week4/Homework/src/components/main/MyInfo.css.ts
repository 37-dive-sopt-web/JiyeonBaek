import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const myInfoContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
  margin: "70px auto 0 auto",
  maxWidth: "400px",
});

export const myInfoTitle = style({
  fontSize: themeVars.font.size.lg,
  fontWeight: 600,
  color: themeVars.color.text,
});

export const myIdInfo = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: themeVars.space.md,
  padding: "0 0.5rem",
});

export const myIdInfoLabel = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: "500",
  color: themeVars.color.gray[400],
});

export const myIdInfoValue = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: 700,
  color: themeVars.color.text,
});

export const myInfoForm = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
});
