
import React, { useState } from 'react';
import { WidgetLoader } from './WidgetLoader';

interface FactSheetSectionProps {
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

export const FactSheetSection: React.FC<FactSheetSectionProps> = ({ isActive }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <TabButton active={activeTab === 'table'} onClick={() => setActiveTab('table')}>
          Table
        </TabButton>
        <TabButton active={activeTab === 'chart'} onClick={() => setActiveTab('chart')}>
          Chart
        </TabButton>
      </div>

      <div className="mt-4">
        {activeTab === 'table' && (
          <div className="min-h-[1500px]">
            <WidgetLoader widgetId="fact-sheet-table" isActive={isActive} />
          </div>
        )}
        {activeTab === 'chart' && (
          <div className="min-h-[1500px] lg:h-[8000px]">
            <iframe
              src="https://irp.atnmo.com/v2/widget/fact-sheet-charts?UUID=0bee5720-84b6-497f-8ac9-e1f3a759924e&lang=en&listingId=574a24a5-496e-4c9f-87c4-e11540313853"
              className="w-full h-full border-0"
              title="Fact Sheet Charts"
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
