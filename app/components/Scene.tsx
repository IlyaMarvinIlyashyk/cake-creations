// import { Canvas } from "@react-three/fiber";
// import { Cake } from "./Cake";

// const Scene = () => {
//   return (
//     <Canvas camera={{ position: [8, 4, 8], fov: 50 }}>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <Cake />
//     </Canvas>
//   );
// };

// export default Scene;

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Cake } from "./Cake";
import type { CameraControls as CameraControlsType } from "@react-three/drei";
import Nav from "./Nav";
import { useControls, button } from "leva";
import * as THREE from "three";

// Logs camera position and target in real-time
const CameraDebugger = () => {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useControls("Camera Debug", {
    "Log Position": button(() => {
      // Get where the camera is looking
      camera.getWorldDirection(target.current);
      target.current.multiplyScalar(10).add(camera.position);

      const pos = camera.position;
      const tgt = target.current;

      console.log(`
Camera Position: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]
Camera Target:   [${tgt.x.toFixed(2)}, ${tgt.y.toFixed(2)}, ${tgt.z.toFixed(2)}]

Copy this for setLookAt:
cameraControlsRef.current?.setLookAt(
  ${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(
        2
      )},  // camera position
  ${tgt.x.toFixed(2)}, ${tgt.y.toFixed(2)}, ${tgt.z.toFixed(2)},  // target
  true
);
      `);
    }),
  });

  // Live display of position
  useFrame(() => {
    camera.getWorldDirection(target.current);
    target.current.multiplyScalar(10).add(camera.position);
  });

  return null;
};

const Scene = () => {
  const cameraControlsRef = useRef<CameraControlsType>(null);

  // These functions will be called from your navigation buttons
  const goToHero = () => {
    cameraControlsRef.current?.setLookAt(
      -0.2,
      7.23,
      0.75, // camera position
      -0.19,
      -2.5,
      -1.57, // target
      true
    );
  };

  const goToGallery = () => {
    cameraControlsRef.current?.setLookAt(6, 1, 6, 0, 1, 0, true);
  };

  const goToContact = () => {
    cameraControlsRef.current?.setLookAt(5, -2, 5, 0, -2.5, 0, true);
  };

  return (
    <>
      {/* HTML Navigation overlay */}
      <Nav onHome={goToHero} onGallery={goToGallery} onContact={goToContact} />

      {/* 3D Canvas */}
      <div className="h-screen w-screen">
        <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
          <color attach="background" args={["#fdf2f8"]} /> {/* pink-50 */}
          <CameraDebugger />
          <OrbitControls />
          <CameraControls
            ref={cameraControlsRef}
            smoothTime={0.5} // animation duration
          />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Cake />
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
