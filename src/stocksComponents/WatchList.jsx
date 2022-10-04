import React, {useEffect,useContext, useState} from 'react'
import { WatchListContext } from '../context/watchListcontext'
import axios from 'axios'
import WatchListTable from './WatchListTable'
import { axiosInstance } from '../config'


function WatchList() {
  const {watchStock} = useContext(WatchListContext)
  const [stockData,setStockData] = useState()


  useEffect(()=>{
    const cancelToken = axios.CancelToken.source()

    const getQuote = async () => {
      try {
        let allResponses = await axios.all(watchStock.map((stock) => 
        axiosInstance.get(`/crypto-quote/${stock}`,{cancelToken:cancelToken.token}
        )))

        const dataStuff = allResponses.map((response)=> {
          return {
            symbol : response.data[0],
            data : response.data[1]
          }
        })
          setStockData(dataStuff)
        
      } catch (err) {
        if (axios.isCancel(err))
        console.log("cancelled!")
      }
    }
    getQuote()
    return () => {cancelToken.cancel()}
  },[watchStock])


  return (
    <div className='watchListTable'>
      <WatchListTable text={stockData}/> 
    </div>
  )
}

export default WatchList