import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei'; 
import { RepeatWrapping } from 'three';

export function Ground() {
  const texture = useTexture('/final-texture.png');
  
  // Configure texture for large ground area
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(16, 16); // Increased for larger area
  
  const groundSize = 100; // Much larger for city hub

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      {/* Hidden floor for physics */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[groundSize, 0.1, groundSize]} />
        <meshStandardMaterial visible={false} />
      </mesh>
    </RigidBody>
  );
}