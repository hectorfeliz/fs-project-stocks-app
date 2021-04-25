import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { createMuiTheme }  from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Lato, Arial',
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#1D132D',
      light: '#1A3453',
      dark: '#1D132D',
    },
    secondary: {
      main: '#ffffff',
    },
    positive:{
      main: "#00D100",
      light: '#00D100',
      dark: '#00D100',
    },
    negative:{
      main: "#FF0000",
      light: '#FF0000',
      dark: '#FF0000',
    },
    background: {
      default: "#e4f0e2"
    }
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#1D132D',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  }
})

export default theme;