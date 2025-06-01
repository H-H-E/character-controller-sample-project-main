import React from 'react';
import { Physics } from '@react-three/rapier';
import { CharacterController } from '../components/CharacterController';
import { Ground } from '../components/Ground';
import { FollowCamera } from '../components/FollowCamera';
import { BuildingPlaceholder } from '../components/BuildingPlaceholder';
import { AdvancedPortal } from '../components/AdvancedPortal';
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
        <AdvancedPortal
          position={[-20, 3, 4.5]}
          targetScene="InnovationLab"
          onEnter={setCurrentScene}
          label="Innovation Lab"
          portalContent={
            <>
              <ambientLight intensity={0.5} />
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#4a90e2" />
              </mesh>
            </>
          }
        />

        {/* Socialization Sphere Building & Portal */}
        <BuildingPlaceholder position={[20, 0, 0]} size={[8, 12, 8]} color="#e74c3c" />
        <AdvancedPortal
          position={[20, 3, 4.5]}
          targetScene="SocializationSphere"
          onEnter={setCurrentScene}
          label="Socialization Sphere"
          portalContent={
            <>
              <ambientLight intensity={0.5} />
              <mesh>
                <cylinderGeometry args={[0.5, 0.5, 0.1, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            </>
          }
        />

        {/* Educational Journey Building & Portal */}
        <BuildingPlaceholder position={[0, 0, -20]} size={[8, 12, 8]} color="#2ecc71" />
        <AdvancedPortal
          position={[0, 3, -15.5]}
          targetScene="EducationalJourney"
          onEnter={setCurrentScene}
          label="Educational Journey"
          portalContent={
            <>
              <ambientLight intensity={0.5} />
              <mesh>
                <boxGeometry args={[0.5, 2, 1]} />
                <meshStandardMaterial color="#654321" />
              </mesh>
            </>
          }
        />

        {/* Prom Experience Building & Portal */}
        <BuildingPlaceholder position={[-20, 0, 20]} size={[8, 12, 8]} color="#f39c12" />
        <AdvancedPortal
          position={[-20, 3, 24.5]}
          targetScene="PromExperience"
          onEnter={setCurrentScene}
          label="Prom Experience"
          portalContent={
            <>
              <ambientLight intensity={0.5} />
              <mesh>
                <cylinderGeometry args={[2, 2, 0.1, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
              </mesh>
            </>
          }
        />

        {/* Community Contributor Building & Portal */}
        <BuildingPlaceholder position={[20, 0, 20]} size={[8, 12, 8]} color="#9b59b6" />
        <AdvancedPortal
          position={[20, 3, 24.5]}
          targetScene="CommunityContributor"
          onEnter={setCurrentScene}
          label="Community Contributor"
          portalContent={
            <>
              <ambientLight intensity={0.5} />
              <mesh>
                <cylinderGeometry args={[1.5, 1.5, 1, 6]} />
                <meshStandardMaterial color="#9370DB" />
              </mesh>
            </>
          }
        />
      </Physics>
      
      <FollowCamera target={characterRef} />
    </>
  );
} 