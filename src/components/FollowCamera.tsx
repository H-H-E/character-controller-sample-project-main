import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Spherical, MathUtils } from 'three';
import type { Group } from 'three';
import { PerspectiveCamera } from '@react-three/drei';
import { useKeyboardControls } from '@react-three/drei';
import { useCameraControls } from '../hooks/useCameraControls';

type FollowCameraProps = {
  target: { current: { position: Vector3 } | null };
};

export function FollowCamera({ target }: FollowCameraProps) {
  const cameraRef = useRef<Group>(null);
  const controls = useCameraControls();
  const currentPos = useRef(new Vector3());
  const { gl } = useThree();
  const [, getKeys] = useKeyboardControls();
  
  // Mouse look state
  const spherical = useRef(new Spherical(controls.distance, Math.PI / 3, 0));
  const defaultSpherical = useRef(new Spherical(controls.distance, Math.PI / 3, 0));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Movement detection
  const lastPosition = useRef(new Vector3());
  const [isCharacterMoving, setIsCharacterMoving] = useState(false);
  const movementCheckTimer = useRef(0);
  
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleMouseDown = (event: MouseEvent) => {
      // Right click or left click for mouse look
      if (event.button === 2 || event.button === 0) {
        setIsMouseDown(true);
        mousePos.current.x = event.clientX;
        mousePos.current.y = event.clientY;
        canvas.style.cursor = 'grabbing';
      }
    };
    
    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 2 || event.button === 0) {
        setIsMouseDown(false);
        canvas.style.cursor = 'auto';
      }
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;
      
      const deltaX = event.clientX - mousePos.current.x;
      const deltaY = event.clientY - mousePos.current.y;
      
      // Update spherical coordinates for orbiting
      spherical.current.theta -= deltaX * 0.01; // Horizontal rotation
      spherical.current.phi += deltaY * 0.01;   // Vertical rotation
      
      // Clamp vertical rotation to prevent flipping
      spherical.current.phi = MathUtils.clamp(spherical.current.phi, 0.1, Math.PI - 0.1);
      
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    };
    
    const handleContextMenu = (event: Event) => {
      event.preventDefault(); // Prevent right-click context menu
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mouseup', handleMouseUp); // Handle mouse up outside canvas
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl.domElement, isMouseDown]);
  
  useFrame((state, delta) => {
    if (!target.current || !cameraRef.current) return;

    const targetPosition = target.current.position;
    const input = getKeys();
    
    // Detect character movement via position change
    const currentTargetPos = targetPosition.clone();
    const movementThreshold = 0.01; // Minimum movement to detect
    const distanceMoved = currentTargetPos.distanceTo(lastPosition.current);
    
    // Also detect movement intention via input keys
    const hasMovementInput = input.forward || input.backward || input.left || input.right;
    
    if (distanceMoved > movementThreshold || hasMovementInput) {
      setIsCharacterMoving(true);
      movementCheckTimer.current = 0;
    } else {
      // Reset timer when not moving
      movementCheckTimer.current += delta;
      if (movementCheckTimer.current > 0.2) { // Stop considering as moving after 0.2 seconds
        setIsCharacterMoving(false);
      }
    }
    
    lastPosition.current.copy(currentTargetPos);
    
    // Auto-return camera when character starts moving
    if (isCharacterMoving) {
      // Smoothly return to default behind-character position
      const returnSpeed = 0.2; // How fast to return (higher = faster)
      spherical.current.theta = MathUtils.lerp(spherical.current.theta, defaultSpherical.current.theta, returnSpeed);
      spherical.current.phi = MathUtils.lerp(spherical.current.phi, defaultSpherical.current.phi, returnSpeed);
    }
    
    // Update spherical radius based on controls
    spherical.current.radius = controls.distance;
    
    // Calculate camera position using spherical coordinates
    const offset = new Vector3();
    offset.setFromSpherical(spherical.current);
    
    // Position camera relative to target
    const targetPos = targetPosition.clone().add(new Vector3(0, controls.height, 0)).add(offset);
    
    // Smooth camera movement
    currentPos.current.lerp(targetPos, controls.smoothness);
    state.camera.position.copy(currentPos.current);
    
    // Look at target (with slight offset upward)
    const lookTarget = targetPosition.clone().add(new Vector3(0, controls.height * 0.5, 0));
    state.camera.lookAt(lookTarget);
  });

  return (
    <group ref={cameraRef}>
      <PerspectiveCamera makeDefault position={[0, controls.height, controls.distance]} fov={75} />
    </group>
  );
}