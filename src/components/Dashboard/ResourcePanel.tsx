import React from 'react';
import { mockResourceAllocations } from '../../services/mockData';
import { ResourceAllocation } from '../../types';

export const ResourcePanel: React.FC = () => {
  const getResourceIcon = (type: ResourceAllocation['type']) => {
    switch (type) {
      case 'medical':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'rescue':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 1 0 2.5.5 4 2.5.5 1 .5 4-.5 6-.5 1-2.5 2-4.5 2-1 0-2-.5-2.5-1-.5-.5-.5-1.5 0-2.5.5-1 1.5-1.5 2.5-1.5z" />
          </svg>
        );
      case 'shelter':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'supplies':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
    }
  };

  const getProgressColor = (current: number, estimated: number) => {
    const percentage = (current / estimated) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressPercentage = (current: number, estimated: number) => {
    return Math.min((current / estimated) * 100, 100);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-full">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Resource Allocation</h3>
        <p className="text-sm text-gray-400">AI-predicted needs & current deployment</p>
      </div>
      
      <div className="p-4 space-y-6">
        {mockResourceAllocations.map((resource) => (
          <div key={resource.id} className="bg-gray-750 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded ${
                  resource.priority === 1 ? 'bg-red-500/20 text-red-400' :
                  resource.priority === 2 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {getResourceIcon(resource.type)}
                </div>
                <div>
                  <h4 className="font-medium text-white capitalize">
                    {resource.type} Resources
                  </h4>
                  <p className="text-xs text-gray-400">{resource.region}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                resource.priority === 1 ? 'bg-red-500 text-white' :
                resource.priority === 2 ? 'bg-yellow-500 text-black' :
                'bg-green-500 text-white'
              }`}>
                P{resource.priority}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Current / Estimated Need</span>
                <span className="text-white font-medium">
                  {resource.currentAllocation} / {resource.estimatedNeed}
                </span>
              </div>
              
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(resource.currentAllocation, resource.estimatedNeed)}`}
                  style={{
                    width: `${getProgressPercentage(resource.currentAllocation, resource.estimatedNeed)}%`
                  }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <span>
                  {getProgressPercentage(resource.currentAllocation, resource.estimatedNeed).toFixed(0)}% allocated
                </span>
                <span>
                  {resource.estimatedNeed - resource.currentAllocation} needed
                </span>
              </div>
            </div>

            {resource.currentAllocation < resource.estimatedNeed && (
              <div className="mt-3 flex items-center space-x-2 text-xs">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-red-400">Resource shortage detected</span>
              </div>
            )}
          </div>
        ))}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium">
            Deploy Additional Resources
          </button>
          <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-sm">
            Generate Allocation Report
          </button>
        </div>
      </div>
    </div>
  );
};