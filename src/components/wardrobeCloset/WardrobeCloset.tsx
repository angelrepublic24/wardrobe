import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const CameraPositionLogger = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  // useFrame(() => {
  //   console.log(`X: ${cameraRef.current.position.x}, Y: ${cameraRef.current.position.y}, Z: ${cameraRef.current.position.z}`);
  // });

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  return null;
};
const Model = ({ modelPath, rotation, onModelLoaded }) => {
  const gltfLoader = new GLTFLoader();
  gltfLoader.setMeshoptDecoder(MeshoptDecoder); // Configura el decodificador de Meshopt

  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  }); // Carga el modelo

  // Escala y rotación del modelo
  gltf.scene.scale.set(20, 20, 20);
  if (rotation) {
    gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
  } else {
    gltf.scene.rotation.x = Math.PI / 0.5; // Rotación por defecto
    gltf.scene.rotation.y = Math.PI;
  }

  // Mantener los materiales y texturas originales
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true; // Habilitar sombra
      child.receiveShadow = true; // Recibir sombra
    }
  });

  useEffect(() => {
    if (onModelLoaded) {
      onModelLoaded(gltf.scene);
    }
  }, [gltf, onModelLoaded]);

  return <primitive object={gltf.scene} />;
};

// const Model = ({ modelPath, rotation, onModelLoaded }) => {
//   const gltf = useLoader(GLTFLoader, modelPath);

//   // Escala y rotación del modelo
//   gltf.scene.scale.set(20, 20, 20);
//   if (rotation) {
//     gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
//   } else {
//     gltf.scene.rotation.x = Math.PI / 0.5; // Rotación por defecto
//     gltf.scene.rotation.y = Math.PI;
//   }

//   // Mantener los materiales y texturas originales
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true; // Habilitar sombra
//       child.receiveShadow = true; // Recibir sombra

//       // Asegúrate de no sobrescribir el material original
//       // child.material.map ya contiene la textura original del modelo
//     }
//   });

//   useEffect(() => {
//     if (onModelLoaded) {
//       onModelLoaded(gltf.scene);
//     }
//   }, [gltf, onModelLoaded]);

