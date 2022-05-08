import  React,{useContext} from 'react';
import Box from '@mui/material/Box';
import { CardMedia, Typography } from '@mui/material';
import Colors from './Colors';
import { Image } from 'react-bootstrap';
import Rating from './Rating';
// import { DarkThemeContext } from '../../context/DarkThemeContext';

export default function ProductCard({role,company,date,desc}) {
//   const { dt} = useContext(DarkThemeContext)
//   const [darkTheme] = dt;

  return (
    <Box
        justifyContent='center'
        alignItems='center'
    // style={{padding:'1em'}}
      sx={{
        maxWidth: 300,
        height: 350,
        backgroundColor: 'transprant',
        borderRadius:5,

        // border: `1.7px solid ${Colors.blue} `,
        boxShadow:` 0 8px 15px 0 #1976D2 ` ,
        overflow:'hidden'
      }}
    >
     <Image style={{     
         maxWidth: 300,
        height: 210,
        // backgroundColor: 'transprant',
        // borderRadius:10,

        // border: `1.7px solid ${Colors.blue} `,
        // boxShadow:` 0 8px 15px 0 #1976D2 ` 
        }} src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Vitara-Brezza/7295/1638268460167/front-left-side-47.jpg?impolicy=resize&imwidth=480" alt="card"></Image>
    {/* <Typography variant='h4' style={{color:Colors.blue,textAlign:'center',marginBottom:'1em'}}>
     {company}
    </Typography> */}
    <Typography variant='body1' style={{textAlign:'left',marginBottom:'0.3em',paddingLeft:'0.5em',paddingRight:'0.5',color:Colors.white}}>
      ferrari
    </Typography>
    <Typography variant='body2' style={{textAlign:'left',marginBottom:'0.5em',paddingLeft:'0.5em',paddingRight:'0.5'}}>
    <Rating
            value='20'
            text="20 reviews"
          />
    </Typography>
    <Typography variant='subtitle2' 
   style={{textAlign:'left',marginBottom:'0.5em',paddingLeft:'0.5em',paddingRight:'0.5'}}
    >
     ₹ 20Cr
    </Typography>
    </Box>
  );
}