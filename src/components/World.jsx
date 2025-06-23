import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useState,useEffect } from 'react';

function BackgroundModel() {
  const gltf = useGLTF('space_nebula_hdri_panorama_360_skydome (1).glb');
  return <primitive object={gltf.scene} scale={2} />;
}


const World = () => {


  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <BackgroundModel />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default World;
