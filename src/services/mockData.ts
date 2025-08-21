import { DisasterZone, EmergencyMessage, EvacuationRoute, ResourceAllocation, SystemStatus } from '../types';

export const mockDisasterZones: DisasterZone[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'high',
    coordinates: [
      [40.7589, -73.9851],
      [40.7609, -73.9831],
      [40.7569, -73.9811],
      [40.7549, -73.9831]
    ],
    detectedAt: new Date(Date.now() - 1800000), // 30 minutes ago
    confidence: 0.94
  },
  {
    id: '2',
    type: 'fire',
    severity: 'critical',
    coordinates: [
      [40.7489, -73.9951],
      [40.7509, -73.9931],
      [40.7469, -73.9911],
      [40.7449, -73.9931]
    ],
    detectedAt: new Date(Date.now() - 900000), // 15 minutes ago
    confidence: 0.89
  }
];

export const mockEmergencyMessages: EmergencyMessage[] = [
  {
    id: '1',
    content: 'Building collapse on 5th Avenue, multiple people trapped',
    priority: 'critical',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    location: [40.7529, -73.9891],
    classification: 'structure_collapse',
    confidence: 0.96,
    processed: false
  },
  {
    id: '2',
    content: 'Need medical supplies at evacuation center',
    priority: 'high',
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    location: [40.7629, -73.9791],
    classification: 'medical_request',
    confidence: 0.87,
    processed: true
  },
  {
    id: '3',
    content: 'Family of 4 requesting evacuation from flooded area',
    priority: 'high',
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    location: [40.7579, -73.9841],
    classification: 'evacuation_request',
    confidence: 0.91,
    processed: false
  }
];

export const mockEvacuationRoutes: EvacuationRoute[] = [
  {
    id: '1',
    start: [40.7589, -73.9851],
    end: [40.7689, -73.9751],
    waypoints: [
      [40.7609, -73.9831],
      [40.7639, -73.9801],
      [40.7669, -73.9771]
    ],
    estimatedTime: 25,
    safetyScore: 0.85,
    capacity: 500,
    status: 'available'
  },
  {
    id: '2',
    start: [40.7489, -73.9951],
    end: [40.7389, -73.9851],
    waypoints: [
      [40.7459, -73.9921],
      [40.7429, -73.9891],
      [40.7399, -73.9871]
    ],
    estimatedTime: 35,
    safetyScore: 0.72,
    capacity: 300,
    status: 'congested'
  }
];

export const mockResourceAllocations: ResourceAllocation[] = [
  {
    id: '1',
    region: 'Zone Alpha',
    type: 'medical',
    quantity: 150,
    priority: 1,
    estimatedNeed: 200,
    currentAllocation: 75,
    coordinates: [40.7629, -73.9791]
  },
  {
    id: '2',
    region: 'Zone Beta',
    type: 'rescue',
    quantity: 8,
    priority: 1,
    estimatedNeed: 12,
    currentAllocation: 4,
    coordinates: [40.7529, -73.9891]
  },
  {
    id: '3',
    region: 'Zone Gamma',
    type: 'shelter',
    quantity: 500,
    priority: 2,
    estimatedNeed: 800,
    currentAllocation: 200,
    coordinates: [40.7689, -73.9751]
  }
];

export const mockSystemStatus: SystemStatus = {
  cvModel: 'active',
  nlpModel: 'active',
  routeOptimizer: 'processing',
  resourcePredictor: 'active',
  lastUpdate: new Date()
};