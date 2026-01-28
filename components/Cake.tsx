import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useControls } from "leva";

useGLTF.preload("/models/cake-optimized.glb");

export const Cake = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/cake-optimized.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = state?.clock?.elapsedTime * 0.5 * 0.25;
    }
  });

  const cakeModel = useControls("Cake Model", {
    scale: { value: 1, min: 0.1, max: 5, step: 0.1 },
    posX: { value: 0, min: -10, max: 10, step: 0.1 },
    posY: { value: 0, min: -10, max: 10, step: 0.1 },
    posZ: { value: 0, min: -10, max: 10, step: 0.1 },
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        position={[cakeModel.posX, cakeModel.posY, cakeModel.posZ]}
        scale={cakeModel.scale}
      />
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
};
