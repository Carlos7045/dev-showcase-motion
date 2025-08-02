/**
 * Utils - Barrel export para todas as utilities
 * Ponto central de exportação para todas as funções utilitárias
 */

// === ANIMATIONS ===
export * from './animations';

// === DOM ===
export * from './dom';

// === FORMAT ===
export * from './format';

// === IMAGE OPTIMIZATION ===
export * from './imageOptimization';

// === LAZY ROUTES ===
export * from './lazyRoutes';

// === SCROLL ===
export * from './scroll';

// === TRANSITIONS ===
export * from './transitions';

// === UI ===
export * from './ui';

// === VALIDATION ===
export * from './validation';

// === RE-EXPORTS ORGANIZADOS POR CATEGORIA ===

// Animações e transições
export {
  // Animações
  ANIMATION_DEFAULTS,
  EASING_FUNCTIONS,
  ANIMATION_DURATIONS,
  easingFunctions,
  getTransformValue,
  getOpacityValue,
  getScaleValue,
  createAnimationStyles,
  createScrollAnimationStyles,
  createParallaxStyles,
  optimizeAnimation,
  cleanupAnimation,
  createStaggeredDelay,
  createStaggeredDuration,
  createScrollTrigger,
  animateValue,
  animateElement,
  ANIMATION_PRESETS,
  generateAnimationClasses,
  debugAnimation,
  measureAnimationPerformance,
  
  // Transições
  TRANSITION_DEFAULTS,
  COMMON_TIMINGS,
  COMMON_DURATIONS,
  createTransitionClasses,
  createHoverEffect,
  HOVER_EFFECTS,
  createFadeClasses,
  createGradientOverlay,
  GRADIENT_OVERLAYS,
  createBlurEffect,
  BLUR_EFFECTS,
  createGlowEffect,
  GLOW_EFFECTS,
  createLoadingClasses,
  LOADING_EFFECTS,
  createStaggerDelay,
  createStaggeredClasses,
  TRANSFORM_ORIGINS,
  createBackdropEffect,
  BACKDROP_EFFECTS,
  combineEffects,
  createInteractiveElement,
} from './animations';

// DOM e scroll
export {
  // DOM
  querySelector,
  querySelectorAll,
  getElementById,
  getElementByTestId,
  getElementDimensions,
  getViewportInfo,
  getDocumentDimensions,
  isElementVisible,
  isElementFullyVisible,
  getElementVisibility,
  scrollToElement,
  scrollToTop as domScrollToTop,
  scrollToBottom as domScrollToBottom,
  getScrollProgress as domGetScrollProgress,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  replaceClass,
  getAttribute,
  setAttribute,
  removeAttribute,
  hasAttribute,
  getDataAttribute,
  setDataAttribute,
  addEventListener,
  addEventListenerOnce,
  delegateEvent,
  focusElement,
  blurElement,
  getFocusedElement,
  isFocused,
  trapFocus,
  createElement,
  createElementFromHTML,
  getElementPosition,
  getElementCenter,
  getDistanceBetweenElements,
  debounceRAF,
  throttleRAF,
  isElementInViewport as domIsElementInViewport,
  getElementsInViewport,
  copyToClipboard,
  isValidElement,
  isValidHTMLElement,
  isElementAttached,
  
  // Scroll
  scrollToSection,
  scrollToTop,
  scrollToBottom,
  getScrollProgress,
  getScrollPercentage,
  addScrollListener,
  smoothScrollTo,
  createScrollDirectionDetector,
  scrollElementIntoView,
  isElementInViewport,
  getElementVisibilityRatio,
  createSectionNavigator,
  createScrollThrottler,
  createScrollDebouncer,
} from './scroll';

// Formatação e validação
export {
  // Format
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatCompactNumber,
  formatDate,
  formatRelativeDate,
  formatTime,
  formatDuration,
  formatFileSize,
  formatFileName,
  formatText,
  formatName,
  formatInitials,
  formatPhone,
  formatCPF,
  formatCNPJ,
  formatCEP,
  formatURL,
  formatSlug,
  isValidNumber,
  isValidDate,
  isValidString,
  parseNumber,
  parseCurrency,
  maskValue,
  MASKS,
  
  // Validation
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isEmpty,
  isNotEmpty,
  validateLength,
  validateRequired,
  validateEmail,
  isValidEmail,
  validatePassword,
  getPasswordStrength,
  validateCPF,
  validateCNPJ,
  validatePhone,
  validateCEP,
  validateURL,
  sanitizeString,
  sanitizeHTML,
  sanitizeEmail,
  sanitizePhone,
  sanitizeCPF,
  sanitizeCNPJ,
  sanitizeCEP,
  validateForm,
  validateAge,
  validateFile,
} from './validation';

// UI e componentes
export {
  calculateTooltipPosition,
  createConditionalClasses,
  SIZE_VARIANTS,
  getSizeClasses,
  COLOR_VARIANTS,
  getColorClasses,
  BORDER_RADIUS_VARIANTS,
  BORDER_WIDTH_VARIANTS,
  SHADOW_VARIANTS,
  SPACING_VARIANTS,
  createFlexClasses,
  createGridClasses,
  createResponsiveClasses,
  createStateClasses,
  createAccessibilityClasses,
  TRUNCATE_VARIANTS,
  createOverlayClasses,
  createLoadingOverlay,
  ENTER_ANIMATIONS,
  EXIT_ANIMATIONS,
  combineClasses,
  createComponentClasses,
} from './ui';

