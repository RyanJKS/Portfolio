import React, { useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Button} from '@mui/material'
import axios from "axios"
import LineChart from './LineChart'
import CandlestickChart from './CandlestickChart'
import { axiosInstance } from '../config'

function StocksChart() {
  const navigate = useNavigate()
  
  const [typeChart, setTypeChart] = useState("Line Chart")
  /*useParams to get value from url :symbol*/
  let {symbol} = useParams()

  const [chartData, setChartData] = useState(null)
  const [candleChartData, setCandleChartData]=useState()

  const port = process.env.REACT_APP_PORT

  const formatData = (data) =>{
    
    return data.t.map((element,index) =>{
      return {
        x: element *1000,
        y: data.c[index].toFixed(2)
      }
    })
  }
  
  const candleFormat = (data) =>{
    return data.t.map((elem,index) =>{
      return {
        x: elem * 1000,
        y: [data.o[index].toFixed(2), data.h[index].toFixed(2),data.l[index].toFixed(2), data.c[index].toFixed(2)]
      }
    })
  }

  const GetPrices = async ()=>{

    const date = new Date()
    const toCurrentTime = Math.floor(date.getTime()/1000)
    
    const oneDayTime = toCurrentTime - 3* (60*60*24)    
    const oneWeekTime = toCurrentTime - 7*(60*60*24)
    const oneMonthTime = toCurrentTime - 30*(60*60*24)
    const oneYearTime = toCurrentTime - 365*(60*60*24)

    const resolutionOneDay = "15"
    const resolutionOneWeek = "60"
    const resolutionOneMonth = "D"
    const resolutionOneYear = "W"

    try {
    let allResponses = await axios.all([
        axiosInstance.get(`/stock-prices/${symbol}/${resolutionOneDay}/${oneDayTime}/${toCurrentTime}`),
        axiosInstance.get(`/stock-prices/${symbol}/${resolutionOneWeek}/${oneWeekTime}/${toCurrentTime}`),
        axiosInstance.get(`/stock-prices/${symbol}/${resolutionOneMonth}/${oneMonthTime}/${toCurrentTime}`),
        axiosInstance.get(`/stock-prices/${symbol}/${resolutionOneYear}/${oneYearTime}/${toCurrentTime}`),
    ])  

    setChartData({
        day: formatData(allResponses[0].data),
        week: formatData(allResponses[1].data),
        month: formatData(allResponses[2].data),
        year: formatData(allResponses[3].data),
    })

    setCandleChartData({
        day: candleFormat(allResponses[0].data),
        week: candleFormat(allResponses[1].data),
        month: candleFormat(allResponses[2].data),
        year: candleFormat(allResponses[3].data),
    })

    console.log(chartData)
    console.log(candleChartData)
      } catch(err) {
        console.error(err)
      }
  }

  useEffect(()=>{
    GetPrices()
       
  },[symbol])
 

  const buttonSelect = (data) =>{
    if (data === typeChart) {
      return "contained"
    } else {
      return "outlined"
    }
  }

  const CheckGraph = () =>{
    if (typeChart === 'Line Chart'){
      return <LineChart dataForChart = {chartData} symbol ={symbol}/>
    } else {
      return <CandlestickChart candleChartData = {candleChartData} symbol={symbol}/>
    }
  }

  return (
    <>
    <div className='chartPagePosition'>
      <h2>Welcome to Stocks Chart Page for {symbol}</h2>
      <Button onClick={()=>{navigate('/Stocks')}} variant="outlined">Go Back</Button>
    </div>

    <div id='chartPosition' align="center">
    {chartData ? <CheckGraph/> : null}
     
    </div>

    <div className='chartSelectButton'>
      <Button onClick={()=>{setTypeChart("Line Chart")}} variant={buttonSelect("Line Chart")} size="small">Line Chart</Button>
      <Button onClick={()=>{setTypeChart("Candlestick Chart")}} variant={buttonSelect("Candlestick Chart")} size="small">Candlestick Chart</Button>
    </div>
    </>
  )
}

export default StocksChart
