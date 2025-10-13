
import React from 'react';

interface ContentPanelProps {
  id: string;
  title: string;
  isActive: boolean;
  isDesktop: boolean;
  children: React.ReactNode;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({ id, title, isActive, isDesktop, children }) => {
  if (isDesktop) {
    return (
      <div
        id={id}
        className={`content-panel-desktop absolute inset-0 w-full h-full p-8 transition-all duration-700 ease-in-out ${
          isActive ? 'opacity-100 transform-none' : 'opacity-0 transform-translate-y-8 pointer-events-none'
        }`}
      >
        <h2 className="text-3xl font-bold text-dark-blue mb-6" data-aos="fade-up">{title}</h2>
        <div className="h-[calc(100%-4rem)] overflow-y-auto" data-aos="fade-up" data-aos-delay="200">
          {children}
        </div>
      </div>
    );
  }

  // Mobile view
  return (
    <div id={id} className="p-4 sm:p-6 min-h-full">
      <h2 className="text-3xl font-bold text-dark-blue mb-6" data-aos="fade-up">{title}</h2>
      <div data-aos="fade-up" data-aos-delay="200">
        {children}
      </div>
    </div>
  );
};