// === UTILITIES COMBINADAS ===

/**
 * Cria classes para um elemento interativo completo
 */
export const createFullInteractiveElement = (config: {
  size?: keyof typeof SIZE_VARIANTS;
  color?: keyof typeof COLOR_VARIANTS;
  hover?: keyof typeof HOVER_EFFECTS;
  transition?: boolean;
  focus?: boolean;
  disabled?: boolean;
}) => {
  const { size = 'md', color = 'primary', hover = 'buttonHover', transition = true, focus = true, disabled = false } = config;
  
  const classes: string[] = [];
  
  // Tamanho e cor
  classes.push(getSizeClasses(size));
  classes.push(getColorClasses(color));
  
  // Hover effect
  if (hover && HOVER_EFFECTS[hover]) {
    const { baseClasses, hoverClasses } = HOVER_EFFECTS[hover];
    classes.push(baseClasses, hoverClasses);
  }
  
  // Estados
  if (focus) {
    classes.push('focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2');
  }
  
  if (disabled) {
    classes.push('disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none');
  }
  
  return classes.join(' ');
};

/**
 * Cria um sistema de navegação por scroll completo
 */
export const createScrollNavigation = () => {
  const navigator = createSectionNavigator();
  
  return {
    ...navigator,
    // Adiciona listeners para scroll
    addProgressListener: (callback: (progress: number) => void) => {
      return addScrollListener((info) => callback(info.progress));
    },
    // Adiciona detector de direção
    addDirectionListener: (callback: (direction: 'up' | 'down') => void) => {
      return createScrollDirectionDetector(callback);
    },
  };
};

/**
 * Cria um sistema de validação de formulário completo
 */
export const createFormValidator = () => {
  return {
    // Validadores individuais
    email: (email: string) => validateEmail(email),
    password: (password: string) => validatePassword(password),
    cpf: (cpf: string) => validateCPF(cpf),
    cnpj: (cnpj: string) => validateCNPJ(cnpj),
    phone: (phone: string) => validatePhone(phone),
    cep: (cep: string) => validateCEP(cep),
    url: (url: string) => validateURL(url),
    required: (value: unknown, fieldName?: string) => validateRequired(value, fieldName),
    
    // Validador de formulário completo
    validateForm: (data: Record<string, unknown>, rules: Record<string, (value: unknown) => ValidationResult>) => {
      return validateForm(data, rules);
    },
    
    // Sanitizadores
    sanitize: {
      string: sanitizeString,
      email: sanitizeEmail,
      phone: sanitizePhone,
      cpf: sanitizeCPF,
      cnpj: sanitizeCNPJ,
      cep: sanitizeCEP,
    },
  };
};

/**
 * Cria um sistema de formatação completo
 */
export const createFormatter = () => {
  return {
    // Números
    number: formatNumber,
    currency: formatCurrency,
    percentage: formatPercentage,
    compact: formatCompactNumber,
    
    // Datas
    date: formatDate,
    relativeDate: formatRelativeDate,
    time: formatTime,
    duration: formatDuration,
    
    // Arquivos
    fileSize: formatFileSize,
    fileName: formatFileName,
    
    // Texto
    text: formatText,
    name: formatName,
    initials: formatInitials,
    slug: formatSlug,
    
    // Documentos brasileiros
    phone: formatPhone,
    cpf: formatCPF,
    cnpj: formatCNPJ,
    cep: formatCEP,
    
    // URLs
    url: formatURL,
    
    // Máscaras
    mask: maskValue,
    masks: MASKS,
  };
};

// === EXPORTS DEFAULT ===
export default {
  // Sistemas completos
  createFullInteractiveElement,
  createScrollNavigation,
  createFormValidator,
  createFormatter,
  
  // Utilities principais
  animations: {
    ANIMATION_DEFAULTS,
    EASING_FUNCTIONS,
    ANIMATION_DURATIONS,
    ANIMATION_PRESETS,
    createAnimationStyles,
    createScrollAnimationStyles,
    createParallaxStyles,
  },
  
  dom: {
    querySelector,
    getElementById,
    getElementDimensions,
    getViewportInfo,
    isElementVisible,
    scrollToElement,
    addClass,
    removeClass,
    addEventListener,
    focusElement,
    createElement,
  },
  
  format: {
    number: formatNumber,
    currency: formatCurrency,
    date: formatDate,
    fileSize: formatFileSize,
    text: formatText,
    phone: formatPhone,
    cpf: formatCPF,
    url: formatURL,
  },
  
  validation: {
    email: validateEmail,
    password: validatePassword,
    cpf: validateCPF,
    phone: validatePhone,
    url: validateURL,
    required: validateRequired,
    form: validateForm,
  },
  
  ui: {
    SIZE_VARIANTS,
    COLOR_VARIANTS,
    HOVER_EFFECTS,
    createFlexClasses,
    createGridClasses,
    combineClasses,
  },
  
  scroll: {
    scrollToSection,
    scrollToTop,
    getScrollProgress,
    addScrollListener,
    createSectionNavigator,
  },
  
  transitions: {
    HOVER_EFFECTS,
    GRADIENT_OVERLAYS,
    createTransitionClasses,
    createHoverEffect,
    combineEffects,
  },
};