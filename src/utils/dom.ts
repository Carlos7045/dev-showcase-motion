/**
 * DOM - Utilities para manipulação DOM
 * Funções reutilizáveis para operações DOM comuns e seguras
 */

// === TIPOS ===
export interface ScrollToOptions {
  /** Elemento ou seletor de destino */
  readonly target: string | Element;
  /** Comportamento do scroll */
  readonly behavior?: ScrollBehavior;
  /** Bloco de alinhamento */
  readonly block?: ScrollLogicalPosition;
  /** Inline de alinhamento */
  readonly inline?: ScrollLogicalPosition;
  /** Offset adicional */
  readonly offset?: number;
  /** Callback quando completa */
  readonly onComplete?: () => void;
}

export interface ElementDimensions {
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
  readonly right: number;
  readonly bottom: number;
}

export interface ViewportInfo {
  readonly width: number;
  readonly height: number;
  readonly scrollX: number;
  readonly scrollY: number;
}

export interface ElementVisibility {
  readonly isVisible: boolean;
  readonly isFullyVisible: boolean;
  readonly visibilityRatio: number;
  readonly intersectionRatio: number;
}

// === CONSTANTES ===
const isSSR = typeof window === 'undefined';
const isClient = !isSSR;

// === UTILITIES DE SELEÇÃO ===
export const querySelector = <T extends Element = Element>(
  selector: string,
  context: Document | Element = document
): T | null => {
  if (isSSR) return null;
  
  try {
    return context.querySelector<T>(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return null;
  }
};

export const querySelectorAll = <T extends Element = Element>(
  selector: string,
  context: Document | Element = document
): T[] => {
  if (isSSR) return [];
  
  try {
    return Array.from(context.querySelectorAll<T>(selector));
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return [];
  }
};

export const getElementById = <T extends HTMLElement = HTMLElement>(
  id: string
): T | null => {
  if (isSSR) return null;
  return document.getElementById(id) as T | null;
};

export const getElementByTestId = <T extends HTMLElement = HTMLElement>(
  testId: string
): T | null => {
  return querySelector<T>(`[data-testid="${testId}"]`);
};

// === UTILITIES DE DIMENSÕES ===
export const getElementDimensions = (element: Element): ElementDimensions => {
  if (isSSR || !element) {
    return { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };
  }

  const rect = element.getBoundingClientRect();
  
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
  };
};

export const getViewportInfo = (): ViewportInfo => {
  if (isSSR) {
    return { width: 1024, height: 768, scrollX: 0, scrollY: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX || window.pageXOffset,
    scrollY: window.scrollY || window.pageYOffset,
  };
};

export const getDocumentDimensions = (): { width: number; height: number } => {
  if (isSSR) {
    return { width: 1024, height: 768 };
  }

  const body = document.body;
  const html = document.documentElement;

  return {
    width: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    ),
    height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    ),
  };
};

// === UTILITIES DE VISIBILIDADE ===
export const isElementVisible = (element: Element): boolean => {
  if (isSSR || !element) return false;

  const rect = element.getBoundingClientRect();
  const viewport = getViewportInfo();

  return (
    rect.top < viewport.height &&
    rect.bottom > 0 &&
    rect.left < viewport.width &&
    rect.right > 0
  );
};

export const isElementFullyVisible = (element: Element): boolean => {
  if (isSSR || !element) return false;

  const rect = element.getBoundingClientRect();
  const viewport = getViewportInfo();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= viewport.height &&
    rect.right <= viewport.width
  );
};

export const getElementVisibility = (element: Element): ElementVisibility => {
  if (isSSR || !element) {
    return {
      isVisible: false,
      isFullyVisible: false,
      visibilityRatio: 0,
      intersectionRatio: 0,
    };
  }

  const rect = element.getBoundingClientRect();
  const viewport = getViewportInfo();

  const isVisible = isElementVisible(element);
  const isFullyVisible = isElementFullyVisible(element);

  // Calcular ratio de visibilidade
  const visibleWidth = Math.min(rect.right, viewport.width) - Math.max(rect.left, 0);
  const visibleHeight = Math.min(rect.bottom, viewport.height) - Math.max(rect.top, 0);
  const visibleArea = Math.max(0, visibleWidth) * Math.max(0, visibleHeight);
  const totalArea = rect.width * rect.height;
  const visibilityRatio = totalArea > 0 ? visibleArea / totalArea : 0;

  // Calcular intersection ratio (similar ao IntersectionObserver)
  const intersectionRatio = isVisible ? visibilityRatio : 0;

  return {
    isVisible,
    isFullyVisible,
    visibilityRatio,
    intersectionRatio,
  };
};

