
import { useEffect, useState } from 'react';
import './App.css'
import { activeSR, resetSpeech } from './scripts/live.js'
import {serverConnect} from './scripts/socket.js'
import Chats from './components/Chats'

function App() {
const [spoken, setSpoken] = useState([])
const [translated, setTranslated] = useState([])
// const [chat, setChat] = useState([])

  useEffect(()=>{
    // activeSR()
    // serverConnect()

  },[])
  return (
    <div className="App">
      <p>Speech recognition ON</p>
      <Chats/>
    </div>
  )
}

export default App
