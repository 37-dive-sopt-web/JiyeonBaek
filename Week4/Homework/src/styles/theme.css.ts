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
      500: "#8B817D",
    },
  },

  font: {
    main: "Noto Sans KR, sans-serif",
    size: {
      xs: "0.8rem",
      sm: "1rem",
      md: "1.4rem",
      lg: "2rem",
    },
  },

  space: {
    xs: "0.6rem",
    sm: "1rem",
    md: "1.4rem",
    lg: "2rem",
  },

  transition: {
    sm: "0.3s ease",
    md: "0.5s ease",
    lg: "0.7s ease",
  },
});
