import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { BsGithub, BsInstagram } from "react-icons/bs";
import { GrLinkedinOption } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { Element } from 'react-scroll';
import World from './World';
import '@fontsource/audiowide';
import '@fontsource/orbitron';
import '@fontsource/space-mono';
import { FaXTwitter } from 'react-icons/fa6';

function BackgroundModel() {
  const gltf = useGLTF('/119613_stars (1).glb');
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={1} />;
}

export default function HeroSection() {
  const [paddingTop, setPaddingTop] = useState('0px');
  const [paraSize, setParaSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Define tolerances
      const isIPadPro = Math.abs(width - 1024) <= 20 && Math.abs(height - 1366) <= 20;

      // Set paddingTop
      if (isIPadPro) {
        setPaddingTop('3rem');
        setParaSize('text-4xl');
      } else if (height < 650) {
        setPaddingTop('8rem');
        setParaSize('text-base');
      } else {
        setPaddingTop('0px');
        setParaSize('text-base');
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isNestHub, setIsNestHub] = useState(false);

  useEffect(() => {
    const checkShortScreen = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Nest Hub detection: 1024 x 600 or similar
      const isNestHubLike = w === 1024 && h <= 600;

      setIsNestHub(isNestHubLike);
    };

    checkShortScreen();
    window.addEventListener('resize', checkShortScreen);
    return () => window.removeEventListener('resize', checkShortScreen);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      console.log("Window size:", width, height);

      if (width === 375 && height === 667) {
        // iPhone SE
        setPaddingTop('8rem');
      } else if (width === 1024 && height === 600) {
        // Nest Hub or similar short screen
        setPaddingTop('7.5rem'); // adjust if needed
      }
      else if (width === 820 && height === 1180) {
        // Nest Hub or similar short screen
        setPaddingTop('6rem'); // adjust if needed
      }
      else if (width === 414 && height === 896) {
        // Nest Hub or similar short screen
        setPaddingTop('5rem'); // adjust if needed
      }
       else if (width === 430 && height === 932) {
        // Nest Hub or similar short screen
        setPaddingTop('3rem'); // adjust if needed
      }
       else if (width === 768 && height === 1024) {
        // Nest Hub or similar short screen
        setPaddingTop('8rem'); // adjust if needed
      } else if (height < 650) {
        // Any short screen fallback
        setPaddingTop('8rem');
      }
       else if (width === 412 && height === 915) {
        // Nest Hub or similar short screen
        setPaddingTop('5rem'); // adjust if needed
      }
       else if (width === 412 && height === 914) {
        // Nest Hub or similar short screen
        setPaddingTop('4.5rem'); // adjust if needed
      }
      else if (width === 360 && height === 740) {
        // Nest Hub or similar short screen
        setPaddingTop('9rem'); // adjust if needed
      }
       else if (width === 344 && height === 882) {
        // Nest Hub or similar short screen
        setPaddingTop('6rem'); // adjust if needed
      }
      else if (width===540 && height===720)
      {
        setPaddingTop('8rem')

      }
      else if (width===1024 && height===1366)
      {
        setPaddingTop('1rem')

      }
      else if (width===912 && height===1368)
      {
        setPaddingTop('2rem')

      }
     else if (
    Math.abs(width - 853) <= 10 &&
    Math.abs(height - 1280) <= 10
  ) {
    setPaddingTop('5rem');
  }
      else if (width === 390 && height === 844) {
        // Nest Hub or similar short screen
        setPaddingTop('7.5rem'); // adjust if needed
      }
      else if (width===1280 && height===800) {
        setPaddingTop('4rem')

      }
       else {
        setPaddingTop('4.6rem');
      }
    };

    handleResize(); // Initial run
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [stackLayout, setStackLayout] = useState(false);

  useEffect(() => {
    const checkStack = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Tolerance ranges around 1024×1366:
      const portraitMatch = Math.abs(w - 1024) <= 20 && Math.abs(h - 1366) <= 20;
      const landscapeMatch = Math.abs(w - 1366) <= 20 && Math.abs(h - 1024) <= 20;

      if (portraitMatch || landscapeMatch) {
        setStackLayout(true);
      } else {
        setStackLayout(false);
      }
    };

    checkStack();
    window.addEventListener('resize', checkStack);
    return () => window.removeEventListener('resize', checkStack);
  }, []);

  // Build container className: force flex-col if stackLayout true; else normal flex-col lg:flex-row
  const containerClasses = [
    'relative', 'z-10',
    'flex',
    isNestHub ? 'flex-col' : stackLayout ? 'flex-col' : 'flex-col lg:flex-row',
    'w-full', 'min-h-screen',
    'justify-center',
    'items-center',
    'px-4', 'md:px-12', 'lg:px-20',
    'gap-10',
  ].join(' ');

  return (
    <Element name="home">
      <div className="app relative min-h-screen overflow-x-hidden">
        <section
          className="relative w-full min-h-screen overflow-hidden"
          style={{ paddingTop }}
        >
          {/* 3D Background */}
          <Canvas
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
            camera={{ position: [-4.5379, 1.8075, 1.0678], fov: 50 }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <BackgroundModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>

          {/* Main Content - Matching About section layout exactly */}
          <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
            {/* LEFT - Content aligned exactly like About section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 2xl:p-24 text-center lg:text-left lg:ml-8 xl:ml-12 2xl:ml-16">
              <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                <h3
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl"
                >
                  Hello, I am
                </h3>

                <h1
                  className="text-2xl sm:text-4xl md:text-5xl pt-3 lg:text-5xl"
                  style={{ fontFamily: 'Audiowide, cursive' }}
                >
                  <span className="block">
                    <span className="text-cyan-400">J</span>AMAL
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent">
                    MOHAMMED
                  </span>
                  
                </h1>

               <p className="block sm:hidden text-lg">
    <span className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent block">
      I'm Full Stack
    </span>
    <span className="relative inline-block">
      <span className="typewriter bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent">
        Developer
      </span>
    </span>
  </p>
  
  {/* Tablet and up: Single line */}
  <p className="hidden sm:block text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
    <span className="bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent">
      I'm Full Stack&nbsp;
    </span>
    <span className="relative inline-block w-[9ch] sm:w-[10ch] text-left">
      <span className="absolute inset-0 typewriter bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent">
        Developer
      </span>
      <span className="opacity-0 bg-gradient-to-r from-cyan-400 via-[#7f8bff] to-[#845ec2] bg-clip-text text-transparent">
        Developer
      </span>
    </span>
  </p>

                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed pt-4"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <span className="block mb-3">I'm passionate about coding and love exploring new technologies.</span>
                  <span className="block mb-3">Quick to adapt to new environments and always eager to learn.</span>
                  <span className="block">A tech-savvy enthusiast excited to grow and take on new challenges.</span>
                </p>

                <div className="pt-6 flex justify-center lg:justify-start gap-8 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl">
                  <a href="#" className="hover:text-[#2ea44f]		 transition-colors duration-200">
                    <BsGithub />
                  </a>
                  <a href="#" className="hover:text-[#e1306c] transition-colors duration-200">
                    <BsInstagram />
                  </a>
                  <a href="#" className="hover:text-[#0ff0fc]		 transition-colors duration-200">
                    <FaXTwitter />
                  </a>
                  <a href="#" className="	hover:text-[#0a66c2] transition-colors duration-200">
                    <GrLinkedinOption />
                  </a>
                </div>

                <div className="relative w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[55%] h-12 mx-auto lg:mx-0 mt-8 rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-[#0b0f1a] rounded-3xl z-0">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-[starTwinkle_2s_infinite]"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random()}s`,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    className="relative z-10 w-full h-full flex items-center justify-center text-white font-semibold text-sm sm:text-base md:text-lg rounded-3xl hover:scale-105 transition-transform duration-300"
                    style={{
                      background: 'rgba(106, 149, 191, 0.2)',
                      animation: 'smokeGlow 1s infinite',
                    }}
                  >
                    DOWNLOAD CV
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT - World Component with Responsive Sizing */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="relative w-full flex items-center justify-center">
                {/* Mobile: Small size */}
                <div className="block sm:hidden w-64 h-64">
                  <World />
                </div>
                
                {/* Small Mobile/Tablet: Medium size */}
                <div className="hidden sm:block md:hidden w-80 h-80">
                  <World />
                </div>
                
                {/* Medium screens: Medium-large size */}
                <div className="hidden md:block lg:hidden w-96 h-96">
                  <World />
                </div>
                
                {/* Large screens: Controlled size - smaller than before */}
                <div className="hidden lg:block xl:hidden w-80 h-80 lg:w-96 lg:h-96">
                  <World />
                </div>
                
                {/* XL screens: Medium size to prevent oversizing */}
                <div className="hidden xl:block 2xl:hidden w-96 h-96">
                  <World />
                </div>
                
                {/* 2XL screens: Slightly larger but controlled */}
                <div className="hidden 2xl:block w-[28rem] h-[28rem]">
                  <World />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Element>
  );
}