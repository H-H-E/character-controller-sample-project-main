import { RigidBody } from '@react-three/rapier';
import { Box } from '@react-three/drei';

interface BuildingPlaceholderProps {
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
}

export function BuildingPlaceholder({ 
  position, 
  size = [5, 10, 5], 
  color = "grey" 
}: BuildingPlaceholderProps) {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
      <Box args={size} castShadow receiveShadow>
        <meshStandardMaterial color={color} />
      </Box>
    </RigidBody>
  );
} 