import React from 'react'
import AliceCarousel from 'react-alice-carousel';

function About() {

  const carouselHeight = "100vh"
  const items = [
    <img src={require('../AboutComponents/javascript-logo.jpg')} alt='Javascript Logo' height={carouselHeight} />,
    <img src={require('../AboutComponents/react-logo.png')} alt='react Logo' height={carouselHeight} />,
    <img src={require('../AboutComponents/nodejs-logo.png')} alt='Node Logo' height={carouselHeight} />,
    <img src={require('../AboutComponents/python-logo.png')} alt='Python Logo' height={carouselHeight} />,
    <img src={require('../AboutComponents/c-logo.png')} alt='C Logo' height={carouselHeight} />,
    <img src={require('../AboutComponents/bootstrap logo.jpg')} alt='Bootstrap Logo' height={carouselHeight} />,
    <img src={require('../AboutComponents/material ui logo.png')} alt='Material UI Logo' height={carouselHeight} />,
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
    <div className='aboutPage'>
    <div className='aboutPageContainer'>
        <br/>
        <h1>About Me</h1>
        <br/>
        <h5> 
          I am a recent graduate with a Master's in Mechanical Engineering at the University of Southampton. 
          Through my journey at university, I started to realise that the software integration to any design was what brought life
          into a component and this was an alluring incentive for me to learn more about software engineering.
          <br/>
          <br/>
          Initially,  I started learning new programming languages and frameworks to make a cool portfolio website but
          I have now become more engrossed into learning more and more frameworks to enrich my skills and knowledge. 
          <br/>
          <br/>
          I am an inquisitive individual who has an interest in machine learning. 
          I am interested in using these models to make peculiar and interesting projects as shown with the use of speech recognition in this website.
          <br/>
          <br/>
          Across my projects, I have come to amass some skills and they are stated below. 
          I have come to appreciate back-end frameworks and I am currently learning about databases for future projects. 
        </h5>
        <br/>
        <h2> Skills</h2>
        <br/>
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
          <br/>
          <h5>
            <ul style={{listStyle:'none'}}>
              <li>Programming languages: Python, Javascript, C</li>
              <li>Front-end: HTML, CSS, ReactJS, Bootstrap, Material UI</li>
              <li>Back-end: NodeJS, ExpressJS, SQL, MongoDB</li>
              <li>DevOps: AWS, Heroku, GitHub Actions, CI/CD</li>
              <li>Version Control: GIT</li>
            </ul>
          </h5>
          </div>
    </div>
  )
}

export default About