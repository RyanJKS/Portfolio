import React from 'react' 
import { Grow, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';

export default function IntroPage() {

  const introCardsInfo = [
    {header:"Home Page", footer:"Try saying: Go back home"},
    {header:"Finding News", footer: "Try saying: Show me the news about * ( where * can be anything)"},
    {header:"Finding about Weather", footer:"Try saying: What is the weather in *"},
    {header:"Finding Meme", footer: "Try saying: Show me a meme"},
  ]

  return (
      <Grow in>
        <Grid container alignItems="stretch" spacing={10} className="introPageContainer">
            {introCardsInfo.map((info,index) =>(
              <Grid item xs={12} sm={6} md={4} lg={3} className="introCard" key={index}>
                <div className='introCardContext'>
                  <Typography variant='h5'>{info.header}</Typography>
                  <Typography variant='h6'>{info.footer}</Typography>
                </div>
                </Grid>
            ))}
        </Grid>
      </Grow>
  )
}