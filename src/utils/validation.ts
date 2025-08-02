/**
 * Validation - Utilities para validação e sanitização
 * Funções reutilizáveis para validação de dados e sanitização
 */

// === TIPOS ===
export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: string[];
}

export interface EmailValidationOptions {
  /** Se deve permitir domínios internacionais */
  readonly allowInternational?: boolean;
  /** Lista de domínios bloqueados */
  readonly blockedDomains?: string[];
  /** Lista de domínios permitidos (whitelist) */
  readonly allowedDomains?: string[];
}

export interface PasswordValidationOptions {
  /** Comprimento mínimo */
  readonly minLength?: number;
  /** Comprimento máximo */
  readonly maxLength?: number;
  /** Requer pelo menos uma letra minúscula */
  readonly requireLowercase?: boolean;
  /** Requer pelo menos uma letra maiúscula */
  readonly requireUppercase?: boolean;
  /** Requer pelo menos um número */
  readonly requireNumber?: boolean;
  /** Requer pelo menos um caractere especial */
  readonly requireSpecialChar?: boolean;
  /** Caracteres especiais permitidos */
  readonly allowedSpecialChars?: string;
}

export interface URLValidationOptions {
  /** Protocolos permitidos */
  readonly allowedProtocols?: string[];
  /** Se deve permitir IPs */
  readonly allowIP?: boolean;
  /** Se deve permitir localhost */
  readonly allowLocalhost?: boolean;
}

// === CONSTANTES ===
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_BR_REGEX = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\s?)?[0-9]{4}[-\s]?[0-9]{4}$/;
const CPF_REGEX = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const CNPJ_REGEX = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const CEP_REGEX = /^\d{5}-?\d{3}$/;
const URL_REGEX = /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/;

const DEFAULT_PASSWORD_OPTIONS: Required<PasswordValidationOptions> = {
  minLength: 8,
  maxLength: 128,
  requireLowercase: true,
  requireUppercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  allowedSpecialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

// === UTILITIES DE VALIDAÇÃO BÁSICA ===
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (isString(value)) return value.trim().length === 0;
  if (isArray(value)) return value.length === 0;
  if (isObject(value)) return Object.keys(value).length === 0;
  return false;
};

export const isNotEmpty = (value: unknown): boolean => {
  return !isEmpty(value);
};