//   return <primitive object={gltf.scene} />;
// };
const RotationControls = ({ model }) => {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (model && controlsRef.current) {
      // Calcula el centro del modelo
      const boundingBox = new THREE.Box3().setFromObject(model);
      const center = boundingBox.getCenter(new THREE.Vector3());

      // Establece el punto objetivo de los controles en el centro del modelo
      controlsRef.current.target.copy(center);
      camera.position.set(center.x + 15, center.y + 10, camera.position.z); // Opcional: Ajusta la posición inicial de la cámara
      controlsRef.current.update();
    }
  }, [model, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      minDistance={20}
      maxDistance={200}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.PAN,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
    />
  );
};
export const WardrobeCloset = ({
  sizeOption,
  lengthSideOption,
  slotTopOption,
  slotBottomOption,
  roofOption,
  louversOption,
  louverSizeOption

}) => {
  const [modelPath, setModelPath] = useState("");
  const [model, setModel] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([4.69, -10.39, -40.05]);
  const [controlsTarget, setControlsTarget] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [rotation, setRotation] = useState(null); // Rotación opcional

  const cameraRef = useRef();

  useEffect(() => {
    let newPath = "";
    let newCameraPosition = [-6.6851, 17.0991, 81.73998];
    let newControlsTarget = new THREE.Vector3(2, 5, 47);
    let newRotation = { x: Math.PI / 0.5, y: Math.PI, z: 0 };

    if (sizeOption && !lengthSideOption) {
      switch (sizeOption) {
        case "2 ft":
          newPath = "images/base/2ft.glb";
          newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
          break;
        case "4 ft":
          newPath = "images/base/4ft.glb";
          newCameraPosition = [20, 20, 30];
          break;
        case "6 ft":
          newPath = "images/base/6ft.glb";
          newCameraPosition = [-25, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
          break;
        case "8 ft":
          newPath = "images/base/8ft.glb";
          newCameraPosition = [25, 15, 100];
          break;
        case "10 ft":
          newPath = "images/base/10ft.glb";
          newCameraPosition = [50, 35, 90];
          break;
        case "12 ft":
          newPath = "images/base/12ft.glb";
          newCameraPosition = [60, 40, 100];
          break;
        case "14 ft":
          newPath = "images/base/14ft.glb";
          newCameraPosition = [70, 45, 110];
          break;
        case "16 ft":
          newPath = "images/base/16ft.glb";
          newCameraPosition = [80, 50, 120];
          break;
        case "18 ft":
          newPath = "images/base/18ft.glb";
          newCameraPosition = [90, 55, 130];
          break;
        case "20 ft":
          newPath = "images/base/20ft.glb";
          newCameraPosition = [100, 60, 140];
          break;
        default:
          newPath = "images/base/8ft.glb";
      }
    }

    if (
      sizeOption &&
      lengthSideOption
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}`) {
              newPath = `images/completSize/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Slot Top
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}`) {
              newPath = `images/slotTop/Channel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}`) {
              newPath = `images/slotTop/Tube/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Crown`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}`) {
              newPath = `images/slotTop/Crown/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }
// ------------------------------------------------------------
    // Slot Bottom
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Channel"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Channel`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotBottom/Channel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }
    // None x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Tube"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Tube`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotBottom/Tube/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }
    // None x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Crown"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Crown`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotBottom/Crown/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // ---------------Top x Bottom --------------------------------

    // Crown x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown" &&
      slotBottomOption === "Crown"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Crown-Crown`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/CrownxCrown/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Channel x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Channel"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Channel`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/ChannelxChannel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Tube x Tube 
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Tube"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-Tube`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/TubexTube/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Channel x Tube

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Tube"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Tube`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/ChannelxTube/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Channel x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Crown"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Crown`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/ChannelxCrown/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }
    // Crown x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown" &&
      slotBottomOption === "Tube"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Crown-Tube`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/CrownxTube/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Crown x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown" &&
      slotBottomOption === "Channel"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Crown-Channel`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/CrownxChannel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Tube x Channel 
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Channel"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-Channel`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/TubexChannel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Tube x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Crown"
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-Crown`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`) {
              newPath = `images/slotTopAndBottom/TubexCrown/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

// ---------------------------------------------------------------
// Roof

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Channel" &&
      roofOption
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Channel-Single Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
              newPath = `images/Roof/singleRoof/ChannelxChannel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Channel x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Tube" &&
      roofOption
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Tube-Single Roof`;
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
              newPath = `images/Roof/singleRoof/ChannelxTube/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }

    // Channel x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Crown" &&
      roofOption
    ) {
      for (let size = 2; size <= 20; size += 2) {
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Crown-Single Roof`;
          if(caseString ===`${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`){
              newPath = `images/Roof/singleRoof/ChannelxCrown/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
        }
      }
    }
    // Tube x Crown
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Tube" &&
  slotBottomOption === "Crown" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size}-${length}-Tube-Crown-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/TubexCrown/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Tube x Channel
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Tube" &&
  slotBottomOption === "Channel" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size}-${length}-Tube-Channel-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/TubexChannel/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Tube x Tube
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Tube" &&
  slotBottomOption === "Tube" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Tube-Tube-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/TubexTube/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Crown x Tube
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Crown" &&
  slotBottomOption === "Tube" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Crown-Tube-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/CrownxTube/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Crown x Channel
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Crown" &&
  slotBottomOption === "Channel" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Crown-Channel-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/CrownxChannel/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Crown x Crown
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Crown" &&
  slotBottomOption === "Crown" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Crown-Crown-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/CrownxCrown/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Crown x None
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Crown" &&
  slotBottomOption === "None" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Crown-None-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/CrownxNone/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Tube x None
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Tube" &&
  slotBottomOption === "None" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Tube-None-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/TubexNone/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// Channel x None
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "Channel" &&
  slotBottomOption === "None" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-Channel-None-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/ChannelxNone/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// None x Channel
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "None" &&
  slotBottomOption === "Channel" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-None-Channel-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/NonexChannel/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// None x Tube
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "None" &&
  slotBottomOption === "Tube" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-None-Tube-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/NonexTube/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}

