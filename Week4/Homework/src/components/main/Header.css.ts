import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const headerContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: themeVars.color.quinary,
  padding: "10px 100px",
});

export const headerTitle = style({
  fontSize: themeVars.font.size.lg,
  color: themeVars.color.secondary,
});

export const headerSubtitle = style({
  fontSize: themeVars.font.size.sm,
  color: themeVars.color.secondary,
});

export const headerNav = style({
  display: "flex",
  gap: themeVars.space.md,
});

export const navBtn = style({
  fontSize: themeVars.font.size.sm,
  color: themeVars.color.tertiary,
  fontWeight: 500,

  selectors: {
    "&:hover": {
      color: themeVars.color.primary,
      fontWeight: 600,
      transition: themeVars.transition.sm,
    },
  },
});

export const navBtnActive = style({
  color: themeVars.color.gray[100],
  fontWeight: 600,
});
