import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CameraPositionLogger = () => {
  const { camera } = useThree(); // Obtén la cámara de la escena
  const cameraRef = useRef(camera); // Guarda una referencia a la cámara

  useFrame(() => {
    console.log(cameraRef.current.position); // Imprime la posición de la cámara en cada frame
    // Si quieres acceder a las coordenadas específicas
    console.log(`X: ${cameraRef.current.position.x}, Y: ${cameraRef.current.position.y}, Z: ${cameraRef.current.position.z}`);
  });

  useEffect(() => {
    cameraRef.current = camera; // Actualiza la referencia de la cámara en el montaje inicial
  }, [camera]);

  return null;
};

const Model = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      if (object.material) {
        // Asignar un material básico con el color deseado
        object.material = new THREE.MeshBasicMaterial({ color: "#c2c2c2" });
      }
    }
  });
  gltf.scene.rotation.x = Math.PI / 1;
  return <primitive object={gltf.scene} />;
};



export const WardrobeCloset = ({ sizeOption }) => {
  const [modelPath, setModelPath] = useState('');
  const [cameraPosition, setCameraPosition] = useState([4.69, 17.39, -20.05] as [number, number, number]);
  const mouse = useRef(new THREE.Vector2());
  


  useEffect(() => {
    let newPath = '';
    let newCameraPosition = [30, 14.42, -22.58];

    switch (sizeOption) {
      case "8 In":
        newPath = 'images/base/8.glb';
        newCameraPosition = [30, 14.42, -22.58];
        break;
      case "6 In":
        newPath = 'images/base/6.glb';
        newCameraPosition = [30, 14.42, -22.58];
        break;
      case "4 In":
        newPath = 'images/base/4.glb';
        newCameraPosition = [30, 14.42, -22.58];
        break;
      case "2 In":
        newPath = 'images/base/2.glb';
        newCameraPosition = [30, 14.42, -22.58];
        break;
      default:
        newPath = 'images/base/8.glb';
    }

    setModelPath(newPath);
    setCameraPosition(newCameraPosition);
  }, [sizeOption]);

  return (
    <div className='border rounded-3xl bg-white'>
      <Canvas
        className='border rounded-3xl bg-white'
        camera={{ position: cameraPosition, fov: 25 }}
        style={{ height: '600px', width: '600px', background: '#fff' }}
      >
        <CameraPositionLogger />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[1, 10, 10]} angle={0.15} penumbra={4} intensity={1} castShadow />
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
