import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import SearchBar from '../stocksComponents/SearchBar'
import WatchList from '../stocksComponents/WatchList'
import AliceCarousel from 'react-alice-carousel';
import { WatchListContextProvider } from '../context/watchListcontext';

function Stocks() {
  const [open, setOpen] = useState(true);

  const carouselHeight = "100vh"
  const items = [
    <img src={require('../carouselImages/Google-Logo.jpg')} alt='Google Logo' height={carouselHeight} />,
    <img src={require('../carouselImages/Tesla-logo.jpg')} alt='Tesla Logo' height={carouselHeight} />,
    <img src={require('../carouselImages/Twitter-Logo.jpg')} alt='Twitter Logo' height={carouselHeight} />,
    <img src={require('../carouselImages/apple-logo.jpg')} alt='Apple-logo' height={carouselHeight}/>,
    <img src={require('../carouselImages/amazon-logo.jpg')} alt='Amazon-logo' height={carouselHeight}/>,
    <img src={require('../carouselImages/meta-logo.jpg')} alt='Meta-logo' height={carouselHeight}/>,
    <img src={require('../carouselImages/netflix-logo.jpg')} alt='Netflix-logo' height={carouselHeight}/>,
  ]

  const responsiveItem ={
    0:{
      items:2,
    },
    1024:{
      items:4,
    },
  }


  return (
    <>
      <div className='chartContainer'>
        <h2>Welcome to the Stocks Watchlist Project</h2>
        <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>
        Overview
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text" className='stocksOverview'>
          Please a few seconds intially before data are shown
          <br/>
          In this project, I used an <em><strong>API</strong></em> to get data about stocks and plot them on either a line chart or candlestick chart.
          <br/>
          Simply enter a company's name or ticker symbol in the search bar and click on the choices presented.
          <br/>
          This company's stock prices will appear in the list below which will provide you with the option to either see the chart or delete it from your watchlist.
          <br/>
          <br/>
          This watchlist makes use of <em>localStorage </em> to save the choices of company stocks you want to watch and prevents it from disappearing when you refresh the page.
          <br/>
          <h6 style={{color:"red"}}>Note: Some company stock prices might not be available due to the API request being limited.</h6>
        </div>
      </Collapse>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsiveItem}
            autoPlay
            items={items}
          />
      <WatchListContextProvider>
        <SearchBar/>
        <WatchList/>
      </WatchListContextProvider>
      <br/>
      <br/>
    </div>
    </>
  )
}

export default Stocks