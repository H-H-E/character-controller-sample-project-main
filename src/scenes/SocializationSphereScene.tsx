import React from 'react';
import { Text } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { CharacterController } from '../components/CharacterController';
import { FollowCamera } from '../components/FollowCamera';
import { Portal } from '../components/Portal';
import { SceneProps } from '../types/SceneTypes';

const characterRef = { current: null };

export function SocializationSphereScene({ setCurrentScene }: SceneProps) {
  return (
    <>
      <Text position={[0, 3, -5]} fontSize={0.5} color="white">
        Welcome to the Socialization Sphere!
      </Text>
      
      <Physics>
        <CharacterController ref={characterRef} />
        
        {/* Ground */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="lightblue" roughness={0.8} />
          </mesh>
          {/* Hidden floor for physics */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[20, 0.1, 20]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </RigidBody>

        {/* Cafe tables */}
        <RigidBody type="fixed" position={[-4, 0, -2]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 0.1, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" position={[4, 0, 2]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, 0.1, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </RigidBody>
      </Physics>
      
      <FollowCamera target={characterRef} />
      
      <Portal
        position={[0, 1.5, 8]}
        onInteract={() => setCurrentScene('CityHub')}
        label="Back to City"
      />
      {/* Later: Load your "Cafe Soca" GLB here */}
    </>
  );
} 