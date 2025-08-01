import { ParticlePreset, ParticleConfig } from '@/types/particles';

export const particlePresets: Record<string, ParticlePreset> = {
  // Efeito de neve suave
  snow: {
    name: 'Snow',
    description: 'Gentle falling snow effect',
    config: {
      count: 50,
      spawnRate: 2,
      life: { min: 5, max: 8 },
      position: { x: 0, y: -10, spread: 800 },
      velocity: {
        x: { min: -20, max: 20 },
        y: { min: 30, max: 60 }
      },
      size: { min: 2, max: 6, shrink: false },
      color: {
        start: '#ffffff',
        random: ['#ffffff', '#f0f8ff', '#e6f3ff']
      },
      opacity: { start: 0.8, end: 0.2 },
      gravity: 10,
      friction: 0.01,
      shape: 'circle',
      blendMode: 'screen'
    }
  },

  // Partículas flutuantes para hero section
  floatingDots: {
    name: 'Floating Dots',
    description: 'Gentle floating particles for background',
    config: {
      count: 30,
      spawnRate: 0.5,
      life: { min: 10, max: 15 },
      position: { x: 400, y: 300, spread: 600 },
      velocity: {
        x: { min: -10, max: 10 },
        y: { min: -15, max: -5 }
      },
      size: { min: 1, max: 4, shrink: false },
      color: {
        start: '#3b82f6',
        end: '#8b5cf6',
        random: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
      },
      opacity: { start: 0.6, end: 0.1 },
      gravity: -5,
      friction: 0.005,
      shape: 'circle',
      blendMode: 'normal'
    }
  },

  // Efeito de explosão para hover
  explosion: {
    name: 'Explosion',
    description: 'Burst effect for interactions',
    config: {
      count: 20,
      spawnRate: 100,
      life: { min: 0.5, max: 1.5 },
      position: { x: 0, y: 0, spread: 5 },
      velocity: {
        x: { min: -200, max: 200 },
        y: { min: -200, max: 200 }
      },
      size: { min: 2, max: 8, shrink: true },
      color: {
        start: '#fbbf24',
        end: '#f59e0b',
        random: ['#fbbf24', '#f59e0b', '#d97706', '#92400e']
      },
      opacity: { start: 1, end: 0 },
      gravity: 50,
      friction: 0.02,
      shape: 'circle',
      blendMode: 'screen'
    }
  },

  // Partículas de código/tech
  codeRain: {
    name: 'Code Rain',
    description: 'Matrix-style falling code particles',
    config: {
      count: 40,
      spawnRate: 3,
      life: { min: 4, max: 7 },
      position: { x: 0, y: -10, spread: 800 },
      velocity: {
        x: { min: -5, max: 5 },
        y: { min: 80, max: 120 }
      },
      size: { min: 1, max: 3, shrink: false },
      color: {
        start: '#00ff41',
        end: '#008f11',
        random: ['#00ff41', '#00d4aa', '#0099ff']
      },
      opacity: { start: 0.9, end: 0.1 },
      gravity: 0,
      friction: 0,
      shape: 'square',
      blendMode: 'screen'
    }
  },

  // Estrelas brilhantes
  stars: {
    name: 'Twinkling Stars',
    description: 'Sparkling star effect',
    config: {
      count: 25,
      spawnRate: 1,
      life: { min: 3, max: 6 },
      position: { x: 400, y: 200, spread: 700 },
      velocity: {
        x: { min: -20, max: 20 },
        y: { min: -20, max: 20 }
      },
      size: { min: 3, max: 8, shrink: false },
      color: {
        start: '#fbbf24',
        random: ['#fbbf24', '#f59e0b', '#ffffff', '#fef3c7']
      },
      opacity: { start: 1, end: 0.3 },
      gravity: 0,
      friction: 0.01,
      rotation: {
        enabled: true,
        speed: { min: -2, max: 2 }
      },
      shape: 'star',
      blendMode: 'screen'
    }
  },

  // Bolhas flutuantes
  bubbles: {
    name: 'Floating Bubbles',
    description: 'Gentle rising bubbles',
    config: {
      count: 20,
      spawnRate: 1.5,
      life: { min: 6, max: 10 },
      position: { x: 400, y: 600, spread: 400 },
      velocity: {
        x: { min: -30, max: 30 },
        y: { min: -80, max: -40 }
      },
      size: { min: 5, max: 15, shrink: false },
      color: {
        start: '#3b82f6',
        end: '#1d4ed8',
        random: ['#3b82f6', '#06b6d4', '#8b5cf6']
      },
      opacity: { start: 0.4, end: 0.1 },
      gravity: -20,
      friction: 0.008,
      shape: 'circle',
      blendMode: 'multiply'
    }
  },

  // Partículas de fogo
  fire: {
    name: 'Fire Particles',
    description: 'Rising fire effect',
    config: {
      count: 35,
      spawnRate: 8,
      life: { min: 1, max: 2.5 },
      position: { x: 400, y: 500, spread: 50 },
      velocity: {
        x: { min: -40, max: 40 },
        y: { min: -120, max: -60 }
      },
      size: { min: 3, max: 12, shrink: true },
      color: {
        start: '#ff4500',
        end: '#ff6b00',
        random: ['#ff4500', '#ff6b00', '#ffa500', '#ffff00']
      },
      opacity: { start: 0.9, end: 0 },
      gravity: -30,
      friction: 0.015,
      shape: 'circle',
      blendMode: 'screen'
    }
  },

  // Confete para celebração
  confetti: {
    name: 'Confetti',
    description: 'Celebration confetti effect',
    config: {
      count: 50,
      spawnRate: 25,
      life: { min: 2, max: 4 },
      position: { x: 400, y: 100, spread: 200 },
      velocity: {
        x: { min: -150, max: 150 },
        y: { min: -100, max: 50 }
      },
      size: { min: 4, max: 10, shrink: false },
      color: {
        random: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd']
      },
      opacity: { start: 1, end: 0.3 },
      gravity: 200,
      friction: 0.02,
      rotation: {
        enabled: true,
        speed: { min: -5, max: 5 }
      },
      shape: 'square',
      blendMode: 'normal'
    }
  }
};

// Configurações específicas para diferentes seções
export const sectionParticleConfigs = {
  hero: {
    desktop: particlePresets.floatingDots.config,
    mobile: {
      ...particlePresets.floatingDots.config,
      count: 15,
      spawnRate: 0.3
    }
  },
  
  services: {
    hover: particlePresets.explosion.config,
    background: {
      ...particlePresets.stars.config,
      count: 10,
      spawnRate: 0.2
    }
  },
  
  portfolio: {
    background: particlePresets.codeRain.config,
    hover: particlePresets.confetti.config
  },
  
  contact: {
    background: particlePresets.bubbles.config
  }
};

// Configurações baseadas no tema
export const themeParticleConfigs = {
  light: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4'
  },
  
  dark: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    accent: '#22d3ee'
  }
};