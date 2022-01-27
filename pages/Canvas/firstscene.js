import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Html,} from '@react-three/drei'
import * as THREE from 'three'

export default function FirstScene({ handleClick, setScene, opacity, ...props }) {

    // Variables
    const ref = useRef()
    const { mouse, clock } = useThree()
    const [rEuler, rQuaternion] = useMemo(() => [new THREE.Euler(), new THREE.Quaternion()], [])
    const [hovered, setHovered] = useState(false)
    const [hidden, setVisible] = useState(false)

    const scene = useGLTF('/assets/models/scene.glb')
    const dogue = useGLTF('/assets/models/dogue.gltf')
    
    // Animation
    let mixer;
    if (scene.animations.length) {
        mixer = new THREE.AnimationMixer(scene.scene);
        scene.animations.forEach(clip => {
            const action = mixer.clipAction(clip)
            action.play();
        })
    }

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    useFrame((state, delta) => {


        mixer?.update(delta)
        if (ref.current) {
            rEuler.set((-mouse.y * Math.PI) / 90, (mouse.x * Math.PI) / 12, 0)
            ref.current.quaternion.slerp(rQuaternion.setFromEuler(rEuler), 0.1)
        }

        state.camera.lookAt(0, 0, 0)
        state.camera.position.set(5, 1, 5)
        state.camera.updateProjectionMatrix()

    })



    return (
        <>
            <group ref={ref} {...props} >
                <Html zIndexRange={[0, 1]} position={[0, .08, .8]} style={{ transition: 'all .2s', display: setScene ? "none" : "flex"}} >
                    <div className="bubbleContainer" onClick={handleClick} >
                        <div className="bubble" >
                            Click me to Explore!
                        </div>
                        <div className="bubblePointer" ></div>
                    </div>
                </Html>
                <mesh>
                    <group
                        position={[0, .08, .8]}
                        rotation={[0, 0, 0]}
                        scale={[.06, .06, .06]}
                        onClick={handleClick}
                    >
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={dogue.nodes.Mesh002.geometry}
                            material={dogue.materials['body_orange-light']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={dogue.nodes.Mesh002_1.geometry}
                            material={dogue.materials.body_orange}
                        />
                        <mesh castShadow receiveShadow geometry={dogue.nodes.Mesh001.geometry} material={dogue.materials.eyes} />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={dogue.nodes.Mesh001_1.geometry}
                            material={dogue.materials.eyes_pupile}
                        />
                        <mesh castShadow receiveShadow geometry={dogue.nodes.nose.geometry} material={dogue.materials.nose} />

                    </group>
                </mesh>
                <primitive object={scene.nodes.Scene} />
            </group>
        </>
    )
}


