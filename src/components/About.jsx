import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Element } from 'react-scroll';

const skills = [
  'JavaScript','React','Firebase','TailwindCSS','HTML',
  'Css','AI Tools','Git','ML',
];

const colors = [
  'bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600',
  'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500',
  'bg-gradient-to-br from-blue-500 via-sky-500 to-blue-600',
  'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500',
  'bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600',
  'bg-gradient-to-br from-red-500 via-rose-500 to-red-600',
  'bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500',
  'bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600',
  'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500',
];

// Starfield background generator
const generateStars = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    delay: Math.random() * 3,
  }));

const getRandomPositions = (containerWidth, containerHeight, bubbleSize, padding) => {
  // Simplified popup height - consistent across all screen sizes
  const popupHeight = 80; // Fixed height for better consistency
  const usableWidth = containerWidth - 2 * padding - bubbleSize;
  const usableHeight = containerHeight - 2 * padding - bubbleSize - popupHeight;
  
  return skills.map(() => ({
    x: Math.random() * usableWidth + padding,
    y: Math.random() * usableHeight + padding + popupHeight, // Start below popup
    vx: (Math.random() - 0.5) * 4, // Increased velocity for smoother movement
    vy: (Math.random() - 0.5) * 4, // Increased velocity for smoother movement
  }));
};

const Bubble = ({ text, onClick, color, index, position, allPositions, onPositionUpdate, containerRef, containerPadding, bubbleSize }) => {
  const [currentPos, setCurrentPos] = useState(position);
  
  useEffect(() => {
    let animationId;
    
    const updatePosition = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      
      setCurrentPos(prevPos => {
        let newX = prevPos.x + prevPos.vx;
        let newY = prevPos.y + prevPos.vy;
        let newVx = prevPos.vx;
        let newVy = prevPos.vy;
        
        // Simplified popup height - consistent across all screen sizes
        const popupHeight = 80;
        const topBoundary = containerPadding + popupHeight; // Keep bubbles below popup
        
        // Boundary collision detection with padding and popup avoidance
        if (newX <= containerPadding || newX >= containerWidth - containerPadding - bubbleSize) {
          newVx = -newVx * 0.9; // Increased bounce factor for smoother movement
          newX = Math.max(containerPadding, Math.min(containerWidth - containerPadding - bubbleSize, newX));
        }
        if (newY <= topBoundary || newY >= containerHeight - containerPadding - bubbleSize) {
          newVy = -newVy * 0.9; // Increased bounce factor for smoother movement
          newY = Math.max(topBoundary, Math.min(containerHeight - containerPadding - bubbleSize, newY));
        }
        
        // Bubble collision detection
        allPositions.forEach((otherPos, otherIndex) => {
          if (otherIndex !== index && otherPos) {
            const dx = newX - otherPos.x;
            const dy = newY - otherPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < bubbleSize && distance > 0) {
              const overlap = bubbleSize - distance;
              const separationX = (dx / distance) * overlap * 0.5;
              const separationY = (dy / distance) * overlap * 0.5;
              
              newX += separationX;
              newY += separationY;
              
              const angle = Math.atan2(dy, dx);
              const speed = Math.sqrt(newVx * newVx + newVy * newVy);
              newVx = Math.cos(angle) * speed * 0.85; // Improved collision response
              newVy = Math.sin(angle) * speed * 0.85; // Improved collision response
            }
          }
        });
        
        const newPosition = { x: newX, y: newY, vx: newVx, vy: newVy };
        
        // Use setTimeout to defer the parent update and avoid render cycle issues
        setTimeout(() => onPositionUpdate(index, newPosition), 0);
        
        return newPosition;
      });
      
      animationId = requestAnimationFrame(updatePosition);
    };
    
    animationId = requestAnimationFrame(updatePosition);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [allPositions, index, onPositionUpdate, containerRef, containerPadding, bubbleSize]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: currentPos.x,
        y: currentPos.y
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.5, delay: index * 0.1, type: 'spring' },
        x: { duration: 0.05 }, // Smoother position transitions
        y: { duration: 0.05 } // Smoother position transitions
      }}
      exit={{
        scale: [1, 2, 0],
        opacity: [1, 0.5, 0],
        rotate: 360,
        transition: { duration: 0.8, ease: 'easeOut' },
      }}
      className={`absolute flex items-center justify-center rounded-full text-xs sm:text-sm font-bold cursor-pointer shadow-2xl border-2 border-white/30 backdrop-blur-sm hover:z-50 ${color} text-white`}
      style={{ 
        zIndex: 20 + index,
        width: `${bubbleSize}px`,
        height: `${bubbleSize}px`
      }}
      onClick={() => onClick(text)}
      whileHover={{
        scale: 1.2,
        zIndex: 100,
        boxShadow: '0 0 40px 15px rgba(59,130,246,0.5), 0 0 80px 25px rgba(147,51,234,0.3)',
        borderColor: 'rgba(255,255,255,0.7)',
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <div
        className="absolute inset-0 rounded-full border border-white/25 animate-spin"
        style={{ animationDuration: `${8 + index}s` }}
      />
      <div
        className="absolute inset-2 rounded-full border border-white/15 animate-spin"
        style={{ animationDuration: `${6 + index}s`, animationDirection: 'reverse' }}
      />
      <span className="z-10 text-center px-1">{text}</span>
    </motion.div>
  );
};

