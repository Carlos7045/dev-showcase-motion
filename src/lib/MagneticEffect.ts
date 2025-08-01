import { MagneticConfig } from '@/types/interactions';

export class MagneticEffect {
  private element: HTMLElement;
  private config: MagneticConfig;
  private isActive = false;
  private animationFrame: number | null = null;
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private boundHandlers: { [key: string]: EventListener } = {};

  constructor(element: HTMLElement, config: Partial<MagneticConfig> = {}) {
    this.element = element;
    this.config = {
      strength: 0.3,
      radius: 100,
      restoreSpeed: 0.15,
      threshold: 10,
      ...config
    };

    this.init();
  }

  private init(): void {
    this.setupElement();
    this.bindEvents();
  }

  private setupElement(): void {
    this.element.style.transition = 'transform 0.1s ease-out';
    this.element.style.willChange = 'transform';
  }

  private bindEvents(): void {
    this.boundHandlers.mouseMove = this.onMouseMove.bind(this);
    this.boundHandlers.mouseLeave = this.onMouseLeave.bind(this);

    document.addEventListener('mousemove', this.boundHandlers.mouseMove);
    this.element.addEventListener('mouseleave', this.boundHandlers.mouseLeave);
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    if (distance < this.config.radius) {
      if (!this.isActive) {
        this.isActive = true;
        this.startAnimation();
      }

      const force = (this.config.radius - distance) / this.config.radius;
      const angle = Math.atan2(mouseY - centerY, mouseX - centerX);

      this.targetX = Math.cos(angle) * force * this.config.strength * 50;
      this.targetY = Math.sin(angle) * force * this.config.strength * 50;
    } else if (this.isActive) {
      this.targetX = 0;
      this.targetY = 0;
    }
  }

  private onMouseLeave(): void {
    this.targetX = 0;
    this.targetY = 0;
  }

  private startAnimation(): void {
    if (this.animationFrame) return;

    const animate = () => {
      // Smooth interpolation towards target
      this.currentX += (this.targetX - this.currentX) * this.config.restoreSpeed;
      this.currentY += (this.targetY - this.currentY) * this.config.restoreSpeed;

      // Apply transform
      this.element.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;

      // Check if we should stop animation
      const distance = Math.sqrt(
        Math.pow(this.targetX - this.currentX, 2) + Math.pow(this.targetY - this.currentY, 2)
      );

      if (distance > this.config.threshold || this.isActive) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.stopAnimation();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private stopAnimation(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.isActive = false;
    
    // Reset position if very close to origin
    if (Math.abs(this.currentX) < 1 && Math.abs(this.currentY) < 1) {
      this.element.style.transform = 'translate3d(0, 0, 0)';
      this.currentX = 0;
      this.currentY = 0;
    }
  }

  public updateConfig(newConfig: Partial<MagneticConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public destroy(): void {
    this.stopAnimation();
    
    // Remove event listeners
    document.removeEventListener('mousemove', this.boundHandlers.mouseMove);
    this.element.removeEventListener('mouseleave', this.boundHandlers.mouseLeave);

    // Reset element styles
    this.element.style.transform = '';
    this.element.style.transition = '';
    this.element.style.willChange = '';
  }

  public reset(): void {
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.element.style.transform = 'translate3d(0, 0, 0)';
    this.stopAnimation();
  }
}