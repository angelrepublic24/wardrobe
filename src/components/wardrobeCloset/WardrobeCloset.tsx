import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useLoader} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';



// const Closet = () => {
//   return (
//     <>
//       {/* Base del armario */}
//       <mesh position={[0, -6, 0]} receiveShadow>
//         <boxGeometry args={[5, 0.2, 4]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       {/* Parte superior del armario */}
//       <mesh position={[0, 6, 0]} receiveShadow>
//         <boxGeometry args={[5, 0.2, 4]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       {/* Paneles laterales del armario */}
//       <mesh position={[-2.5, 0, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 12, 4]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>
//       <mesh position={[2.5, 0, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 12, 4]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       {/* Estantes dentro del armario */}
//       <mesh position={[0, 0, 0]} receiveShadow>
//         <boxGeometry args={[5, 0.2, 4]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       <mesh position={[0, 5, 0]} receiveShadow>
//         <boxGeometry args={[5, 0.3, 0.1]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       <mesh position={[0, -1, 0]} receiveShadow>
//         <boxGeometry args={[5, 0.3, 0.1]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       {/* Manijas de los estantes */}
//       <mesh position={[-2.3, 0, 1.8]} receiveShadow>
//         <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>
//       <mesh position={[2.3, 0, 1.8]} receiveShadow>
//         <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       {/*Shelves  */}
//       <mesh position={[0.1, 0.1, 2]}rotation={[Math.PI / 2, 0, 1.56]} receiveShadow>
//         <boxGeometry args={[0.05, 5, 0.04]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>
//       <mesh position={[0.1, -0.1, 2]}rotation={[Math.PI / 2, 0, 1.56]} receiveShadow>
//         <boxGeometry args={[0.05, 5, 0.04]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>


//       {/* Left border */}
//       <mesh position={[-2.6, 0, 2]} receiveShadow>
//         <boxGeometry args={[0.05, 12, 0.1]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>

//       <mesh position={[-2.4, 0.1, 2]} receiveShadow>
//         <boxGeometry args={[0.05, 11.7, 0.01]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>
      
//       {/* Borde derecho */}
//       <mesh position={[2.6, 0,2]} receiveShadow>
//         <boxGeometry args={[0.05, 12, 0.1]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>
//       <mesh position={[2.4, 0.1,2]} receiveShadow>
//         <boxGeometry args={[0.01, 11.7, 0.2]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>
      
//       {/* Borde superior izquierdo */}
//       <mesh position={[-2.6, 6, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 0.2, 4]} />
//         <meshStandardMaterial color="#000000" />
//       </mesh>
//       {/* Top Horizontal */}
//       <mesh position={[0, 6., 2]} rotation={[Math.PI /4, 1.56, -0.01]} receiveShadow>
//         <boxGeometry args={[0.1, 0.01, 4.8]} />
//         <meshStandardMaterial color="#ccc" />
//       </mesh>
//       {/* Bottom top horizontal */}
//       <mesh position={[0, 6.1, 2]} rotation={[Math.PI /4, 1.56, -0.01]} receiveShadow>
//         <boxGeometry args={[0.1, 0.01, 5]} />
//         <meshStandardMaterial color="#000000" />
//       </mesh>


      
//       {/* Borde inferior izquierdo */}
//       <mesh position={[-2.6, -6, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 0.2, 4]} />
//         <meshStandardMaterial color="#000000" />
//       </mesh>
//       <mesh position={[-2.6, -6, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 0.2, 4]} />
//         <meshStandardMaterial color="#000000" />
//       </mesh>
//       {/* Borde superior derecho */}
//       <mesh position={[2.6, 6, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 0.2, 4]} />
//         <meshStandardMaterial color="#000000" />
//       </mesh>
//       {/* Borde inferior derecho */}
//       <mesh position={[2.6, -6, 0]} receiveShadow>
//         <boxGeometry args={[0.2, 0.2, 4]} />
//         <meshStandardMaterial color="#000000" />
//       </mesh>
//     </>
//   );
//   };


const Model = () => {
  const gltf = useLoader(GLTFLoader, 'images/V40.glb');
  return <primitive object={gltf.scene}/>;
}

export const WardrobleCloset = () => {
return ( 
<div className='border rounded-3xl bg-white'>
<Canvas
        className='border rounded-3xl bg-white'
        camera={{ position: [5, 5, 0], fov: 30 }}
        style={{ height: '600px', width: '600px', background: '#f2f2f2' }}
        shadows
      >
        <light position={[0xffffff, 12, 100]}/>
        <ambientLight intensity={4} />
        <pointLight position={[10, 10, 10]} intensity={4} />
        <spotLight position={[1, 10, 10]} angle={0.15} penumbra={0} intensity={4} castShadow />
        <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        autoRotate={false} 
        minDistance={1} 
        maxDistance={100}
        />
        <Model />
      </Canvas>   
</div >
);
};