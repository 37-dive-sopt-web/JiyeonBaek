import { style } from "@vanilla-extract/css";
import { themeVars } from "../../styles/theme.css";
import {
  pageContainer,
  pageTitle,
  infoLabel,
  infoValue,
  infoRow,
} from "../../styles/common.css";

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

export const memberListInfo = infoRow;
export const memberListInfoLabel = infoLabel;
export const memberListInfoValue = infoValue;
