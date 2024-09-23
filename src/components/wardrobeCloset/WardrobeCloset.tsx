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
  slotBottomOption
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
    if (sizeOption && lengthSideOption && (!slotTopOption || slotTopOption === 'none') && slotBottomOption) {
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
    
        default:
          console.log("Invalid configuration");
          break;
      }
    }
    

    setModelPath(newPath);
    setCameraPosition(newCameraPosition);

    setControlsTarget(newControlsTarget);
    setRotation(newRotation);
  }, [sizeOption, lengthSideOption, slotTopOption]);

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
