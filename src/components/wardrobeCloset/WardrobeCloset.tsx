import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CameraPositionLogger = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useFrame(() => {
    console.log(`X: ${cameraRef.current.position.x}, Y: ${cameraRef.current.position.y}, Z: ${cameraRef.current.position.z}`);
  });

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  return null;
};

const Model = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  // gltf.scene.traverse((object) => {
  //   if (object.isMesh && object.material) {
  //     object.material = new THREE.MeshStandardMaterial({ color: "#ccc", metalness: 0.5, roughness: 0.7 });
  //   }
  // });

  gltf.scene.scale.set(20, 20, 20);
  gltf.scene.rotation.x = Math.PI / 0.5;
  gltf.scene.rotation.y = Math.PI;

  
  return <primitive object={gltf.scene} />;
};

export const WardrobeCloset = ({ sizeOption, lengthSideOption }) => {
  const [modelPath, setModelPath] = useState('');
  const [cameraPosition, setCameraPosition] = useState([4.69, -10.39, -40.05]);
  const [controlsTarget, setControlsTarget] = useState(new THREE.Vector3(0, 0, 0));
  const cameraRef = useRef();


  useEffect(() => {
    let newPath = '';
    let newCameraPosition = [-6.6851, 17.0991, 81.73998];
    let newControlsTarget = new THREE.Vector3(2, 5, 47);

    if (sizeOption && !lengthSideOption) {
      switch (sizeOption) {
        case "2 ft":
          newPath = 'images/base/2ft.glb';
          newCameraPosition = [10, 15, 50];
          break;
        case "4 ft":
          newPath = 'images/base/4ft.glb';
          newCameraPosition = [20, 20, 60];
          break;
        case "6 ft":
          newPath = 'images/base/6ft.glb';
          newCameraPosition = [-25, 15, 50];
          newControlsTarget.set(10, 5.5, 40)
          break;
        case "8 ft":
          newPath = 'images/base/8ft.glb';
          newCameraPosition = [25, 15, 100];
          break;
        case "10 ft":
          newPath = 'images/base/10ft.glb';
          newCameraPosition = [50, 35, 90];
          break;
        case "12 ft":
          newPath = 'images/base/12ft.glb';
          newCameraPosition = [60, 40, 100];
          break;
        case "14 ft":
          newPath = 'images/base/14ft.glb';
          newCameraPosition = [70, 45, 110];
          break;
        case "16 ft":
          newPath = 'images/base/16ft.glb';
          newCameraPosition = [80, 50, 120];
          break;
        case "18 ft":
          newPath = 'images/base/18ft.glb';
          newCameraPosition = [90, 55, 130];
          break;
        case "20 ft":
          newPath = 'images/base/20ft.glb';
          newCameraPosition = [100, 60, 140];
          break;
        default:
          newPath = 'images/base/20ft.glb';
      }
    }

    if (sizeOption && lengthSideOption) {
      switch (`${sizeOption}-${lengthSideOption}`) {
        // Base 2 ft
        case "2 ft-2 ft":
          newPath = 'images/completSize/2x2.glb';
          break;
        case "2 ft-4 ft":
          newPath = 'images/completSize/2x4.glb';
          break;
        case "2 ft-6 ft":
          newPath = 'images/completSize/2x6.glb';
          break;
        case "2 ft-8 ft":
          newPath = 'images/completSize/2x8.glb';
          break;
        case "2 ft-10 ft":
          newPath = 'images/completSize/2x10.glb';
          break;
    
        // Base 4 ft
        case "4 ft-2 ft":
          newPath = 'images/completSize/4x2.glb';
          break;
        case "4 ft-4 ft":
          newPath = 'images/completSize/4x4.glb';
          break;
        case "4 ft-6 ft":
          newPath = 'images/completSize/4x6.glb';
          break;
        case "4 ft-8 ft":
          newPath = 'images/completSize/4x8.glb';
          break;
        case "4 ft-10 ft":
          newPath = 'images/completSize/4x10.glb';
          break;
    
        // Base 6 ft
        case "6 ft-2 ft":
          newPath = 'images/completSize/6x2.glb';
          break;
        case "6 ft-4 ft":
          newPath = 'images/completSize/6x4.glb';
          break;
        case "6 ft-6 ft":
          newPath = 'images/completSize/6x6.glb';
          break;
        case "6 ft-8 ft":
          newPath = 'images/completSize/6x8.glb';
          break;
        case "6 ft-10 ft":
          newPath = 'images/completSize/6x10.glb';
          break;
    
        // Base 8 ft
        case "8 ft-2 ft":
          newPath = 'images/completSize/8x2.glb';
          break;
        case "8 ft-4 ft":
          newPath = 'images/completSize/8x4.glb';
          break;
        case "8 ft-6 ft":
          newPath = 'images/completSize/8x6.glb';
          break;
        case "8 ft-8 ft":
          newPath = 'images/completSize/8x8.glb';
          break;
        case "8 ft-10 ft":
          newPath = 'images/completSize/8x10.glb';
          break;
    
        // Base 10 ft
        case "10 ft-2 ft":
          newPath = 'images/completSize/10x2.glb';
          break;
        case "10 ft-4 ft":
          newPath = 'images/completSize/10x4.glb';
          break;
        case "10 ft-6 ft":
          newPath = 'images/completSize/10x6.glb';
          break;
        case "10 ft-8 ft":
          newPath = 'images/completSize/10x8.glb';
          break;
        case "10 ft-10 ft":
          newPath = 'images/completSize/10x10.glb';
          break;
    
        // Base 12 ft
        case "12 ft-2 ft":
          newPath = 'images/completSize/12x2.glb';
          break;
        case "12 ft-4 ft":
          newPath = 'images/completSize/12x4.glb';
          break;
        case "12 ft-6 ft":
          newPath = 'images/completSize/12x6.glb';
          break;
        case "12 ft-8 ft":
          newPath = 'images/completSize/12x8.glb';
          break;
        case "12 ft-10 ft":
          newPath = 'images/completSize/12x10.glb';
          break;
    
        // Base 14 ft
        case "14 ft-2 ft":
          newPath = 'images/completSize/14x2.glb';
          break;
        case "14 ft-4 ft":
          newPath = 'images/completSize/14x4.glb';
          break;
        case "14 ft-6 ft":
          newPath = 'images/completSize/14x6.glb';
          break;
        case "14 ft-8 ft":
          newPath = 'images/completSize/14x8.glb';
          break;
        case "14 ft-10 ft":
          newPath = 'images/completSize/14x10.glb';
          break;
    
        // Base 16 ft
        case "16 ft-2 ft":
          newPath = 'images/completSize/16x2.glb';
          break;
        case "16 ft-4 ft":
          newPath = 'images/completSize/16x4.glb';
          break;
        case "16 ft-6 ft":
          newPath = 'images/completSize/16x6.glb';
          break;
        case "16 ft-8 ft":
          newPath = 'images/completSize/16x8.glb';
          break;
        case "16 ft-10 ft":
          newPath = 'images/completSize/16x10.glb';
          break;
    
        // Base 18 ft
        case "18 ft-2 ft":
          newPath = 'images/completSize/18x2.glb';
          break;
        case "18 ft-4 ft":
          newPath = 'images/completSize/18x4.glb';
          break;
        case "18 ft-6 ft":
          newPath = 'images/completSize/18x6.glb';
          break;
        case "18 ft-8 ft":
          newPath = 'images/completSize/18x8.glb';
          break;
        case "18 ft-10 ft":
          newPath = 'images/completSize/18x10.glb';
          break;
    
        // Base 20 ft
        case "20 ft-2 ft":
          newPath = 'images/completSize/20x2.glb';
          break;
        case "20 ft-4 ft":
          newPath = 'images/completSize/20x4.glb';
          break;
        case "20 ft-6 ft":
          newPath = 'images/completSize/20x6.glb';
          break;
        case "20 ft-8 ft":
          newPath = 'images/completSize/20x8.glb';
          break;
        case "20 ft-10 ft":
          newPath = 'images/completSize/20x10.glb';
          break;
    
        default:
          break;
      }
    }
    


    setModelPath(newPath);
    setCameraPosition(newCameraPosition);
    setControlsTarget(newControlsTarget);
  }, [sizeOption, lengthSideOption]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
    }
  }, [cameraPosition]);

  return (
    <div className='border rounded-3xl bg-white'>
      <Canvas
        className='border rounded-3xl bg-white'
        camera={{ position: cameraPosition, fov: 25 }}
        style={{ height: '600px', width: '600px', background: '#d3d3d3' }}
      >
        <CameraPositionLogger />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[1, 10, 10]} angle={0.15} penumbra={4} intensity={1} castShadow />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          minDistance={50}
          maxDistance={200}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.PAN,
            RIGHT: THREE.MOUSE.ROTATE
          }}
          target={controlsTarget}
          position={cameraPosition}
        />
        {modelPath && <Model modelPath={modelPath} />}
        <perspectiveCamera ref={cameraRef} position={cameraPosition} />
      </Canvas>
    </div>
  );
};