// === UTILITIES DE SCROLL ===
export const scrollToElement = (options: ScrollToOptions): void => {
  if (isSSR) return;

  const {
    target,
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
    offset = 0,
    onComplete,
  } = options;

  let element: Element | null = null;

  if (typeof target === 'string') {
    element = querySelector(target);
  } else {
    element = target;
  }

  if (!element) {
    console.warn(`Element not found for scroll target:`, target);
    return;
  }

  // Calcular posição com offset
  if (offset !== 0) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = rect.top + scrollTop + offset;

    window.scrollTo({
      top: targetPosition,
      behavior,
    });
  } else {
    element.scrollIntoView({
      behavior,
      block,
      inline,
    });
  }

  // Callback quando completa (aproximado)
  if (onComplete) {
    if (behavior === 'smooth') {
      setTimeout(onComplete, 500); // Estimativa para scroll suave
    } else {
      onComplete();
    }
  }
};

export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  if (isSSR) return;

  window.scrollTo({
    top: 0,
    behavior,
  });
};

export const scrollToBottom = (behavior: ScrollBehavior = 'smooth'): void => {
  if (isSSR) return;

  const { height } = getDocumentDimensions();
  
  window.scrollTo({
    top: height,
    behavior,
  });
};

export const getScrollProgress = (): number => {
  if (isSSR) return 0;

  const { scrollY } = getViewportInfo();
  const { height: docHeight } = getDocumentDimensions();
  const { height: viewportHeight } = getViewportInfo();
  
  const maxScroll = docHeight - viewportHeight;
  
  return maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
};

// === UTILITIES DE CLASSES CSS ===
export const addClass = (element: Element, ...classNames: string[]): void => {
  if (isSSR || !element) return;
  
  element.classList.add(...classNames.filter(Boolean));
};

export const removeClass = (element: Element, ...classNames: string[]): void => {
  if (isSSR || !element) return;
  
  element.classList.remove(...classNames.filter(Boolean));
};

export const toggleClass = (
  element: Element,
  className: string,
  force?: boolean
): boolean => {
  if (isSSR || !element) return false;
  
  return element.classList.toggle(className, force);
};

export const hasClass = (element: Element, className: string): boolean => {
  if (isSSR || !element) return false;
  
  return element.classList.contains(className);
};

export const replaceClass = (
  element: Element,
  oldClass: string,
  newClass: string
): void => {
  if (isSSR || !element) return;
  
  element.classList.replace(oldClass, newClass);
};

// === UTILITIES DE ATRIBUTOS ===
export const getAttribute = (
  element: Element,
  name: string,
  defaultValue: string = ''
): string => {
  if (isSSR || !element) return defaultValue;
  
  return element.getAttribute(name) || defaultValue;
};

export const setAttribute = (
  element: Element,
  name: string,
  value: string
): void => {
  if (isSSR || !element) return;
  
  element.setAttribute(name, value);
};

export const removeAttribute = (element: Element, name: string): void => {
  if (isSSR || !element) return;
  
  element.removeAttribute(name);
};

export const hasAttribute = (element: Element, name: string): boolean => {
  if (isSSR || !element) return false;
  
  return element.hasAttribute(name);
};

export const getDataAttribute = (
  element: Element,
  name: string,
  defaultValue: string = ''
): string => {
  return getAttribute(element, `data-${name}`, defaultValue);
};

export const setDataAttribute = (
  element: Element,
  name: string,
  value: string
): void => {
  setAttribute(element, `data-${name}`, value);
};

// === UTILITIES DE EVENTOS ===
export const addEventListener = <K extends keyof HTMLElementEventMap>(
  element: Element | Window | Document,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): (() => void) => {
  if (isSSR || !element) return () => {};

  element.addEventListener(type, listener as EventListener, options);

  return () => {
    element.removeEventListener(type, listener as EventListener, options);
  };
};

export const addEventListenerOnce = <K extends keyof HTMLElementEventMap>(
  element: Element | Window | Document,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions
): (() => void) => {
  return addEventListener(element, type, listener, { ...options, once: true });
};

