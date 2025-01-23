import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Mesh } from 'three';

interface ModelViewerProps {
  data: {
    type: string;
    geometry: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    color?: string;
  };
}

const BasicShape: React.FC<{ data: ModelViewerProps['data'] }> = ({ data }) => {
  const meshRef = useRef<Mesh>(null);

  const getGeometry = () => {
    switch (data.geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[1, 1, 2, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.3, 16, 100]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      rotation={data.rotation.map(r => r * Math.PI / 180) as [number, number, number]}
      scale={data.scale}
    >
      {getGeometry()}
      <meshStandardMaterial color={data.color || '#2563EB'} />
    </mesh>
  );
};

export const ModelViewer: React.FC<ModelViewerProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BasicShape data={data} />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
};

// useEffect(() => {
//     const fetchModel = async () => {
//         const response = await fetch('/api/ai/model');
//         const data = await response.json();
//         setModelData(data);
//     };
//     fetchModel();
// }, []);
