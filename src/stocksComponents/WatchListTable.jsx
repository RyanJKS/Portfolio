import React, { useContext } from 'react'
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button
} from '@mui/material'

import {AiFillCaretUp,AiOutlineCaretDown} from 'react-icons/ai'
import { WatchListContext } from '../context/watchListcontext'
import { useNavigate } from 'react-router-dom'

export default function WatchListTable({text}) {
    const {deleteStock} = useContext(WatchListContext)
    const navigate = useNavigate()


    const colorStyle =(change) =>{
        return (change > 0 ? " #60B45A" : "#ff0000")
    }

    const directionIcon = (direction) =>{
        return (direction > 0 ? <AiFillCaretUp/> :<AiOutlineCaretDown/>)
    }

  return (
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
            <TableHead>
                <TableRow>
                     <TableCell>Ticker Symbol</TableCell>
                     <TableCell>Current</TableCell>
                     <TableCell>Change</TableCell>
                     <TableCell>% Change</TableCell>
                     <TableCell>High</TableCell>
                     <TableCell>Low</TableCell>
                     <TableCell>Open</TableCell>
                     <TableCell>Prev Close</TableCell>
                     <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody  sx={{"& tr:nth-of-type(2n+1)": 
            {backgroundColor: "grey.100",},}}>
                {
                    text?.map((row)=>(
                        <TableRow 
                        key={row.symbol}
                        sx={{'&:last-child td, &:last-child th':{border:0}}}
                        >
                            <TableCell>{row.symbol}</TableCell>
                            <TableCell>{row.data.c}</TableCell>
                            <TableCell sx={{color:colorStyle(row.data.d)}}>{row.data.d} {directionIcon(row.data.d)}</TableCell>
                            <TableCell sx={{color:colorStyle(row.data.dp)}}>{row.data.dp} {directionIcon(row.data.d)}</TableCell>
                            <TableCell>{row.data.h}</TableCell>
                            <TableCell>{row.data.l}</TableCell>
                            <TableCell>{row.data.o}</TableCell>
                            <TableCell>{row.data.pc}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="success" 
                                onClick={()=>{
                                    navigate(`/Stocks/${row.symbol}`)
                                }} size="small">Chart</Button>
                                <Button variant="contained" color="error"
                                onClick={(e)=> {e.stopPropagation()
                                    deleteStock(row.symbol)}} size="small">Delete</Button> 
                            </TableCell>
                        
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    </TableContainer>
  )
}