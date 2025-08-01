import { HoverEffect, TiltConfig, MagneticConfig, RippleConfig, GlowConfig } from '@/types/interactions';
import { TiltEffect } from './TiltEffect';
import { MagneticEffect } from './MagneticEffect';
import { RippleEffect } from './RippleEffect';

export class HoverEffectManager {
  private effects: Map<HTMLElement, any[]> = new Map();

  public applyEffect(element: HTMLElement, effect: HoverEffect, config?: any): void {
    if (!element) return;

    let effectInstance: any;

    switch (effect.type) {
      case '3d-tilt':
        effectInstance = new TiltEffect(element, {
          maxTilt: effect.intensity,
          speed: effect.duration,
          scale: 1 + (effect.intensity / 100),
          ...config
        } as TiltConfig);
        break;

      case 'magnetic':
        effectInstance = new MagneticEffect(element, {
          strength: effect.intensity / 100,
          radius: effect.intensity * 2,
          restoreSpeed: 1 / (effect.duration / 100),
          ...config
        } as MagneticConfig);
        break;

      case 'ripple':
        effectInstance = new RippleEffect(element, {
          size: effect.intensity,
          duration: effect.duration,
          opacity: effect.intensity / 100,
          ...config
        } as RippleConfig);
        break;

      case 'glow':
        this.applyGlowEffect(element, effect, config);
        break;

      case 'scale':
        this.applyScaleEffect(element, effect);
        break;

      case 'rotate':
        this.applyRotateEffect(element, effect);
        break;

      case 'float':
        this.applyFloatEffect(element, effect);
        break;

      case 'morph':
        this.applyMorphEffect(element, effect, config);
        break;

      default:
        console.warn(`Unknown hover effect type: ${effect.type}`);
        return;
    }

    // Store effect instance for cleanup
    if (effectInstance) {
      const elementEffects = this.effects.get(element) || [];
      elementEffects.push(effectInstance);
      this.effects.set(element, elementEffects);
    }
  }

  private applyGlowEffect(element: HTMLElement, effect: HoverEffect, config?: GlowConfig): void {
    const glowConfig = {
      color: '#3b82f6',
      size: 20,
      intensity: effect.intensity,
      duration: effect.duration,
      spread: 10,
      ...config
    };

    const originalBoxShadow = element.style.boxShadow;
    const originalTransition = element.style.transition;

    element.style.transition = `box-shadow ${glowConfig.duration}ms ${effect.easing || 'ease-out'}`;

    const handleMouseEnter = () => {
      const glowShadow = `0 0 ${glowConfig.size}px ${glowConfig.spread}px ${glowConfig.color}`;
      element.style.boxShadow = originalBoxShadow ? `${originalBoxShadow}, ${glowShadow}` : glowShadow;
    };

    const handleMouseLeave = () => {
      element.style.boxShadow = originalBoxShadow;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Store cleanup function
    const cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.boxShadow = originalBoxShadow;
      element.style.transition = originalTransition;
    };

    const elementEffects = this.effects.get(element) || [];
    elementEffects.push({ destroy: cleanup });
    this.effects.set(element, elementEffects);
  }

  private applyScaleEffect(element: HTMLElement, effect: HoverEffect): void {
    const scale = 1 + (effect.intensity / 100);
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;

    element.style.transition = `transform ${effect.duration}ms ${effect.easing || 'ease-out'}`;

    const handleMouseEnter = () => {
      const currentTransform = element.style.transform || '';
      element.style.transform = `${currentTransform} scale(${scale})`.trim();
    };

    const handleMouseLeave = () => {
      element.style.transform = originalTransform;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    const cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.transform = originalTransform;
      element.style.transition = originalTransition;
    };

    const elementEffects = this.effects.get(element) || [];
    elementEffects.push({ destroy: cleanup });
    this.effects.set(element, elementEffects);
  }

  private applyRotateEffect(element: HTMLElement, effect: HoverEffect): void {
    const rotation = effect.intensity; // degrees
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;

    element.style.transition = `transform ${effect.duration}ms ${effect.easing || 'ease-out'}`;

    const handleMouseEnter = () => {
      const currentTransform = element.style.transform || '';
      element.style.transform = `${currentTransform} rotate(${rotation}deg)`.trim();
    };

    const handleMouseLeave = () => {
      element.style.transform = originalTransform;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    const cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.transform = originalTransform;
      element.style.transition = originalTransition;
    };

    const elementEffects = this.effects.get(element) || [];
    elementEffects.push({ destroy: cleanup });
    this.effects.set(element, elementEffects);
  }

  private applyFloatEffect(element: HTMLElement, effect: HoverEffect): void {
    const floatDistance = effect.intensity; // pixels
    const originalTransform = element.style.transform;
    const originalTransition = element.style.transition;

    element.style.transition = `transform ${effect.duration}ms ${effect.easing || 'ease-out'}`;

    const handleMouseEnter = () => {
      const currentTransform = element.style.transform || '';
      element.style.transform = `${currentTransform} translateY(-${floatDistance}px)`.trim();
    };

    const handleMouseLeave = () => {
      element.style.transform = originalTransform;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    const cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.transform = originalTransform;
      element.style.transition = originalTransition;
    };

    const elementEffects = this.effects.get(element) || [];
    elementEffects.push({ destroy: cleanup });
    this.effects.set(element, elementEffects);
  }

  private applyMorphEffect(element: HTMLElement, effect: HoverEffect, config?: any): void {
    const morphConfig = {
      from: {
        borderRadius: '8px',
        transform: 'scale(1)'
      },
      to: {
        borderRadius: '50%',
        transform: 'scale(1.1)'
      },
      ...config
    };

    const originalStyles = {
      borderRadius: element.style.borderRadius,
      transform: element.style.transform,
      transition: element.style.transition
    };

    // Set initial state
    element.style.borderRadius = morphConfig.from.borderRadius;
    element.style.transition = `all ${effect.duration}ms ${effect.easing || 'ease-out'}`;

    const handleMouseEnter = () => {
      element.style.borderRadius = morphConfig.to.borderRadius;
      element.style.transform = morphConfig.to.transform;
    };

    const handleMouseLeave = () => {
      element.style.borderRadius = morphConfig.from.borderRadius;
      element.style.transform = morphConfig.from.transform;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    const cleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      Object.entries(originalStyles).forEach(([prop, value]) => {
        (element.style as any)[prop] = value;
      });
    };

    const elementEffects = this.effects.get(element) || [];
    elementEffects.push({ destroy: cleanup });
    this.effects.set(element, elementEffects);
  }

  public removeEffect(element: HTMLElement): void {
    const elementEffects = this.effects.get(element);
    if (elementEffects) {
      elementEffects.forEach(effect => {
        if (effect && typeof effect.destroy === 'function') {
          effect.destroy();
        }
      });
      this.effects.delete(element);
    }
  }

  public removeAllEffects(): void {
    this.effects.forEach((effects, element) => {
      effects.forEach(effect => {
        if (effect && typeof effect.destroy === 'function') {
          effect.destroy();
        }
      });
    });
    this.effects.clear();
  }

  public hasEffect(element: HTMLElement): boolean {
    return this.effects.has(element);
  }

  public getEffectCount(): number {
    return this.effects.size;
  }
}

// Singleton instance
export const hoverEffectManager = new HoverEffectManager();