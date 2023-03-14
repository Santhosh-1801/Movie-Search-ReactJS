import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import { makeStyles } from '@mui/styles';
import {useHistory, useNavigate} from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
  },
});


export default function SimpleBottomNavigation() {
  const classes=useStyles();
  
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate();


  React.useEffect(()=>{
    if(value===0){
      navigate("/")
    }
    else if(value===1){
      navigate("/movies")
    }
    else if(value===2){
      navigate("/series")
    }
    else if(value===3){
      navigate("/search")
    }

  },[value,navigate])

  return (
      <BottomNavigation style={{backgroundColor:"#2d313a"}}
        showLabels className={classes.root}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color:"white"}}label="Trending" icon={<TrendingUpIcon/>} />
        <BottomNavigationAction style={{color:"white"}}label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:"white"}}label="Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:"white"}}label="Search" icon={<LocationOnIcon />} />
      </BottomNavigation>
  );
}