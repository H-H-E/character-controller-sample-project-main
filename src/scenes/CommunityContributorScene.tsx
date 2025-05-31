import React from 'react';
import { Plane, Text } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Portal } from '../components/Portal';
import { SceneProps } from '../types/SceneTypes';

export function CommunityContributorScene({ setCurrentScene }: SceneProps) {
  return (
    <>
      <Text position={[0, 3, -5]} fontSize={0.5} color="white">
        Welcome to the Community Contributor!
      </Text>
      <Physics>
        <RigidBody type="fixed">
          <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <meshStandardMaterial color="mediumpurple" />
          </Plane>
        </RigidBody>
      </Physics>
      <Portal
        position={[0, 1.5, 5]}
        onInteract={() => setCurrentScene('CityHub')}
        label="Back to City"
      />
      {/* Later: Load your community scene GLB here */}
    </>
  );
} 