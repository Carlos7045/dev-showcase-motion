import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Wifi, WifiOff } from 'lucide-react';
import { useUpdateNotification, useNetworkStatus } from '@/hooks/useServiceWorker';
import { cn } from '@/lib/utils';

export const UpdateNotification: React.FC = () => {
  const { showNotification, acceptUpdate, dismissUpdate } = useUpdateNotification();

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-card border border-primary/20 rounded-lg shadow-lg p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Download className="w-4 h-4 text-primary" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-card-foreground mb-1">
              Atualização Disponível
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Uma nova versão do site está disponível com melhorias e correções.
            </p>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={acceptUpdate}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Atualizar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={dismissUpdate}
                className="text-muted-foreground hover:text-foreground"
              >
                Depois
              </Button>
            </div>
          </div>
          
          <button
            onClick={dismissUpdate}
            className="text-muted-foreground hover:text-foreground p-1"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const NetworkStatusIndicator: React.FC = () => {
  const { isOnline, connectionType, isSlowConnection } = useNetworkStatus();

  return (
    <div className={cn(
      'fixed bottom-4 left-4 z-50 transition-all duration-300',
      isOnline ? 'opacity-0 pointer-events-none' : 'opacity-100'
    )}>
      <div className="bg-card border border-red-200 dark:border-red-800 rounded-lg shadow-lg p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            Sem conexão
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Navegando no modo offline
        </p>
      </div>
    </div>
  );
};

export const ConnectionQualityIndicator: React.FC = () => {
  const { isOnline, connectionType, isSlowConnection } = useNetworkStatus();

  if (!isOnline || !isSlowConnection) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg shadow-lg p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
            Conexão lenta
          </span>
        </div>
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
          Algumas funcionalidades podem estar limitadas
        </p>
      </div>
    </div>
  );
};

// Componente principal que combina todas as notificações
export const ServiceWorkerNotifications: React.FC = () => {
  return (
    <>
      <UpdateNotification />
      <NetworkStatusIndicator />
      <ConnectionQualityIndicator />
    </>
  );
};

// Componente para debug do service worker (apenas em desenvolvimento)
export const ServiceWorkerDebug: React.FC = () => {
  const { 
    isSupported, 
    isRegistered, 
    isOnline, 
    updateAvailable, 
    cacheSize,
    clearCache,
    checkForUpdates 
  } = useServiceWorker();

  // Só mostra em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-card border rounded-lg p-4 shadow-lg max-w-xs">
      <h4 className="font-semibold mb-2">Service Worker Debug</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Suportado:</span>
          <span className={isSupported ? 'text-green-600' : 'text-red-600'}>
            {isSupported ? 'Sim' : 'Não'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Registrado:</span>
          <span className={isRegistered ? 'text-green-600' : 'text-red-600'}>
            {isRegistered ? 'Sim' : 'Não'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Online:</span>
          <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
            {isOnline ? 'Sim' : 'Não'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Atualização:</span>
          <span className={updateAvailable ? 'text-yellow-600' : 'text-gray-600'}>
            {updateAvailable ? 'Disponível' : 'Nenhuma'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Cache:</span>
          <span>{cacheSize} itens</span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => clearCache().catch(console.error)}
          className="text-xs"
        >
          Limpar Cache
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => checkForUpdates().catch(console.error)}
          className="text-xs"
        >
          Verificar Updates
        </Button>
      </div>
    </div>
  );
};