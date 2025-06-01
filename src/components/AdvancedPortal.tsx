import React, { useRef } from 'react';
import { MeshPortalMaterial, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { SceneName } from '../types/SceneTypes';

interface AdvancedPortalProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  targetScene: SceneName;
  onEnter: (sceneName: SceneName) => void;
  label: string;
  portalContent: React.ReactNode;
  blend?: number;
  blur?: number;
}

export function AdvancedPortal({ 
  position, 
  rotation = [0, 0, 0], 
  size = [3, 4], 
  targetScene,
  onEnter,
  label,
  portalContent,
  blend = 0,
  blur = 0.5
}: AdvancedPortalProps) {
  const portalRef = useRef<Group>(null);

  useFrame(() => {
    // You can add portal animation or interaction logic here
    if (portalRef.current) {
      // Example: subtle floating animation
      portalRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  const handlePortalClick = () => {
    onEnter(targetScene);
  };

  return (
    <group position={position} rotation={rotation} ref={portalRef}>
      {/* Portal frame */}
      <mesh onClick={handlePortalClick}>
        <planeGeometry args={size} />
        <MeshPortalMaterial 
          transparent 
          blend={blend}
          blur={blur}
          resolution={512}
        >
          {portalContent}
        </MeshPortalMaterial>
      </mesh>
      
      {/* Portal frame border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[size[0] + 0.2, size[1] + 0.2]} />
        <meshStandardMaterial 
          color="#663399" 
          emissive="#663399" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Portal label */}
      <Text 
        position={[0, size[1] / 2 + 0.5, 0.1]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
      
      {/* Interactive hint */}
      <Text 
        position={[0, -size[1] / 2 - 0.3, 0.1]} 
        fontSize={0.15} 
        color="#cccccc" 
        anchorX="center"
      >
        Click to enter
      </Text>
    </group>
  );
} 