
import React, { useState } from 'react';
import { WidgetLoader } from './WidgetLoader';

interface ShareInfoSectionProps {
  isActive: boolean;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${
        active ? 'bg-header-blue text-white' : 'bg-gray-200 text-dark-blue hover:bg-gray-300'
      }`}
    >
      {children}
    </button>
  );

export const ShareInfoSection: React.FC<ShareInfoSectionProps> = ({ isActive }) => {
  const [activeTab, setActiveTab] = useState<'simple' | 'advanced'>('simple');

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <TabButton active={activeTab === 'simple'} onClick={() => setActiveTab('simple')}>
          Simple
        </TabButton>
        <TabButton active={activeTab === 'advanced'} onClick={() => setActiveTab('advanced')}>
          Advanced
        </TabButton>
      </div>

      <div className="mt-4">
        {activeTab === 'simple' && <WidgetLoader widgetId="stock-activity-simple" isActive={isActive} />}
        {activeTab === 'advanced' && <WidgetLoader widgetId="stock-activity-advanced" isActive={isActive} />}
      </div>
    </div>
  );
};
