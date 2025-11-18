import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../styles/theme.css";

export const headerContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: themeVars.color.quinary,
  padding: "10px 100px",
  position: "relative",
  "@media": {
    "(max-width: 768px)": {
      padding: "10px 20px",
    },
  },
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
  "@media": {
    "(max-width: 768px)": {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      flexDirection: "column",
      backgroundColor: themeVars.color.quinary,
      padding: themeVars.space.md,
      gap: themeVars.space.sm,
      transform: "translateY(-100%)",
      opacity: 0,
      visibility: "hidden",
      transition: themeVars.transition.sm,
      zIndex: 1000,
    },
  },
  selectors: {
    '&[data-open="true"]': {
      "@media": {
        "(max-width: 768px)": {
          transform: "translateY(0)",
          opacity: 1,
          visibility: "visible",
        },
      },
    },
  },
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

export const headerRightSection = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.space.md,
});

export const menuToggle = style({
  display: "none",
  border: "none",
  cursor: "pointer",
  padding: themeVars.space.xs,
  "@media": {
    "(max-width: 768px)": {
      display: "block",
    },
  },
});
