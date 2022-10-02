import React, { useEffect, useState} from 'react'
import {Link, useMatch,useResolvedPath, useNavigate} from 'react-router-dom'
import {BiMicrophone, BiMicrophoneOff} from 'react-icons/bi'
import { Button } from '@mui/material';
import Collapse from 'react-bootstrap/Collapse';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import RoutingPaths from './RoutingPaths';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

 
function NavBar() {
  const [redirectURL, setRedirectURL] = useState("")
  const [redirectPage, setRedirectPage] = useState("")
  const [visibility, setVisibility] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

    /********************VOICE CONTROL COMMANDS********************************* */
    const commands = [
        {
            command :["Go to *","Open *","Open * page"],
            callback: (redirectPage)=> setRedirectURL(redirectPage.charAt(0).toUpperCase() + redirectPage.slice(1)),
        },
        {
            command: "change background colour to *",
            callback: (color) => {
                document.body.style.background = color;
            }
        },
        {
            command: "reset background colour",
            callback: () => {
                document.body.style.background = `rgb(236, 222, 222)`;
            },
        }
    ]

    /************************REDIRECTING LOGIC THROUGH SPEECH********************************************* */
    const {transcript, resetTranscript} = useSpeechRecognition({commands});

    const pages= ["Home","Sudoku","Stocks","News","Robot","About","Contact"]
    const urls = {
        Home: "/",
        Sudoku:"/Sudoku",
        Stocks: "/Stocks",
        News: "/News",
        Robot: "/Robot",
        About: "/About",
        Contact: "/Contact",
    }

    useEffect(()=>{
      if(redirectURL){
          if (pages.includes(redirectURL)){
              navigate(urls[redirectURL])
          }
          else {
              setRedirectPage(<p> Could not find page {redirectURL} as requested. Try again please.</p>)
          }
      }
    },[redirectURL])

    if (!SpeechRecognition.browserSupportsSpeechRecognition){
        return null
    }

    /*******************SWITCHING MICROPHONE BUTTON********************************** */
  const toggleMicBtn = () => {
      setVisibility(prevState => !prevState);
      setOpen(!open)
      if (visibility === false){
      SpeechRecognition.startListening()
      console.log("Started Listening")
      } 
      else {
          SpeechRecognition.stopListening()
          resetTranscript()
          setRedirectURL("")
          setRedirectPage("")
          console.log("Stopped Listening")
      }
    }

  const CustomLink=({to, children, ...props})=>{
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path:resolvedPath.pathname, end:true})
    return (
        <li className={isActive ? "active":""}>
            <Link to={to}{...props}>
                {children}
            </Link>
        </li>
    )
  }

  const NavComponents = ()=>{
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='fixedNav'>
      <Container fluid>
        <Navbar.Brand as={CustomLink} className="JKS" to='/'>JKS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto myclass">
            <Nav.Link as={CustomLink} to='/'>Home</Nav.Link>
            <Nav.Link as={CustomLink} to='/Sudoku' >Sudoku Solver</Nav.Link>
            <Nav.Link as={CustomLink} to='/Stocks'>Stocks Watchlist</Nav.Link>
            <Nav.Link as={CustomLink} to='/News'>News</Nav.Link>
            <Nav.Link as={CustomLink} to='/Robot'>Robot</Nav.Link>
            <Nav.Link as={CustomLink} to='/About'>About</Nav.Link>
          </Nav>
          <Nav>
            <Button variant='contained' size='small'><Nav.Link as={CustomLink} to='/Contact'>Contact Info</Nav.Link></Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

  return (
    <>
    <NavComponents/>
    <RoutingPaths/> 
    <div className='micContainer'>
      <Collapse in={open}>
        <div className='scriptText'>
          <p>{transcript}</p>
          <br/>
          {redirectPage ? redirectPage : null}
        </div>
      </Collapse>
      <div className='micBtn'>
        <Button onClick={toggleMicBtn} aria-controls="scriptText" aria-expanded={open} variant="contained" size="large" className='micBtn'>{visibility ? <BiMicrophone/> : <BiMicrophoneOff/>} </Button>
      </div>
    </div>
    </>
  );
}

export default NavBar;
