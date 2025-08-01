import { TiltConfig } from '@/types/interactions';

export class TiltEffect {
  private element: HTMLElement;
  private config: TiltConfig;
  private isActive = false;
  private glareElement: HTMLElement | null = null;
  private boundHandlers: { [key: string]: EventListener } = {};

  constructor(element: HTMLElement, config: Partial<TiltConfig> = {}) {
    this.element = element;
    this.config = {
      maxTilt: 15,
      perspective: 1000,
      scale: 1.05,
      speed: 300,
      glare: true,
      glareMaxOpacity: 0.7,
      glareColor: 'rgba(255, 255, 255, 0.3)',
      glarePosition: 'center',
      gyroscope: false,
      ...config
    };

    this.init();
  }

  private init(): void {
    this.setupElement();
    this.createGlare();
    this.bindEvents();
  }

  private setupElement(): void {
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.transition = `transform ${this.config.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  }

  private createGlare(): void {
    if (!this.config.glare) return;

    this.glareElement = document.createElement('div');
    this.glareElement.className = 'tilt-glare';
    this.glareElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(0deg, transparent 0%, ${this.config.glareColor} 100%);
      opacity: 0;
      pointer-events: none;
      transition: opacity ${this.config.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99);
      mix-blend-mode: overlay;
    `;

    // Ensure element has relative positioning
    if (getComputedStyle(this.element).position === 'static') {
      this.element.style.position = 'relative';
    }

    this.element.appendChild(this.glareElement);
  }

  private bindEvents(): void {
    this.boundHandlers.mouseEnter = this.onMouseEnter.bind(this);
    this.boundHandlers.mouseMove = this.onMouseMove.bind(this);
    this.boundHandlers.mouseLeave = this.onMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this.boundHandlers.mouseEnter);
    this.element.addEventListener('mousemove', this.boundHandlers.mouseMove);
    this.element.addEventListener('mouseleave', this.boundHandlers.mouseLeave);

    // Gyroscope support for mobile
    if (this.config.gyroscope && 'DeviceOrientationEvent' in window) {
      this.boundHandlers.deviceOrientation = this.onDeviceOrientation.bind(this);
      window.addEventListener('deviceorientation', this.boundHandlers.deviceOrientation);
    }
  }

  private onMouseEnter(): void {
    this.isActive = true;
    this.element.style.willChange = 'transform';
    
    if (this.glareElement) {
      this.glareElement.style.opacity = this.config.glareMaxOpacity.toString();
    }
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.isActive) return;

    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * this.config.maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * this.config.maxTilt;

    this.applyTransform(rotateX, rotateY);
    this.updateGlare(mouseX, mouseY, rect);
  }

  private onMouseLeave(): void {
    this.isActive = false;
    this.element.style.willChange = 'auto';
    this.element.style.transform = `perspective(${this.config.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    
    if (this.glareElement) {
      this.glareElement.style.opacity = '0';
    }
  }

  private onDeviceOrientation(event: DeviceOrientationEvent): void {
    if (!this.isActive || !event.gamma || !event.beta) return;

    const rotateX = (event.beta / 90) * this.config.maxTilt;
    const rotateY = (event.gamma / 90) * this.config.maxTilt;

    this.applyTransform(rotateX, rotateY);
  }

  private applyTransform(rotateX: number, rotateY: number): void {
    // Clamp rotation values
    rotateX = Math.max(-this.config.maxTilt, Math.min(this.config.maxTilt, rotateX));
    rotateY = Math.max(-this.config.maxTilt, Math.min(this.config.maxTilt, rotateY));

    const transform = `
      perspective(${this.config.perspective}px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${this.config.scale}, ${this.config.scale}, ${this.config.scale})
    `;

    this.element.style.transform = transform;
  }

  private updateGlare(mouseX: number, mouseY: number, rect: DOMRect): void {
    if (!this.glareElement) return;

    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    const opacity = Math.min(
      this.config.glareMaxOpacity,
      (Math.sqrt(mouseX * mouseX + mouseY * mouseY) / Math.sqrt(rect.width * rect.width + rect.height * rect.height)) * this.config.glareMaxOpacity
    );

    this.glareElement.style.background = `linear-gradient(${angle + 90}deg, transparent 0%, ${this.config.glareColor} 100%)`;
    this.glareElement.style.opacity = opacity.toString();
  }

  public updateConfig(newConfig: Partial<TiltConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.element.style.transition = `transform ${this.config.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  }

  public destroy(): void {
    // Remove event listeners
    Object.entries(this.boundHandlers).forEach(([event, handler]) => {
      if (event === 'deviceOrientation') {
        window.removeEventListener('deviceorientation', handler);
      } else {
        this.element.removeEventListener(event.toLowerCase().replace('mouse', 'mouse'), handler);
      }
    });

    // Remove glare element
    if (this.glareElement && this.glareElement.parentNode) {
      this.glareElement.parentNode.removeChild(this.glareElement);
    }

    // Reset element styles
    this.element.style.transform = '';
    this.element.style.transformStyle = '';
    this.element.style.transition = '';
    this.element.style.willChange = '';
  }

  public reset(): void {
    this.onMouseLeave();
  }
}