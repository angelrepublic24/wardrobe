import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  const gltf = useLoader(GLTFLoader, modelPath);
  gltf.scene.scale.set(20, 20, 20);
  if (rotation) {
    gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
  } else {
    gltf.scene.rotation.x = Math.PI / 0.5; // Rotación por defecto
    gltf.scene.rotation.y = Math.PI;
  }

  useEffect(() => {
    if (onModelLoaded) {
      onModelLoaded(gltf.scene);
    }
  }, [gltf, onModelLoaded]);

  return <primitive object={gltf.scene} />;
};
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
          newPath = "images/base/20ft.glb";
      }
    }

    if (sizeOption && lengthSideOption) {
      switch (`${sizeOption}-${lengthSideOption}`) {
        // Base 2 ft
        case "2 ft-2 ft":
          newPath = "images/completSize/2x2.glb";
          newControlsTarget.set(10, 5.5, 40);
          break;
        case "2 ft-4 ft":
          newPath = "images/completSize/2x4.glb";
          break;
        case "2 ft-6 ft":
          newPath = "images/completSize/2x6.glb";
          break;
        case "2 ft-8 ft":
          newPath = "images/completSize/2x8.glb";
          break;
        case "2 ft-10 ft":
          newPath = "images/completSize/2x10.glb";
          break;

        // Base 4 ft
        case "4 ft-2 ft":
          newPath = "images/completSize/4x2.glb";
          break;
        case "4 ft-4 ft":
          newPath = "images/completSize/4x4.glb";
          break;
        case "4 ft-6 ft":
          newPath = "images/completSize/4x6.glb";
          break;
        case "4 ft-8 ft":
          newPath = "images/completSize/4x8.glb";
          break;
        case "4 ft-10 ft":
          newPath = "images/completSize/4x10.glb";
          break;

        // Base 6 ft
        case "6 ft-2 ft":
          newPath = "images/completSize/6x2.glb";
          break;
        case "6 ft-4 ft":
          newPath = "images/completSize/6x4.glb";
          break;
        case "6 ft-6 ft":
          newPath = "images/completSize/6x6.glb";
          break;
        case "6 ft-8 ft":
          newPath = "images/completSize/6x8.glb";
          break;
        case "6 ft-10 ft":
          newPath = "images/completSize/6x10.glb";
          break;

        // Base 8 ft
        case "8 ft-2 ft":
          newPath = "images/completSize/8x2.glb";
          break;
        case "8 ft-4 ft":
          newPath = "images/completSize/8x4.glb";
          break;
        case "8 ft-6 ft":
          newPath = "images/completSize/8x6.glb";
          break;
        case "8 ft-8 ft":
          newPath = "images/completSize/8x8.glb";
          break;
        case "8 ft-10 ft":
          newPath = "images/completSize/8x10.glb";
          break;

        // Base 10 ft
        case "10 ft-2 ft":
          newPath = "images/completSize/10x2.glb";
          break;
        case "10 ft-4 ft":
          newPath = "images/completSize/10x4.glb";
          break;
        case "10 ft-6 ft":
          newPath = "images/completSize/10x6.glb";
          break;
        case "10 ft-8 ft":
          newPath = "images/completSize/10x8.glb";
          break;
        case "10 ft-10 ft":
          newPath = "images/completSize/10x10.glb";
          break;

        // Base 12 ft
        case "12 ft-2 ft":
          newPath = "images/completSize/12x2.glb";
          break;
        case "12 ft-4 ft":
          newPath = "images/completSize/12x4.glb";
          break;
        case "12 ft-6 ft":
          newPath = "images/completSize/12x6.glb";
          break;
        case "12 ft-8 ft":
          newPath = "images/completSize/12x8.glb";
          break;
        case "12 ft-10 ft":
          newPath = "images/completSize/12x10.glb";
          break;

        // Base 14 ft
        case "14 ft-2 ft":
          newPath = "images/completSize/14x2.glb";
          break;
        case "14 ft-4 ft":
          newPath = "images/completSize/14x4.glb";
          break;
        case "14 ft-6 ft":
          newPath = "images/completSize/14x6.glb";
          break;
        case "14 ft-8 ft":
          newPath = "images/completSize/14x8.glb";
          break;
        case "14 ft-10 ft":
          newPath = "images/completSize/14x10.glb";
          break;

        // Base 16 ft
        case "16 ft-2 ft":
          newPath = "images/completSize/16x2.glb";
          break;
        case "16 ft-4 ft":
          newPath = "images/completSize/16x4.glb";
          break;
        case "16 ft-6 ft":
          newPath = "images/completSize/16x6.glb";
          break;
        case "16 ft-8 ft":
          newPath = "images/completSize/16x8.glb";
          break;
        case "16 ft-10 ft":
          newPath = "images/completSize/16x10.glb";
          break;

        // Base 18 ft
        case "18 ft-2 ft":
          newPath = "images/completSize/18x2.glb";
          break;
        case "18 ft-4 ft":
          newPath = "images/completSize/18x4.glb";
          break;
        case "18 ft-6 ft":
          newPath = "images/completSize/18x6.glb";
          break;
        case "18 ft-8 ft":
          newPath = "images/completSize/18x8.glb";
          break;
        case "18 ft-10 ft":
          newPath = "images/completSize/18x10.glb";
          break;

        // Base 20 ft
        case "20 ft-2 ft":
          newPath = "images/completSize/20x2.glb";
          break;
        case "20 ft-4 ft":
          newPath = "images/completSize/20x4.glb";
          break;
        case "20 ft-6 ft":
          newPath = "images/completSize/20x6.glb";
          break;
        case "20 ft-8 ft":
          newPath = "images/completSize/20x8.glb";
          break;
        case "20 ft-10 ft":
          newPath = "images/completSize/20x10.glb";
          break;

        default:
          break;
      }
    }

    // Slot Top
    if (sizeOption && lengthSideOption && slotTopOption) {
      switch (`${sizeOption}-${lengthSideOption}-${slotTopOption}`) {
        // Channel
        // 2 ft
        case "2 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 4 Ft
        case "4 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "8 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "10 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "12 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "14 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "16 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "18 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "20 ft-2 ft-Channel":
          newPath = "images/slotTop/Channel/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Channel":
          newPath = "images/slotTop/Channel/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Channel":
          newPath = "images/slotTop/Channel/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Channel":
          newPath = "images/slotTop/Channel/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Channel":
          newPath = "images/slotTop/Channel/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        // -------------------------------------------------------------------
        // Tube
        case "2 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 4 Ft
        case "4 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 6 Ft
        case "6 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 8 Ft
        case "8 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 10 Ft
        case "10 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 12 Ft
        case "12 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 14 Ft
        case "14 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        // 16 Ft
        case "16 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 18 Ft
        case "18 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 20 Ft
        case "20 ft-2 ft-Tube":
          newPath = "images/slotTop/Tube/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Tube":
          newPath = "images/slotTop/Tube/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Tube":
          newPath = "images/slotTop/Tube/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Tube":
          newPath = "images/slotTop/Tube/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Tube":
          newPath = "images/slotTop/Tube/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // ---------------------------------------------------------------------------------
        // Crown
        // 2 Ft
        case "2 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 4 Ft
        case "4 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 6 Ft
        case "6 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 8 Ft
        case "8 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 10 Ft
        case "10 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 12 Ft
        case "12 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 14 Ft
        case "14 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 16 Ft
        case "16 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 18 Ft
        case "18 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 20 Ft
        case "20 ft-2 ft-Crown":
          newPath = "images/slotTop/Crown/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Crown":
          newPath = "images/slotTop/Crown/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Crown":
          newPath = "images/slotTop/Crown/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Crown":
          newPath = "images/slotTop/Crown/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Crown":
          newPath = "images/slotTop/Crown/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // Añadir más combinaciones aquí
        default:
          break;
      }
    }

    // Slot Bottom
    if (
      sizeOption &&
      lengthSideOption &&
      (!slotTopOption || slotTopOption === "None") &&
      slotBottomOption
    ) {
      switch (`${sizeOption}-${lengthSideOption}-${slotBottomOption}`) {
        // Channel
        // 2 ft
        case "2 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 4 ft
        case "4 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 6 ft
        case "6 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 8 ft
        case "8 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 10 ft
        case "10 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 12 ft
        case "12 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 14 ft
        case "14 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 16 ft
        case "16 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 18 ft
        case "18 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 20 ft
        case "20 ft-2 ft-Channel":
          newPath = "images/slotBottom/Channel/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Channel":
          newPath = "images/slotBottom/Channel/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Channel":
          newPath = "images/slotBottom/Channel/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Channel":
          newPath = "images/slotBottom/Channel/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Channel":
          newPath = "images/slotBottom/Channel/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        //  Tube

        case "2 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 4 ft
        case "4 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 6 ft
        case "6 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 8 ft
        case "8 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 10 ft
        case "10 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 12 ft
        case "12 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 14 ft
        case "14 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        // 16 ft
        case "16 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 18 ft
        case "18 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 20 ft
        case "20 ft-2 ft-Tube":
          newPath = "images/slotBottom/Tube/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Tube":
          newPath = "images/slotBottom/Tube/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Tube":
          newPath = "images/slotBottom/Tube/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Tube":
          newPath = "images/slotBottom/Tube/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Tube":
          newPath = "images/slotBottom/Tube/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        //   Crown
        // 2 ft
        case "2 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 4 ft
        case "4 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 6 ft
        case "6 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 8 ft
        case "8 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 10 ft
        case "10 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Crown":
          newPath = "images/slotBottom/Crown/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 12 ft
        case "12 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Crown":
          newPath = "images/slotBottom/Crown/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-12 ft-Crown":
          newPath = "images/slotBottom/Crown/12x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 14 ft
        case "14 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Crown":
          newPath = "images/slotBottom/Crown/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-12 ft-Crown":
          newPath = "images/slotBottom/Crown/14x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-14 ft-Crown":
          newPath = "images/slotBottom/Crown/14x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 16 ft
        case "16 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Crown":
          newPath = "images/slotBottom/Crown/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-12 ft-Crown":
          newPath = "images/slotBottom/Crown/16x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-14 ft-Crown":
          newPath = "images/slotBottom/Crown/16x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-16 ft-Crown":
          newPath = "images/slotBottom/Crown/16x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 18 ft
        case "18 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Crown":
          newPath = "images/slotBottom/Crown/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-12 ft-Crown":
          newPath = "images/slotBottom/Crown/18x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-14 ft-Crown":
          newPath = "images/slotBottom/Crown/18x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-16 ft-Crown":
          newPath = "images/slotBottom/Crown/18x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-18 ft-Crown":
          newPath = "images/slotBottom/Crown/18x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        // 20 ft
        case "20 ft-2 ft-Crown":
          newPath = "images/slotBottom/Crown/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Crown":
          newPath = "images/slotBottom/Crown/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Crown":
          newPath = "images/slotBottom/Crown/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Crown":
          newPath = "images/slotBottom/Crown/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Crown":
          newPath = "images/slotBottom/Crown/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-12 ft-Crown":
          newPath = "images/slotBottom/Crown/20x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-14 ft-Crown":
          newPath = "images/slotBottom/Crown/20x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-16 ft-Crown":
          newPath = "images/slotBottom/Crown/20x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-18 ft-Crown":
          newPath = "images/slotBottom/Crown/20x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-20 ft-Crown":
          newPath = "images/slotBottom/Crown/20x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        default:
          console.log("Invalid configuration");
          break;
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown" &&
      slotBottomOption === "Crown"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "4 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "6 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "8 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "10 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "12 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "14 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "16 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "18 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "20 ft-2 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Crown-Crown":
          newPath = "images/slotTopAndBottom/CrownxCrown/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Channel"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "4 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "6 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "8 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "10 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "12 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "14 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "16 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "18 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "20 ft-2 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Channel-Channel":
          newPath = "images/slotTopAndBottom/ChannelxChannel/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        default:
          console.log("No matching size and length found for Channel.");
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Tube"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/2x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "4 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/4x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "6 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/6x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "8 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/8x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "10 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/10x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "12 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/12x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "14 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "14 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/14x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "16 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/16x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "18 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-12 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x12.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-14 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x14.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-16 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x16.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-18 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x18.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-20 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/18x20.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;

        case "20 ft-2 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Tube-Tube":
          newPath = "images/slotTopAndBottom/TubexTube/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Tube"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "4 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "6 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "8 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "10 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "12 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "14 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "16 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "18 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "20 ft-2 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Channel-Tube":
          newPath = "images/slotTopAndBottom/ChannelxTube/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        // Puedes seguir agregando más combinaciones aquí si lo necesitas.
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Channel" &&
      slotBottomOption === "Crown"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "4 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "6 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "8 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "10 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "12 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "14 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "16 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "18 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "20 ft-2 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Channel-Crown":
          newPath = "images/slotTopAndBottom/ChannelxCrown/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        // Puedes seguir agregando más combinaciones aquí si lo necesitas.
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Crown"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "4 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "6 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "8 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "10 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "12 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "14 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "16 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "18 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "20 ft-2 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Tube-Crown":
          newPath = "images/slotTopAndBottom/TubexCrown/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        // Puedes seguir agregando más combinaciones aquí si lo necesitas.
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Tube" &&
      slotBottomOption === "Channel"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "4 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "6 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "8 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "10 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "12 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "14 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "16 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "18 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "20 ft-2 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Tube-Channel":
          newPath = "images/slotTopAndBottom/TubexChannel/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        // Puedes seguir agregando más combinaciones aquí si lo necesitas.
      }
    }

    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown" &&
      slotBottomOption === "Channel"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "4 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "6 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "8 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "10 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "12 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "14 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "16 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "18 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "20 ft-2 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Crown-Channel":
          newPath = "images/slotTopAndBottom/CrownxChannel/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        // Puedes seguir agregando más combinaciones aquí si lo necesitas.
      }
    }
    
    if (
      sizeOption &&
      lengthSideOption &&
      slotTopOption === "Crown" &&
      slotBottomOption === "Tube"
    ) {
      switch (
        `${sizeOption}-${lengthSideOption}-${slotTopOption}-${slotBottomOption}`
      ) {
        case "2 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/2x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/2x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/2x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/2x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "2 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/2x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "4 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/4x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/4x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/4x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/4x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "4 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/4x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "6 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/6x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/6x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/6x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/6x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "6 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/6x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "8 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/8x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/8x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/8x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/8x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "8 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/8x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "10 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/10x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/10x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/10x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/10x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "10 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/10x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "12 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/12x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/12x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/12x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/12x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "12 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/12x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "14 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/14x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/14x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/14x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/14x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "14 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/14x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "16 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/16x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/16x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/16x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/16x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "16 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/16x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "18 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/18x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/18x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/18x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/18x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "18 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/18x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        case "20 ft-2 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/20x2.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-4 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/20x4.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-6 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/20x6.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-8 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/20x8.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
        case "20 ft-10 ft-Crown-Tube":
          newPath = "images/slotTopAndBottom/CrownxTube/20x10.glb";
          newRotation = { x: Math.PI / 3, y: Math.PI / 2, z: 5.2 };
          break;
    
        // Puedes seguir agregando más combinaciones aquí si lo necesitas.
      }
    }
    
    
    
    
    

    setModelPath(newPath);
    setCameraPosition(newCameraPosition);

    setControlsTarget(newControlsTarget);
    setRotation(newRotation);
  }, [sizeOption, lengthSideOption, slotTopOption, slotBottomOption]);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
    }
  }, [cameraPosition]);

  const handleModelLoaded = (loadedModel) => {
    setModel(loadedModel);
  };
  return (
    <div className="border rounded-3xl bg-white w-full md:w-1/2">
      <Canvas
        className="border rounded-3xl bg-white"
        camera={{ position: cameraPosition, fov: 25 }}
        style={{ height: "600px", width: "100%", background: "#d3d3d3" }}
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
