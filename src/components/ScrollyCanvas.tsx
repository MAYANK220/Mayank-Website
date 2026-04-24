'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

import Overlay from './Overlay';

const FRAME_COUNT = 120;

const getBasePath = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith('/Mayank-Website') ? '/Mayank-Website' : '';
  }
  return '';
};

function getFramePath(index: number) {
  const paddedIndex = index.toString().padStart(3, '0');
  const basePath = getBasePath();
  return `${basePath}/sequence/frame_${paddedIndex}_delay-0.066s.jpg`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // We track the scroll progress of the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

    useEffect(() => {
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        // Mobile Fix: Start the experience as soon as the first frame is ready!
        // Waiting for all 120 frames (96MB) causes mobile browsers to halt loading.
        if (i === 0 || loadedCount > 5) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  const drawImage = (index: number) => {
    if (!canvasRef.current || !images[index] || !images[index].complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (loaded && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(currentProgress * FRAME_COUNT))
        );
        drawImage(frameIndex);
      };
      
      window.addEventListener('resize', handleResize);
      drawImage(0);
      
      return () => window.removeEventListener('resize', handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    
    // Use requestAnimationFrame for smooth drawing
    requestAnimationFrame(() => drawImage(frameIndex));
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0f0f0f]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm tracking-widest z-10">
            LOADING SEQUENCE...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette/gradient over canvas to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/30 via-transparent to-[#0f0f0f]/80 pointer-events-none" />
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  );
}