// None x Crown
if (
  sizeOption &&
  lengthSideOption &&
  slotTopOption === "None" &&
  slotBottomOption === "Crown" &&
  roofOption
) {
  // Loop through sizes 2 ft to 20 ft
  for (let size = 2; size <= 20; size += 2) {
    // Loop through lengths 2 ft to 10 ft
    for (let length = 2; length <= 10; length += 2) {
      const caseString = `${size} ft-${length} ft-None-Crown-Single Roof`;
      if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
        newPath = `images/Roof/singleRoof/NonexCrown/${size}x${length}.glb`; // Updated
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
    }
  }
}
    // ---------------------------------------------------------------------------------

    // ------------ Double Roof -----------------

    // None x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Crown" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Crown-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-None-Crown-Double Roof`:
                newPath = `images/Roof/doubleRoof/NonexCrown/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // None x None
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "None" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-None-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-None-None-Double Roof`:
                newPath = `images/Roof/doubleRoof/NonexNone/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // None x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Tube" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Tube-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-None-Tube-Double Roof`:
                newPath = `images/Roof/doubleRoof/NonexTube/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // None x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Channel" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Channel-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-None-Channel-Double Roof`:
                newPath = `images/Roof/doubleRoof/NonexChannel/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Channel x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Channel" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Channel-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Channel-Channel-Double Roof`:
                newPath = `images/Roof/doubleRoof/ChannelxChannel/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Channel x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Tube" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Tube-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Channel-Tube-Double Roof`:
                newPath = `images/Roof/doubleRoof/ChannelxTube/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Channel x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Crown" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Crown-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Channel-Crown-Double Roof`:
                newPath = `images/Roof/doubleRoof/ChannelxCrown/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Tube x Crown
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Crown" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-Crown-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Tube-Crown-Double Roof`:
                newPath = `images/Roof/doubleRoof/TubexCrown/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Tube x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Tube" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-Tube-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Tube-Tube-Double Roof`:
                newPath = `images/Roof/doubleRoof/TubexTube/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Tube x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Channel" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-Channel-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Tube-Channel-Double Roof`:
                newPath = `images/Roof/doubleRoof/TubexChannel/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Tube x None
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "None" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Tube-None-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Tube-None-Double Roof`:
                newPath = `images/Roof/doubleRoof/TubexNone/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Tube x None
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "Tube" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-Tube-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-None-Tube-Double Roof`:
                newPath = `images/Roof/doubleRoof/NonexTube/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Tube x None
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "None" &&
      slotBottomOption === "None" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-None-None-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-None-None-Double Roof`:
                newPath = `images/Roof/doubleRoof/NonexNone/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Channel x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Channel" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Channel-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Channel-Channel-Double Roof`:
                newPath = `images/Roof/doubleRoof/ChannelxChannel/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }
    
    // Channel x Tube
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Tube" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          const caseString = `${size} ft-${length} ft-Channel-Tube-Double Roof`;
    
          if (caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`) {
            switch (caseString) {
              case `${size} ft-${length} ft-Channel-Tube-Double Roof`:
                newPath = `images/Roof/doubleRoof/ChannelxTube/${size}x${length}.glb`; // Updated
                newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
                break;
            }
          }
        }
      }
    }

    // Tube x Channel
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Channel" &&
      roofOption
    ) {
      // Loop through sizes 2 ft to 20 ft
      for (let size = 2; size <= 20; size += 2) {
        // Loop through lengths 2 ft to 10 ft
        for (let length = 2; length <= 10; length += 2) {
          if(`${size} ft-${length} ft-Tube-Channel-Double Roof`=== `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}`){
            const caseString = `${size} ft-${length} ft-Tube-Channel-Double Roof`;
    
          switch (caseString) {
            case `${size} ft-${length} ft-Tube-Channel-Double Roof`:
              newPath = `images/Roof/doubleRoof/TubexChannel/${size}x${length}.glb`; // Updated
              newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
              break;
          }
          }
          
        }
      }
    }

