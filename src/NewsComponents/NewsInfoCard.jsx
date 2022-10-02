import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Grow } from '@mui/material';

export default function NewsInfoCard({articles}) {
  
  return (
    <Grow in>
      <Grid container alignItems="stretch" spacing={3}>
        {articles?.map((article,index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{display:'flex'}} key={article._id}>
            <Card sx={{ maxWidth: 350, maxHeight:500, justifyContent: 'space-between', flexDirection:'column',borderBottom:'10px solid white' }} key={article._id}>
              <CardActionArea href={article.link} target="_blank">
                <CardMedia
                  component="img"
                  height="250"
                  image={article.media || "https://yt3.ggpht.com/MRywaef1JLriHf-MUivy7-WAoVAL4sB7VHZXgmprXtmpOlN73I4wBhjjWdkZNFyJNiUP6MHm1w=s900-c-k-c0x00ffffff-no-rj"}
                  alt="News Article Image"
                />
                <div className="cardSource">
                  <Typography variant="body2" color="text.secondary" component="h2">
                    {(new Date(article.published_date)).toDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="h2">
                    {article.rights}
                  </Typography>
                </div>
                <CardContent className='cardTitle'>
                  <Typography variant="h6">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{display:'flex', justifyContent:'space-between', margin:'5px'}}>
                    {article.summary}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{display:'flex', justifyContent:'space-between', padding:'0 16px 8px 16px'}}>
                <Button onClick={()=>window.open(article.link,"_blank")} size="small">Learn More</Button>
                <Button size='small'>Article {index +1}</Button>
              </CardActions>
            </Card>
          </Grid>
          ))
        }
      </Grid>
    </Grow>
  );
}
