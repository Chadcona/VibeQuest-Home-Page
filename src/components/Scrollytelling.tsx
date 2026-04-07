import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ScrollytellingProps {
  frameCount: number;
}

const Scrollytelling: React.FC<ScrollytellingProps> = ({ frameCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameIndexRef = useRef(0);
  const ZOOM_FACTOR = 1.05;

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      // Create indices from 001 to 240
      const indices = Array.from({ length: frameCount }, (_, i) => (i + 1).toString().padStart(3, '0'));
      
      for (const index of indices) {
        const img = new Image();
        img.src = `/Frames/ezgif-frame-${index}.jpg`;
        
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
            resolve(true);
          };
          img.onerror = () => {
            loadedCount++; // Still increment to avoid getting stuck
            resolve(false);
          };
        });
        loadedImages.push(img);
      }
      setImages(loadedImages);
      setIsLoaded(true);
    };

    preloadImages();
  }, [frameCount]);

  // Handle Canvas Drawing
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure we have a valid image
    const img = images[index] || images[0];
    if (!img || !img.complete) return;
    
    // Object-fit: cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
    }

    // Apply Zoom Factor
    drawWidth *= ZOOM_FACTOR;
    drawHeight *= ZOOM_FACTOR;

    offsetX = (canvas.width - drawWidth) / 2;
    offsetY = (canvas.height - drawHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(frameIndexRef.current);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images]);

  // Initial draw when loaded
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded]);

  // Scroll Handler - using window scroll directly
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;

      const scrollFraction = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      
      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call in case user is already scrolled
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, images, frameCount]);

  // Mouse Parallax with GSAP
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const xPercent = (e.clientX / window.innerWidth) - 0.5;
      const yPercent = (e.clientY / window.innerHeight) - 0.5;

      gsap.to(canvasRef.current, {
        x: xPercent * -15, // Slight movement in opposite direction
        y: yPercent * -15,
        duration: 1.2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
          <div className="text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Velorah
          </div>
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="mt-4 text-xs tracking-widest uppercase opacity-40 font-medium">
            Loading Cinematic - {loadProgress}%
          </div>
        </div>
      )}

      {/* Canvas - no wrapper, just the fixed element */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none scale-[1.03]"
        style={{ 
          transition: 'opacity 1s ease-in-out',
          opacity: isLoaded ? 1 : 0,
          background: 'black'
        }}
      />
    </>
  );
};

export default Scrollytelling;

