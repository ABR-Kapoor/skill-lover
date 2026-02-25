'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring, useMotionValueEvent, motion } from 'framer-motion';

export function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out the scroll progress for less intricate scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  });

  // Video time management
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
     if (videoRef.current && videoRef.current.readyState >= 1) {
       setDuration(videoRef.current.duration);
     }
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (videoRef.current && duration > 0) {
      const time = latest * duration;
      if (Number.isFinite(time)) {
        videoRef.current.currentTime = time;
      }
    }
  });

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] w-full bg-black z-[100]"
    >
      <motion.div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src="/cd.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
        />
        
        {/* Simple Scroll Hint */}
        {/* Simple Scroll Hint - REMOVED for Neo-Glass Design */}
      </motion.div>
    </section>
  );
}
