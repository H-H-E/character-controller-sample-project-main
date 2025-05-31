import { Plane, Text } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

interface PortalProps {
  onInteract: () => void;
  label: string;
  size?: [number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Portal({ onInteract, label, size = [2, 3], position, rotation }: PortalProps) {
  return (
    <group position={position} rotation={rotation}>
      <Plane args={size} onClick={onInteract} castShadow>
        <meshStandardMaterial 
          color="purple" 
          emissive="purple" 
          emissiveIntensity={2} 
          transparent 
          opacity={0.6} 
        />
      </Plane>
      <Text 
        position={[0, size[1] / 2 + 0.5, 0.1]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center"
      >
        {label}
      </Text>
    </group>
  );
} 