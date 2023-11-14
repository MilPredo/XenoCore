import { extendTheme } from "@chakra-ui/react";


//dominant.900
//secondary.800
//accentA.500
//accentB.600
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  components: {
    Button: {
      variants: {
        predo: {
          _dark:{
            transition: "0.5s",
            _hover: {
              bg: "accentA.500",
              // bgGradient: isActive
              //   ? "linear(to-tl, purple.500, blue.500)"
              //   : "linear(to-tl, blue.400, cyan.400)",
              boxShadow:
                "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.5), 0px 0px 8px 2px rgba(255, 255, 255, 0.5)",
            },
            bg: "accentB.600",
            // bgGradient: isActive
            //   ? "linear(to-tl, cyan.600, cyan.600)"
            //   : "linear(to-tl, blue.500, cyan.500)",
            // _active:{
            //   boxShadow: "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.5), 0px 0px 8px 2px rgba(255, 255, 255, 0.25)"
            // },
            borderRadius: "lg",
          }
        }
      }
    }
  },
  colors: {
    dominant: {
      "50": "#EFEFF5",
      "100": "#D4D4E3",
      "200": "#B8B8D1",
      "300": "#9C9CBF",
      "400": "#8080AD",
      "500": "#64649B",
      "600": "#50507C",
      "700": "#3C3C5D",
      "800": "#28283E",
      "900": "#14141F",
    },
    secondary: {
      "50": "#EEEEF7",
      "100": "#CFCFE7",
      "200": "#B0B0D8",
      "300": "#9292C9",
      "400": "#7373BA",
      "500": "#5454AB",
      "600": "#434389",
      "700": "#323267",
      "800": "#222244",
      "900": "#111122",
    },
    accentA: {
      "50": "#F0ECF9",
      "100": "#D4CAED",
      "200": "#B9A7E2",
      "300": "#9D85D6",
      "400": "#8262CB",
      "500": "#6640BF",
      "600": "#523399",
      "700": "#3D2673",
      "800": "#291A4C",
      "900": "#140D26",
    },
    accentB: {
      "50": "#E5FBFF",
      "100": "#B8F3FF",
      "200": "#8AEBFF",
      "300": "#5CE4FF",
      "400": "#2EDCFF",
      "500": "#00D4FF",
      "600": "#00AACC",
      "700": "#007F99",
      "800": "#005566",
      "900": "#002A33",
    },
  },
  // colors: {
  //   main: {
  //     50: "#EEEEF7",
  //     100: "#CFCFE7",
  //     200: "#B0B0D8",
  //     300: "#9292C9",
  //     400: "#7373BA",
  //     500: "#5454AB",
  //     600: "#434389",
  //     700: "#323267",
  //     800: "#222244",
  //     900: "#111122",
  //   },
  //   secondary: {
  //     50: "#EAF3FA",
  //     100: "#C5DCF1",
  //     200: "#A0C6E8",
  //     300: "#7BAFE0",
  //     400: "#5698D7",
  //     500: "#3182CE",
  //     600: "#2768A5",
  //     700: "#1D4E7C",
  //     800: "#143452",
  //     900: "#0A1A29",
  //   },
  //   accent: {
  //     50: "#EFEBFA",
  //     100: "#D3C6F1",
  //     200: "#B7A2E7",
  //     300: "#9B7DDE",
  //     400: "#7F58D5",
  //     500: "#6334CB",
  //     600: "#4F29A3",
  //     700: "#3B1F7A",
  //     800: "#271551",
  //     900: "#140A29",
  //   },
  // },
});

export default theme;
