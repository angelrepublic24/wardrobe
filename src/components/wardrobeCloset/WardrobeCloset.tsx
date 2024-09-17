import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Model = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  gltf.scene.rotation.x = Math.PI / 1;
  return <primitive object={gltf.scene} />;
};


export const WardrobeCloset = ({ sizeOption }) => {
  const [modelPath, setModelPath] = useState('');
  const [cameraPosition, setCameraPosition] = useState([5, 5, 0] as [number, number, number]);
  const mouse = useRef(new THREE.Vector2());
  


  useEffect(() => {
    let newPath = '';
    let newCameraPosition = [5, 5, 5];

    switch (sizeOption) {
      case "Channel":
        newPath = 'images/channel.glb';
        newCameraPosition = [5, 45, 5];
        break;
      case "8 Fascia":
        newPath = 'images/Main.glb';
        newCameraPosition = [-5, -5, 5];
        break;
      case "6 Fascia":
        newPath = 'images/Second.glb';
        newCameraPosition = [5, 5, 5];
        break;
      case "Tube":
        newPath = 'images/Tube.glb';
        newCameraPosition = [5, 5, 5];
        break;
      default:
        newPath = 'images/Main.glb';
    }

    setModelPath(newPath);
    setCameraPosition(newCameraPosition);
  }, [sizeOption]);

  return (
    <div className='border rounded-3xl bg-white'>
      <Canvas
        className='border rounded-3xl bg-white'
        camera={{ position: cameraPosition, fov: 30 }}
        style={{ height: '600px', width: '600px', background: '#f2f2f2' }}
        shadows
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[1, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minDistance={1}
          maxDistance={100}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.ROTATE
          }}
        />
        {modelPath && <Model modelPath={modelPath} />}
      </Canvas>
    </div>
  );
};
