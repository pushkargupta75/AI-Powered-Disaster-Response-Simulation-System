import React, { useState, useEffect } from 'react';
import { mockSystemStatus } from '../../services/mockData';
import { SystemStatus } from '../../types';

export const SystemStatusBar: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>(mockSystemStatus);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        lastUpdate: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (modelStatus: string) => {
    switch (modelStatus) {
      case 'active': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (modelStatus: string) => {
    switch (modelStatus) {
      case 'active': return 'Online';
      case 'processing': return 'Processing';
      case 'inactive': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status.cvModel)}`}></div>
          <span className="text-gray-300">CV Model: {getStatusText(status.cvModel)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status.nlpModel)}`}></div>
          <span className="text-gray-300">NLP Model: {getStatusText(status.nlpModel)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status.routeOptimizer)}`}></div>
          <span className="text-gray-300">Route Optimizer: {getStatusText(status.routeOptimizer)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status.resourcePredictor)}`}></div>
          <span className="text-gray-300">Resource Predictor: {getStatusText(status.resourcePredictor)}</span>
        </div>
      </div>
      <div className="text-xs text-gray-400">
        Last Update: {status.lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
};