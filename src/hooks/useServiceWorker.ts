import { useState, useEffect } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
  cacheSize: number;
  registration: ServiceWorkerRegistration | null;
}

interface ServiceWorkerActions {
  register: () => Promise<void>;
  unregister: () => Promise<void>;
  update: () => Promise<void>;
  skipWaiting: () => void;
  clearCache: () => Promise<void>;
  preloadResources: (resources: string[]) => void;
  checkForUpdates: () => Promise<boolean>;
}

export const useServiceWorker = (): ServiceWorkerState & ServiceWorkerActions => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isOnline: navigator.onLine,
    updateAvailable: false,
    cacheSize: 0,
    registration: null
  });

  // Registra o service worker
  const register = async (): Promise<void> => {
    if (!state.isSupported) {
      throw new Error('Service Worker não é suportado neste navegador');
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      setState(prev => ({
        ...prev,
        isRegistered: true,
        registration
      }));

      // Configura listeners para atualizações
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setState(prev => ({ ...prev, updateAvailable: true }));
            }
          });
        }
      });

      console.log('Service Worker registrado com sucesso');
    } catch (error) {
      console.error('Falha ao registrar Service Worker:', error);
      throw error;
    }
  };

  // Remove o registro do service worker
  const unregister = async (): Promise<void> => {
    if (!state.registration) {
      throw new Error('Nenhum Service Worker registrado');
    }

    try {
      await state.registration.unregister();
      setState(prev => ({
        ...prev,
        isRegistered: false,
        registration: null
      }));
      console.log('Service Worker removido com sucesso');
    } catch (error) {
      console.error('Falha ao remover Service Worker:', error);
      throw error;
    }
  };

  // Atualiza o service worker
  const update = async (): Promise<void> => {
    if (!state.registration) {
      throw new Error('Nenhum Service Worker registrado');
    }

    try {
      await state.registration.update();
      console.log('Service Worker atualizado');
    } catch (error) {
      console.error('Falha ao atualizar Service Worker:', error);
      throw error;
    }
  };

  // Pula a espera e ativa o novo service worker
  const skipWaiting = (): void => {
    if (state.registration?.waiting) {
      state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // Limpa todos os caches
  const clearCache = async (): Promise<void> => {
    if (!state.registration?.active) {
      throw new Error('Service Worker não está ativo');
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_CLEARED') {
          setState(prev => ({ ...prev, cacheSize: 0 }));
          resolve();
        } else {
          reject(new Error('Falha ao limpar cache'));
        }
      };

      state.registration.active.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
    });
  };

  // Preload de recursos
  const preloadResources = (resources: string[]): void => {
    if (state.registration?.active) {
      state.registration.active.postMessage({
        type: 'PRELOAD_RESOURCES',
        payload: { resources }
      });
    }
  };

  // Verifica se há atualizações disponíveis
  const checkForUpdates = async (): Promise<boolean> => {
    if (!state.registration) {
      return false;
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'UPDATE_AVAILABLE') {
          const hasUpdate = event.data.payload;
          setState(prev => ({ ...prev, updateAvailable: hasUpdate }));
          resolve(hasUpdate);
        }
      };

      state.registration.active?.postMessage(
        { type: 'CHECK_UPDATE' },
        [messageChannel.port2]
      );
    });
  };

  // Obtém tamanho do cache
  const getCacheSize = async (): Promise<void> => {
    if (!state.registration?.active) return;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_SIZE') {
          setState(prev => ({ ...prev, cacheSize: event.data.payload }));
          resolve();
        }
      };

      state.registration.active.postMessage(
        { type: 'GET_CACHE_SIZE' },
        [messageChannel.port2]
      );
    });
  };

  // Efeitos para monitorar mudanças
  useEffect(() => {
    // Monitora status de conexão
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Registra automaticamente se suportado
    if (state.isSupported && !state.isRegistered) {
      register().catch(console.error);
    }
  }, [state.isSupported, state.isRegistered]);

  useEffect(() => {
    // Obtém tamanho do cache periodicamente
    if (state.isRegistered) {
      getCacheSize();
      const interval = setInterval(getCacheSize, 60000); // A cada minuto
      return () => clearInterval(interval);
    }
  }, [state.isRegistered]);

  useEffect(() => {
    // Verifica atualizações periodicamente
    if (state.isRegistered) {
      const interval = setInterval(() => {
        checkForUpdates().catch(console.error);
      }, 300000); // A cada 5 minutos
      
      return () => clearInterval(interval);
    }
  }, [state.isRegistered]);

  return {
    ...state,
    register,
    unregister,
    update,
    skipWaiting,
    clearCache,
    preloadResources,
    checkForUpdates
  };
};

// Hook para notificações de atualização
export const useUpdateNotification = () => {
  const { updateAvailable, skipWaiting } = useServiceWorker();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      setShowNotification(true);
    }
  }, [updateAvailable]);

  const acceptUpdate = () => {
    skipWaiting();
    setShowNotification(false);
    // Recarrega a página após um pequeno delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const dismissUpdate = () => {
    setShowNotification(false);
  };

  return {
    showNotification,
    acceptUpdate,
    dismissUpdate
  };
};

// Hook para status de conexão
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Detecta tipo de conexão se disponível
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setConnectionType(connection.effectiveType || 'unknown');
      
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown');
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
    connectionType,
    isSlowConnection: connectionType === 'slow-2g' || connectionType === '2g'
  };
};