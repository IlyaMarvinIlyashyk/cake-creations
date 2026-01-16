type CakeLayerProps = {
  position: [number, number, number];
  topRadius: number;
  bottomRadius: number;
  height: number;
  color: string;
};

const CakeLayer = ({
  position,
  topRadius,
  bottomRadius,
  height,
  color,
}: CakeLayerProps) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[topRadius, bottomRadius, height, 64]} />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
};

export default CakeLayer;
