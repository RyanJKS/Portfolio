import React from 'react'
import Home from '../pages/Home';
import About from '../pages/About';
import Stocks from '../pages/Stocks';
import News from '../pages/News';
import Robot from '../pages/Robot';
import {Routes, Route} from 'react-router-dom'
import StocksChart from '../StocksChartPage/StocksChart';
import Sudoku from '../pages/Sudoku';
import Contact from '../pages/Contact';

function RoutingPaths() {
  return (
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/Home' element={<Home/>}/>
            <Route exact path='/Sudoku' element={<Sudoku/>}/>
            <Route exact path='/Stocks' element={<Stocks/>}/>
            <Route exact path='/News' element={<News/>}/>
            <Route exact path='/Robot' element={<Robot/>}/>
            <Route exact path='/About' element={<About/>}/>
            <Route exact path='/Contact' element={<Contact/>}/>
            <Route path='/Stocks/:symbol' element={<StocksChart/>}/>
        </Routes> 
  )
}

export default RoutingPaths