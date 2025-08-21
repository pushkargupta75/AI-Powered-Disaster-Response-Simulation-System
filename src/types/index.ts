export interface DisasterZone {
  id: string;
  type: 'flood' | 'fire' | 'earthquake' | 'storm';
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: [number, number][];
  detectedAt: Date;
  confidence: number;
}

export interface EmergencyMessage {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  location?: [number, number];
  classification: string;
  confidence: number;
  processed: boolean;
}

export interface EvacuationRoute {
  id: string;
  start: [number, number];
  end: [number, number];
  waypoints: [number, number][];
  estimatedTime: number;
  safetyScore: number;
  capacity: number;
  status: 'available' | 'congested' | 'blocked';
}

export interface ResourceAllocation {
  id: string;
  region: string;
  type: 'medical' | 'rescue' | 'shelter' | 'supplies';
  quantity: number;
  priority: number;
  estimatedNeed: number;
  currentAllocation: number;
  coordinates: [number, number];
}

export interface SystemStatus {
  cvModel: 'active' | 'inactive' | 'processing';
  nlpModel: 'active' | 'inactive' | 'processing';
  routeOptimizer: 'active' | 'inactive' | 'processing';
  resourcePredictor: 'active' | 'inactive' | 'processing';
  lastUpdate: Date;
}