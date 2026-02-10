"use client";

import { Canvas, useFrame } from "@react-three/fiber";
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
import * as THREE from "three";

// Camera keyframes
const HERO = {
  pos: [-263.67, 226.93, 115.41] as const,
  target: [-257.01, 221.94, 109.88] as const,
};
const GALLERY = {
  pos: [40, 130, 60] as const,
  target: [0, 100, 0] as const,
};

// ScrollCamera lives inside Canvas to use useFrame
function ScrollCamera({
  cameraControlsRef,
  scrollTarget,
  scrollProgress,
  onSectionChange,
}: {
  cameraControlsRef: React.RefObject<CameraControlsType | null>;
  scrollTarget: React.RefObject<number>;
  scrollProgress: React.RefObject<number>;
  onSectionChange: (section: NavSection) => void;
}) {
  const lastSection = useRef<NavSection>("home");

  useFrame((_, delta) => {
    // Damp scroll progress toward target (frame-rate independent)
    scrollProgress.current = THREE.MathUtils.damp(
      scrollProgress.current,
      scrollTarget.current,
      4,
      delta,
    );

    // Interpolate camera between hero and gallery
    cameraControlsRef.current?.lerpLookAt(
      HERO.pos[0],
      HERO.pos[1],
      HERO.pos[2],
      HERO.target[0],
      HERO.target[1],
      HERO.target[2],
      GALLERY.pos[0],
      GALLERY.pos[1],
      GALLERY.pos[2],
      GALLERY.target[0],
      GALLERY.target[1],
      GALLERY.target[2],
      scrollProgress.current,
      false,
    );

    // Update section based on threshold (only when it changes)
    const newSection: NavSection =
      scrollProgress.current > 0.8
        ? "gallery"
        : scrollProgress.current < 0.2
          ? "home"
          : lastSection.current;
    if (newSection !== lastSection.current) {
      lastSection.current = newSection;
      onSectionChange(newSection);
    }
  });

  return null;
}

const Scene = () => {
  const cameraControlsRef = useRef<CameraControlsType>(null);
  const [section, setSection] = useState<NavSection>("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);

  // Scroll state — refs to avoid re-renders
  const scrollTarget = useRef(0);
  const scrollProgress = useRef(0);

  useEffect(() => {
    // Initial: look LEFT of cake (cake off-screen to the right)
    cameraControlsRef.current?.setLookAt(-150, 150, 250, -80, 85, 0, false);

    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    // Hand off to scroll system after load
    const animTimer = setTimeout(() => {
      setHasAnimationStarted(true);
      scrollTarget.current = 0;
      scrollProgress.current = 0;
    }, 500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(animTimer);
    };
  }, []);

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const snapTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // Native wheel listener with { passive: false } so preventDefault works
  useEffect(() => {
    const el = canvasWrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTarget.current = THREE.MathUtils.clamp(
        scrollTarget.current + e.deltaY / 1000,
        0,
        1,
      );

      // Snap-assist after user stops scrolling for 300ms
      if (snapTimer.current) clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        if (scrollTarget.current > 0.7) scrollTarget.current = 1;
        else if (scrollTarget.current < 0.3) scrollTarget.current = 0;
      }, 300);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const goToHero = () => {
    setSection("home");
    scrollTarget.current = 0;
  };

  const goToGallery = () => {
    setSection("gallery");
    scrollTarget.current = 1;
  };

  const goToContact = () => {
    setSection("contact");
    cameraControlsRef.current?.setLookAt(-60, 50, 80, 0, 60, 0, true);
  };

  return (
    <>
      {/* Loader - fades out when scene is ready */}
      <AnimatePresence>{!isLoaded && <Loader />}</AnimatePresence>

      {/* Navigation - animates in after camera animation starts */}
      <Nav
        onHome={goToHero}
        onGallery={goToGallery}
        onContact={goToContact}
        isVisible={hasAnimationStarted}
      />

      {/* Hero overlay - synced with animation state */}
      <HeroOverlay section={section} isAnimating={hasAnimationStarted} />

      <div ref={canvasWrapperRef} className="h-screen w-screen">
        <Canvas shadows camera={{ position: [-150, 150, 250], fov: 50 }}>
          <color attach="background" args={["#fdf2f8"]} />
          <CameraDebugger />
          <CameraControls
            ref={cameraControlsRef}
            smoothTime={0.8}
            minDistance={0}
            maxDistance={Infinity}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            mouseButtons-wheel={0}
          />
          <ScrollCamera
            cameraControlsRef={cameraControlsRef}
            scrollTarget={scrollTarget}
            scrollProgress={scrollProgress}
            onSectionChange={setSection}
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
          <Cake section={section} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.95}
              luminanceSmoothing={0.5}
              intensity={0.15}
            />
            <ToneMapping mode={ToneMappingMode.LINEAR} />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
};

export default Scene;
