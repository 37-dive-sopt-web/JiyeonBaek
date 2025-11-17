import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";
import {
  pageContainer,
  pageTitle,
  infoLabel,
  infoValue,
} from "../../styles/common.css";

export const myInfoContainer = pageContainer;
export const myInfoTitle = pageTitle;

export const myIdInfo = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: themeVars.space.md,
  padding: "0 0.5rem",
});

export const myIdInfoLabel = infoLabel;
export const myIdInfoValue = infoValue;

export const myInfoForm = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.space.lg,
});
