import { useMemo } from "react";
import { Image } from "@react-three/drei";

type GalleryProps = {
  images: string[];
};

// TODO: REDO
const Gallery = ({ images }: GalleryProps) => {
  const imagePositions = useMemo(() => {
    return images.map((image, index) => {
      const angle = (index / images.length) * 2 * Math.PI;
      const radius = 2.6;
      return {
        position: [Math.sin(angle) * radius, 1, Math.cos(angle) * radius] as [
          number,
          number,
          number
        ],
        rotation: [0, angle, 0] as [number, number, number],
      };
    });
  }, [images]);

  return (
    <group>
      {images.map((url, index) => {
        return (
          <Image
            key={index}
            url={url}
            position={imagePositions[index].position}
            rotation={imagePositions[index].rotation}
            scale={1}
            transparent
          />
        );
      })}
    </group>
  );
};

export default Gallery;
