import React from 'react';
import { mockDisasterZones } from '../../services/mockData';
import { DisasterZone } from '../../types';
import { formatDistanceToNow } from 'date-fns';

export const AlertPanel: React.FC = () => {
  const getSeverityColor = (severity: DisasterZone['severity']) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'high': return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-green-500 bg-green-500/10 text-green-400';
    }
  };

  const getDisasterIcon = (type: DisasterZone['type']) => {
    switch (type) {
      case 'flood':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'fire':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 1 0 2.5.5 4 2.5.5 1 .5 4-.5 6-.5 1-2.5 2-4.5 2-1 0-2-.5-2.5-1-.5-.5-.5-1.5 0-2.5.5-1 1.5-1.5 2.5-1.5z" />
          </svg>
        );
      case 'earthquake':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'storm':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Active Disaster Zones</h3>
        <p className="text-sm text-gray-400">AI-detected threats requiring immediate attention</p>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {mockDisasterZones.map((zone) => (
          <div
            key={zone.id}
            className={clsx(
              `p-4 border-l-4 border-b border-gray-700 last:border-b-0 transition-all hover:bg-gray-750 ${getSeverityColor(zone.severity)}`
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {getDisasterIcon(zone.type)}
                <div>
                  <h4 className="font-medium capitalize">
                    {zone.type} - {zone.severity} Severity
                  </h4>
                  <p className="text-xs opacity-75">
                    Detected {formatDistanceToNow(zone.detectedAt)} ago
                  </p>
                  <p className="text-xs opacity-75">
                    Confidence: {(zone.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className={`px-2 py-1 text-xs font-medium rounded uppercase tracking-wide ${
                  zone.severity === 'critical' ? 'bg-red-500 text-white' :
                  zone.severity === 'high' ? 'bg-orange-500 text-white' :
                  zone.severity === 'medium' ? 'bg-yellow-500 text-black' :
                  'bg-green-500 text-white'
                }`}>
                  {zone.severity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};