/**
 * Scroll - Utilities para operações de scroll
 * Funções reutilizáveis para scroll suave e navegação
 */

// === TIPOS ===
export interface ScrollToSectionOptions {
  /** ID da seção de destino */
  readonly sectionId: string;
  /** Comportamento do scroll */
  readonly behavior?: ScrollBehavior;
  /** Offset adicional em pixels */
  readonly offset?: number;
  /** Callback quando o scroll completa */
  readonly onComplete?: () => void;
}

export interface ScrollProgressInfo {
  /** Progresso do scroll (0-1) */
  readonly progress: number;
  /** Posição Y atual */
  readonly scrollY: number;
  /** Altura total do documento */
  readonly documentHeight: number;
  /** Altura da viewport */
  readonly viewportHeight: number;
}

// === CONSTANTES ===
const DEFAULT_SCROLL_BEHAVIOR: ScrollBehavior = 'smooth';
const DEFAULT_SCROLL_OFFSET = 0;
const SCROLL_COMPLETE_DELAY = 500; // ms para scroll suave

// === UTILITIES DE SCROLL PARA SEÇÕES ===
export const scrollToSection = (options: ScrollToSectionOptions): void => {
  const {
    sectionId,
    behavior = DEFAULT_SCROLL_BEHAVIOR,
    offset = DEFAULT_SCROLL_OFFSET,
    onComplete,
  } = options;

  const targetElement = document.getElementById(sectionId);
  
  if (!targetElement) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  if (offset !== 0) {
    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = rect.top + scrollTop + offset;

    window.scrollTo({
      top: targetPosition,
      behavior,
    });
  } else {
    targetElement.scrollIntoView({
      behavior,
      block: 'start',
      inline: 'nearest',
    });
  }

  // Callback quando completa
  if (onComplete) {
    if (behavior === 'smooth') {
      setTimeout(onComplete, SCROLL_COMPLETE_DELAY);
    } else {
      onComplete();
    }
  }
};

// === UTILITIES DE SCROLL COMUNS ===
export const scrollToTop = (behavior: ScrollBehavior = DEFAULT_SCROLL_BEHAVIOR): void => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};

export const scrollToBottom = (behavior: ScrollBehavior = DEFAULT_SCROLL_BEHAVIOR): void => {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  window.scrollTo({
    top: documentHeight,
    behavior,
  });
};

// === UTILITIES DE PROGRESSO DE SCROLL ===
export const getScrollProgress = (): ScrollProgressInfo => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const viewportHeight = window.innerHeight;
  const maxScroll = documentHeight - viewportHeight;
  const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

  return {
    progress,
    scrollY,
    documentHeight,
    viewportHeight,
  };
};

export const getScrollPercentage = (): number => {
  const { progress } = getScrollProgress();
  return Math.round(progress * 100);
};

// === UTILITIES DE SCROLL LISTENER ===
export const addScrollListener = (
  callback: (info: ScrollProgressInfo) => void,
  options?: { throttle?: boolean }
): (() => void) => {
  const { throttle = true } = options || {};
  
  let rafId: number | null = null;
  
  const handleScroll = () => {
    if (throttle) {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        callback(getScrollProgress());
        rafId = null;
      });
    } else {
      callback(getScrollProgress());
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Chamar uma vez para obter estado inicial
  handleScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  };
};

// === UTILITIES DE SCROLL SUAVE CUSTOMIZADO ===
export const smoothScrollTo = (
  targetY: number,
  duration: number = 500,
  easing: (t: number) => number = (t) => t * (2 - t) // easeOutQuad
): Promise<void> => {
  return new Promise((resolve) => {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      
      window.scrollTo(0, startY + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animateScroll);
  });
};

// === UTILITIES DE DETECÇÃO DE DIREÇÃO ===
export const createScrollDirectionDetector = (
  callback: (direction: 'up' | 'down', scrollY: number) => void
): (() => void) => {
  let lastScrollY = window.pageYOffset;
  let rafId: number | null = null;

  const handleScroll = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (Math.abs(currentScrollY - lastScrollY) > 5) { // Threshold para evitar micro-movimentos
        callback(direction, currentScrollY);
        lastScrollY = currentScrollY;
      }
      
      rafId = null;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  };
};

// === UTILITIES DE SCROLL PARA ELEMENTOS ===
export const scrollElementIntoView = (
  element: Element,
  options?: ScrollIntoViewOptions
): void => {
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  };

  element.scrollIntoView({ ...defaultOptions, ...options });
};

export const isElementInViewport = (
  element: Element,
  threshold: number = 0
): boolean => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= viewportHeight + threshold &&
    rect.right <= viewportWidth + threshold
  );
};

export const getElementVisibilityRatio = (element: Element): number => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  
  const visibleArea = Math.max(0, visibleWidth) * Math.max(0, visibleHeight);
  const totalArea = rect.width * rect.height;

  return totalArea > 0 ? visibleArea / totalArea : 0;
};

// === UTILITIES DE SCROLL PARA NAVEGAÇÃO ===
export const createSectionNavigator = () => {
  const navigateToSection = (sectionId: string, offset?: number) => {
    scrollToSection({ sectionId, offset });
  };

  const navigateToAbout = () => navigateToSection('about');
  const navigateToPortfolio = () => navigateToSection('portfolio');
  const navigateToContact = () => navigateToSection('contact');
  const navigateToServices = () => navigateToSection('services');

  return {
    navigateToSection,
    navigateToAbout,
    navigateToPortfolio,
    navigateToContact,
    navigateToServices,
    scrollToTop: () => scrollToTop(),
    scrollToBottom: () => scrollToBottom(),
  };
};

// === UTILITIES DE SCROLL PARA PERFORMANCE ===
export const createScrollThrottler = (
  callback: () => void,
  delay: number = 16 // ~60fps
): (() => void) => {
  let timeoutId: number | null = null;
  let lastExecTime = 0;

  return () => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      callback();
      lastExecTime = currentTime;
    } else {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        callback();
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
};

export const createScrollDebouncer = (
  callback: () => void,
  delay: number = 100
): (() => void) => {
  let timeoutId: number | null = null;

  return () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      callback();
      timeoutId = null;
    }, delay);
  };
};