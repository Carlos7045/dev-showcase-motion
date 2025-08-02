/**
 * Format - Utilities para formatação de dados
 * Funções reutilizáveis para formatação consistente de dados
 */

// === TIPOS ===
export interface FormatNumberOptions {
  /** Número de casas decimais */
  readonly decimals?: number;
  /** Separador decimal */
  readonly decimalSeparator?: string;
  /** Separador de milhares */
  readonly thousandsSeparator?: string;
  /** Prefixo */
  readonly prefix?: string;
  /** Sufixo */
  readonly suffix?: string;
  /** Se deve mostrar sinal positivo */
  readonly showPositiveSign?: boolean;
}

export interface FormatCurrencyOptions extends FormatNumberOptions {
  /** Código da moeda */
  readonly currency?: string;
  /** Posição do símbolo da moeda */
  readonly currencyPosition?: 'before' | 'after';
  /** Símbolo da moeda customizado */
  readonly currencySymbol?: string;
}

export interface FormatDateOptions {
  /** Formato da data */
  readonly format?: 'short' | 'medium' | 'long' | 'full' | 'custom';
  /** Formato customizado */
  readonly customFormat?: string;
  /** Locale */
  readonly locale?: string;
  /** Timezone */
  readonly timeZone?: string;
  /** Se deve incluir horário */
  readonly includeTime?: boolean;
  /** Se deve ser relativo (ex: "há 2 dias") */
  readonly relative?: boolean;
}

export interface FormatFileOptions {
  /** Unidade base (bytes, KB, MB, etc.) */
  readonly unit?: 'bytes' | 'KB' | 'MB' | 'GB' | 'TB';
  /** Número de casas decimais */
  readonly decimals?: number;
  /** Se deve usar unidades binárias (1024) ou decimais (1000) */
  readonly binary?: boolean;
}

// === CONSTANTES ===
const DEFAULT_LOCALE = 'pt-BR';
const DEFAULT_CURRENCY = 'BRL';
const DEFAULT_TIMEZONE = 'America/Sao_Paulo';

const CURRENCY_SYMBOLS: Record<string, string> = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
  KRW: '₩',
  INR: '₹',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
  CZK: 'Kč',
  HUF: 'Ft',
  RUB: '₽',
  TRY: '₺',
  ZAR: 'R',
  MXN: '$',
  ARS: '$',
  CLP: '$',
  COP: '$',
  PEN: 'S/',
  UYU: '$U',
};

const FILE_SIZE_UNITS = {
  binary: ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'],
  decimal: ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
};

// === UTILITIES DE NÚMEROS ===
export const formatNumber = (
  value: number,
  options: FormatNumberOptions = {}
): string => {
  const {
    decimals = 0,
    decimalSeparator = ',',
    thousandsSeparator = '.',
    prefix = '',
    suffix = '',
    showPositiveSign = false,
  } = options;

  if (isNaN(value) || !isFinite(value)) {
    return 'N/A';
  }

  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  
  // Arredondar para o número de casas decimais
  const multiplier = Math.pow(10, decimals);
  const rounded = Math.round(absoluteValue * multiplier) / multiplier;
  
  // Separar parte inteira e decimal
  const parts = rounded.toFixed(decimals).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Adicionar separador de milhares
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  // Montar número formatado
  let formatted = formattedInteger;
  if (decimals > 0 && decimalPart) {
    formatted += decimalSeparator + decimalPart;
  }
  
  // Adicionar sinal
  if (isNegative) {
    formatted = '-' + formatted;
  } else if (showPositiveSign && value > 0) {
    formatted = '+' + formatted;
  }
  
  // Adicionar prefixo e sufixo
  return prefix + formatted + suffix;
};

export const formatCurrency = (
  value: number,
  options: FormatCurrencyOptions = {}
): string => {
  const {
    currency = DEFAULT_CURRENCY,
    currencyPosition = 'before',
    currencySymbol,
    decimals = 2,
    ...numberOptions
  } = options;

  const symbol = currencySymbol || CURRENCY_SYMBOLS[currency] || currency;
  const formattedNumber = formatNumber(value, { ...numberOptions, decimals });
  
  if (currencyPosition === 'after') {
    return `${formattedNumber} ${symbol}`;
  }
  
  return `${symbol} ${formattedNumber}`;
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return formatNumber(value * 100, { decimals, suffix: '%' });
};

