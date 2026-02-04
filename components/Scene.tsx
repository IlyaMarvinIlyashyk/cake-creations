"use client";

import { Canvas } from "@react-three/fiber";
import { CameraControls, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Cake } from "./Cake";
import type { CameraControls as CameraControlsType } from "@react-three/drei";
import Nav from "./Nav/Nav";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { NavSection } from "./Nav/models/nav.models";
import { HeroOverlay } from "./Hero/HeroOverlay";
import Loader from "./Loader/Loader";
import { AnimatePresence } from "framer-motion";
import CameraDebugger from "./Debug/CameraDebugger";

const Scene = () => {
  const cameraControlsRef = useRef<CameraControlsType>(null);
  const [section, setSection] = useState<NavSection>("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);

  useEffect(() => {
    cameraControlsRef.current?.setLookAt(
      -203.2,
      264.8,
      52.87,
      -187,
      257.62,
      48.7,
      false
    );

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    const animTimer = setTimeout(() => {
      setHasAnimationStarted(true);
      cameraControlsRef.current?.setLookAt(
        -203.2,
        264.8,
        52.87,
        -197.64,
        257.62,
        48.7,
        true
      );
    }, 500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(animTimer);
    };
  }, []);

  const goToHero = () => {
    setSection("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToGallery = () => {
    setSection("gallery");
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToContact = () => {
    setSection("contact");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <AnimatePresence>{!isLoaded && <Loader />}</AnimatePresence>

      <Nav
        onHome={goToHero}
        onGallery={goToGallery}
        onContact={goToContact}
        isVisible={hasAnimationStarted}
      />

      {/* Hero section - scrolls naturally */}
      <div className="relative h-screen w-full">
        <Canvas shadows camera={{ position: [-203.2, 264.8, 52.87], fov: 50 }}>
          <color attach="background" args={["#fdf2f8"]} />
          <CameraDebugger />
          <CameraControls
            ref={cameraControlsRef}
            smoothTime={0.8}
            mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
            touches={{ one: 0, two: 0, three: 0 }}
          />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight
            position={[-5, 5, -5]}
            intensity={0.3}
            color="#ffe4e1"
          />
          <pointLight position={[0, 8, 0]} intensity={0.3} />
          <Environment preset="studio" environmentIntensity={0.3} />
          <Cake />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.95}
              luminanceSmoothing={0.5}
              intensity={0.15}
            />
            <ToneMapping mode={ToneMappingMode.LINEAR} />
          </EffectComposer>
        </Canvas>

        {/* Hero overlay - positioned over canvas, scrolls with it */}
        <HeroOverlay section={section} isAnimating={hasAnimationStarted} />
      </div>

      {/* Gallery section */}
      <section id="gallery" className="min-h-screen bg-white">
        <div className="container mx-auto px-8 py-16">
          <h2 className="text-4xl font-light text-pink-900 mb-8">Gallery</h2>
          <p className="text-pink-700">Your gallery content here...</p>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="min-h-screen bg-pink-50">
        <div className="container mx-auto px-8 py-16">
          <h2 className="text-4xl font-light text-pink-900 mb-8">Contact</h2>
          <p className="text-pink-700">Contact content here...</p>
        </div>
      </section>
    </div>
  );
};

export default Scene;
