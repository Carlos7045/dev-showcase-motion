import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FocusManager, useFocusTrap, useScreenReader } from '@/utils/focusManagement';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  initialFocus?: React.RefObject<HTMLElement>;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
  contentClassName,
  initialFocus
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const { announce } = useScreenReader();
  
  // Configura focus trap
  const focusTrapRef = useFocusTrap(isOpen);

  // Gerencia escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Gerencia scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      announce(`Modal aberto: ${title}`);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, title, announce]);

  // Foco inicial
  useEffect(() => {
    if (isOpen && initialFocus?.current) {
      setTimeout(() => {
        initialFocus.current?.focus();
      }, 100);
    }
  }, [isOpen, initialFocus]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={(node) => {
          if (node) {
            modalRef.current = node;
            (focusTrapRef as React.MutableRefObject<HTMLElement>).current = node;
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'relative bg-background border border-border rounded-lg shadow-lg',
          'w-full max-h-[90vh] overflow-hidden',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 
              id={titleId}
              className="text-xl font-semibold text-foreground"
            >
              {title}
            </h2>
            {description && (
              <p 
                id={descriptionId}
                className="text-sm text-muted-foreground mt-1"
              >
                {description}
              </p>
            )}
          </div>
          
          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                'p-2 rounded-md text-muted-foreground hover:text-foreground',
                'hover:bg-muted transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              )}
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className={cn(
          'p-6 overflow-y-auto max-h-[calc(90vh-120px)]',
          contentClassName
        )}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Modal de confirmação acessível
interface AccessibleConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export const AccessibleConfirmModal: React.FC<AccessibleConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default'
}) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      initialFocus={confirmButtonRef}
    >
      <div className="space-y-6">
        <p className="text-foreground">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className={cn(
              'px-4 py-2 border border-border rounded-md',
              'text-foreground hover:bg-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'transition-colors'
            )}
          >
            {cancelText}
          </button>
          
          <button
            ref={confirmButtonRef}
            onClick={handleConfirm}
            className={cn(
              'px-4 py-2 rounded-md font-medium',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'transition-colors',
              variant === 'destructive' 
                ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary'
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </AccessibleModal>
  );
};

// Hook para gerenciar modais
export const useAccessibleModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    FocusManager.saveFocus();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Pequeno delay para permitir animações
    setTimeout(() => {
      FocusManager.restoreFocus();
    }, 100);
  };

  return {
    isOpen,
    openModal,
    closeModal
  };
};

// Componente para tooltip acessível
interface AccessibleTooltipProps {
  children: React.ReactNode;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const AccessibleTooltip: React.FC<AccessibleTooltipProps> = ({
  children,
  content,
  placement = 'top',
  delay = 500
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
  const tooltipId = React.useId();

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const placementClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {React.cloneElement(children as React.ReactElement, {
        'aria-describedby': tooltipId
      })}
      
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg',
            'pointer-events-none whitespace-nowrap',
            placementClasses[placement]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};