export const formatCompactNumber = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return 'N/A';
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue < 1000) {
    return sign + absValue.toString();
  }
  
  const units = ['', 'K', 'M', 'B', 'T'];
  const unitIndex = Math.floor(Math.log10(absValue) / 3);
  const scaledValue = absValue / Math.pow(1000, unitIndex);
  
  const formatted = scaledValue < 10 
    ? scaledValue.toFixed(1) 
    : Math.round(scaledValue).toString();
  
  return sign + formatted + units[unitIndex];
};

// === UTILITIES DE DATAS ===
export const formatDate = (
  date: Date | string | number,
  options: FormatDateOptions = {}
): string => {
  const {
    format = 'medium',
    customFormat,
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIMEZONE,
    includeTime = false,
    relative = false,
  } = options;

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }

  // Formato relativo
  if (relative) {
    return formatRelativeDate(dateObj, locale);
  }

  // Formato customizado
  if (customFormat) {
    return formatCustomDate(dateObj, customFormat, locale, timeZone);
  }

  // Formatos padrão
  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone,
  };

  switch (format) {
    case 'short':
      formatOptions.dateStyle = 'short';
      break;
    case 'medium':
      formatOptions.dateStyle = 'medium';
      break;
    case 'long':
      formatOptions.dateStyle = 'long';
      break;
    case 'full':
      formatOptions.dateStyle = 'full';
      break;
  }

  if (includeTime) {
    formatOptions.timeStyle = 'short';
  }

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.warn('Error formatting date:', error);
    return dateObj.toLocaleDateString();
  }
};

export const formatRelativeDate = (
  date: Date,
  locale: string = DEFAULT_LOCALE
): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Usar Intl.RelativeTimeFormat se disponível
  if ('RelativeTimeFormat' in Intl) {
    try {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      
      if (Math.abs(diffInSeconds) < 60) {
        return rtf.format(-diffInSeconds, 'second');
      } else if (Math.abs(diffInSeconds) < 3600) {
        return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
      } else if (Math.abs(diffInSeconds) < 86400) {
        return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
      } else if (Math.abs(diffInSeconds) < 2592000) {
        return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
      } else if (Math.abs(diffInSeconds) < 31536000) {
        return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
      } else {
        return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
      }
    } catch (error) {
      console.warn('Error with RelativeTimeFormat:', error);
    }
  }

  // Fallback manual
  const absSeconds = Math.abs(diffInSeconds);
  const isFuture = diffInSeconds < 0;
  
  if (absSeconds < 60) {
    return isFuture ? 'em alguns segundos' : 'há alguns segundos';
  } else if (absSeconds < 3600) {
    const minutes = Math.floor(absSeconds / 60);
    return isFuture ? `em ${minutes} minuto${minutes > 1 ? 's' : ''}` : `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else if (absSeconds < 86400) {
    const hours = Math.floor(absSeconds / 3600);
    return isFuture ? `em ${hours} hora${hours > 1 ? 's' : ''}` : `há ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (absSeconds < 2592000) {
    const days = Math.floor(absSeconds / 86400);
    return isFuture ? `em ${days} dia${days > 1 ? 's' : ''}` : `há ${days} dia${days > 1 ? 's' : ''}`;
  } else if (absSeconds < 31536000) {
    const months = Math.floor(absSeconds / 2592000);
    return isFuture ? `em ${months} mês${months > 1 ? 'es' : ''}` : `há ${months} mês${months > 1 ? 'es' : ''}`;
  } else {
    const years = Math.floor(absSeconds / 31536000);
    return isFuture ? `em ${years} ano${years > 1 ? 's' : ''}` : `há ${years} ano${years > 1 ? 's' : ''}`;
  }
};

const formatCustomDate = (
  date: Date,
  format: string,
  locale: string,
  timeZone: string
): string => {
  const formatters: Record<string, () => string> = {
    'YYYY': () => date.getFullYear().toString(),
    'YY': () => date.getFullYear().toString().slice(-2),
    'MM': () => (date.getMonth() + 1).toString().padStart(2, '0'),
    'M': () => (date.getMonth() + 1).toString(),
    'DD': () => date.getDate().toString().padStart(2, '0'),
    'D': () => date.getDate().toString(),
    'HH': () => date.getHours().toString().padStart(2, '0'),
    'H': () => date.getHours().toString(),
    'mm': () => date.getMinutes().toString().padStart(2, '0'),
    'm': () => date.getMinutes().toString(),
    'ss': () => date.getSeconds().toString().padStart(2, '0'),
    's': () => date.getSeconds().toString(),
  };

  let formatted = format;
  Object.entries(formatters).forEach(([token, formatter]) => {
    formatted = formatted.replace(new RegExp(token, 'g'), formatter());
  });

  return formatted;
};

