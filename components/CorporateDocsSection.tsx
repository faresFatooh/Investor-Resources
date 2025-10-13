
import React, { useState } from 'react';
import { CORPORATE_DOCS_DATA, PDF_ICON_URL } from '../constants';
import { DocumentCategory } from '../types';

interface CorporateDocsSectionProps {
  isActive: boolean;
}

const DocTabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-semibold transition-colors duration-300 border-b-2 ${
      active ? 'border-dark-blue text-dark-blue' : 'border-transparent text-gray-500 hover:text-dark-blue'
    }`}
  >
    {children}
  </button>
);

export const CorporateDocsSection: React.FC<CorporateDocsSectionProps> = ({ isActive }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory: DocumentCategory | undefined = CORPORATE_DOCS_DATA[activeCategoryIndex];

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-4 overflow-x-auto no-scrollbar">
          {CORPORATE_DOCS_DATA.map((category, index) => (
            <DocTabButton
              key={category.name}
              active={index === activeCategoryIndex}
              onClick={() => setActiveCategoryIndex(index)}
            >
              {category.name}
            </DocTabButton>
          ))}
        </nav>
      </div>

      {activeCategory && (
        <div className="space-y-4">
          {activeCategory.documents.map((doc) => (
            <a
              key={doc.title}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <img src={PDF_ICON_URL} alt="PDF Icon" className="w-6 h-6 mr-4" />
              <span className="font-medium text-light-blue-doc hover:underline">{doc.title}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
