import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 14,
    fontWeightLight: 500,
    fontWeightRegular: 600,
    fontWeightMedium: 700
  },
  palette: {
    primary: {
      main: "#733bff",
      contrastText: "#ffffff"
    },
    secondary: { main: "#4DD6B2" }
  }
});
