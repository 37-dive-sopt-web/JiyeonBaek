import { style } from "@vanilla-extract/css";
import { themeVars } from "../../../styles/theme.css";
import {
  pageContainer,
  pageTitle,
  infoLabel,
  infoValue,
} from "../../../styles/common.css";

export const memberListContainer = pageContainer;
export const memberListTitle = pageTitle;

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

export const memberListInfoItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const memberListInfoLabel = infoLabel;
export const memberListInfoValue = infoValue;
