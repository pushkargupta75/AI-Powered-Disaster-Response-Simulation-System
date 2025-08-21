import React, { useState, useEffect } from 'react';
import { Brain, Activity, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';

interface ModelStatus {
  id: string;
  name: string;
  type: 'cv' | 'nlp' | 'rl' | 'regression';
  status: 'idle' | 'training' | 'completed' | 'error';
  progress: number;
  accuracy?: number;
  loss?: number;
  epochs: number;
  currentEpoch: number;
}

export const TrainingDashboard: React.FC = () => {
  const [models, setModels] = useState<ModelStatus[]>([
    {
      id: 'unet-segmentation',
      name: 'U-Net Disaster Segmentation',
      type: 'cv',
      status: 'idle',
      progress: 0,
      epochs: 100,
      currentEpoch: 0
    },
    {
      id: 'bert-classification',
      name: 'BERT Message Classifier',
      type: 'nlp',
      status: 'idle',
      progress: 0,
      epochs: 10,
      currentEpoch: 0
    },
    {
      id: 'dqn-routing',
      name: 'DQN Route Optimizer',
      type: 'rl',
      status: 'idle',
      progress: 0,
      epochs: 1000,
      currentEpoch: 0
    },
    {
      id: 'xgboost-resources',
      name: 'XGBoost Resource Predictor',
      type: 'regression',
      status: 'idle',
      progress: 0,
      epochs: 50,
      currentEpoch: 0
    }
  ]);

  const startTraining = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'training' as const, progress: 0, currentEpoch: 0 }
        : model
    ));

    // Simulate training progress
    const interval = setInterval(() => {
      setModels(prev => prev.map(model => {
        if (model.id === modelId && model.status === 'training') {
          const newEpoch = model.currentEpoch + 1;
          const newProgress = (newEpoch / model.epochs) * 100;
          
          if (newEpoch >= model.epochs) {
            clearInterval(interval);
            return {
              ...model,
              status: 'completed' as const,
              progress: 100,
              currentEpoch: model.epochs,
              accuracy: 0.85 + Math.random() * 0.1,
              loss: Math.random() * 0.5
            };
          }
          
          return {
            ...model,
            currentEpoch: newEpoch,
            progress: newProgress,
            accuracy: Math.min(0.5 + (newProgress / 100) * 0.4, 0.9),
            loss: Math.max(2.0 - (newProgress / 100) * 1.5, 0.1)
          };
        }
        return model;
      }));
    }, 100);
  };

  const pauseTraining = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId && model.status === 'training'
        ? { ...model, status: 'idle' as const }
        : model
    ));
  };

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'cv': return '🖼️';
      case 'nlp': return '💬';
      case 'rl': return '🎯';
      case 'regression': return '📊';
      default: return '🤖';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'training': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'training': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Model Training Dashboard</h3>
          <p className="text-sm text-gray-400">Monitor and control ML model training processes</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => models.forEach(model => model.status === 'idle' && startTraining(model.id))}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm"
          >
            Train All Models
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map((model) => (
          <div key={model.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getModelIcon(model.type)}</span>
                <div>
                  <h4 className="font-medium text-white">{model.name}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{model.type} Model</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(model.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(model.status)}
                    <span className="capitalize">{model.status}</span>
                  </div>
                </div>
                {model.status === 'idle' && (
                  <button
                    onClick={() => startTraining(model.id)}
                    className="p-1 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                {model.status === 'training' && (
                  <button
                    onClick={() => pauseTraining(model.id)}
                    className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{model.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${model.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Epoch</span>
                  <p className="text-white font-medium">{model.currentEpoch} / {model.epochs}</p>
                </div>
                {model.accuracy && (
                  <div>
                    <span className="text-gray-400">Accuracy</span>
                    <p className="text-white font-medium">{(model.accuracy * 100).toFixed(1)}%</p>
                  </div>
                )}
                {model.loss && (
                  <div>
                    <span className="text-gray-400">Loss</span>
                    <p className="text-white font-medium">{model.loss.toFixed(4)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};