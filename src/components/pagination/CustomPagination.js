import { ThemeProvider } from '@emotion/react'
import { Pagination, createMuiTheme, createTheme } from '@mui/material'
import React from 'react'


const darkTheme=createTheme({
    palette:{
        type:"dark",
    }
})


const CustomPagination = ({setPage,numofPages=10}) => {
    const handlePageChange=(page)=>{
        setPage(page);
        window.scroll(0,0);
    }
  return <div style={{
    width:"100%",
    display:"flex",
    justifyContent:"center",
    marginTop:10,
  }}>
    <ThemeProvider theme={darkTheme}>
        <Pagination count={numofPages} color="primary" onChange={(e)=>handlePageChange(e.target.textContent)} hideNextButton hidePrevButton/>
    </ThemeProvider>
    
  </div>
  
}

export default CustomPagination