import React, { useState } from 'react';
import { mockEmergencyMessages } from '../../services/mockData';
import { EmergencyMessage } from '../../types';
import { formatDistanceToNow } from 'date-fns';

export const MessagePanel: React.FC = () => {
  const [messages] = useState<EmergencyMessage[]>(mockEmergencyMessages);

  const getPriorityColor = (priority: EmergencyMessage['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
    }
  };

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'structure_collapse':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'medical_request':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'evacuation_request':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Emergency Messages</h3>
        <p className="text-sm text-gray-400">NLP-classified priority communications</p>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              `p-4 border-b border-gray-700 last:border-b-0 transition-all hover:bg-gray-750 ${
                !message.processed ? 'border-l-4 border-l-blue-500' : ''
              }`
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded ${getPriorityColor(message.priority)}`}>
                  {getClassificationIcon(message.classification)}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded uppercase tracking-wide ${getPriorityColor(message.priority)}`}>
                  {message.priority}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">
                  {(message.confidence * 100).toFixed(0)}%
                </span>
                {!message.processed && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-2 line-clamp-2">
              {message.content}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="capitalize">
                {message.classification.replace('_', ' ')}
              </span>
              <span>
                {formatDistanceToNow(message.timestamp)} ago
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};