import React from 'react';
import { mockDisasterZones, mockEvacuationRoutes } from '../../services/mockData';

export const MapView: React.FC = () => {
  // This would be replaced with actual map integration (Leaflet/Mapbox)
  // For now, we'll create a styled placeholder with disaster zone representations

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Disaster Zone Map</h3>
            <p className="text-sm text-gray-400">Real-time satellite analysis & route optimization</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-300">High Risk</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-gray-300">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-300">Safe Zone</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative h-full bg-gray-900 flex items-center justify-center">
        {/* Map Placeholder - Would be replaced with actual map component */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          {/* Grid overlay to simulate map */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Simulated disaster zones */}
          <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-red-500 bg-opacity-30 border-2 border-red-500 rounded-full animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-red-400 text-xs font-bold">FLOOD</div>
            </div>
          </div>

          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-orange-500 bg-opacity-30 border-2 border-orange-500 rounded-full animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-orange-400 text-xs font-bold">FIRE</div>
            </div>
          </div>

          {/* Simulated evacuation routes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 150 200 Q 300 150 450 300"
              stroke="#22d3ee"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
            <path
              d="M 400 100 Q 350 250 200 400"
              stroke="#22d3ee"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className="animate-pulse"
            />
          </svg>

          {/* Safe zones */}
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-green-500 bg-opacity-20 border border-green-500 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-green-400 text-xs font-bold">SAFE</div>
            </div>
          </div>

          <div className="absolute top-1/6 right-1/3 w-16 h-16 bg-green-500 bg-opacity-20 border border-green-500 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-green-400 text-xs font-bold">SAFE</div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* Processing indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gray-800 bg-opacity-90 px-3 py-2 rounded border border-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-300">Processing satellite data...</span>
        </div>
      </div>
    </div>
  );
};