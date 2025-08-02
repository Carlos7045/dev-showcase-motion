// Utilitários para gerenciamento de foco e acessibilidade

export class FocusManager {
  private static focusStack: HTMLElement[] = [];
  private static trapStack: HTMLElement[] = [];

  /**
   * Salva o elemento com foco atual
   */
  static saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusStack.push(activeElement);
    }
  }

  /**
   * Restaura o foco para o último elemento salvo
   */
  static restoreFocus(): void {
    const lastFocused = this.focusStack.pop();
    if (lastFocused && document.contains(lastFocused)) {
      lastFocused.focus();
    }
  }

  /**
   * Move o foco para um elemento específico
   */
  static moveFocusTo(element: HTMLElement | string): void {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;

    if (targetElement) {
      targetElement.focus();
    }
  }

  /**
   * Encontra todos os elementos focáveis dentro de um container
   */
  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors))
      .filter(element => {
        const el = element as HTMLElement;
        return el.offsetWidth > 0 && 
               el.offsetHeight > 0 && 
               !el.hidden &&
               window.getComputedStyle(el).visibility !== 'hidden';
      }) as HTMLElement[];
  }

  /**
   * Cria uma armadilha de foco (focus trap) em um container
   */
  static trapFocus(container: HTMLElement): () => void {
    this.trapStack.push(container);
    const focusableElements = this.getFocusableElements(container);
    
    if (focusableElements.length === 0) {
      // Se não há elementos focáveis, torna o container focável
      container.tabIndex = -1;
      container.focus();
      return () => this.releaseFocusTrap();
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Move foco para o primeiro elemento
    firstElement.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab (navegação reversa)
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (navegação normal)
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      this.releaseFocusTrap();
    };
  }

  /**
   * Remove a armadilha de foco atual
   */
  static releaseFocusTrap(): void {
    this.trapStack.pop();
  }

  /**
   * Verifica se um elemento está visível na tela
   */
  static isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    
    return rect.width > 0 &&
           rect.height > 0 &&
           style.visibility !== 'hidden' &&
           style.display !== 'none' &&
           parseFloat(style.opacity) > 0;
  }

  /**
   * Encontra o próximo elemento focável
   */
  static getNextFocusableElement(currentElement: HTMLElement, reverse = false): HTMLElement | null {
    const allFocusable = this.getFocusableElements(document.body);
    const currentIndex = allFocusable.indexOf(currentElement);
    
    if (currentIndex === -1) return null;
    
    const nextIndex = reverse 
      ? (currentIndex - 1 + allFocusable.length) % allFocusable.length
      : (currentIndex + 1) % allFocusable.length;
    
    return allFocusable[nextIndex];
  }

  /**
   * Implementa navegação por setas em uma lista
   */
  static setupArrowNavigation(
    container: HTMLElement, 
    itemSelector: string,
    options: {
      horizontal?: boolean;
      vertical?: boolean;
      wrap?: boolean;
      activateOnFocus?: boolean;
    } = {}
  ): () => void {
    const { 
      horizontal = true, 
      vertical = false, 
      wrap = true,
      activateOnFocus = false 
    } = options;

    const handleKeyDown = (event: KeyboardEvent) => {
      const items = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[];
      const currentIndex = items.findIndex(item => item === document.activeElement);
      
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      let handled = false;

      switch (event.key) {
        case 'ArrowRight':
          if (horizontal) {
            nextIndex = wrap ? (currentIndex + 1) % items.length : Math.min(currentIndex + 1, items.length - 1);
            handled = true;
          }
          break;
        case 'ArrowLeft':
          if (horizontal) {
            nextIndex = wrap ? (currentIndex - 1 + items.length) % items.length : Math.max(currentIndex - 1, 0);
            handled = true;
          }
          break;
        case 'ArrowDown':
          if (vertical) {
            nextIndex = wrap ? (currentIndex + 1) % items.length : Math.min(currentIndex + 1, items.length - 1);
            handled = true;
          }
          break;
        case 'ArrowUp':
          if (vertical) {
            nextIndex = wrap ? (currentIndex - 1 + items.length) % items.length : Math.max(currentIndex - 1, 0);
            handled = true;
          }
          break;
        case 'Home':
          nextIndex = 0;
          handled = true;
          break;
        case 'End':
          nextIndex = items.length - 1;
          handled = true;
          break;
      }

      if (handled) {
        event.preventDefault();
        items[nextIndex].focus();
        
        if (activateOnFocus) {
          items[nextIndex].click();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }
}

// Hook para gerenciamento de foco em componentes React
export const useFocusManagement = () => {
  const saveFocus = () => FocusManager.saveFocus();
  const restoreFocus = () => FocusManager.restoreFocus();
  const moveFocusTo = (element: HTMLElement | string) => FocusManager.moveFocusTo(element);
  
  return {
    saveFocus,
    restoreFocus,
    moveFocusTo
  };
};

// Hook para armadilha de foco
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    FocusManager.saveFocus();
    const releaseTrap = FocusManager.trapFocus(containerRef.current);

    return () => {
      releaseTrap();
      FocusManager.restoreFocus();
    };
  }, [isActive]);

  return containerRef;
};

// Utilitários para anúncios de screen reader
export class ScreenReaderAnnouncer {
  private static liveRegion: HTMLElement | null = null;

  /**
   * Inicializa a região live para anúncios
   */
  static init(): void {
    if (this.liveRegion) return;

    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(this.liveRegion);
  }

  /**
   * Anuncia uma mensagem para screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) this.init();
    
    if (this.liveRegion) {
      this.liveRegion.setAttribute('aria-live', priority);
      this.liveRegion.textContent = message;
      
      // Limpa a mensagem após um tempo para permitir novos anúncios
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = '';
        }
      }, 1000);
    }
  }

  /**
   * Anuncia mudanças de rota
   */
  static announceRouteChange(routeName: string): void {
    this.announce(`Navegou para ${routeName}`, 'polite');
  }

  /**
   * Anuncia mudanças de estado
   */
  static announceStateChange(message: string): void {
    this.announce(message, 'polite');
  }

  /**
   * Anuncia erros (com prioridade alta)
   */
  static announceError(message: string): void {
    this.announce(`Erro: ${message}`, 'assertive');
  }
}

// Hook para anúncios de screen reader
export const useScreenReader = () => {
  React.useEffect(() => {
    ScreenReaderAnnouncer.init();
  }, []);

  return {
    announce: ScreenReaderAnnouncer.announce,
    announceRouteChange: ScreenReaderAnnouncer.announceRouteChange,
    announceStateChange: ScreenReaderAnnouncer.announceStateChange,
    announceError: ScreenReaderAnnouncer.announceError
  };
};

// Utilitários para detecção de preferências de acessibilidade
export const getAccessibilityPreferences = () => {
  return {
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
    prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    prefersReducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches
  };
};

// Hook para preferências de acessibilidade
export const useAccessibilityPreferences = () => {
  const [preferences, setPreferences] = React.useState(getAccessibilityPreferences);

  React.useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)'),
      window.matchMedia('(prefers-reduced-transparency: reduce)')
    ];

    const updatePreferences = () => {
      setPreferences(getAccessibilityPreferences());
    };

    mediaQueries.forEach(mq => {
      mq.addEventListener('change', updatePreferences);
    });

    return () => {
      mediaQueries.forEach(mq => {
        mq.removeEventListener('change', updatePreferences);
      });
    };
  }, []);

  return preferences;
};