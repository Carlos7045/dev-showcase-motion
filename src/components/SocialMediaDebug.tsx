import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSocialMediaPreview, useSocialMediaValidation, useSocialMediaTestUrls } from '@/hooks/useSocialMediaOptimization';
import { SocialMediaPreviewData } from '@/utils/socialMediaPreview';

interface SocialMediaDebugProps {
  data: SocialMediaPreviewData;
  showValidation?: boolean;
  showTestUrls?: boolean;
}

export const SocialMediaDebug: React.FC<SocialMediaDebugProps> = ({
  data,
  showValidation = true,
  showTestUrls = true
}) => {
  const [activeTab, setActiveTab] = useState<'facebook' | 'twitter' | 'linkedin' | 'whatsapp'>('facebook');
  const preview = useSocialMediaPreview(data);
  const validation = useSocialMediaValidation(data);
  const testUrls = useSocialMediaTestUrls(data.url);

  const platforms = [
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-500' },
    { id: 'twitter', name: 'Twitter', color: 'bg-sky-500' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
    { id: 'whatsapp', name: 'WhatsApp', color: 'bg-green-500' }
  ] as const;

  const renderPreview = () => {
    const platformData = preview[activeTab];
    
    return (
      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-start gap-4">
          {platformData.image && (
            <img 
              src={platformData.image} 
              alt="Preview" 
              className="w-24 h-24 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
              {platformData.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">
              {platformData.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{new URL(data.url).hostname}</span>
              {activeTab === 'twitter' && 'card' in platformData && (
                <Badge variant="outline" className="text-xs">
                  {platformData.card}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Validação */}
      {showValidation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {validation.isValid ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              Validação dos Dados Sociais
            </CardTitle>
          </CardHeader>
          <CardContent>
            {validation.errors.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-red-600 mb-2">Erros:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {validation.errors.map((error, index) => (
                    <li key={index} className="text-red-600 text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validation.warnings.length > 0 && (
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">Avisos:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {validation.warnings.map((warning, index) => (
                    <li key={index} className="text-yellow-600 text-sm">{warning}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validation.isValid && validation.warnings.length === 0 && (
              <p className="text-green-600">✅ Todos os dados estão otimizados!</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Preview das Plataformas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview nas Redes Sociais
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabs das Plataformas */}
          <div className="flex gap-2 mb-6">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={activeTab === platform.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(platform.id)}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                {platform.name}
              </Button>
            ))}
          </div>

          {/* Preview da Plataforma Ativa */}
          <div>
            <h4 className="font-semibold mb-3">
              Como aparecerá no {platforms.find(p => p.id === activeTab)?.name}:
            </h4>
            {renderPreview()}
          </div>
        </CardContent>
      </Card>

      {/* URLs de Teste */}
      {showTestUrls && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Testar em Plataformas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(testUrls).map(([platform, url]) => (
                <Button
                  key={platform}
                  variant="outline"
                  className="justify-start"
                  onClick={() => window.open(url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Testar no {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
              Use essas ferramentas para testar como sua página aparece em cada plataforma
              e verificar se as meta tags estão sendo lidas corretamente.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dados Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Técnicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Open Graph:</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(preview.facebook, null, 2)}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Twitter Card:</h4>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(preview.twitter, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Componente para uso em desenvolvimento
export const SocialMediaDebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Só mostra em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const currentPageData: SocialMediaPreviewData = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    url: window.location.href,
    type: 'website'
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsVisible(!isVisible)}
        size="sm"
      >
        <Eye className="w-4 h-4 mr-2" />
        Social Debug
      </Button>

      {isVisible && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Debug de Redes Sociais</h2>
                <Button variant="outline" onClick={() => setIsVisible(false)}>
                  Fechar
                </Button>
              </div>
              
              <SocialMediaDebug data={currentPageData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};