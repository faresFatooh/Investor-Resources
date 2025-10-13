
import React from 'react';
import { SECTIONS } from '../constants';

interface SidebarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const circleIcon = "https://cdn.prod.website-files.com/68e22dd789a5744b2cdcf9d5/68e3751981652ed98f4169e3_Ellipse%201.svg";

export const Sidebar: React.FC<SidebarProps> = ({ activeIndex, setActiveIndex }) => {
  return (
    <aside className="w-[250px] pr-8 flex-shrink-0">
      <ul className="space-y-4">
        {SECTIONS.map((section, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={section.id}>
              <button
                onClick={() => setActiveIndex(index)}
                className="flex items-center space-x-4 w-full text-left group focus:outline-none"
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  <img
                    src={circleIcon}
                    alt=""
                    className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ filter: 'invert(38%) sepia(91%) saturate(2975%) hue-rotate(186deg) brightness(96%) contrast(101%)' }} // Approximates --header-blue
                  />
                  <div
                    className={`w-full h-full rounded-full border flex items-center justify-center font-semibold transition-colors duration-300 ${
                      isActive
                        ? 'bg-header-blue text-white border-header-blue'
                        : 'bg-gray-200 text-gray-700 border-gray-300 group-hover:bg-header-blue group-hover:text-white'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <span className={`font-semibold transition-colors duration-300 ${
                  isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                }`}>
                  {section.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
