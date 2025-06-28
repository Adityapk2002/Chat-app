import { useEffect, useRef, useState } from 'react'

import './App.css'
import { Homepage } from './pages/Homepage'
import ChatPage from './pages/chat'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Homepage/>}></Route>
        <Route path='/chat' element = {<ChatPage/>}></Route>
      </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
