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
        case "1 ft":
        case "2 ft":
          newPath = "images/base/2ft.glb";
          newCameraPosition = [10, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
          break;
        case "3 ft":
        case "4 ft":
          newPath = "images/base/4ft.glb";
          newCameraPosition = [20, 20, 30];
          break;
        case "5 ft":
        case "6 ft":
          newPath = "images/base/6ft.glb";
          newCameraPosition = [-25, 15, 50];
          newControlsTarget.set(10, 5.5, 40);
          break;
        case "7 ft":
        case "8 ft":
          newPath = "images/base/8ft.glb";
          newCameraPosition = [25, 15, 100];
          break;
          case "9 ft":
        case "10 ft":
          newPath = "images/base/10ft.glb";
          newCameraPosition = [50, 35, 90];
          break;
        case "11 ft":
        case "12 ft":
          newPath = "images/base/12ft.glb";
          newCameraPosition = [60, 40, 100];
          break;
        case "13 ft":
        case "14 ft":
          newPath = "images/base/14ft.glb";
          newCameraPosition = [70, 45, 110];
          break;
          case "15 ft":
        case "16 ft":
          newPath = "images/base/16ft.glb";
          newCameraPosition = [80, 50, 120];
          break;
          case "17 ft":
        case "18 ft":
          newPath = "images/base/18ft.glb";
          newCameraPosition = [90, 55, 130];
          break;
          case "19 ft":
        case "20 ft":
          newPath = "images/base/20ft.glb";
          newCameraPosition = [100, 60, 140];
          break;
        default:
          newPath = "images/base/8ft.glb";
      }
    }

    if (sizeOption && lengthSideOption) {
      // Convertimos los valores a números pares redondeando hacia arriba
      const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
      const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
    
      // Definimos el path usando los valores ajustados
      newPath = `images/completSize/${adjustedSize}x${adjustedLength}.glb`;
      newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
    }

    // Slot Top
    if (sizeOption && lengthSideOption && slotTopOption) {
      // Convertimos los valores a números pares redondeando hacia arriba
      const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
      const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
      if(slotTopOption === 'None') {
        newPath = `images/completSize/${adjustedSize}x${adjustedLength}.glb`;
      }else{
        newPath = `images/slotTop/${slotTopOption}/${adjustedSize}x${adjustedLength}.glb`;
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
          
    }



 // ---------------Top x Bottom --------------------------------
    if (sizeOption && lengthSideOption && slotTopOption && slotBottomOption) {
      // Convertimos los valores a números pares redondeando hacia arriba
      const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
      const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
      if (slotTopOption === 'None' && slotBottomOption === 'None') {
        // Caso 1: Ambos son 'None'
        newPath = `images/completSize/${adjustedSize}x${adjustedLength}.glb`;
      } else if (slotTopOption !== 'None' && slotBottomOption === 'None') {
        // Caso 2: slotTopOption es distinto de 'None' y slotBottomOption es 'None'
        newPath = `images/slotTop/${slotTopOption}/${adjustedSize}x${adjustedLength}.glb`;
      } else if (slotTopOption === 'None' && slotBottomOption !== 'None') {
        // Caso 3: slotTopOption es 'None' y slotBottomOption es distinto de 'None'
        newPath = `images/slotBottom/${slotBottomOption}/${adjustedSize}x${adjustedLength}.glb`;
      } else {
        // Caso 4: Ambos son distintos de 'None'
        newPath = `images/slotTopAndBottom/${slotTopOption}x${slotBottomOption}/${adjustedSize}x${adjustedLength}.glb`;
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
      }
          
    }


// ---------------------------------------------------------------
// Roof
if (sizeOption && lengthSideOption && slotTopOption && slotBottomOption && roofOption) {
  const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
  const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;

    newPath = `images/Roof/${roofOption}/${slotTopOption}x${slotBottomOption}/${adjustedSize}x${adjustedLength}.glb`;
    newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
}

// --------------------------------------------------------- 
    // Louvers

    // 1 / 4
    if (sizeOption && lengthSideOption && slotTopOption && slotBottomOption && roofOption && louversOption && louverSizeOption === '1/4 ft') {
      const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
      const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
    
        newPath = `images/Louvers/${louversOption}/aQuarter/${slotTopOption}x${slotBottomOption}/${adjustedSize}x${adjustedLength}.glb`;
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
    }

  // 1 / 2 
    if (sizeOption && lengthSideOption && slotTopOption && slotBottomOption && roofOption && louversOption && louverSizeOption === '1/2 ft') {
      const adjustedSize = Math.ceil(parseInt(sizeOption) / 2) * 2;
      const adjustedLength = Math.ceil(parseInt(lengthSideOption) / 2) * 2;
    
        newPath = `images/Louvers/${louversOption}/half/${slotTopOption}x${slotBottomOption}/${adjustedSize}x${adjustedLength}.glb`;
        newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
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
