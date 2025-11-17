import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const memberListContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
  margin: "70px auto 0 auto",
  maxWidth: "400px",
});

export const memberListTitle = style({
  fontSize: themeVars.font.size.lg,
  fontWeight: 600,
  color: themeVars.color.text,
});

export const memberListForm = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
});

export const memberListInfoContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.sm,
});

export const memberListInfo = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const memberListInfoLabel = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: "500",
  color: themeVars.color.gray[400],
});

export const memberListInfoValue = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: 700,
  color: themeVars.color.text,
});
