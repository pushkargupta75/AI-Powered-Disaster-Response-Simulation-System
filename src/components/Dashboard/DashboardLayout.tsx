import React, { useState } from 'react';
import { SystemStatusBar } from './SystemStatusBar';
import { AlertPanel } from './AlertPanel';
import { MapView } from './MapView';
import { MessagePanel } from './MessagePanel';
import { ResourcePanel } from './ResourcePanel';
import { DataUploader } from '../DataIngestion/DataUploader';
import { TrainingDashboard } from '../ModelTraining/TrainingDashboard';
import { SimulationControl } from '../Simulation/SimulationControl';

export const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  const handleDataUpload = (data: any, type: string) => {
    setUploadedData(prev => [...prev, { ...data, uploadedAt: new Date(), category: type }]);
  };

  const tabs = [
    { id: 'dashboard', label: 'Command Center', icon: '🎯' },
    { id: 'data', label: 'Data Ingestion', icon: '📊' },
    { id: 'training', label: 'Model Training', icon: '🧠' },
    { id: 'simulation', label: 'Simulation', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Disaster Response Command Center</h1>
              <p className="text-gray-400 text-sm">AI-Powered Emergency Management System</p>
            </div>
          </div>
          <SystemStatusBar />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Sidebar */}
            <div className="col-span-3 space-y-6">
              <AlertPanel />
              <MessagePanel />
            </div>

            {/* Main Map */}
            <div className="col-span-6">
              <MapView />
            </div>

            {/* Right Sidebar */}
            <div className="col-span-3">
              <ResourcePanel />
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="max-w-4xl mx-auto">
            <DataUploader onDataUpload={handleDataUpload} />
            
            {uploadedData.length > 0 && (
              <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Uploaded Datasets</h3>
                <div className="space-y-3">
                  {uploadedData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded p-3">
                      <div>
                        <p className="text-white font-medium">{data.name}</p>
                        <p className="text-sm text-gray-400">
                          {data.category} • {(data.size / 1024 / 1024).toFixed(2)} MB • 
                          Uploaded {data.uploadedAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                        Ready
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'training' && (
          <div className="max-w-6xl mx-auto">
            <TrainingDashboard />
          </div>
        )}

        {activeTab === 'simulation' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <SimulationControl />
            </div>
            <div className="col-span-8">
              <MapView />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};