export const formatTime = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Horário inválido';
  }

  return dateObj.toLocaleTimeString(DEFAULT_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: DEFAULT_TIMEZONE,
  });
};

export const formatDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// === UTILITIES DE ARQUIVOS ===
export const formatFileSize = (
  bytes: number,
  options: FormatFileOptions = {}
): string => {
  const {
    decimals = 1,
    binary = true,
  } = options;

  if (bytes === 0) return '0 bytes';
  if (isNaN(bytes) || bytes < 0) return 'N/A';

  const base = binary ? 1024 : 1000;
  const units = binary ? FILE_SIZE_UNITS.binary : FILE_SIZE_UNITS.decimal;
  
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
  const size = bytes / Math.pow(base, unitIndex);
  
  const formattedSize = unitIndex === 0 
    ? size.toString() 
    : size.toFixed(decimals);
  
  return `${formattedSize} ${units[unitIndex]}`;
};

export const formatFileName = (fileName: string, maxLength: number = 30): string => {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const extension = fileName.split('.').pop() || '';
  const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
  const maxNameLength = maxLength - extension.length - 4; // 4 para "..." e "."

  if (maxNameLength <= 0) {
    return `...${extension}`;
  }

  return `${nameWithoutExtension.slice(0, maxNameLength)}...${extension}`;
};

// === UTILITIES DE TEXTO ===
export const formatText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 3) + '...';
};

export const formatName = (firstName: string, lastName?: string): string => {
  if (!firstName) return '';
  
  const first = firstName.trim();
  const last = lastName?.trim();
  
  if (!last) return first;
  
  return `${first} ${last}`;
};

export const formatInitials = (name: string): string => {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return words
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

export const formatPhone = (phone: string, format: 'BR' | 'US' | 'international' = 'BR'): string => {
  const digits = phone.replace(/\D/g, '');
  
  switch (format) {
    case 'BR':
      if (digits.length === 11) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      } else if (digits.length === 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      }
      break;
    case 'US':
      if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
      break;
    case 'international':
      if (digits.length >= 10) {
        return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 9)}-${digits.slice(9)}`;
      }
      break;
  }
  
  return phone;
};

export const formatCPF = (cpf: string): string => {
  const digits = cpf.replace(/\D/g, '');
  
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  }
  
  return cpf;
};

export const formatCNPJ = (cnpj: string): string => {
  const digits = cnpj.replace(/\D/g, '');
  
  if (digits.length === 14) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  }
  
  return cnpj;
};

export const formatCEP = (cep: string): string => {
  const digits = cep.replace(/\D/g, '');
  
  if (digits.length === 8) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  
  return cep;
};

// === UTILITIES DE URL ===
export const formatURL = (url: string): string => {
  if (!url) return '';
  
  // Adicionar protocolo se não existir
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  
  return url;
};

export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, ''); // Remove hífens do início e fim
};

// === UTILITIES DE VALIDAÇÃO ===
export const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

export const isValidDate = (value: any): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

export const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.length > 0;
};

// === UTILITIES DE CONVERSÃO ===
export const parseNumber = (value: string): number | null => {
  if (!value) return null;
  
  // Remove formatação brasileira
  const cleaned = value
    .replace(/\./g, '') // Remove separadores de milhares
    .replace(',', '.'); // Substitui vírgula decimal por ponto
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
};

export const parseCurrency = (value: string): number | null => {
  if (!value) return null;
  
  // Remove símbolos de moeda e espaços
  const cleaned = value
    .replace(/[R$\s€£¥₹]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
};

// === UTILITIES DE MÁSCARA ===
export const maskValue = (value: string, mask: string): string => {
  if (!value || !mask) return value;
  
  let masked = '';
  let valueIndex = 0;
  
  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    if (mask[i] === '#') {
      masked += value[valueIndex];
      valueIndex++;
    } else {
      masked += mask[i];
    }
  }
  
  return masked;
};

// Máscaras comuns
export const MASKS = {
  CPF: '###.###.###-##',
  CNPJ: '##.###.###/####-##',
  PHONE_BR: '(##) #####-####',
  CEP: '#####-###',
  DATE_BR: '##/##/####',
  TIME: '##:##',
  CREDIT_CARD: '#### #### #### ####',
} as const;