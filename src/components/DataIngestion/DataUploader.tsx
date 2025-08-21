import React, { useState, useCallback } from 'react';
import { Upload, FileImage, MessageSquare, Map, Database } from 'lucide-react';

interface DataUploaderProps {
  onDataUpload: (data: any, type: string) => void;
}

export const DataUploader: React.FC<DataUploaderProps> = ({ onDataUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const fileType = determineFileType(file);
      simulateUpload(file, fileType);
    });
  };

  const determineFileType = (file: File): string => {
    if (file.type.startsWith('image/')) return 'satellite';
    if (file.name.includes('message') || file.name.includes('text')) return 'messages';
    if (file.name.includes('map') || file.name.includes('osm')) return 'map';
    return 'historical';
  };

  const simulateUpload = (file: File, type: string) => {
    const fileId = `${file.name}_${Date.now()}`;
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          onDataUpload({ name: file.name, size: file.size, type }, type);
          setTimeout(() => {
            setUploadProgress(prev => {
              const { [fileId]: _, ...rest } = prev;
              return rest;
            });
          }, 2000);
          return prev;
        }
        return { ...prev, [fileId]: currentProgress + 10 };
      });
    }, 200);
  };

  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case 'satellite': return <FileImage className="w-6 h-6" />;
      case 'messages': return <MessageSquare className="w-6 h-6" />;
      case 'map': return <Map className="w-6 h-6" />;
      case 'historical': return <Database className="w-6 h-6" />;
      default: return <Upload className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Data Ingestion</h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-300 mb-2">Drop files here or click to upload</p>
        <p className="text-sm text-gray-500">
          Supports satellite imagery, emergency messages, map data, and historical datasets
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors"
        >
          Select Files
        </label>
      </div>

      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Upload Progress</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="bg-gray-700 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{fileId.split('_')[0]}</span>
                <span className="text-sm text-gray-400">{progress}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { type: 'satellite', label: 'Satellite Imagery', desc: 'xView Flood Dataset' },
          { type: 'messages', label: 'Emergency Messages', desc: 'CrisisNLP Dataset' },
          { type: 'map', label: 'Map Data', desc: 'OpenStreetMap' },
          { type: 'historical', label: 'Historical Data', desc: 'FEMA Datasets' }
        ].map(({ type, label, desc }) => (
          <div key={type} className="bg-gray-700 rounded p-3 border border-gray-600">
            <div className="flex items-center space-x-3 mb-2">
              <div className="text-blue-400">
                {getDataTypeIcon(type)}
              </div>
              <div>
                <h5 className="text-sm font-medium text-white">{label}</h5>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};