import { RippleConfig } from '@/types/interactions';

export class RippleEffect {
  private element: HTMLElement;
  private config: RippleConfig;
  private ripples: HTMLElement[] = [];
  private boundHandlers: { [key: string]: EventListener } = {};

  constructor(element: HTMLElement, config: Partial<RippleConfig> = {}) {
    this.element = element;
    this.config = {
      color: 'rgba(255, 255, 255, 0.6)',
      duration: 600,
      size: 100,
      opacity: 0.6,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      ...config
    };

    this.init();
  }

  private init(): void {
    this.setupElement();
    this.bindEvents();
  }

  private setupElement(): void {
    // Ensure element has relative positioning for ripple positioning
    if (getComputedStyle(this.element).position === 'static') {
      this.element.style.position = 'relative';
    }
    
    // Ensure overflow is hidden to contain ripples
    this.element.style.overflow = 'hidden';
  }

  private bindEvents(): void {
    this.boundHandlers.click = this.onClick.bind(this);
    this.boundHandlers.mousedown = this.onMouseDown.bind(this);
    
    this.element.addEventListener('click', this.boundHandlers.click);
    this.element.addEventListener('mousedown', this.boundHandlers.mousedown);
  }

  private onClick(event: MouseEvent): void {
    this.createRipple(event);
  }

  private onMouseDown(event: MouseEvent): void {
    // Prevent default to avoid focus outline
    event.preventDefault();
  }

  private createRipple(event: MouseEvent): void {
    const rect = this.element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * (this.config.size / 100);
    
    // Calculate position relative to element
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${this.config.color};
      opacity: ${this.config.opacity};
      transform: scale(0);
      pointer-events: none;
      z-index: 1000;
      transition: transform ${this.config.duration}ms ${this.config.easing},
                  opacity ${this.config.duration}ms ${this.config.easing};
    `;

    this.element.appendChild(ripple);
    this.ripples.push(ripple);

    // Trigger animation
    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });

    // Remove ripple after animation
    setTimeout(() => {
      this.removeRipple(ripple);
    }, this.config.duration);
  }

  private removeRipple(ripple: HTMLElement): void {
    const index = this.ripples.indexOf(ripple);
    if (index > -1) {
      this.ripples.splice(index, 1);
    }

    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }

  public createRippleAt(x: number, y: number): void {
    const rect = this.element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * (this.config.size / 100);
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${this.config.color};
      opacity: ${this.config.opacity};
      transform: scale(0);
      pointer-events: none;
      z-index: 1000;
      transition: transform ${this.config.duration}ms ${this.config.easing},
                  opacity ${this.config.duration}ms ${this.config.easing};
    `;

    this.element.appendChild(ripple);
    this.ripples.push(ripple);

    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });

    setTimeout(() => {
      this.removeRipple(ripple);
    }, this.config.duration);
  }

  public updateConfig(newConfig: Partial<RippleConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public clearRipples(): void {
    this.ripples.forEach(ripple => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });
    this.ripples = [];
  }

  public destroy(): void {
    // Remove event listeners
    this.element.removeEventListener('click', this.boundHandlers.click);
    this.element.removeEventListener('mousedown', this.boundHandlers.mousedown);

    // Clear all ripples
    this.clearRipples();

    // Reset element styles if they were modified
    // Note: We don't reset position and overflow as they might be needed for other purposes
  }
}