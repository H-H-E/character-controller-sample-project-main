import React from 'react';
import { Text } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { CharacterController } from '../components/CharacterController';
import { FollowCamera } from '../components/FollowCamera';
import { Portal } from '../components/Portal';
import { SceneProps } from '../types/SceneTypes';

const characterRef = { current: null };

export function PromExperienceScene({ setCurrentScene }: SceneProps) {
  return (
    <>
      <Text position={[0, 3, -5]} fontSize={0.5} color="white">
        Welcome to the Prom Experience!
      </Text>
      
      <Physics>
        <CharacterController ref={characterRef} />
        
        {/* Ground */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="gold" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Hidden floor for physics */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[20, 0.1, 20]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </RigidBody>

        {/* Dance floor platform */}
        <RigidBody type="fixed" position={[0, -0.9, 0]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[4, 4, 0.2, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </mesh>
        </RigidBody>

        {/* Decorative pillars */}
        <RigidBody type="fixed" position={[-6, 2, -6]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" position={[6, 2, 6]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>
        </RigidBody>
      </Physics>
      
      <FollowCamera target={characterRef} />
      
      <Portal
        position={[0, 1.5, 8]}
        onInteract={() => setCurrentScene('CityHub')}
        label="Back to City"
      />
      {/* Later: Load your prom scene GLB here */}
    </>
  );
} 