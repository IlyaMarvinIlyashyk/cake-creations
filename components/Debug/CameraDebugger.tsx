import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useControls, button } from "leva";

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

export default CameraDebugger;