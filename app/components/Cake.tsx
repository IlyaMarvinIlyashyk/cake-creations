import { Text3D, Center, useGLTF } from "@react-three/drei";
import Gallery from "./Gallery";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useControls } from "leva";

// Preload the cake model
useGLTF.preload("/models/cake-optimized.glb");

const galleryImages = [
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
  "/gallery/pexels-abhinavcoca-291528.jpg",
];

export const Cake = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/cake.glb");

  // Enable shadows on the loaded model
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = state?.clock?.elapsedTime * 0.5 * 0.5;
    }
  });

  // Controls for cake model
  const cakeModel = useControls("Cake Model", {
    scale: { value: 1, min: 0.1, max: 5, step: 0.1 },
    posX: { value: 0, min: -10, max: 10, step: 0.1 },
    posY: { value: 0, min: -10, max: 10, step: 0.1 },
    posZ: { value: 0, min: -10, max: 10, step: 0.1 },
  });

  // Controls for "Elena's" text
  const elenaText = useControls("Elena's Text", {
    size: { value: 1, min: 0.1, max: 3, step: 0.01 },
    height: { value: 0.15, min: 0.01, max: 1, step: 0.01 },
    curveSegments: { value: 12, min: 1, max: 32, step: 1 },
    bevelEnabled: true,
    bevelThickness: { value: 0.02, min: 0, max: 0.2, step: 0.005 },
    bevelSize: { value: 0.02, min: 0, max: 0.2, step: 0.005 },
    bevelSegments: { value: 5, min: 1, max: 10, step: 1 },
    posX: { value: -2, min: -10, max: 10, step: 0.1 },
    posY: { value: 5.5, min: -5, max: 15, step: 0.1 },
    posZ: { value: -1, min: -10, max: 10, step: 0.1 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    color: "#8b4513",
  });

  // Controls for "Cake Creations" text
  const cakeText = useControls("Cake Creations Text", {
    size: { value: 0.4, min: 0.1, max: 3, step: 0.01 },
    height: { value: 0.15, min: 0.01, max: 1, step: 0.01 },
    curveSegments: { value: 12, min: 1, max: 32, step: 1 },
    bevelEnabled: true,
    bevelThickness: { value: 0.02, min: 0, max: 0.2, step: 0.005 },
    bevelSize: { value: 0.02, min: 0, max: 0.2, step: 0.005 },
    bevelSegments: { value: 5, min: 1, max: 10, step: 1 },
    posX: { value: -2, min: -10, max: 10, step: 0.1 },
    posY: { value: 5.5, min: -5, max: 15, step: 0.1 },
    posZ: { value: 0, min: -10, max: 10, step: 0.1 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    color: "#8b4513",
  });

  return (
    <group ref={groupRef}>
      <Text3D
        font="/fonts/gentilis_regular.typeface.json"
        size={elenaText.size}
        height={elenaText.height}
        curveSegments={elenaText.curveSegments}
        bevelEnabled={elenaText.bevelEnabled}
        bevelThickness={elenaText.bevelThickness}
        bevelSize={elenaText.bevelSize}
        bevelSegments={elenaText.bevelSegments}
        position={[elenaText.posX, elenaText.posY, elenaText.posZ]}
        rotation={[
          elenaText.rotationX,
          elenaText.rotationY,
          elenaText.rotationZ,
        ]}
        castShadow
      >
        Elena&apos;s
        <meshStandardMaterial
          color={elenaText.color}
          roughness={0.4}
          metalness={0.3}
        />
      </Text3D>
      <Text3D
        font="/fonts/gentilis_regular.typeface.json"
        size={cakeText.size}
        height={cakeText.height}
        curveSegments={cakeText.curveSegments}
        bevelEnabled={cakeText.bevelEnabled}
        bevelThickness={cakeText.bevelThickness}
        bevelSize={cakeText.bevelSize}
        bevelSegments={cakeText.bevelSegments}
        position={[cakeText.posX, cakeText.posY, cakeText.posZ]}
        rotation={[cakeText.rotationX, cakeText.rotationY, cakeText.rotationZ]}
        castShadow
      >
        Cake Creations
        <meshStandardMaterial
          color={cakeText.color}
          roughness={0.4}
          metalness={0.3}
        />
      </Text3D>
      {/* Loaded cake model */}
      <primitive
        object={scene}
        position={[cakeModel.posX, cakeModel.posY, cakeModel.posZ]}
        scale={cakeModel.scale}
      />
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
      </mesh>
      <Gallery images={galleryImages} />
    </group>
  );
};
