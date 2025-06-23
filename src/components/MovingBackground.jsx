import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function MovingBackground({ isActive }) {
  const gltf = useGLTF('/119613_stars (1).glb');
  const modelRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (modelRef.current && isActive) {
      // Example movement
      modelRef.current.position.x += 0.01;    // move right
      modelRef.current.rotation.y += 0.01;    // rotate slowly

      // Log current values
      console.log('Position:', modelRef.current.position);
      console.log('Rotation:', modelRef.current.rotation);
      console.log('Camera:', camera.position);
    }
  });

  return (
    <primitive ref={modelRef} object={gltf.scene} scale={1.5} />
  );
}
