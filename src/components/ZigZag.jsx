import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useProgress, Html } from '@react-three/drei';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Safe initial check, in case window is undefined on SSR
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false; // default to desktop if window not available
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

function Model({ position, scale }) {
  const gltf = useGLTF('https://modelviewer.dev/shared-assets/models/Astronaut.glb');
  return <primitive object={gltf.scene} scale={scale} position={position} />;
}

function Loader() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (displayProgress < progress) {
      const id = requestAnimationFrame(() =>
        setDisplayProgress((prev) => Math.min(prev + 1, progress))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [progress, displayProgress]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <Html center>
      <div
        style={{
          width: '200px',
          height: '10px',
          border: '1px solid white',
          borderRadius: '5px',
          overflow: 'hidden',
          background: '#222',
        }}
      >
        <div
          style={{
            width: `${displayProgress}%`,
            height: '100%',
            background: 'orange',
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>
      <p style={{ color: 'white', marginTop: 8 }}>{displayProgress.toFixed(0)}% loaded</p>
    </Html>
  );
}

function ZigZag() {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log('isMobile:', isMobile); // Debug output
  }, [isMobile]);

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopThreshold = 1200;
  const desktopStartX = 3;
  const desktopEndX = -3;

  let xPos = 0;
  let yPos = 0;

  if (!isMobile) {
    if (scrollY < desktopThreshold) {
      xPos = desktopStartX + ((desktopEndX - desktopStartX) * (scrollY / desktopThreshold));
      yPos = 0;
    } else {
      xPos = desktopEndX;
      yPos = -(scrollY - desktopThreshold) / 10;
    }
  }

  const zPos = 0;

  return (
    <div style={{ position: 'relative', height: '200vh' }}>
      <div
        style={{
          width: '50vw',
          height: '100vh',
          border: '1px solid orange',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#111',
          color: 'white',
          fontSize: '1.5rem',
        }}
      >
        Jamal Mohammed R
      </div>

      <div
        style={{
          height: '100vh',
          backgroundColor: '#222',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          position: 'relative',
          zIndex: 1,
          marginLeft: '50vw',
        }}
      >
        Next Section Content
      </div>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <Canvas camera={{ position: isMobile ? [0, 1, 5] : [0, 2, 6], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={<Loader />}>
            {!isMobile && <Model position={[xPos, yPos, zPos]} scale={0.5} />}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default ZigZag;
