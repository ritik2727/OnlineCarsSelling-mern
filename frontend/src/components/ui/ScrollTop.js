import React,{useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Colors from '../Colors';

const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex:  1303,
        position: 'fixed',
        bottom: '2vh',
      
        backgroundColor: '#DCDCDC',
        color: 'black',
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: 'red',
            backgroundColor: 'red'
        },
        [theme.breakpoints.up('xs')]: {
            right: '5%',
            backgroundColor: 'rgb(220,220,220,0.7)',
        },
        [theme.breakpoints.up('lg')]: {
            right: '6.5%',
        },
    }
})
)
const ScrollTop = ({
    showBelow,
}) => {

    const classes = useStyles();

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <div >
            {show &&
                <IconButton onClick={handleClick} 
                    className={classes.toTop} 
                    style={{backgroundColor:Colors.orange}} 
                    aria-label="to top" 
                    component="span"
                >
                    <ArrowUpwardIcon style={{height:30,width:30,color:'white'}} />
                </IconButton>
            }
        </div>
    )
}
export default ScrollTop