export const delegateEvent = <K extends keyof HTMLElementEventMap>(
  container: Element,
  selector: string,
  type: K,
  listener: (event: HTMLElementEventMap[K], target: Element) => void,
  options?: AddEventListenerOptions
): (() => void) => {
  if (isSSR || !container) return () => {};

  const delegatedListener = (event: Event) => {
    const target = event.target as Element;
    const delegateTarget = target.closest(selector);
    
    if (delegateTarget && container.contains(delegateTarget)) {
      listener(event as HTMLElementEventMap[K], delegateTarget);
    }
  };

  container.addEventListener(type, delegatedListener, options);

  return () => {
    container.removeEventListener(type, delegatedListener, options);
  };
};

// === UTILITIES DE FOCO ===
export const focusElement = (element: HTMLElement, options?: FocusOptions): void => {
  if (isSSR || !element) return;
  
  element.focus(options);
};

export const blurElement = (element: HTMLElement): void => {
  if (isSSR || !element) return;
  
  element.blur();
};

export const getFocusedElement = (): Element | null => {
  if (isSSR) return null;
  
  return document.activeElement;
};

export const isFocused = (element: Element): boolean => {
  if (isSSR || !element) return false;
  
  return document.activeElement === element;
};

export const trapFocus = (container: Element): (() => void) => {
  if (isSSR || !container) return () => {};

  const focusableElements = querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    container
  ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

  if (focusableElements.length === 0) return () => {};

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  firstElement.focus();

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

// === UTILITIES DE CRIAÇÃO ===
export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Record<string, string>,
  children?: (Node | string)[]
): HTMLElementTagNameMap[K] => {
  if (isSSR) return null as any;

  const element = document.createElement(tagName);

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (children) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  }

  return element;
};

export const createElementFromHTML = (html: string): Element | null => {
  if (isSSR) return null;

  const template = document.createElement('template');
  template.innerHTML = html.trim();
  
  return template.content.firstElementChild;
};

// === UTILITIES DE POSICIONAMENTO ===
export const getElementPosition = (element: Element): { x: number; y: number } => {
  if (isSSR || !element) return { x: 0, y: 0 };

  const rect = element.getBoundingClientRect();
  const { scrollX, scrollY } = getViewportInfo();

  return {
    x: rect.left + scrollX,
    y: rect.top + scrollY,
  };
};

export const getElementCenter = (element: Element): { x: number; y: number } => {
  if (isSSR || !element) return { x: 0, y: 0 };

  const rect = element.getBoundingClientRect();
  const { scrollX, scrollY } = getViewportInfo();

  return {
    x: rect.left + scrollX + rect.width / 2,
    y: rect.top + scrollY + rect.height / 2,
  };
};

export const getDistanceBetweenElements = (
  element1: Element,
  element2: Element
): number => {
  if (isSSR || !element1 || !element2) return 0;

  const pos1 = getElementCenter(element1);
  const pos2 = getElementCenter(element2);

  return Math.sqrt(
    Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
  );
};

// === UTILITIES DE PERFORMANCE ===
export const debounceRAF = (callback: () => void): (() => void) => {
  let rafId: number | null = null;

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  };
};

export const throttleRAF = (callback: () => void): (() => void) => {
  let rafId: number | null = null;
  let lastTime = 0;

  return () => {
    const now = Date.now();
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        callback();
        lastTime = now;
        rafId = null;
      });
    }
  };
};

// === UTILITIES DE DETECÇÃO ===
export const isElementInViewport = (
  element: Element,
  threshold: number = 0
): boolean => {
  if (isSSR || !element) return false;

  const rect = element.getBoundingClientRect();
  const { width, height } = getViewportInfo();

  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= height + threshold &&
    rect.right <= width + threshold
  );
};

export const getElementsInViewport = (
  elements: Element[],
  threshold: number = 0
): Element[] => {
  return elements.filter(element => isElementInViewport(element, threshold));
};

// === UTILITIES DE CLIPBOARD ===
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (isSSR) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para browsers antigos
      const textArea = createElement('textarea', {
        value: text,
        style: 'position: fixed; left: -999999px; top: -999999px;',
      });
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// === UTILITIES DE VALIDAÇÃO ===
export const isValidElement = (element: any): element is Element => {
  return element instanceof Element;
};

export const isValidHTMLElement = (element: any): element is HTMLElement => {
  return element instanceof HTMLElement;
};

export const isElementAttached = (element: Element): boolean => {
  return document.contains(element);
};