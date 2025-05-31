import React from 'react';
import { Physics } from '@react-three/rapier';
import { CharacterController } from '../components/CharacterController';
import { Ground } from '../components/Ground';
import { FollowCamera } from '../components/FollowCamera';
import { BuildingPlaceholder } from '../components/BuildingPlaceholder';
import { Portal } from '../components/Portal';
import { SceneProps } from '../types/SceneTypes';

const characterRef = { current: null };

export function CityHub({ setCurrentScene }: SceneProps) {
  return (
    <>
      <Physics 
        interpolate={false}
      >
        <CharacterController ref={characterRef} />
        <Ground />

        {/* Innovation Lab Building & Portal */}
        <BuildingPlaceholder position={[-20, 0, 0]} size={[8, 12, 8]} color="#4a90e2" />
        <Portal
          position={[-20, 1.5, 4.5]}
          onInteract={() => setCurrentScene('InnovationLab')}
          label="Innovation Lab"
        />

        {/* Socialization Sphere Building & Portal */}
        <BuildingPlaceholder position={[20, 0, 0]} size={[8, 12, 8]} color="#e74c3c" />
        <Portal
          position={[20, 1.5, 4.5]}
          onInteract={() => setCurrentScene('SocializationSphere')}
          label="Socialization Sphere"
        />

        {/* Educational Journey Building & Portal */}
        <BuildingPlaceholder position={[0, 0, -20]} size={[8, 12, 8]} color="#2ecc71" />
        <Portal
          position={[0, 1.5, -15.5]}
          onInteract={() => setCurrentScene('EducationalJourney')}
          label="Educational Journey"
        />

        {/* Prom Experience Building & Portal */}
        <BuildingPlaceholder position={[-20, 0, 20]} size={[8, 12, 8]} color="#f39c12" />
        <Portal
          position={[-20, 1.5, 24.5]}
          onInteract={() => setCurrentScene('PromExperience')}
          label="Prom Experience"
        />

        {/* Community Contributor Building & Portal */}
        <BuildingPlaceholder position={[20, 0, 20]} size={[8, 12, 8]} color="#9b59b6" />
        <Portal
          position={[20, 1.5, 24.5]}
          onInteract={() => setCurrentScene('CommunityContributor')}
          label="Community Contributor"
        />
      </Physics>
      
      <FollowCamera target={characterRef} />
    </>
  );
} 