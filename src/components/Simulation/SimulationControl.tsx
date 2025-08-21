import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Zap } from 'lucide-react';

interface SimulationState {
  isRunning: boolean;
  speed: number;
  currentTime: Date;
  scenario: string;
  participants: number;
  processedEvents: number;
}

export const SimulationControl: React.FC = () => {
  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: false,
    speed: 1,
    currentTime: new Date(),
    scenario: 'Urban Flood Response',
    participants: 1250,
    processedEvents: 0
  });

  const [scenarios] = useState([
    'Urban Flood Response',
    'Wildfire Evacuation',
    'Earthquake Emergency',
    'Hurricane Landfall',
    'Multi-Hazard Event'
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulation.isRunning) {
      interval = setInterval(() => {
        setSimulation(prev => ({
          ...prev,
          currentTime: new Date(prev.currentTime.getTime() + (60000 * prev.speed)), // Advance by minutes
          processedEvents: prev.processedEvents + Math.floor(Math.random() * 5) + 1
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulation.isRunning, simulation.speed]);

  const startSimulation = () => {
    setSimulation(prev => ({ ...prev, isRunning: true }));
  };

  const pauseSimulation = () => {
    setSimulation(prev => ({ ...prev, isRunning: false }));
  };

  const resetSimulation = () => {
    setSimulation(prev => ({
      ...prev,
      isRunning: false,
      currentTime: new Date(),
      processedEvents: 0
    }));
  };

  const changeSpeed = (newSpeed: number) => {
    setSimulation(prev => ({ ...prev, speed: newSpeed }));
  };

  const changeScenario = (scenario: string) => {
    setSimulation(prev => ({ 
      ...prev, 
      scenario,
      participants: Math.floor(Math.random() * 2000) + 500
    }));
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Simulation Control</h3>
          <p className="text-sm text-gray-400">Orchestrate disaster response scenarios</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded text-sm font-medium ${
            simulation.isRunning 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {simulation.isRunning ? 'Running' : 'Paused'}
          </div>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Active Scenario
        </label>
        <select
          value={simulation.scenario}
          onChange={(e) => changeScenario(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          disabled={simulation.isRunning}
        >
          {scenarios.map(scenario => (
            <option key={scenario} value={scenario}>{scenario}</option>
          ))}
        </select>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-3 mb-6">
        {!simulation.isRunning ? (
          <button
            onClick={startSimulation}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={pauseSimulation}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        )}
        
        <button
          onClick={resetSimulation}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Speed Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Simulation Speed: {simulation.speed}x
        </label>
        <div className="flex items-center space-x-2">
          {[0.5, 1, 2, 5, 10].map(speed => (
            <button
              key={speed}
              onClick={() => changeSpeed(speed)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                simulation.speed === speed
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded p-3 border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Simulation Time</span>
          </div>
          <p className="text-lg font-bold text-white">
            {simulation.currentTime.toLocaleTimeString()}
          </p>
          <p className="text-xs text-gray-400">
            {simulation.currentTime.toLocaleDateString()}
          </p>
        </div>

        <div className="bg-gray-700 rounded p-3 border border-gray-600">
          <div className="flex items-center space-x-2 mb-2">
            <Settings className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-300">Active Participants</span>
          </div>
          <p className="text-lg font-bold text-white">
            {simulation.participants.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">Emergency responders</p>
        </div>

        <div className="bg-gray-700 rounded p-3 border border-gray-600 col-span-2">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-purple-400 rounded"></div>
            <span className="text-sm font-medium text-gray-300">Events Processed</span>
          </div>
          <p className="text-lg font-bold text-white">
            {simulation.processedEvents.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">
            Real-time AI decisions made
          </p>
        </div>
      </div>
    </div>
  );
};