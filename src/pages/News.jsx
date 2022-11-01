import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Collapse from 'react-bootstrap/Collapse';
import NewsInfoCard from '../NewsComponents/NewsInfoCard';
import IntroPage from '../NewsComponents/IntroPage';
import Button from 'react-bootstrap/Button';
import { axiosInstance } from '../config';


const CheckSubject = () =>{
  const [showNews, setShowNews] = useState("")
  const [showMeme, setShowMeme]=useState("")
  const [showWeather, setShowWeather]=useState("")
  
  const [newsCategory, setNewsCatergory] = useState("")
  const [meme,setMeme] = useState("")
  const [weatherLocation,setWeatherLocation] = useState("")

  /*****************VOICE COMMANDS******************************************** */
  const commands = [
    {
      command: ["Show me news about *","Give me news about *"],
      callback: (category) => setNewsCatergory(category)
    },
    {
      command: "Show me * meme",
      callback: (meme) => setMeme(meme)
    },
    {
      command: ["What is the weather in *", "What's the weather in *"],
      callback: (location) => {setWeatherLocation(location)}
    },
    {
      command: ["Go back to *", "Go back *"],
      callback: (word) => {GoHome(word)}
    },
  ]
  const {transcript} = useSpeechRecognition({commands})

  /***********************API REQUESTS********************************************* */

  const GetNews = async (topic) =>{
    try {
      let responses = await axiosInstance.get(`/get-news/${topic}`)
      console.log(responses.data.articles)
      if (responses !== undefined){
        setShowNews(responses.data.articles)
      } else{
        alert("No data could be pulled for this specific keyword of news. Please try a different key word.")
      }
    } catch (err){
      console.error(err)
    }
  }

  const GetMeme = async ()=>{
    try{
      let responses = await axiosInstance.get('/get-meme')
      setShowMeme(responses.data.url)
    } catch(err){
      console.error(err)
    }
  }

  const GetWeather = async (city) =>{
    try {
      let response = await axiosInstance.get(`/coordinates-weather/${city}`)
      let latitude = response.data.coord.lat
      let longitude = response.data.coord.lon
      setShowWeather(`https://www.7timer.info/bin/civil.php?lon=${longitude}&lat=${latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`)
    } catch (err){
      console.error(err)
    }
  }

  const GoHome = (word) =>{
    if (word === "home"){
      setShowNews("") 
      setShowWeather("") 
      setShowMeme("")
      setMeme("")
      setNewsCatergory("")
      setWeatherLocation("")
    }
  }

  useEffect(()=>{
    if (newsCategory) {GetNews(newsCategory)}
      
    if (meme) {GetMeme()}

    if(weatherLocation) (GetWeather(weatherLocation))

  },[newsCategory,meme,weatherLocation])


  if (!SpeechRecognition.browserSupportsSpeechRecognition){
    return null}

  /*************************CHECK & DISPLAY API REQUESTED************************************************* */

  return (
    <>
    {showMeme ? <img src={showMeme} alt="Meme from API" width="100%"/> :
    showNews ? <NewsInfoCard articles={showNews}/> :
    showWeather ? 
      <div className='weatherImages'>
        <img src={showWeather} alt="weather for city" width="50%"/>
        <img src={require('../NewsComponents/weather-icon-def.jpg')} alt="weather icon definition" height="auto"/>
      </div> :
      <IntroPage/>}
    </>
  )
}



function News() {
  const [open, setOpen] = useState(true);

  return (
    <div className='newsPageContainer'>
      <h1>Welcome to News page</h1>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="collapse-text"
          aria-expanded={open}>
          Overview
        </Button>
        <Collapse in={open}>
          <div id="collapse-text" className='newsOverview'>
            In this project, I combined the use of <strong>Speech Recognition</strong> and pulling request from multiple <strong> RESTful API's</strong> to display data.
            <br/>
            By using the <strong> Microphone Button</strong> at the middle-bottom of the screen, you can either find news, find a meme or find out about the weather in a city.
            <br/>
            Simply say the commands as stated on the tiles on this page.
            <br/>
            <br/>
            <h6 style={{color:"red"}}>Note: Always come back to the Home Page after issueing a command before searching for another type of data</h6>
          </div>
        </Collapse>
        <div className='newsSubject'>
          <CheckSubject/>
        </div>
    </div>
  )
}

export default News