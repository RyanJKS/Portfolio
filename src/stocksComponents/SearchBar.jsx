import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { WatchListContext } from '../context/watchListcontext';
import { axiosInstance } from '../config';

function SearchBar() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const {addStock} = useContext(WatchListContext)

  /*BOOTSTRAP METHOD of dropdown list from input value in textfield/search field */
  const showDropdown = () =>{
    const dropDownClass = search ? "show" : null  /*dropDownClass defined here. if (search). check if typing in text. */
    
    return (
      /* output list styling for drop down list*/
    <ul style={{
        height: "400px",
        overflowY: "scroll",
        overflowX:"hidden",
        cursor:"pointer"
      }} 
      className={`dropdown-menu ${dropDownClass}`}>     {/*this line is to either show or not show the drop down menu using BOOTSTRAP CLASSNAME*/}

      {results.map((result)=>{
        return (
          <li onClick={() => {
            addStock(result.symbol)           /*adds the stock requested in watchlist */
            setSearch("")                     /*resets the value of search so that the drop down is hidden */
            }} key={result.symbol} className='dropdown-item'>
            {result.description} ({result.symbol})      {/*what to show in drop down list */}
          </li>
        )
      })}
    </ul>
    )
  }

  useEffect(()=>{
    let isMounted = true

    const getSymbol = async () =>{
      try {
        let responses = await axiosInstance.get(`/stock-lookup/${search}`)
        
        if (isMounted){
          console.log(responses.data.result)
          setResults(responses.data.result)
        }
      } catch(err){
        console.log("Cancelled")
      }
    }
    
    if (search.length > 0){
      getSymbol()
    } else{
      setResults([])
    }
    return () =>{isMounted = false}

  },[search])

  return (
    <div className='searchBar'>
    <TextField
          id="filled-search"
          label="Search Stock"
          type="search"
          variant="filled"
          sx={{width: { sm: 600,md:800 }}}
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}       /*sets the search to a value and then passed in the useEffect hook to get response */
        />
        {showDropdown()}
    </div>
  )
}

export default SearchBar