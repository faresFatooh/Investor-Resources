
import React, { useEffect, useRef } from 'react';
import { SECTIONS } from '../constants';

interface MobileNavProps {
  activeIndex: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeIndex }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeItemRef.current && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItemRef.current.getBoundingClientRect();
      
      const scrollOffset = itemRect.left - navRect.left - (navRect.width / 2) + (itemRect.width / 2);
      
      navRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 py-4 mb-4 -mx-4 px-4">
      <div ref={navRef} className="mobile-nav-container flex space-x-2 overflow-x-auto no-scrollbar">
        {SECTIONS.map((section, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={section.id}
              ref={isActive ? activeItemRef : null}
              onClick={() => handleNavClick(section.id)}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
                isActive ? 'bg-dark-blue text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
