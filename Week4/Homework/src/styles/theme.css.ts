import { createTheme } from "@vanilla-extract/css";

export const [themeClass, themeVars] = createTheme({
  color: {
    primary: "#E8E4E3",
    secondary: "#D2C8C6",
    tertiary: "#BBADAA",
    quaternary: "#A4928E",
    quinary: "#8E7671",
    text: "#392F2D",
    bg: "#F4F1F1",

    gray: {
      100: "#F7F7F5",
      200: "#E8E6E1",
      300: "#D6D3CE",
      400: "#B1ADA7",
    },
  },

  font: {
    main: "Noto Sans KR, sans-serif",
    size: {
      sm: "0.8rem",
      md: "1.6rem",
      lg: "2.4rem",
    },
  },

  space: {
    sm: "0.8rem",
    md: "1.6rem",
    lg: "2.4rem",
  },
});
