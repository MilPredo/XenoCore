import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    main: {
      50: "#EEEEF7",
      100: "#CFCFE7",
      200: "#B0B0D8",
      300: "#9292C9",
      400: "#7373BA",
      500: "#5454AB",
      600: "#434389",
      700: "#323267",
      800: "#222244",
      900: "#111122",
    },
    secondary: {
      50: "#EAF3FA",
      100: "#C5DCF1",
      200: "#A0C6E8",
      300: "#7BAFE0",
      400: "#5698D7",
      500: "#3182CE",
      600: "#2768A5",
      700: "#1D4E7C",
      800: "#143452",
      900: "#0A1A29",
    },
    accent: {
      50: "#EFEBFA",
      100: "#D3C6F1",
      200: "#B7A2E7",
      300: "#9B7DDE",
      400: "#7F58D5",
      500: "#6334CB",
      600: "#4F29A3",
      700: "#3B1F7A",
      800: "#271551",
      900: "#140A29",
    },
  },
});

export default theme