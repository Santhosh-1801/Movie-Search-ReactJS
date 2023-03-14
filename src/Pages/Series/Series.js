import React, { useEffect, useState } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/pagination/CustomPagination'
import Genres from '../../components/Genres'
import useGenres from '../../hooks/useGenre'
import axios from 'axios'

const Series = () => {
  const [page,setPage]=useState(1);
  const [content,setContent]=useState([])
  const [numofPages,setNumofPages]=useState();
  const [selectedGenres,setSelectedGenres]=useState([]);
  const [genres,setGenres]=useState([])
  const genreforURL=useGenres(selectedGenres)


  const fetchMovies=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    console.log(data);
    setContent(data.results);
    setNumofPages(data.total_pages);
  }
  useEffect(()=>{
    fetchMovies()
    

  },[page,genreforURL])
  return (
    <div>
        <span className='pageTitle'>Series</span>
         <Genres type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage}/>
        <div className='trending'>
                {content && content.map((c)=><SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="movie" vote_average={c.vote_average}/>)}
            </div>
            {numofPages>1 &&(
            <CustomPagination setPage={setPage} numofPages={numofPages}/>
            )}
    </div>
  )
}

export default Series