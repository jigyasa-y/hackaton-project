import React from 'react';

const Tab = ({ 
  tabs, 
  activeTab, 
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex gap-2 border-b border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            px-4 py-2.5 font-medium text-sm transition-colors duration-200
            relative -mb-px
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-t-lg
            ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
          `}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
              activeTab === tab.id 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tab;

