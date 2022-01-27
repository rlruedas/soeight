import React, { useEffect, useRef } from 'react'
import { PointerLockControls, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


export default function SecondScene({ handleClick, ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('./assets/dogue.gltf')


  useFrame((state, delta) => {
    state.camera.position.set(10, 2, 10)
    state.camera.updateProjectionMatrix()
  })

  return (
    <>

      <group ref={group} {...props} dispose={null} >
        <mesh castShadow receiveShadow geometry={nodes.Mesh001.geometry} material={materials.eyes} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh001_1.geometry}
          material={materials.eyes_pupile}
        />
        <mesh castShadow receiveShadow geometry={nodes.nose.geometry} material={materials.nose} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh002.geometry}
          material={materials['body_orange-light']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh002_1.geometry}
          material={materials.body_orange}
        />

      </group>

    </>
  )
}


