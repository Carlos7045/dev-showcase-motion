import React from 'react';
import { TrendingUp, Zap, Shield, Users, DollarSign, Clock, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProjectMetrics as ProjectMetricsType } from '@/types/portfolio';

interface ProjectMetricsProps {
  metrics: ProjectMetricsType;
  className?: string;
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics, className = '' }) => {
  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'performance': return Zap;
      case 'business': return TrendingUp;
      case 'technical': return Shield;
      default: return BarChart3;
    }
  };

  const getMetricColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-primary';
      case 'business': return 'text-accent';
      case 'technical': return 'text-primary-glow';
      default: return 'text-muted-foreground';
    }
  };

  const parseMetricValue = (value: string) => {
    // Extrair número da string para usar no Progress
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gradient mb-4">Resultados Alcançados</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Métricas reais que demonstram o impacto e sucesso do projeto.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Metrics */}
        {metrics.performance && (
          <Card className="border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                Performance
              </CardTitle>
              <CardDescription>
                Métricas de velocidade e otimização técnica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {metrics.performance.loadTime && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tempo de Carregamento</span>
                    <span className="text-sm font-bold text-primary">{metrics.performance.loadTime}</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              )}
              
              {metrics.performance.lighthouse && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Lighthouse Score</span>
                    <span className="text-sm font-bold text-primary">{metrics.performance.lighthouse}/100</span>
                  </div>
                  <Progress value={metrics.performance.lighthouse} className="h-2" />
                </div>
              )}
              
              {metrics.performance.coreWebVitals && (
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium">Core Web Vitals</span>
                  <span className="text-sm font-bold text-primary">{metrics.performance.coreWebVitals}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Business Metrics */}
        {metrics.business && (
          <Card className="border-accent/20 hover:border-accent/40 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                Negócio
              </CardTitle>
              <CardDescription>
                Impacto nos resultados e métricas de conversão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics.business.userIncrease && (
                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Aumento de Usuários</span>
                  </div>
                  <span className="text-lg font-bold text-accent">{metrics.business.userIncrease}</span>
                </div>
              )}
              
              {metrics.business.conversionRate && (
                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Taxa de Conversão</span>
                  </div>
                  <span className="text-lg font-bold text-accent">{metrics.business.conversionRate}</span>
                </div>
              )}
              
              {metrics.business.revenue && (
                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Receita</span>
                  </div>
                  <span className="text-lg font-bold text-accent">{metrics.business.revenue}</span>
                </div>
              )}
              
              {metrics.business.timeToMarket && (
                <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Time to Market</span>
                  </div>
                  <span className="text-lg font-bold text-accent">{metrics.business.timeToMarket}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Technical Metrics */}
        {metrics.technical && (
          <Card className="border-primary-glow/20 hover:border-primary-glow/40 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-glow/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-glow" />
                </div>
                Técnico
              </CardTitle>
              <CardDescription>
                Qualidade do código e confiabilidade do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {metrics.technical.testCoverage && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cobertura de Testes</span>
                    <span className="text-sm font-bold text-primary-glow">{metrics.technical.testCoverage}</span>
                  </div>
                  <Progress value={parseMetricValue(metrics.technical.testCoverage)} className="h-2" />
                </div>
              )}
              
              {metrics.technical.uptime && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Uptime</span>
                    <span className="text-sm font-bold text-primary-glow">{metrics.technical.uptime}</span>
                  </div>
                  <Progress value={parseMetricValue(metrics.technical.uptime)} className="h-2" />
                </div>
              )}
              
              {metrics.technical.bugReduction && (
                <div className="flex items-center justify-between p-3 bg-primary-glow/5 rounded-lg">
                  <span className="text-sm font-medium">Redução de Bugs</span>
                  <span className="text-lg font-bold text-primary-glow">{metrics.technical.bugReduction}</span>
                </div>
              )}
              
              {metrics.technical.codeReduction && (
                <div className="flex items-center justify-between p-3 bg-primary-glow/5 rounded-lg">
                  <span className="text-sm font-medium">Redução de Código</span>
                  <span className="text-lg font-bold text-primary-glow">{metrics.technical.codeReduction}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};