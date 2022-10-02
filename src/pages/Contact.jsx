import React from 'react'
import {BsTelephoneInbound} from 'react-icons/bs'
import {FiMail} from 'react-icons/fi'
import {AiOutlineLinkedin} from 'react-icons/ai'
import {TbMapSearch} from 'react-icons/tb'
import {BsGithub} from 'react-icons/bs'

function Contact() {
    const iconSize = 40
  return (
    <div className='contactPageContainer'>
        <h1>Contact Info</h1>
        <ul style={{listStyle:'none'}}>
            <li><BsTelephoneInbound size={iconSize}/> : 07496722220</li>
            <br/>
            <li><FiMail size={iconSize}/> : jksuggun@hotmail.co.uk</li>
            <br/>
            <li><AiOutlineLinkedin size={iconSize}/> : <a href='https://www.linkedin.com/in/jhelan-suggun-jks7n99/' target={"_blank"}> LinkedIn Profile</a></li>
            <br/>
            <li><BsGithub size={iconSize}/> : <a href='https://github.com/RyanJKS' target={"_blank"}> Github Projects</a></li>
            <br/>
            <li><TbMapSearch size={iconSize}/> : <a href='https://goo.gl/maps/24Rnwg1XsH8kRwJV7' target={"_blank"}> Current Location</a></li>
        </ul>
    </div>
  )
}

export default Contact