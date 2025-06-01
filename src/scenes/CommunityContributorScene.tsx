import React from 'react';
import { Text } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { CharacterController } from '../components/CharacterController';
import { FollowCamera } from '../components/FollowCamera';
import { Portal } from '../components/Portal';
import { SceneProps } from '../types/SceneTypes';

const characterRef = { current: null };

export function CommunityContributorScene({ setCurrentScene }: SceneProps) {
  return (
    <>
      <Text position={[0, 3, -5]} fontSize={0.5} color="white">
        Welcome to the Community Contributor!
      </Text>
      
      <Physics>
        <CharacterController ref={characterRef} />
        
        {/* Ground */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="mediumpurple" roughness={0.8} />
          </mesh>
          {/* Hidden floor for physics */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[20, 0.1, 20]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </RigidBody>

        {/* Community boards */}
        <RigidBody type="fixed" position={[-4, 1, -4]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" position={[4, 1, 4]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
        </RigidBody>

        {/* Collaboration pods */}
        <RigidBody type="fixed" position={[0, 0.5, -2]} colliders="cuboid">
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 1, 6]} />
            <meshStandardMaterial color="#9370DB" />
          </mesh>
        </RigidBody>
      </Physics>
      
      <FollowCamera target={characterRef} />
      
      <Portal
        position={[0, 1.5, 8]}
        onInteract={() => setCurrentScene('CityHub')}
        label="Back to City"
      />
      {/* Later: Load your community scene GLB here */}
    </>
  );
} 