// --------------------------------------------------------- 
    // Louvers
   // Channel x Channel x 1/4
   if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Channel" &&
    slotBottomOption === "Channel" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    // Loop through sizes 2 ft to 20 ft
    for (let size = 2; size <= 20; size += 2) {
      // Loop through lengths 2 ft to 10 ft
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Channel-Channel-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/ChannelxChannel/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  // Channel x Tube
  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Channel" &&
    slotBottomOption === "Tube" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    // Loop through sizes 2 ft to 20 ft
    for (let size = 2; size <= 20; size += 2) {
      // Loop through lengths 2 ft to 10 ft
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Channel-Tube-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/ChannelxTube/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  // Channe x Crown
  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Channel" &&
    slotBottomOption === "Crown" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    // Loop through sizes 2 ft to 20 ft
    for (let size = 2; size <= 20; size += 2) {
      // Loop through lengths 2 ft to 10 ft
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Channel-Crown-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/ChannelxCrown/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  // Crown x Crown
  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Crown" &&
    slotBottomOption === "Crown" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    for (let size = 2; size <= 20; size += 2) {
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Crown-Crown-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/CrownxCrown/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  // Crown x Tube
  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Crown" &&
    slotBottomOption === "Tube" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    for (let size = 2; size <= 20; size += 2) {
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Crown-Tube-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/CrownxTube/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  //  Crown x Channel

  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Crown" &&
    slotBottomOption === "Channel" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    for (let size = 2; size <= 20; size += 2) {
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Crown-Channel-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/CrownxChannel/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  // Tube x Tube 
  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Tube" &&
    slotBottomOption === "Tube" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    for (let size = 2; size <= 20; size += 2) {
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Tube-Tube-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/TubexTube/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

   // Tube x Channel 
   if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Tube" &&
    slotBottomOption === "Channel" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    for (let size = 2; size <= 20; size += 2) {
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Tube-Channel-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/TubexChannel/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

  // Tube x Crown 
  if (
    sizeOption &&
    lengthSideOption &&
    slotTopOption === "Tube" &&
    slotBottomOption === "Crown" &&
    roofOption ==="Single Roof" &&
    louversOption === "Round" &&
    louverSizeOption === "1/4 ft"
  ) {
    for (let size = 2; size <= 20; size += 2) {
      for (let length = 2; length <= 10; length += 2) {
        const caseString = `${size} ft-${length} ft-Tube-Crown-Single Roof-Round-1/4 ft`;
        if(caseString === `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}-${roofOption}-${louversOption}-${louverSizeOption}`){
            newPath = `images/Louvers/Round/aQuarter/TubexCrown/${size}x${length}.glb`; // Updated
            newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
            break;
        }
      }
    }
  }

    setModelPath(newPath);
    setCameraPosition(newCameraPosition);

    setControlsTarget(newControlsTarget);
    setRotation(newRotation);
  }, [
    sizeOption,
    lengthSideOption,
    slotTopOption,
    slotBottomOption,
    roofOption,
    louversOption,
    louverSizeOption
  ]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
    }
  }, [cameraPosition]);

  const handleModelLoaded = (loadedModel) => {
    setModel(loadedModel);
  };
  return (
    <div className="border md:rounded-3xl bg-white w-full z-10 md:z-0  md:w-3/5 fixed h-[55vh] md:h-[80vh]">
      <Canvas
        className="border md:rounded-3xl bg-white w-full md:w-3/4"
        camera={{ position: cameraPosition, fov: 25 }}
        style={{ height: "100%", background: "#d3d3d3" }}
      >
        <CameraPositionLogger />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[1, 10, 10]}
          angle={0.15}
          penumbra={4}
          intensity={1}
          castShadow
        />
        {modelPath && (
          <Model
            modelPath={modelPath}
            rotation={rotation}
            onModelLoaded={handleModelLoaded}
          />
        )}
        {model && <RotationControls model={model} />}
      </Canvas>
    </div>
  );
};