const SkillsStack = ({ discovered, onReset }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="absolute inset-0 flex flex-col items-center justify-center p-4 z-50"
  >
    <div className="relative mb-6">
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40"
        animate={{
          boxShadow: [
            '0 0 40px 15px rgba(147,51,234,0.5)',
            '0 0 60px 25px rgba(59,130,246,0.7)',
            '0 0 40px 15px rgba(147,51,234,0.5)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="text-lg sm:text-xl md:text-2xl">🚀</div>
      </motion.div>
      <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-spin" style={{animationDuration:'20s'}}/>
      <div className="absolute -inset-2 border border-white/20 rounded-full animate-spin" style={{animationDuration:'15s', animationDirection:'reverse'}}/>
      <div className="absolute -inset-4 border border-white/10 rounded-full animate-spin" style={{animationDuration:'25s'}}/>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-lg">
      {discovered.map((skill, idx) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, y: 30, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: idx * 0.15,
            duration: 0.6,
            type: 'spring',
            stiffness: 120,
          }}
          className="bg-gray-800/90 backdrop-blur-md p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl border border-white/25 shadow-xl hover:scale-105 w-full text-center"
        >
          <div className="font-semibold text-xs sm:text-sm md:text-base">{skill}</div>
        </motion.div>
      ))}
    </div>
    <button
      onClick={onReset}
      className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-2 px-4 sm:px-6 rounded-full shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
    >
      🔄 Try Again
    </button>
  </motion.div>
);

