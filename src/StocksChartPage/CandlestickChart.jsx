import React, {useState} from 'react'
import Chart from "react-apexcharts"
import { Button } from '@mui/material'

function CandlestickChart({candleChartData,symbol}) {
    /*depends on the button clicked */
    const [dataWanted,setDateWanted] = useState("24h")
    /*reads every data input from candleChartData which is response from api */
    const {day,week,month,year} = candleChartData

    const determineTimeFormat = () =>{
        switch(dataWanted) {
            case "24h":
                return day
            case "W":
                return week
            case "M":
                return month
            case "Y":
                return year
            default:
                return day
        }
    }

    const series= [{
        name:symbol,
        data: determineTimeFormat()
      }]
      
      const options= {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          height:550,
          align: 'center'
        },
        xaxis: {
          type: 'datetime',
          labels:{
            datetimeUTC : false
          }
        },
        tooltip:{
            x: {
                format: "dd MMM HH:MM"
            }
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "$ " + value;
            }
          },
          tooltip: {
            enabled: true
          }
        }
      }

      const buttonSelect =(button)=>{
        if (button ===dataWanted){
            return "contained"
        } else {
            return "outlined"
        }
    }
    
  return (
    <>
    <div>
        <Chart options={options} series={series} type="candlestick" height={550} width= "80%"/>
    </div>
    <div>
        <Button onClick={()=>{setDateWanted("24h")}} variant={buttonSelect("24h")} size="small">24h</Button>
        <Button onClick={()=>{setDateWanted("W")}} variant={buttonSelect("W")} size="small">Week</Button>
        <Button onClick={()=>{setDateWanted("M")}} variant={buttonSelect("M")} size="small">Month</Button>
        <Button onClick={()=>{setDateWanted("Y")}} variant={buttonSelect("Y")} size="small">Year</Button>
    </div>
    </>
  )
}

export default CandlestickChart