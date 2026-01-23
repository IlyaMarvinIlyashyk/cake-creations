"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Cake } from "./Cake";
import type { CameraControls as CameraControlsType } from "@react-three/drei";
import Nav from "./Nav/Nav";
import { useControls, button } from "leva";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { NavSection } from "./Nav/models/nav.models";
import { HeroOverlay } from "./Hero/HeroOverlay";
import Loader from "./Loader/Loader";
import { AnimatePresence } from "framer-motion";
import Gallery from "./Gallery/Gallery";

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
  const [section, setSection] = useState<NavSection>("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);

  // Set initial camera position looking LEFT of cake (cake off-screen to the right)
  // Then animate to final position where cake is in frame
  useEffect(() => {
    // Set initial camera: same position but looking LEFT of the cake (no animation)
    // Offset target X by +10 to look left of the cake
    cameraControlsRef.current?.setLookAt(
      -203.20, 264.80, 52.87,  // same camera position as final
      -187, 257.62, 48.70,     // target offset LEFT (higher X = looking left of cake)
      false  // no animation - instant
    );

    // Hide loader after scene settles
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    // Animate camera to reveal cake from the right
    const animTimer = setTimeout(() => {
      setHasAnimationStarted(true);
      cameraControlsRef.current?.setLookAt(
        -203.20, 264.80, 52.87,  // final camera position
        -197.64, 257.62, 48.70,  // final target (cake enters from right)
        true  // animate
      );
    }, 500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(animTimer);
    };
  }, []);

  const goToHero = () => {
    setSection("home");
    cameraControlsRef.current?.setLookAt(
      -203.20, 264.80, 52.87,
      -197.64, 257.62, 48.70,
      true
    );
  };

  const goToGallery = () => {
    setSection("gallery");
    cameraControlsRef.current?.setLookAt(6, 1, 6, 0, 1, 0, true);
  };

  const goToContact = () => {
    setSection("contact");
    cameraControlsRef.current?.setLookAt(5, -2, 5, 0, -2.5, 0, true);
  };

  return (
    <>
      <Gallery />
    </>
  );
};

export default Scene;






// {/* Loader - fades out when scene is ready */ }
// <AnimatePresence>
//   {!isLoaded && <Loader />}
// </AnimatePresence>

// {/* Navigation - animates in after camera animation starts */ }
// <Nav
//   onHome={goToHero}
//   onGallery={goToGallery}
//   onContact={goToContact}
//   isVisible={hasAnimationStarted}
// />

// {/* Hero overlay - synced with animation state */ }
//       <HeroOverlay section={section} isAnimating={hasAnimationStarted} />

//       <div className="h-screen w-screen">
//         {/* Camera position set via CameraControls in useEffect */}
//         <Canvas shadows camera={{ position: [-203.20, 264.80, 52.87], fov: 50 }}>
//           <color attach="background" args={["#fdf2f8"]} /> {/* pink-50 */}
//           <CameraDebugger />
//           <OrbitControls />
//           <CameraControls
//             ref={cameraControlsRef}
//             smoothTime={0.8}
//           />
//           <ambientLight intensity={0.4} />
//           <directionalLight
//             position={[10, 10, 5]}
//             intensity={0.8}
//             castShadow
//             shadow-mapSize={[2048, 2048]}
//             shadow-camera-far={50}
//             shadow-camera-left={-10}
//             shadow-camera-right={10}
//             shadow-camera-top={10}
//             shadow-camera-bottom={-10}
//           />
//           <directionalLight
//             position={[-5, 5, -5]}
//             intensity={0.3}
//             color="#ffe4e1"
//           />
//           <pointLight position={[0, 8, 0]} intensity={0.3} />
//           <Environment preset="studio" environmentIntensity={0.3} />
//           <Cake />
//           <EffectComposer>
//             <Bloom
//               luminanceThreshold={0.95}
//               luminanceSmoothing={0.5}
//               intensity={0.15}
//             />
//             <ToneMapping mode={ToneMappingMode.LINEAR} />
//           </EffectComposer>
//         </Canvas>
//       </div>