import { Button } from '@mui/material'
import React, {useState} from 'react'
import Chart from "react-apexcharts"

function LineChart({dataForChart,symbol}) {
    const [dataWanted,setDateWanted] = useState("24h")
    const {day,week,month,year} = dataForChart

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

    /*subtract closing price with opening price from api response */
    const chartTrendColor = determineTimeFormat()[determineTimeFormat()?.length-1].y -
    determineTimeFormat()[0].y > 0 ? "#008000" : "#C70039"

    const options = {
        colors: [chartTrendColor],
        title :{
            text:symbol,
            height:550,
            align: "center",
            style :{
                fontSize: "30px"
            }
        },
        chart:{
            id:"stock data",
            animations:{
                speed:1500
            }
        },
        yaxis: {
            labels: {
              formatter: function (value) {
                return "$ " + value;
              }
            },
          },
        xaxis:{
            type:"datetime",
            labels:{
                datetimeUTC:false
            }
        },
        tooltip:{
            x: {
                format: "dd MMM HH:MM"
            }
        }
    }
    
    const series = [{
        name:symbol,
        data:determineTimeFormat()
    }]

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
        <Chart options={options} series={series} type="area" height={550} width= "80%"/>
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

export default LineChart

