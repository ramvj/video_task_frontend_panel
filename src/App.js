import React, { useState,useEffect } from "react";
import './App.css';
import Forms from './component/Forms';
import VideoList from './component/VideoList';
import { Col,Container,Row } from "react-bootstrap";
import { API } from "./Config";
import { Player } from 'video-react';

function App() {
  

  return (
    <div className="App">
   <Container>
    <Forms /> 
      <VideoList /> 
   </Container>
    </div>
  );
}

export default App;
