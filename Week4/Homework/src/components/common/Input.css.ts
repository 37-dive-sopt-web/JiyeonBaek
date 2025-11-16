import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
});

export const labelText = style({
  fontSize: themeVars.font.size.sm,
  fontWeight: "500",
  color: themeVars.color.gray[500],
  marginLeft: "0.5rem",
});

export const fieldWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  padding: `0 ${themeVars.space.md}`,
  height: "3rem",
  borderRadius: themeVars.space.sm,
  backgroundColor: themeVars.color.gray[100],
});

export const input = style({
  flex: 1,
  fontSize: themeVars.font.size.sm,
  color: themeVars.color.text,
  selectors: {
    "&::placeholder": {
      color: themeVars.color.gray[400],
    },
  },
});

export const icon = style({
  width: 16,
  height: 16,
});

export const error = style({
  fontSize: themeVars.font.size.sm,
  color: "red",
  marginLeft: "0.5rem",
});
