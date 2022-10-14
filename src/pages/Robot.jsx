import React from 'react'

function Robot() {
  return (
    <div className='robotPageContainer'> 
    <div className='robotPageContent'>
      <h1>Autonomous Robot</h1>
      <br/>
        <h6>
          In this project, an autonomous line tracking robot was built and by programming it with C, it was made to transverse across a path.
          <br/>
          <br/>
          The device was first designed using CAD software (SOLIDWORKS), manufactured using laser cutting facilities and then assembled as shown below.
        </h6>
        <br/>
        <img src={require('../RobotComponents/design.png')} alt='Design Pic' width="80%" />
        <br/>
        <h2> 
          Components
          <br/>
          <h6>
            <ul>
              <li>Arduino Uno</li>
              <li>MD25 12V 2.8A Dual H-bridge Motor Driver </li>
              <li>EMG30 Gear Motors</li>
              <li>Pololu Ball Caster</li>
              <li>2A Fuse</li>
              <li>12V Battery</li>
            </ul>
          </h6>
        </h2>
        <h6>
          An Arduino Uno was used as the main microcontroller board and data was transfered to the MD25 board by using I2C serial communuication which would then power the EMG30 motors.
          <br/>
          <br/>
          The components used and a wiring diagram are shown below.
        </h6>
        <br/>
        <img src={require("../RobotComponents/electrical circuit.jpg")} alt="Electrical Circuit" width="80%" height="auto"/>
        <br/>
        <img src={require("../RobotComponents/wiring diagram.png")} alt="Electrical Circuit Diagram" width="80%"/>
        <br/>
        <h6> The path it had to transverse through is shown below.</h6>
        <br/>
        <img src={require("../RobotComponents/track2.png")} alt="Track" width="80%" height="80%"/>
        <br/>
        <h6> Here is a video of the final product in working order.</h6>
        <br/>
        <video width="80%" height="450" controls>
          <source src={require("../RobotComponents/RobotTesting.mp4")} type="video/mp4"/>
        </video>
      </div>
    </div>
  )
}

export default Robot