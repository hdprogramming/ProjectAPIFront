import { useState } from 'react'
import './App.css'

import { Canvas } from '@react-three/fiber';
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import './components/project-item/Project-item'
import ProjectItem from './components/project-item/Project-item';
import IconsBox from './components/IconsBox/IconsBox';
import ProjectNew from './components/ProjectNew/ProjectNew';
import { createRoot } from 'react-dom/client';
function App() {
  
  return (
    <>
    <ProjectNew/>   
    </>
  )
}

export default App