// === UTILITIES DE VALIDAÇÃO DE STRING ===
export const validateLength = (
  value: string,
  min: number = 0,
  max: number = Infinity
): ValidationResult => {
  const errors: string[] = [];
  const length = value.length;

  if (length < min) {
    errors.push(`Deve ter pelo menos ${min} caracteres`);
  }

  if (length > max) {
    errors.push(`Deve ter no máximo ${max} caracteres`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateRequired = (value: unknown, fieldName: string = 'Campo'): ValidationResult => {
  const errors: string[] = [];

  if (isEmpty(value)) {
    errors.push(`${fieldName} é obrigatório`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// === UTILITIES DE VALIDAÇÃO DE EMAIL ===
export const validateEmail = (
  email: string,
  options: EmailValidationOptions = {}
): ValidationResult => {
  const {
    allowInternational = true,
    blockedDomains = [],
    allowedDomains = [],
  } = options;

  const errors: string[] = [];

  if (!email) {
    errors.push('Email é obrigatório');
    return { isValid: false, errors };
  }

  // Validação básica de formato
  if (!EMAIL_REGEX.test(email)) {
    errors.push('Formato de email inválido');
    return { isValid: false, errors };
  }

  const domain = email.split('@')[1]?.toLowerCase();

  if (!domain) {
    errors.push('Domínio do email inválido');
    return { isValid: false, errors };
  }

  // Verificar domínios bloqueados
  if (blockedDomains.length > 0 && blockedDomains.includes(domain)) {
    errors.push('Domínio de email não permitido');
  }

  // Verificar whitelist de domínios
  if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {
    errors.push('Domínio de email não permitido');
  }

  // Validação de caracteres internacionais
  if (!allowInternational && /[^\x00-\x7F]/.test(email)) {
    errors.push('Caracteres internacionais não são permitidos');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isValidEmail = (email: string): boolean => {
  return validateEmail(email).isValid;
};

// === UTILITIES DE VALIDAÇÃO DE SENHA ===
export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): ValidationResult => {
  const opts = { ...DEFAULT_PASSWORD_OPTIONS, ...options };
  const errors: string[] = [];

  if (!password) {
    errors.push('Senha é obrigatória');
    return { isValid: false, errors };
  }

  // Validar comprimento
  if (password.length < opts.minLength) {
    errors.push(`Senha deve ter pelo menos ${opts.minLength} caracteres`);
  }

  if (password.length > opts.maxLength) {
    errors.push(`Senha deve ter no máximo ${opts.maxLength} caracteres`);
  }

  // Validar letra minúscula
  if (opts.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra minúscula');
  }

  // Validar letra maiúscula
  if (opts.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Senha deve conter pelo menos uma letra maiúscula');
  }

  // Validar número
  if (opts.requireNumber && !/\d/.test(password)) {
    errors.push('Senha deve conter pelo menos um número');
  }

  // Validar caractere especial
  if (opts.requireSpecialChar) {
    const specialCharRegex = new RegExp(`[${opts.allowedSpecialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`);
    if (!specialCharRegex.test(password)) {
      errors.push('Senha deve conter pelo menos um caractere especial');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (password: string): {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
} => {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score += 1;
  else feedback.push('Use pelo menos 8 caracteres');

  if (password.length >= 12) score += 1;
  else if (password.length >= 8) feedback.push('Use 12 ou mais caracteres para maior segurança');

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Adicione letras minúsculas');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Adicione letras maiúsculas');

  if (/\d/.test(password)) score += 1;
  else feedback.push('Adicione números');

  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 1;
  else feedback.push('Adicione caracteres especiais');

  // Penalizar padrões comuns
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push('Evite repetir o mesmo caractere');
  }

  if (/123|abc|qwe/i.test(password)) {
    score -= 1;
    feedback.push('Evite sequências óbvias');
  }

  const level = score <= 2 ? 'weak' : score <= 3 ? 'fair' : score <= 4 ? 'good' : 'strong';

  return { score: Math.max(0, score), level, feedback };
};

// === UTILITIES DE VALIDAÇÃO DE DOCUMENTOS BRASILEIROS ===
export const validateCPF = (cpf: string): ValidationResult => {
  const errors: string[] = [];

  if (!cpf) {
    errors.push('CPF é obrigatório');
    return { isValid: false, errors };
  }

  // Remove formatação
  const cleanCPF = cpf.replace(/\D/g, '');

  if (!CPF_REGEX.test(cpf) && cleanCPF.length !== 11) {
    errors.push('Formato de CPF inválido');
    return { isValid: false, errors };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    errors.push('CPF inválido');
    return { isValid: false, errors };
  }

  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) {
    errors.push('CPF inválido');
    return { isValid: false, errors };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) {
    errors.push('CPF inválido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateCNPJ = (cnpj: string): ValidationResult => {
  const errors: string[] = [];

  if (!cnpj) {
    errors.push('CNPJ é obrigatório');
    return { isValid: false, errors };
  }

  // Remove formatação
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  if (!CNPJ_REGEX.test(cnpj) && cleanCNPJ.length !== 14) {
    errors.push('Formato de CNPJ inválido');
    return { isValid: false, errors };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    errors.push('CNPJ inválido');
    return { isValid: false, errors };
  }

  // Validação dos dígitos verificadores
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (digit1 !== parseInt(cleanCNPJ.charAt(12))) {
    errors.push('CNPJ inválido');
    return { isValid: false, errors };
  }

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;

  if (digit2 !== parseInt(cleanCNPJ.charAt(13))) {
    errors.push('CNPJ inválido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// === UTILITIES DE VALIDAÇÃO DE TELEFONE ===
export const validatePhone = (phone: string, format: 'BR' | 'international' = 'BR'): ValidationResult => {
  const errors: string[] = [];

  if (!phone) {
    errors.push('Telefone é obrigatório');
    return { isValid: false, errors };
  }

  if (format === 'BR') {
    if (!PHONE_BR_REGEX.test(phone)) {
      errors.push('Formato de telefone brasileiro inválido');
    }
  } else {
    // Validação internacional básica
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      errors.push('Formato de telefone internacional inválido');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// === UTILITIES DE VALIDAÇÃO DE CEP ===
export const validateCEP = (cep: string): ValidationResult => {
  const errors: string[] = [];

  if (!cep) {
    errors.push('CEP é obrigatório');
    return { isValid: false, errors };
  }

  if (!CEP_REGEX.test(cep)) {
    errors.push('Formato de CEP inválido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// === UTILITIES DE VALIDAÇÃO DE URL ===
export const validateURL = (url: string, options: URLValidationOptions = {}): ValidationResult => {
  const {
    allowedProtocols = ['http', 'https'],
    allowIP = true,
    allowLocalhost = false,
  } = options;

  const errors: string[] = [];

  if (!url) {
    errors.push('URL é obrigatória');
    return { isValid: false, errors };
  }

  try {
    const urlObj = new URL(url);

    // Verificar protocolo
    const protocol = urlObj.protocol.slice(0, -1); // Remove ':'
    if (!allowedProtocols.includes(protocol)) {
      errors.push(`Protocolo ${protocol} não é permitido`);
    }

    // Verificar localhost
    if (!allowLocalhost && (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1')) {
      errors.push('URLs localhost não são permitidas');
    }

    // Verificar IP
    if (!allowIP && /^\d+\.\d+\.\d+\.\d+$/.test(urlObj.hostname)) {
      errors.push('URLs com IP não são permitidas');
    }

  } catch {
    errors.push('URL inválida');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// === UTILITIES DE SANITIZAÇÃO ===
export const sanitizeString = (value: string): string => {
  return value.trim().replace(/\s+/g, ' ');
};

export const sanitizeHTML = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const sanitizeCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};

export const sanitizeCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
};

export const sanitizeCEP = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

// === UTILITIES DE VALIDAÇÃO COMBINADA ===
export const validateForm = (
  data: Record<string, unknown>,
  rules: Record<string, (value: unknown) => ValidationResult>
): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  let isValid = true;

  Object.entries(rules).forEach(([field, validator]) => {
    const result = validator(data[field]);
    if (!result.isValid) {
      errors[field] = result.errors;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// === UTILITIES DE VALIDAÇÃO DE IDADE ===
export const validateAge = (
  birthDate: Date | string,
  minAge: number = 0,
  maxAge: number = 150
): ValidationResult => {
  const errors: string[] = [];
  const birth = new Date(birthDate);
  const today = new Date();

  if (isNaN(birth.getTime())) {
    errors.push('Data de nascimento inválida');
    return { isValid: false, errors };
  }

  if (birth > today) {
    errors.push('Data de nascimento não pode ser no futuro');
    return { isValid: false, errors };
  }

  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  if (actualAge < minAge) {
    errors.push(`Idade mínima é ${minAge} anos`);
  }

  if (actualAge > maxAge) {
    errors.push(`Idade máxima é ${maxAge} anos`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// === UTILITIES DE VALIDAÇÃO DE ARQUIVO ===
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // em bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): ValidationResult => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = [],
    allowedExtensions = [],
  } = options;

  const errors: string[] = [];

  if (!file) {
    errors.push('Arquivo é obrigatório');
    return { isValid: false, errors };
  }

  // Validar tamanho
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    errors.push(`Arquivo deve ter no máximo ${maxSizeMB}MB`);
  }

  // Validar tipo MIME
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`Tipo de arquivo não permitido: ${file.type}`);
  }

  // Validar extensão
  if (allowedExtensions.length > 0) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      errors.push(`Extensão de arquivo não permitida: ${extension}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};