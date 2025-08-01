export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  opacity: number;
  rotation?: number;
  rotationSpeed?: number;
  scale?: number;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'custom';
}

export interface ParticleConfig {
  count: number;
  spawnRate: number;
  life: {
    min: number;
    max: number;
  };
  position: {
    x: number;
    y: number;
    spread: number;
  };
  velocity: {
    x: { min: number; max: number };
    y: { min: number; max: number };
  };
  size: {
    min: number;
    max: number;
    shrink?: boolean;
  };
  color: {
    start: string;
    end?: string;
    random?: string[];
  };
  opacity: {
    start: number;
    end: number;
  };
  gravity?: number;
  friction?: number;
  rotation?: {
    enabled: boolean;
    speed: { min: number; max: number };
  };
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'custom';
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
}

export interface ParticleSystemConfig {
  canvas: HTMLCanvasElement;
  config: ParticleConfig;
  interactive?: boolean;
  mouseInfluence?: {
    enabled: boolean;
    radius: number;
    strength: number;
    type: 'attract' | 'repel' | 'orbit';
  };
  performance?: {
    maxParticles: number;
    cullOffscreen: boolean;
    useWebGL?: boolean;
  };
}

export interface MousePosition {
  x: number;
  y: number;
  isActive: boolean;
}

export interface ParticlePreset {
  name: string;
  config: ParticleConfig;
  description: string;
}