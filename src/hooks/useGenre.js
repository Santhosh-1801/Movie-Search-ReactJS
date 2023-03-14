const useGenres=(selectedGenres)=>{
    if(selectedGenres.length<1){
        return "";
    }
    const GenID=selectedGenres.map((gi)=>gi.id);
    return GenID.reduce((acc,curr)=>acc+","+curr);
}
export default useGenres