
import { useState, useEffect } from 'react';

const DESKTOP_BREAKPOINT = 1024;

export const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isDesktop: width >= DESKTOP_BREAKPOINT,
  };
};
