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

import { Canvas } from "@react-three/fiber";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Cake } from "./Cake";
import type { CameraControls as CameraControlsType } from "@react-three/drei";
import Nav from "./Nav";

const Scene = () => {
  const cameraControlsRef = useRef<CameraControlsType>(null);

  // These functions will be called from your navigation buttons
  const goToHero = () => {
    cameraControlsRef.current?.setLookAt(
      8,
      6,
      8, // camera position (x, y, z)
      0,
      4,
      0, // target to look at (x, y, z)
      true // animate the transition
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
          <OrbitControls enableZoom={false} enablePan={false} />
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
