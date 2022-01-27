import Head from 'next/head'
import React, { useEffect, useState, Suspense, useCallback } from 'react'

import { Canvas } from '@react-three/fiber'
import { PointerLockControls, useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useTransition, } from '@react-spring/web'
import { a } from '@react-spring/three'
import * as THREE from 'three'

import LandingPage from './Components/homepage'
import Back from './Components/back'
import FirstScene from './Canvas/firstscene'
import SecondScene from './Canvas/secondscene'
import HashLoader from "react-spinners/HashLoader";


function Scenes({ transition, handleClick, setScene }) {

  return transition(({ opacity, ...props }, showScene) => (
    <a.group {...props}>
      {
        showScene ?
          <SecondScene position={[0, -1, 0]} handleClick={handleClick} /> :
          <FirstScene position={[.5, -.7, -1]} handleClick={handleClick} opacity={opacity} setScene={setScene} />
      }
    </a.group >
  ))
}


export default function Home() {
  const [showScene, setScene] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleClick = useCallback(e => {
    setScene(!showScene);

  }, [showScene])

  THREE.DefaultLoadingManager.onLoad = function () {
    setLoading(false)
  };

  const transitions = useTransition(showScene, {
    from: { scale: [0, 0, 0], opacity: 0, },
    enter: { scale: [1, 1, 1], opacity: 1 },
    leave: { scale: [0, 0, 0], opacity: 0 },
    config: () => (n) => n === "opacity" && { friction: 60 },
  });

  return (
    <div className="container">
      {
        loading ? <HashLoader color={"#F0A500"} loading={loading} size={50} /> :
          <>
            <Head>
              <title>SOEIGHT</title>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600;700;900&display=swap" rel="stylesheet" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Head>

            <Canvas dpr={[1.5, 2]} camera={{ fov: 27, position: [5, 1, 5] }} className='canvas'  >

              <spotLight intensity={.8} angle={0.2} penumbra={1} position={[0, 8, 15]} />
              <spotLight intensity={.8} angle={0.2} penumbra={1} position={[10, 0, -8]} />
              <Suspense fallback={null} >
                <Scenes transition={transitions} handleClick={handleClick} setScene={showScene} />
              </Suspense>
              {showScene ? <PointerLockControls /> : <PerspectiveCamera makeDefault far={100} near={0.1} fov={28} position={[5,1,5]} />}
            </Canvas>
            {showScene ? <Back handleClick={handleClick} /> : <LandingPage />}

          </>
      }
    </div >

  )
}


useGLTF.preload('/assets/models/scene.glb')
useGLTF.preload('/assets/models/dogue.gltf')

