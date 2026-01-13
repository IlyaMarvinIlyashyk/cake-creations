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
    <mesh position={position}>
      <cylinderGeometry args={[topRadius, bottomRadius, height, 64]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default CakeLayer;
