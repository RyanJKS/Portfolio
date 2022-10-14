import React from 'react'
import Particle from '../components/Particle'


function Home() {

  return (
    <div className='homePage'>
    <Particle/>
    <h1>Jhelan Portfolio Website</h1>
    <h4>Hi, I'm Jhelan. </h4> 
    <h5>I am an aspiring software engineer who wants to show you my projects.</h5>
      <div className='homeNotes'>
      <p>
        This website can be navigated fully using <strong> Speech Recognition</strong> features and is responsive which makes it suitable to be used on your phone.
        <br/>
        <br/>
        To use the speech recognition feature, simply click on the <em>Microphone Button</em>, located at the middle-bottom of the page. 
        <br/>
        <br/>
        The icon will change which shows that the device is "listening" and then try saying: Open "Sudoku"
        <br/>
        To access other pages, try saying Open or Go to: "Home", "News", "Stocks", "Robot", "About", "Contact"
        <br/>
        <br/>
        Please press the <em> Microphone Button</em> again after issueing a command so that the device "stops listening".
      </p>
      <h6 style={{color: "red"}}>Note: For the best use of the <strong>Speech Recognition</strong> feature, please use Chrome. </h6>
      </div>
    </div>
  )
}

export default Home