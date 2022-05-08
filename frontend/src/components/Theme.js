

import { createTheme,responsiveFontSizes} from '@mui/material';
import Colors from './Colors';


const arcBlue = '#FFFFFF';
const arcOrange = '#FFBA60';
const arcGrey ='#868686'


let theme = createTheme({
    palette: {
      common: {
        blue: arcBlue,
        orange: arcOrange
      },
      primary: {
        main: arcOrange,
      },
      secondary: {
        main: arcOrange
      }
    },
    typography:{
        tab:{
          fontFamily:'Raleway',
          textTransform:'none',
          fontWeight:700,
          fontSize:'1rem',
          color:'white'
        },
        estimate:{
          fontFamily:'Pacifico',
          fontSize:'1rem',
          textTransform:'none',
          color:'white'
        },
        h2:{
          fontFamily:'Raleway',
          fontWeight:700,
          fontSize:'2.5rem',
          color:arcOrange,
          lineHeight:1.5
        },
        h3: {
          fontFamily:'sans-serif',
          fontSize: "2.5rem",
          color:arcOrange,
          fontWeight:700,
          
        },
        h4:{
          fontFamily:'sans-serif',
          fontSize:'1.75rem',
          color:Colors.white,
          fontWeight:700
        },
        h5:{
          fontFamily:'Raleway',
          fontSize:'1.55rem',
          color:arcOrange,
          fontWeight:550
        },
        h6: {
          fontWeight: 500,
          fontFamily: "Raleway",
          color: arcOrange,
          lineHeight:1
        },
        subtitle1:{
          fontSize:'1.25rem',
          fontWeight:300,
          color:arcGrey
        },
        subtitle2: {
          color: "white",
          fontWeight: 300,
          fontSize: "1.25rem"
        },
        body1: {
          fontSize: "1.25rem",
          color: arcBlue,
          fontWeight: 300
        },
        caption: {
          fontSize: "1rem",
          fontWeight: 300,
          color: arcGrey
        },
        learnButton: {
          borderColor: arcBlue,
          borderWidth: 2,
          textTransform: "none",
          color: arcBlue,
          borderRadius: 50,
          fontFamily: "Roboto",
          fontWeight: "bold"
        }
    },
   components: {
      MuiInputLabel: {
        styleOverrides:{
          
        root: {
          color: arcBlue,
          fontSize: "1rem"
        }
      }
      },
      MuiInput: {
        styleOverrides:{
        root: {
          color:  arcBlue,
          fontWeight: 300
        },
        underline: {
          "&:before": {
            borderBottom: `2px solid ${ arcBlue}`
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: `2px solid ${ arcBlue}`
          }
        }
      }
    }
    }
  })
  const Theme = responsiveFontSizes(theme);

  export default Theme;
   