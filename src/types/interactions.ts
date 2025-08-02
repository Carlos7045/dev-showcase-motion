export interface HoverEffect {
  type: '3d-tilt' | 'magnetic' | 'ripple' | 'glow' | 'morph' | 'scale' | 'rotate' | 'float';
  intensity: number;
  duration: number;
  easing?: string;
  trigger?: 'hover' | 'focus' | 'active';
}

export interface TiltConfig {
  maxTilt: number;
  perspective: number;
  scale: number;
  speed: number;
  glare: boolean;
  glareMaxOpacity: number;
  glareColor: string;
  glarePosition: 'top' | 'bottom' | 'left' | 'right' | 'center';
  gyroscope: boolean;
}

export interface MagneticConfig {
  strength: number;
  radius: number;
  restoreSpeed: number;
  threshold: number;
}

export interface RippleConfig {
  color: string;
  duration: number;
  size: number;
  opacity: number;
  easing: string;
}

export interface GlowConfig {
  color: string;
  size: number;
  intensity: number;
  duration: number;
  spread: number;
}

export interface MorphConfig {
  from: {
    borderRadius: string;
    transform: string;
  };
  to: {
    borderRadius: string;
    transform: string;
  };
  duration: number;
  easing: string;
}

export interface MicroInteraction {
  trigger: 'click' | 'hover' | 'focus' | 'scroll' | 'load';
  effect: HoverEffect;
  feedback?: {
    haptic?: boolean;
    sound?: string;
    visual?: 'flash' | 'pulse' | 'shake' | 'bounce';
  };
}

export interface CursorConfig {
  type: 'default' | 'magnetic' | 'trail' | 'glow' | 'custom';
  size: number;
  color: string;
  blendMode?: string;
  trail?: {
    length: number;
    decay: number;
  };
}