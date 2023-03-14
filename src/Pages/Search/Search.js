import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search = () => {
  const [type,setType]=useState(0);
  const [page, setPage] = useState(1);
  const [searchText,setSearchText]=useState("");
  const [content,setContent]=useState("");
  const [numofPages,setnumOfPages]=useState()
  const darkTheme=createTheme({
    palette:{
        type:"dark",
        primary:{
          main:"#fff"
        }
    }
  })

  const fetchSearch=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0084cb2446ec0c92c3cf46205e455b23&language=en-US&query=${searchText}&include_adult=false`
    )
    console.log(data.results)
  
  setContent(data.results)
  setnumOfPages(data.total_pages)
    }
useEffect(()=>{
  window.scroll(0,0)
  fetchSearch();

},[type,page,searchText])

  
  return (
    <div>
        <ThemeProvider theme={darkTheme}>
       <div style={{display:'flex',margin:"15px 0"}}>
        <TextField style={{flex:1}} className='searchBox' label="Search" variant='filled' onChange={(e)=>setSearchText(e.target.value)}/>
        <Button variant='conatined' style={{marginLeft:10}} onClick={fetchSearch}><SearchIcon/></Button>     
       </div>
       <Tabs value={type} indicatorColor='primary' textColor='primary'onChange={(event,newValue)=>{
        setType(newValue)
        setPage(1)
       }} >
        <Tab style={{width:"50%"}} label="Search Movies"/>
        <Tab style={{width:"50%"}} label="Search TV Series"/>

       </Tabs>
       </ThemeProvider>
       <div className='trending'>
      {content && content.map((c)=><SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} vote_average={c.vote_average}/>)}
      {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numofPages >1 &&(
      <CustomPagination setPage={setPage}/>)}
    </div>


  )
}

export default Search