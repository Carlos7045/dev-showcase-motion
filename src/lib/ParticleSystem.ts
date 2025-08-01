import { 
  Particle, 
  ParticleConfig, 
  ParticleSystemConfig, 
  MousePosition 
} from '@/types/particles';

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private config: ParticleConfig;
  private isRunning = false;
  private animationFrame: number | null = null;
  private lastTime = 0;
  private mousePosition: MousePosition = { x: 0, y: 0, isActive: false };
  private interactive: boolean;
  private mouseInfluence: ParticleSystemConfig['mouseInfluence'];
  private performance: ParticleSystemConfig['performance'];

  constructor(systemConfig: ParticleSystemConfig) {
    this.canvas = systemConfig.canvas;
    this.config = systemConfig.config;
    this.interactive = systemConfig.interactive || false;
    this.mouseInfluence = systemConfig.mouseInfluence;
    this.performance = systemConfig.performance || {
      maxParticles: 1000,
      cullOffscreen: true
    };

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;

    this.setupCanvas();
    this.setupEventListeners();
  }

  private setupCanvas(): void {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  }

  private setupEventListeners(): void {
    if (!this.interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      this.mousePosition.isActive = false;
    };

    this.canvas.addEventListener('mousemove', handleMouseMove);
    this.canvas.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function será chamada no destroy
    this.cleanup = () => {
      this.canvas.removeEventListener('mousemove', handleMouseMove);
      this.canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  private cleanup: (() => void) | null = null;

  private createParticle(): Particle {
    const id = Math.random().toString(36).substr(2, 9);
    const life = this.randomBetween(this.config.life.min, this.config.life.max);
    
    return {
      id,
      x: this.config.position.x + this.randomBetween(-this.config.position.spread, this.config.position.spread),
      y: this.config.position.y + this.randomBetween(-this.config.position.spread, this.config.position.spread),
      vx: this.randomBetween(this.config.velocity.x.min, this.config.velocity.x.max),
      vy: this.randomBetween(this.config.velocity.y.min, this.config.velocity.y.max),
      life,
      maxLife: life,
      color: this.getRandomColor(),
      size: this.randomBetween(this.config.size.min, this.config.size.max),
      opacity: this.config.opacity.start,
      rotation: this.config.rotation?.enabled ? 0 : undefined,
      rotationSpeed: this.config.rotation?.enabled ? 
        this.randomBetween(this.config.rotation.speed.min, this.config.rotation.speed.max) : undefined,
      scale: 1,
      type: this.config.shape
    };
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private getRandomColor(): string {
    if (this.config.color.random && this.config.color.random.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.config.color.random.length);
      return this.config.color.random[randomIndex];
    }
    return this.config.color.start;
  }

  private updateParticle(particle: Particle, deltaTime: number): void {
    // Atualizar posição
    particle.x += particle.vx * deltaTime;
    particle.y += particle.vy * deltaTime;

    // Aplicar gravidade
    if (this.config.gravity) {
      particle.vy += this.config.gravity * deltaTime;
    }

    // Aplicar fricção
    if (this.config.friction) {
      particle.vx *= (1 - this.config.friction * deltaTime);
      particle.vy *= (1 - this.config.friction * deltaTime);
    }

    // Atualizar rotação
    if (particle.rotation !== undefined && particle.rotationSpeed !== undefined) {
      particle.rotation += particle.rotationSpeed * deltaTime;
    }

    // Atualizar vida
    particle.life -= deltaTime;

    // Atualizar propriedades baseadas na vida
    const lifeRatio = particle.life / particle.maxLife;
    
    // Opacity fade
    particle.opacity = this.lerp(this.config.opacity.end, this.config.opacity.start, lifeRatio);

    // Size shrink
    if (this.config.size.shrink) {
      particle.scale = lifeRatio;
    }

    // Color transition
    if (this.config.color.end) {
      particle.color = this.lerpColor(this.config.color.start, this.config.color.end, 1 - lifeRatio);
    }

    // Mouse influence
    if (this.interactive && this.mouseInfluence?.enabled && this.mousePosition.isActive) {
      this.applyMouseInfluence(particle);
    }
  }

  private applyMouseInfluence(particle: Particle): void {
    if (!this.mouseInfluence) return;

    const dx = this.mousePosition.x - particle.x;
    const dy = this.mousePosition.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.mouseInfluence.radius) {
      const force = (this.mouseInfluence.radius - distance) / this.mouseInfluence.radius;
      const strength = this.mouseInfluence.strength * force;

      switch (this.mouseInfluence.type) {
        case 'attract':
          particle.vx += (dx / distance) * strength;
          particle.vy += (dy / distance) * strength;
          break;
        
        case 'repel':
          particle.vx -= (dx / distance) * strength;
          particle.vy -= (dy / distance) * strength;
          break;
        
        case 'orbit':
          const angle = Math.atan2(dy, dx) + Math.PI / 2;
          particle.vx += Math.cos(angle) * strength;
          particle.vy += Math.sin(angle) * strength;
          break;
      }
    }
  }

  private lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  private lerpColor(color1: string, color2: string, factor: number): string {
    // Implementação simplificada - assumindo cores hex
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(this.lerp(r1, r2, factor));
    const g = Math.round(this.lerp(g1, g2, factor));
    const b = Math.round(this.lerp(b1, b2, factor));
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  private drawParticle(particle: Particle): void {
    this.ctx.save();
    
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fillStyle = particle.color;
    
    if (this.config.blendMode) {
      this.ctx.globalCompositeOperation = this.config.blendMode;
    }

    this.ctx.translate(particle.x, particle.y);
    
    if (particle.rotation !== undefined) {
      this.ctx.rotate(particle.rotation);
    }
    
    if (particle.scale !== undefined) {
      this.ctx.scale(particle.scale, particle.scale);
    }

    const size = particle.size;

    switch (particle.type) {
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      
      case 'square':
        this.ctx.fillRect(-size / 2, -size / 2, size, size);
        break;
      
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size);
        this.ctx.lineTo(-size, size);
        this.ctx.lineTo(size, size);
        this.ctx.closePath();
        this.ctx.fill();
        break;
      
      case 'star':
        this.drawStar(size);
        break;
    }

    this.ctx.restore();
  }

  private drawStar(size: number): void {
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.4;
    
    this.ctx.beginPath();
    
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    
    this.ctx.closePath();
    this.ctx.fill();
  }

  private update(currentTime: number): void {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Spawn new particles
    const particlesToSpawn = Math.floor(this.config.spawnRate * deltaTime);
    for (let i = 0; i < particlesToSpawn; i++) {
      if (this.particles.length < (this.performance?.maxParticles || 1000)) {
        this.particles.push(this.createParticle());
      }
    }

    // Update existing particles
    this.particles = this.particles.filter(particle => {
      this.updateParticle(particle, deltaTime);
      
      // Remove dead particles
      if (particle.life <= 0) {
        return false;
      }

      // Cull offscreen particles if enabled
      if (this.performance?.cullOffscreen) {
        const margin = 100;
        if (particle.x < -margin || particle.x > this.canvas.width + margin ||
            particle.y < -margin || particle.y > this.canvas.height + margin) {
          return false;
        }
      }

      return true;
    });
  }

  private render(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    this.particles.forEach(particle => {
      this.drawParticle(particle);
    });
  }

  private animate = (currentTime: number): void => {
    if (!this.isRunning) return;

    this.update(currentTime);
    this.render();

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  public start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  public updateConfig(newConfig: Partial<ParticleConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public addParticles(count: number): void {
    for (let i = 0; i < count; i++) {
      if (this.particles.length < (this.performance?.maxParticles || 1000)) {
        this.particles.push(this.createParticle());
      }
    }
  }

  public clear(): void {
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public destroy(): void {
    this.stop();
    this.clear();
    if (this.cleanup) {
      this.cleanup();
    }
  }

  public getParticleCount(): number {
    return this.particles.length;
  }

  public resize(): void {
    this.setupCanvas();
  }
}