import CakeLayer from "./CakeLayer";
import { Text } from "@react-three/drei";
import Gallery from "./Gallery";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

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

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0, 5.5, 0]}
        fontSize={0.5}
        color="#8b4513"
        anchorX="center"
        anchorY="middle"
      >
        Sweet Dreams Bakery
      </Text>
      <CakeLayer
        position={[0, 4, 0]}
        topRadius={1.5}
        bottomRadius={1.8}
        height={2}
        color="#ffb6c1"
      />
      <CakeLayer
        position={[0, 1, 0]}
        topRadius={2.2}
        bottomRadius={2.5}
        height={3}
        color="#ffc0cb"
      />
      <CakeLayer
        position={[0, -2.5, 0]}
        topRadius={3}
        bottomRadius={3.2}
        height={2.5}
        color="#ffe4e1"
      />
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Gallery images={galleryImages} />
    </group>
  );
};
