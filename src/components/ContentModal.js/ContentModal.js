import  React, { useEffect, useState } from "react"
import { makeStyles } from "@mui/styles" 
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from "@mui/material/Fade" 
import { ThemeProvider } from "@emotion/react";
import { Button, createTheme } from "@mui/material";
import axios from "axios";
import {img_500,unavailable,unavailableLandscape}from "../../config/config"
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css"
import Gallery from "../Carousel/Carousel";




const darkTheme=createTheme({
    palette:{
        type:"dark",
        primary:{
          main:"#fff"
        }
    }
  })

const useStyles = makeStyles((theme) => ({

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
  width:"90%", 
  padding:"10px",
  height:"80%",
  transform: 'translate(-2%, 1%)',
  backgroundColor: '#39445a',
  border: '2px solid white',
  boxShadow: 24,
  color:"white",
  p: 10,
  },
}));

export default function ContentModal({ children,media_type,id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content,setContent]=useState();
  const [video,setVideo]=useState();

   const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setContent(data);
    
  }
  const fetchVideo=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    console.log(data)
    setVideo(data.results[0]?.key);
  }
  useEffect(()=>{
    fetchData();
    fetchVideo();
  },[])
  
  return(
    <ThemeProvider theme={darkTheme}>
    <>
    <div className="media"style={{ cursor: "pointer" }} color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{backdrop:Backdrop}}
        slotProps={{
            backdrop:{
          timeout: 500,
            }
        }}
              
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img className="ContentModal__landscape" alt={content.name || content.title}src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailable}/>
                <div className="ContentModal__about">
                  <span className="ContentModal_title">
                    {content.name || content.title}(
                      {(
                        content.first_air_date||
                        content.release_date||
                        "----"
  
                      ).substring(0,4)}
                    )
                    
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                  {content.overview}
                  </span>
                  <div>
                   <Gallery media_type={media_type} id={id}/>
                  </div>
                  <Button variant="contained" startIcon={<YouTubeIcon/>} color="secondary" target="_blank" href={`https://www.youtube.com/watch?v=${video}`}>
                   Watch the Trailer
                  </Button>
                </div>
              </div>
               
            </div>)}

        </Fade>
        </Modal>
    </>
    </ThemeProvider>
   
  )
}