const About = () => {
  const [active, setActive] = useState([...skills]);
  const [discovered, setDiscovered] = useState([]);
  const [popped, setPopped] = useState(null);
  const [showStack, setShowStack] = useState(false);
  const [stars] = useState(() => generateStars(200));
  const [positions, setPositions] = useState([]);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  
  // Responsive bubble size and padding
  const getBubbleSize = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 60; // sm
      if (window.innerWidth < 768) return 70; // md
      if (window.innerWidth < 1024) return 80; // lg
      return 90; // xl
    }
    return 80;
  };
  
  const getContainerPadding = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 20; // sm
      if (window.innerWidth < 768) return 30; // md
      if (window.innerWidth < 1024) return 40; // lg
      return 50; // xl
    }
    return 40;
  };

  const [bubbleSize, setBubbleSize] = useState(getBubbleSize());
  const [containerPadding, setContainerPadding] = useState(getContainerPadding());

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setBubbleSize(getBubbleSize());
      setContainerPadding(getContainerPadding());
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
        
        // Regenerate positions on resize
        if (active.length > 0) {
          setPositions(getRandomPositions(rect.width, rect.height, getBubbleSize(), getContainerPadding()));
        }
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [active.length]);

  // Initialize positions when container is ready
  useEffect(() => {
    if (containerRef.current && positions.length === 0) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width: rect.width, height: rect.height });
      setPositions(getRandomPositions(rect.width, rect.height, bubbleSize, containerPadding));
    }
  }, [containerRef.current, bubbleSize, containerPadding]);

  const handlePop = (skill) => {
    if (popped || !active.includes(skill)) return;
    setPopped(skill);
    setActive(active.filter((s) => s !== skill));
    setDiscovered([...discovered, skill]);
    setTimeout(() => {
      setPopped(null);
      if (active.length === 1) setShowStack(true);
    }, 300);
  };

  const updatePosition = (index, newPosition) => {
    setPositions(prevPositions => {
      const newPositions = [...prevPositions];
      if (newPositions[index]) {
        newPositions[index] = newPosition;
      }
      return newPositions;
    });
  };

  const resetAll = () => {
    setActive([...skills]);
    setDiscovered([]);
    setPopped(null);
    setShowStack(false);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPositions(getRandomPositions(rect.width, rect.height, bubbleSize, containerPadding));
    }
  };

  return (
      <Element name="about">

    
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {stars.map((st) => (
        <motion.div
          key={st.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: `${st.size}px`,
            height: `${st.size}px`,
          }}
          animate={{ opacity: [st.opacity, st.opacity * 0.3, st.opacity] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: st.delay }}
        />
      ))}

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* About Section - Left Side */}
        <div className="w-full lg:w-1/2  flex flex-col justify-center items-center lg:items-start p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 2xl:p-24 text-center lg:text-left lg:ml-8 xl:ml-12 2xl:ml-16">
          <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
            <motion.h2 
              initial={{ x: -50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1 }} 
                                style={{ fontFamily: 'Orbitron, sans-serif' }}

              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
            <motion.p 
              initial={{ x: -30, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.2, duration:1 }} 
              className="text-sm sm:text-base md:text-lg  lg:text-xl 2xl:text-2xl text-gray-300 leading-relaxed mb-8"
            >
              I design, build, and experiment — not just with code, but with possibility. From sleek UIs to smart systems, I dive into tech with curiosity and caffeine. I learn fast, adapt faster, and explore tools before they trend. For me, tech isn't a stack — it's a playground
            </motion.p>
            
            {/* Tech Quote */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.4, duration: 1 }} 
              className="relative"
            >
              <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-400/20 rounded-lg p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-4xl sm:text-5xl text-purple-400 mb-3">"</div>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 italic leading-relaxed mb-4">
                  The first step is to establish that something is possible; then probability will occur.
                </p>
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-purple-300 font-semibold">— Elon Musk</div>
                  </div>
                </div>
                <div className="absolute top-2 right-4 text-4xl sm:text-5xl text-purple-400 rotate-180">"</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bubbles Section - Right Side */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
         
          <div 
            ref={containerRef}
            className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl h-96 sm:h-[500px] lg:h-[600px] mx-auto"
          >
             {!showStack && (
            <motion.div 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.6, duration: 1 }} 
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-lg p-3 backdrop-blur-sm z-60 text-center max-w-xs w-full mx-4"
              style={{ zIndex: 100 }}
            >
              <div className="text-cyan-300 font-medium text-sm sm:text-base">
                🎯 Pop All The Bubbles!
              </div>
              <div className="text-gray-300 text-xs sm:text-sm mt-1">
                Click to reveal my skills ✨
              </div>
            </motion.div>
          )}
          
            {!showStack ? (
              <AnimatePresence>
                {active.map((skill, idx) => {
                  const skillIndex = skills.indexOf(skill);
                  const position = positions[skillIndex];
                  
                  if (!position) return null;
                  
                  return (
                    <Bubble
                      key={skill} 
                      text={skill}
                      onClick={handlePop}
                      color={colors[skillIndex % colors.length]}
                      index={skillIndex}
                      position={position}
                      allPositions={positions}
                      onPositionUpdate={updatePosition}
                      containerRef={containerRef}
                      containerPadding={containerPadding}
                      bubbleSize={bubbleSize}
                    />
                  );
                })}
              </AnimatePresence>
            ) : (
              <SkillsStack discovered={discovered} onReset={resetAll} />
            )}
          </div>
        </div>
      </div>
    </div>
      </Element>
  );
};

export default About;